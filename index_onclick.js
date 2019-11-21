function XMLHttpRequest_event(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200) {
			show(null,null,this);
		}
		else{
			document.querySelector('.ajaxshow').innerHTML = "False"
		}
	};
	xhr.open('post', "http://ip-api.com/json");
	xhr.send();
}

function JQueryajax_event(){
    $.ajax({
        url:"http://ip-api.com/json",
        dataType:"json",
        async:true,
        data:{"id":"value"},
        type:"post",
        success:show,
        error:()=>document.querySelector('.ajaxshow').innerHTML = "False"
    });
}

function show(data, status, jqxhr){
    clear_event()
    if (jqxhr["responseText"] != null){
        result = JSON.parse(jqxhr.responseText);
    }
    else{
        return 0;
    }
	for (var x in result){
		document.querySelector('.ajaxshow').innerHTML += x + ":" + result[x] + "<br>"
    }
}

function clear_event(){
    document.querySelector('.ajaxshow').innerHTML = ""
}