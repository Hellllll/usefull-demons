window.onload = function() {
	waterFall('main', 'box');

	//模拟一个json 数据
	var dataInt = {"data": [{"src": "images/0.jpg"},{"src":"images/1.jpg"},{"src":"images/2.jpg"},{"src": "images/3.jpg"},{"src": "images/4.jpg"},{"src": "images/5.jpg"},{"src": "images/6.jpg"},{"src": "images/7.jpg"},{"src": "images/8.jpg"},{"src": "images/9.jpg"},{"src": "images/10.jpg"},{"src": "images/11.jpg"}]};
	
	window.onscroll = function() {
		var dataLength = dataInt.data.length;
		if(checkScroll) {
			for(var i = 0; i < dataLength; i++){
				var oBox = document.createElement('div');
					oBox.className = 'box';
				var oParent = document.getElementById('main');
					oParent.appendChild(oBox);
				var oPic = document.createElement('div');
					oPic.className = 'img-style';
					oBox.appendChild(oPic);
				var oImg = document.createElement('img');
					oPic.appendChild(oImg);
			}
			waterFall('main', 'box');
		}

	}
};

//瀑布流的实现
function waterFall(parent, box) {

	//取得所有box元素
	var oParent = document.getElementById('main');
	var aBox = oParent.getElementsByClassName('box');
	//console.log(aBox.length);

	//计算页面显示的列数（页面宽度/box的宽）
	var oBoxW = aBox[0].offsetWidth;
	//console.log(oBoxW);
	var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
	//console.log(cols);

	//设置main的宽并居中
	oParent.style.cssText = "width:" + oBoxW*cols + "px;margin: 0 auto;"; 
	
	var hArr = []; // 存放每组图片的高度

	//选择一组中最小高度的那张图片
	for(var i = 0; i < aBox.length; i++) {
		if ( i < cols ){
			hArr.push(aBox[i].offsetHeight);
		} else {
			var minH = Math.min.apply(null, hArr);
			//console.log(minH)
			var minhIndex = getMinhIndex(hArr, minH);
			//console.log(minhIndex);
			aBox[i].style.position = "absolute";
			aBox[i].style.top = minH + "px";
			aBox[i].style.left = aBox[minhIndex].offsetLeft + "px";
			hArr[minhIndex] += aBox[i].offsetHeight;
		}
	}
	//console.log(hArr);
}
 
 	function getMinhIndex(arr, val) {
 		for(var i in arr) {
 			if(arr[i] == val) {
 				return i;
 			}
 		}
 	}

	//检测是否具备了滚动加载数据库的条件
 	function checkScroll() {
 		var oParent = document.getElementById('main');
 		var aBox = oParent.getElementsByClassName('box');
 		var lastH = aBox[aBox.length-1].offsetTop  + Math.floor(aBox[aBox.length-1].offsetHeight / 2);
 		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
 		var height = document.body.clientHeight || document.documentElement.clientHeight;
 		return (lastH < scrollTop + height) ? true : false;
 	}