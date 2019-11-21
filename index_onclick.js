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
    for (var key in result){
        document.querySelector('.ajaxshow').innerHTML += key + ":" + result[key] + "<br>";
    }
    /*
    document.querySelector('.ajaxshow').innerHTML += "<div class=\"data_title\">空氣品質AQI</div><br>資料時間:" + result["0"]["PublishTime"] + "<br>";
	for (var x in result){
		document.querySelector('.ajaxshow').innerHTML += result[x]["SiteName"] + ":" + result[x]["Status"] + "<br>";
    }
    */
}

function clear_event(){
    document.querySelector('.ajaxshow').innerHTML = "";
}
