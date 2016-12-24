var textBox = document.forms[0].elements[0];

EventUtil.addHandler(textBox, "focus", function(event){ 
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(target.style.backgroundColor != "red") {
		target.style.backgroundColor = "yellow";
	}
});