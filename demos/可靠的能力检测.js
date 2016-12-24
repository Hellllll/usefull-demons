 //检查对象是否具有某个特定的属性
  function isHostMethod(object, property) {
        var t = typeof object[property];
        return t == 'function' || (!!(t=='object' && object[property])) || t=='unknown';
    }
//确定浏览器是否支持Netscape风格的插件
var hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);

//确定浏览器是否具有DOM1级规定的能力
var hasDOM1 = !!(document.getElementById && document.createElement && 
					document.getElementsByTagName);


