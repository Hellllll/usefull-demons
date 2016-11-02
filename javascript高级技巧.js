//安全的类型检测
function isArray(value) {
	return Object.prototype.toString.call(value) == "[object Array]";
	
}
function isFunction(value) {
	return Object.prototype.toString.call(value) == "[object Function]";
	
}
function isRegExp(value) {
	return Object.prototype.toString.call(value) == "[object RegExp]";

}

//作用域安全的构造函数
function Polygon(sides) {
	if (this instanceof Polygon) {
		this.sides = sides;
		this.getArea = function () {
			return 0;
		};
	} else {
		return new Polygon (sides);
	}
}

function Rectangle (width, height) {
	Polygon.call(this, 2);
	this.width = width;
	this.height = height;
	this.getArea = function () {
		return this.width * this.height;
	};
}
Rectangle.prototype = new Polygon();

var ret = new Rectangle(5, 10);
console.log(ret.sides);

//惰性载入函数（不能理解，但知道两种方式）
//优点是：只在执行分支代码时牺牲一点儿性能
//如下：
//方式一：
function createXHR() {
	if(typeof XMLHttpRequest != "undefined") {
		createXHR = function() {
			return new XMLHttpRequest;
		};
	} else if () {
		createXHR = function() {
			//此处省略若干代码
		};
	} else {
		createXHR = function() {
			//此处省略若干代码
		};
	}

	return createXHR();
}

//方式二：
var createXHR = (function() {
	if() {
		return function() {
			//此处省略若干代码
		};
	} else if () {
		return function() {
			//此处省略若干代码
		};
	} else {
		return function () {
			//此处省略若干代码
		};
	}
})();

//函数绑定
//bind() 返回一个给定环境中调用给定函数的函数，并且将所有参数原封不动传递过去
//最好只在必要时使用该方法
function bind(fn, context) {
	return function() {
		return fn.apply(context, arguments);
	};
}

//高级定时器：使用链式setTimeout()调用
setTimeout(function() {
	var div = document.getElementById('mydiv');
	left = parseInt(div.style.left) + 5;
	div.style.left = left + "px";

	if (left < 200) {
		setTimeout(arguments.callee, 50);
	}
}, 50);

//数组分块 ？？？？？
function chunk(array, process, context) {
	setTimeout(function() {
		var item = array.shift();
		process.all(context, item);

		if (array.length > 0) {
			setTimeout(arguments.callee, 100);
		}
	}, 100);
}

var data = [12, 123, 1234, 453, 536, 23,
			 23, 5, 4123, 45, 346, 5634, 2234, 345, 342];

function printValue(item) {
	var div = document.getElementById("myDiv");
	div.innerHTML += item + "<br>";
}
chunk(data, printValue);
chunk(data.concat(), printValue);

//函数节流的基本模式
var processor = {
	timeoutId: null,

	//实际进行处理的方法
	performProcessing: function() {
		//实际执行的代码
	},

	//初始处理调用的方法
	process: function() {
		clearTimeout(this.timeoutId);

		var that = this;
		this.timeoutId = setTimeout(function() {
			that.performProcessing();
		}, 100);
	}
};

//尝试开始执行
processer.process();

//上述模式用简单的throttle来简化
function throttle(method, context) {
	clearTimeout(method.tId);
	method.tId = setTimeout(function() {
		method.call(context);
	}, 100);
}

//节流在resize事件中是最常用到的
function resizeDiv() {
	var div = document.getElementById("myDiv");
	div.style.height = div.offsetWidth + "px";
}

window.onresize = function() {
	throttle(resizeDiv);
};

//拖放
EventUtil.addHandler(document, "mousemove", function(event) {
	var myDiv = doucument.getElementById("myDiv");
	myDiv.style.left = event.clientX + "px";
	myDiv.style.top = event.clientY + "px";
});

//最简单的拖放界面
var DragDrop = function() {

	var dragging = null;

	function handleEvent(event) {

		//获取事件很多目标
		event = EventUtil。getEvent(event);
		var target = EventUtil.getTarget(event);

		//确定时间类型
		switch(event.type) {
			case "mousedown": 
				if (target.className.indexOf("draggable") >  -1) {
					dragging = target;

					diffX = event.clientX - target.offsetLeft;
				    diffY = event.clientY - target.offsetTop;
				}
				break;

			case "mousemove":
				if (dragging !== null) {

					//指定位置
					dragging.style.left = event.clientX = diffX + "px";
					dragging.style.top = event.clientY = diffY + "px";
				}
				break;
			case "mouseup":
				dragging = null;
				break;
		}
	};

	//公共接口
	return {
		enable: function() {
			EventUtil.addHandler(document, "mousedown", handleEvent);
			EventUtil.addHandler(document, "mousemove", handleEvent);
			EventUtil.addHandler(document, "mouseup", handleEvent);
		},
		disable: function() {
			EventUtil.removeHandler(document, "mousedown", handleEvent);
			EventUtil.removeHandler(document, "mousemove", handleEvent);
			EventUtil.removeHandler(document, "mouseup", handleEvent);
		}
	}
}