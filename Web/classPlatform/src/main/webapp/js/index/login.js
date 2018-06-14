/**
 * 登录js源文件
 */

$(function(){	
	document.onkeydown = function(e){
		
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	           $('#subBtn').trigger("click");

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
	
	$('#subBtn').on("click", function(){
		login();
	});
	
	$("#username")[0].focus();
	
	/*$("#loginBtn").hover(function(){
		$(this).css("background","#1c8bfa");
	}, function(){
		$(this).css("background","#1976d2");
	}).mousedown(function(){
		$(this).css("background","#0b66c0");
	}).mouseup(function(){
		$(this).css("background","#1c8bfa");
	})*/
});

function login()
{

	var h_username=$.trim($("#username").val());
	var h_password=$.trim($("#password").val());
	//var h_rememberMe=$("#rememberMe").prop("checked");
	
	if(h_username == ""){
		$("#name_info .msg_word").html("请输入账号");
		$("#name_info").show();
		return;
	}
	if(h_username != "" && h_username.length < 4)
	{
		$("#name_info .msg_word").html("请输入正确的账号");
		$("#name_info").show();
		return;
	}
	if(h_password == ""){
		 $("#pwd_info .msg_word").html("请输入密码");
		 $("#pwd_info").show();
		 return;
	}
	if(h_password != "" && h_password.length < 6)
	{
		$("#pwd_info .msg_word").html("请输入正确的密码");
		$("#pwd_info").show();
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
				$("#name_info .msg_word").html(data.message);
				$("#name_info").show();
			}else{
				location.href = getRootPath() + data.successUrl;
			}
		}
	});
}
