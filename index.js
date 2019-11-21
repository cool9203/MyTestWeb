var botton1 = document.querySelectorAll('.alert_botton');
for (let i=0;i<botton1.length;i++){
	botton1[i].addEventListener('click', botton1_event);
}

function botton1_event(){
	alert("hello i am alert.");
}