var btn = document.getElementById("myBtn");
var handler = function(event) {
	switch(event.type) {
		case "click":
		//执行的代码
		break;

		case "mouseover":
			event.target.style.backgroundColor = "";
			break;
		case "mouseout":
			//
			break;
	}
};

