var name = 'aaa bbb ccc';

uw = name.replace(/\b\w=\b/g, function(word){
	return word.substring(0,1).toUpperCase()+word.substring(1);
})