var botton1 = document.querySelectorAll('.botton1')
for (let i=0;i<botton1.length;i++){
	botton1[i].addEventListener('click', botton1_event)
}

function botton1_event(){
	alert("test botton event.")
}