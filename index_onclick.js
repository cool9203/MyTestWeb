function XMLHttpRequest_event(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			show(null,null,this);
		}
		else{
			document.querySelector('.ajaxshow').innerHTML = "False";
		}
	};
	xhr.open('get', "https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json");
	xhr.send();
}

function JQueryajax_event(){
    $.ajax({
        url:"https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json",
        dataType:"json",
        async:true,
        data:{"id":"value"},
        type:"get",
        success:show,
        error:()=>document.querySelector('.ajaxshow').innerHTML = "False"
    });
}

function show(data, status, jqxhr){
    clear_event();
    if (jqxhr["responseText"] != null){
        result = JSON.parse(jqxhr.responseText);
    }
    else{
        return 0;
    }
    document.querySelector('.ajaxshow').innerHTML += "<div class=\"data_title\">空氣品質AQI</div><br>資料時間:" + result["0"]["PublishTime"] + "<br>";
	for (var x in result){
		document.querySelector('.ajaxshow').innerHTML += result[x]["SiteName"] + ":" + result[x]["Status"] + "<br>";
    }
}

function clear_event(){
    document.querySelector('.ajaxshow').innerHTML = "";
}
