/**
 * 
 */

function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.lastIndexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    //var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return localhostPaht;
}

function cut_str(str, len){
	if(str == "" || str == null){
		return "无";
	}else{
		var char_length = 0;
	    for (var i = 0; i < str.length; i++){
	        var son_str = str.charAt(i);
	        encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
	        if (char_length >= len){
	            var sub_len = char_length == len ? i+1 : i;
	            return str.substr(0, sub_len)+"...";
	            break;
	        }else{
	        	if((i+1)==str.length){
	            	return str;
	            }
	        }
	    }
	}
}