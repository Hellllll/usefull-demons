jscript.array.copyArray = function(inSrcArray, inDesArray) {
	var i;
	for(i=0; i < inSrcArray.length; i++) {
		inDesArray.push(inSrcArray[i]);
	}
	return inDesArray;
} // End copyArray().

jscript.array.findInArray = function(inArray, inValue) {
	var i;
	for(i=0; i < inArray.length; i++) {
		if(inArray[i] == inValue) {
			return i;
		}
	}
	return -1;
}

jscript.array.arrayAverage = function(inArray) {
	var accumulator = 0;
	var i;
	for(i = 0; i < inArray.length; i++) {
		accumulator += inArray[i];
	}
	return accumulator / inArray.length;
}

jscript.browser.getBrowserIdentiy = function() {
	return navigator.appName + " " + navigator.appVersion;
}

jscript.datetime.getNumberDaysInMonth = function(inMonth, inYear) {
	inMonth = inMonth - 1;
	var leap_year = this.isLeapYear(inYear);
	if(leap_year) {
		leap_year = 1;
	} else {
		leap_year = 0;
	}
	if (inMonth == 3 || inMonth == 5 || inMonth == 8 || inMonth == 10) {
		return 30;
	} else if (inMonth == 1) {
		return 28 + leap_year;
	} else {
		return 31;
	}
}

jscript.datetime.isLeapYear = function(inYear) {
	if((inYear % 4 == 0 && !(inYear % 100 == 0)) || inYear % 400 == 0) {
		return true;
	} else {
		return false;
	}
} 

jscript.debug.enumProps = function(inObj) {
	var props = "";
	var i;
	for (i in inObj) {
		props += i + " = " + inObj[i] + "n";
	}
	console.log(props); 
}

jscript.debug.DivLogger = function() {
	this.LEVEL_TRACE = 1;
	this.LEVEL_DEBUG = 2;
	this.LEVEL_INFO = 3;
	this.LEVEL_WARN = 4;
	this.LEVEL_ERROE = 5;
	this.LEVEL_FATAL = 6;

	this.logLevel = 3;

	this.targetDiv = null;

	this.setLevel = function(inLevel) {
		this.logLevel = inLevel;
	}
  //此处省略很多不懂得代码
} var log = new jscript.debug.DivLogger();

jscript.dom.layerCenterH = function(inObj) {
	var lca;
	var lcb;
	var lcx;
	var iebody;
	var dsoceft;
	if (window.innerWidth) {
		lca = window.innerWidth;
	} else {
		lca = document.body.clientWidth;
	}
	lcb = inObj.offsetWidth;
	lcx = (Math.round(lca / 2)) - (Math.round(lcb / 2));
	iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
	dsocleft = document.all ? iebody.scrollLeft : window.pageXOffset;
	inObj.style.left = lcx + dsoleft + "px";
}

jscript.dom.execScript = function (inText) {

	var si = 0;
	while(true) {
		//finding opening script tag.
		var ss = inText.indexOf("<" + "script" + ">", si)
		if(ss == -1) {
			return;
		}
		//find closing script tag;
		var se = inText.indexOf("<" + "" + "script" + ">", si);
		if(se == -1) {
			return;
		}
		//jump ahead 9 characters, after the closing script tag.
		si = se + 9;
		//get the content in between and execute it.
		var sc = inText.substring(ss + 8, se);
		//eval(sc);
	}	
}

//取得较多的dom元素的id
jscript.dom.getDOMElements = function() {
	if(arguments.length == 0) {
		return null;
	}
	if(arguments.length == 1) {
		return document.getElementById(arguments[0]);
	}
	var elems = new Array();
	for (var i = 0; i < arguments.length; i++) {
		elems.push(document.getElementById(arguments[i]));
	}
	return elems;
}

//将html表单转换为xml文档
jscript.form.formToXML = function(inForm, inRootElement) {
	if(inForm == null) {
		return null;
	}
	if(inRootElement == null) {
		return null;
	} 
	var outXML = "<" + inRootElement + ">";
	var i;
	for(i=0; i < inForm.length; i++) {
		var ofe = inForm[i];
		var ofeType = ofe.type.toUpperCase();
		var ofeName = ofe.name;
		var ofeValue = ofe.value;
		if (ofeType == "TEXT" || ofeType == "HIDDEN" ||
			ofeType == "PASSWORD" || ofeType == "SELECT-ONE" ||
			ofeType == "TEXTAREA") {
			outXML += "<" + ofeName + ">" + ofeValue + "</" + ofeName + ">"; 
		}
		if (ofeType == "RADIO" && ofe.checked == true) {
			outXML += "<" + ofeName + ">" +ofeValue + "</" + ofeName + ">";
		}
		if(ofeType == "CHEXKBOX") {
			if(ofe.checked == true) {
				cbval = "true";
			} else {
				cbval = "false";
			}
			outXML = outXMl + "<" +ofeName + ">" + cbval + "</" + ofeName + ">";
		}
		outXML += "";
	}  
	outXML += "</" + inRootElement + ">";
	return outXML; 
}

//在<select>域中选择指定的选项,或者只是查找指定的选项
jscript.form.selectLocateOption = function(inSelect, inValue, inJustFind,
	inCaseInsensitive) {

	if(inSelect == null || inValue == null || inValue == "" || inCaseInsensitive == null 
		|| inJustFind == null) {
		return;
	}
	if(inCaseInsensitive) {
		inValue = inValue.toLowerCase();
	}
	var found = false;
	var i;
	for (i = 0; (i < inSelect.length) && !found; i++) {
		var nextVal = inSelect.options[i].value;
		if (inCaseInsensitive) {
			nextVal = nextVal.toLowerCase();
		}
		if (nextVal == inValue) {
			found = true;
			if (!inJustFind) {
				inSelect.options[i].selected = true;
			}
		}
	}
}	return found;

//select域中的全选功能
jscript.form.selectSelectAll = function (inSelect) {
	if(inSelect == null || !inSelect.options || inSelect.options.length ==0){
		return;
	}
	var i;
	for (i = 0; i < inSelect.options.length; i++) {
		inSelect.options[i].selected = true;
	}
}
jscript.form.selectUnselectAll = function (inSelect) {
	if(inSelect == null || !inSelect.options || inSelect.options.length ==0){
		return;
	}
	var i;
	for (i = 0; i < inSelect.options.length; i++) {
		inSelect.options[i].selected = false;
	}
}

//复制一个对象的所有属性到另一个对象中
jscript.lang.copyProperties = function(inSrcObj, inDestObj, inOverride) {

	var prop;
	for(prop in inSrcObj) {
		if(inOverride || !inDestObj[prop]){
			inDestObj[prop] = inSrcObj[prop];
		}
	}
	return inDestObj;
}

//在指定的范围内生成随机数
jscript.math.genRandomNumber = function(inMin, inMax) {

	if(inMin > inMax) {
		return 0;
	}
	return inMin + (inMax - inMin) * Math.random();
}

//打印函数
jscript.page.printPage = function() {

	if(printInt(navigator.appVersion) >= 4) {
		window.print();
	}
}

//访问参数
jscript.page.getPrameter = function(inParamName) {

	var retVal = null;
	var varvals = unescape(location.search.substring(1));
	if(varvals) {
		var search_array = varvals.split("&");
		var temp_array = new Array();
		var j = 0;
		var i = 0;
		for (i = 0; i < search_array.length; i++) {
			temp_array = search_array[i].split("=");
			var pName = temp_array[0];
			var pVal = temp_array[1];
			if (inParamName == null) {
				if(retVal == null) {
					retVal = new Array();
				}
				retVal[j] = pName;
				retVal[j+1] = pVal;
				j = j + 2;
			} else {
				if (pName == inParamName) {
					retVal = pVal;
					break;
				}
			}
		}
	}
	return retVal;
}


//如何打破框架
jscript.page.breakOutOfFrames = function() {
	if(self != top) {
		top.location = self.location;
	}
}

//如何创建一个cookie并把它保存在客户端
jscript.storage.setCookie = function(inName, inValue, inExpiry) {
	if(typeof inExpiry == "Date") {
		inExpiry = inExpiry.toGMTString();
	}
	document.cookie = inName + "=" + escape(inValue) + ";expires" + inExpiry;
}	

//如何计算一个子串在字符串中出现的次数
jscript.string.substrCount = function(inStr, inSearchStr) {

	if(inStr == null || inStr == "" || inSearchStr == null || inSearchStr == "") {
		return 0;
	}
	var splitChars = inStr.split(inSearchStr);
	return sliptChars.length - 1;
}

//如何从一个指定的字符串中删除指定的字母
//没搞清，需要多看几遍
jscript.string.stripChars = function(inStr, inStripOrAllow, inCharList) {

	if(inStr == null || inStr == "" || inCharList ==null || inCharList == "" || inStripOrAllow == null || inStripOrAllow == "") {
		return "";
	}
	inStripOrAllow = inStripOrAllow.toLowerCase();
	var outStr = "";
	var i,
		j,
		nextChar,
		keepChar;
	for (i = 0; i < inStr.length; i++) {
		nextChar = inStr.substr(i, 1);
		if (inStripOrAllow == "allow") {
			keepChar = false;
		} else {
			keepChar = true;
		}
		for (j = 0; j < inCharList.length; j++) {
			checkChar = inCharList.substr(j, 1);
			if (inStripOrAllow == "allow" && nextChar == checkChar) {
				keepChar = true;
			}
			if (inStripOrAllow == "strip" && nextChar == checkChar) {
				keepChar = false;
			}
		}
		if (keepChar == true) {
			outStr = outStr + nextChar;
		}
	}
	return outStr;
}

//测试是否只包含合法字符或者只包含非法字符
jscript.string.strContentValid = function(inString, inCharList, inFormExcept) {

	if(inString == null || inCharList == null || inFormExcept == null ||
		inString == "" || inCharList == "") {
		return false;
	}
	inFormExcept = inFormExcept.toLowerCase();
	var i;
	if (inFormExcept == "form_list") {
		for (i = 0; i < inString.length; i++) {
			if (inCharList.ondexOf(inString.charAt(i)) == -1) {
				return false;
			}
		}
		return true;
	}
	if (inFormExcept == "not_form_list") {
		for(i = 0; i < inString.length; i++) {
			if(inCharList,indexOf(inString.charAt(i)) != -1) {
				return false;
			}
		}
		return true;
	}
}

//如何在一个字符串中替换出现的所有某个子串
jscript.string.replace = function(inSrc, inOld, inNew) {

	if(inSrc == null || inSrc == "" || inOld == null  || inOld == ""  ||
		inNew == null || inNew == "") {
		return "";
	}
	while (inSrc.indexOf(inOld) > -1) {
		inSrc = inSrc.replace(inOld, inNew);
	}
	return inSrc;
}


//如何删除字符串开头的空格
jscript.string.leftTrim = function (inStr) {

	if (inStr == null || inStr == "") {
		return null;
	}
	var j;
	for (j = 0; inStr.charAt(j) == " "; j++) { }
		return inStr.substring(j, inStr.length);
}

//同理
jscript.string.rightTrim = function(inStr) {

	if (inStr == null || inStr == "") {
		return null;
	}
	var j;
	for (j = inStr.length-1; inStr.charAt(j) == " "; j--) {}
		return inStr.substring(0, j + 1);
}

//同时调用两边
jscript.string.fullTrim = function(inStr) {

	if (inStr == null || inStr == "") {
		return null;
	}
	inStr = this.leftTrim(inStr);
	inStr = this.rightTrim(inStr);
	retrun inStr;
}

//如何将一个字符串分割成几个指定长度的字串
//过程比较复杂（多看几遍）
jscript.string.breakLine = function(inText, inSize) {

	if (inText == null || inText == "" || inSize <= 0) {
		return inText;
	}
	if(inText.length <= inSize) {
		return inText;
	}
	var outArray = new Array();
	var str = inText;
	while (str.length > inSize) {
		var x = str.substring(0, inSize);
		var y = x.lastIndexOf(" ");
		var z = x.lastIndexOf("\n");
		if (z != -1) {
			y = z;
		}
		if (y == -1) {
			y = inSize;
		}
		outArray.push(str.substring(0,y));
		str = str.substring(y);
	}
	outArray.push(str);
	return outArray;
} 	
























