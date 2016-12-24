Function.prototype.bind = function() {
	var fn = this, args = Array.prototype.slice.call(arguments),
		object = args.shift();

		return function() {
			return fn.apply(object,
				args.concat(Array.prototype.slice.call(arguments)));
	};
};

var myObject = {};
function myFunction() {
	return this == myObject;
}

var aFunction = myFunction.bind(myObject);