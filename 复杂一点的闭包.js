var value = 'ninja';
var later;

function outerFunction() {
	var innerValue = 'samuri';

	function innerFunction() {
		assert(value, 'i can see the ninja.');
		assert(innervalue, 'i can see the samuri.');
	}
	later = innerFunction;
}

outerFunction();
later(); //最终当innerFunction()执行的时候，当时声明的作用域已经消失了，通过闭包，
		 //还是能访问到原始作用域中的变量和函数。