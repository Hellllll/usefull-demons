EventUtil.addHandler(form, "submit", function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	//取得提交按钮
	
	var btn = target.elements["submit-btn"];

	//禁用它
	btn.disabled = true;
});

EventUtil.addHandler(window, "load", function(event) {
	var element = document.forms[0].elements[0];
	if(element.autofocus !== true ){
		element.focus();
	}
});