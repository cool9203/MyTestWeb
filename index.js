function XMLHttpRequest_event(url, data_name){
    show = get_show_function(data_name);
    var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			show(this, this.status, this);
		}
		else if (this.status != 200 && this.status != 0){
			document.querySelector('.ajaxshow').innerHTML = "False";
		}
	};
	xhr.open('get', url);
	xhr.send();
}

function get_show_function(data_name){
    switch (data_name){
        case "aqi":
            return show_aqi;
        case "36h":
            return show_36h;
        case "other":
            return show_other;
    }
}

function show_aqi(data, status, xhr){
    result = show_preprocess(xhr);
    if (result == 0)
        return 0;
    
    document.querySelector('.ajaxshow').innerHTML += "<div class=\"data_title\">空氣品質AQI</div><div class=\"data_time\">資料時間:" + result["0"]["PublishTime"] + "</div>";

    result = function aqi_data_arrange(json_data)
    {
        var data = new Map();
        for (var x in json_data){
            var county = json_data[x]["County"];
            var site_name = json_data[x]["SiteName"];
            var aqi = json_data[x]["Status"];
            if (!data.has(county)){
                data.set(county, new Map());
            }
            data.get(county).set(site_name, aqi);
        }
        return data;
    }(result);
    
    for (var [key, value] of result){
        var str = "";
        str += "<div class=\"data_block_aqi\"><h5>" + key + "</h5>";
        for (var [k, v] of value){
            str += k + ":" + v + "<br>";
        }
        document.querySelector('.ajaxshow').innerHTML += str + "</div>\n";
    }
}

function show_36h(data, status, xhr){
    result = show_preprocess(xhr);
    if (result == 0)
        return 0;

    document.querySelector('.ajaxshow').innerHTML += "<div class=\"data_title\">三十六小時天氣預報</div><div class=\"data_time\">資料時間:" + result["cwbopendata"]["dataset"]["datasetInfo"]["issueTime"].replace("T", " ").replace("+08:00", "") + "</div>";

    for (var key in result["cwbopendata"]["dataset"]["location"]){
        str = "";
        str += "<div class=\"data_block_36h\"><h5>" + result["cwbopendata"]["dataset"]["location"][key]["locationName"] + "</h5>";

        var size = result["cwbopendata"]["dataset"]["location"][key]["weatherElement"]["3"]["time"].length;
        for (var i=0; i<size; i++){
            str += result["cwbopendata"]["dataset"]["location"][key]["weatherElement"]["3"]["time"][i.toString()]["startTime"].replace("T", " ").replace("+08:00", "");
            str += ":" + result["cwbopendata"]["dataset"]["location"][key]["weatherElement"]["3"]["time"][i.toString()]["parameter"]["parameterName"];
            str += "<br>";
        }
        document.querySelector('.ajaxshow').innerHTML += str + "</div>\n";
    }
}

function show_other(data, status, xhr){
    result = show_preprocess(xhr);
    if (result == 0)
        return 0;

    var str = ""
    for (var key in result){
        str += key + ":" + result[key] + "<br>";
    }
    document.querySelector('.ajaxshow').innerHTML += str;
}

function show_preprocess(xhr){
    clear_event();
    if (xhr["responseText"] != null){
        return JSON.parse(xhr.responseText);
    }
    else{
        return 0;
    }
}

function aqi(){
    XMLHttpRequest_event("https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json", "aqi");
}

function three_six_hour(){
    XMLHttpRequest_event("https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-E142F0F7-679E-4FA3-AD0A-B0EC7B96351C&downloadType=WEB&format=JSON", "36h");
}

function user_input_url(){
    if (document.querySelector('.input_area').innerHTML.length == 0){
        document.querySelector('.input_area').innerHTML = "<br><text class=\"input_text\">DataUrl:</text>" + 
        "<input class=\"input_text\" type=\"text\" name=\"fname\" value=\"https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json\"></input>" + 
        "\n\n<button class=\"url_button button_edge\" onclick=\"url_push_event()\">送出</button>";
    }else{
        document.querySelector('.input_area').innerHTML = "";
    }
    
}

function url_push_event(){
    url = document.querySelectorAll('.input_text')[1].value;
    console.log(url);
    XMLHttpRequest_event(url, "other");
}

function clear_event(){
    document.querySelector('.ajaxshow').innerHTML = "";
}

//jquery ajax.
function JQueryajax_event(url){
    $.ajax({
        url:url,
        dataType:"json",
        async:true,
        data:"",
        type:"get",
        success:show,
        error:()=>document.querySelector('.ajaxshow').innerHTML = "False"
    });
}