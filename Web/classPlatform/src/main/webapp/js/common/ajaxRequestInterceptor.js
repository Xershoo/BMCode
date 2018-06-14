/**
 * ajax request Interceptor source javascript file
 */

$.ajaxSetup({
	type:'POST',
	error:function(xhr,status,error){
		var sessionStatus = xhr.getResponseHeader('sessionstatus');
		if(sessionStatus == 'timeout'){
			alert("由于您长时间没有操作，session已过期，请重新登录");
			top.location.href = getRootPath() + '/loginPage';
		}
	}
});

/*function getRoot(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}*/