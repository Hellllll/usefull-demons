function bind(context, name) {
	return fucntion (){
		return context[name].apply(context, arguments);
	};
}