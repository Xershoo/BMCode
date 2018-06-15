$(function() {
	$("#right").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 500, // 窗口宽度
		height : 600,
//		 open: function(event, ui) { 
//			 $(".ui-dialog-titlebar-close").hide()
//			 },
			 close:function(event, ui) { 
				 $(".suoping").css("display","none");
			 }
		
	});
	$("#goLogin").click(function() {
		 $(".suoping").css("display","block");
		$("#right").dialog("open");
		
	});
	$("#forgetPwd").on("click", function(){
		var url = getRootPath()+"/toForgetPassword";
		location.href = url;
	});
}
)
function login()
{

	var h_username=$("#username").val();
	var h_password=$("#password").val();
	var h_rememberMe=$("#rememberMe").prop("checked");
	
	if(h_username.length < 4)
	{
		 $("#msg_word").html("请输入正确的登录名");
		 $("#message").css("display","block");
		return;
	}
	if(h_password.length < 6)
	{
		 $("#msg_word").html("请输入正确的密码");
		 $("#message").css("display","block");
		return;
	}
	var url=getRootPath()+"/login?"+location.search.substring(1);
	$.ajax({
		url:url,
		type:'post',
		data:{"loginName":h_username,"password":h_password,"rememberMe":h_rememberMe},
		dataType:'json',
		success:function(data){
			if(!data.success){
				$("#msg_word").html(data.message);
				$("#message").css("display","block");
			}else{
//				location.href = getRootPath() + data.successUrl;
				location.reload();
			}
		}
	});
}