/**
 * 登录js源文件 2018.06.07
 */

$(function(){	
	document.onkeydown = function(e){
		
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	           $('#submitBtn').trigger("click");

	     }
	};
	
	$("#register_link").on("click", function(){
		var url = getRootPath()+"/register";
		location.href = url;
	});
	
	$("#forgetPwd_link").on("click", function(){
		var url = getRootPath()+"/toForgetPassword";
		location.href = url;
	});
	
	$("#reg_qq_login").on("click", function(){
		location.href = getRootPath() + "/qqlogin";
	});
	
	$("#reg_weibo_login").on("click", function(){
		location.href = getRootPath() + "/weibologin";
	});
	
	$('#submitBtn').on("click", function(){
		login();
	});
	
	$("#username")[0].focus();
});

function login()
{

	var h_username=$.trim($("#username").val());
	var h_password=$.trim($("#userpwd").val());
	
	/*
	var h_rememberMe=$("#rememberMe").prop("checked");
	*/
	
	if(h_username == ""){
		alert("请输入账号");
		return;
	}
	if(h_username != "" && h_username.length < 4)
	{
		alert("请输入正确的账号");
		return;
	}
	if(h_password == ""){
		alert("请输入密码");
		return;
	}
	if(h_password != "" && h_password.length < 6)
	{
		alert("请输入正确的密码");
		return;
	}
	var url=getRootPath()+"/login?"+location.search.substring(1);
	$.ajax({
		url:url,
		type:'post',
		data:{"loginName":h_username,"password":h_password,"rememberMe":false},
		dataType:'json',
		success:function(data){
			if(!data.success){
				alert(data.message);
			}else{
				location.href = getRootPath() + data.successUrl;
			}
		}
	});
}
