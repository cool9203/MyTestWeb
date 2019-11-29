var botton1 = document.querySelectorAll('.alert_botton');
for (var i=0;i<botton1.length;i++){
	botton1[i].addEventListener('click', botton1_event);
}

function botton1_event(){
	alert("hello i am alert.");
}

function ajax_event(event_name){
	url = document.querySelector('.input').value;
    if (event_name == "XMLHttpRequest"){
        XMLHttpRequest_event(url);
    }
    else if (event_name == "JQueryajax"){
        JQueryajax_event(url);
    }
}

function XMLHttpRequest_event(url){
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

function show(data, status, xhr){
    clear_event();
    if (xhr["responseText"] != null){
        result = JSON.parse(xhr.responseText);
    }
    else{
        return 0;
    }
    document.querySelector('.ajaxshow').innerHTML += "<div class=\"data_title\">空氣品質AQI</div><div class=\"data_time\">資料時間:" + result["0"]["PublishTime"] + "</div>";
    result = aqi_data_arrange(result);
    
    for (var [key, value] of result){
        var str = ""
        str += "<div class=\"data_block\">" + key + "<br>";
        for (var [k, v] of value){
            str += k + ":" + v + "<br>";
        }
        document.querySelector('.ajaxshow').innerHTML += str + "</div>\n";
    }
}

function aqi_data_arrange(json_data){
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
}

function clear_event(){
    document.querySelector('.ajaxshow').innerHTML = "";
}