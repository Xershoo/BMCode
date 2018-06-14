/**
 * 第三方注册js源文件
 */

var mobileVerifySerialid;

$(function(){
	
	$("#subBtn").on("click", function(){
		var phone = $("#phone").val();
		var email = $("#email").val();
		var pwd = $("#password_third").val();
		var rePwd = $("#rePassword").val();
				if (validatePhone(phone) && validateEmail(email)
						&& vaildatePwd(pwd) && validateRePwd(pwd, rePwd)) {
					var url=getRootPath()+"/registerByThirdLogin";
					$.ajax({
						url:url,
						type:'post',
						data:{"uname":phone, "email":email, "password":pwd},
						dataType:'json',
						success:function(data){
							var result = parseInt(data.success);
							if(result == -1){
								alert("该用户已被占用");
							}
							if(result == -2){
								alert("注册失败,请重试");
							}
							if(result == 1){
								location.href = getRootPath() + "/";
							}
						}
					});
				}
	});
	
	$("#phone").blur(function(){
		var phone = $("#phone").val();
		validatePhone(phone);
	});
	
	$("#email").blur(function(){
		var email = $("#email").val();
		validateEmail(email);
	});
	
	$("#password_third").blur(function(){
		var pwd = $(this).val();
		vaildatePwd(pwd);
	});
	
	$("#rePassword").keyup(function(){
		var pwd = $("#password").val();
		var rePwd = $("#rePassword").val();
		validateRePwd(pwd, rePwd);
	});
});

var validateEmail = function(email){
	var reg = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/);
	if($.trim(email) =="" || $.trim(email) == null){
		$("#email_info").show();
		$("#email_info .msg_word").html("请输入邮箱");
		return false;
	}else{
		if(reg.test(email)){
			$("#email_info").hide();
			$("#email_info .msg_word").html("");
			return true;
		}else{
			$("#email_info").show();
			$("#email_info .msg_word").html("输入的邮箱格式不对");
			return false;
		}
	}
}

var validatePhone = function(phone) {  
    var reg = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/);
    if($.trim(phone) =="" || $.trim(phone) == null){
    	$("#phone_info").show();
    	$("#phone_info .msg_word").html("请输入手机号码");
    	return false;
    }else{
    	if (reg.test(phone)) {  
        	$("#phone_info").hide();
    		$("#phone_info .msg_word").html("");
    		return true;
        }  
        else  
        {
        	$("#phone_info").show();
        	$("#phone_info .msg_word").html("输入的手机格式不对"); 
        	return false;
        }
    }
} 

var vaildatePwd = function(password){
	var reg = RegExp(/^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/);//正则
	if($.trim(password) =="" || $.trim(password) == null){
    	$("#pwd_info").show();
    	$("#pwd_info .msg_word").html("请输入密码");
    	return false;
    }else{
    	if(reg.test(password)){
    		$("#pwd_info").hide();
    		$("#pwd_info .msg_word").html("");
    		return true;
    	}else{
    		$("#pwd_info").show();
    		$("#pwd_info .msg_word").html("输入的密码格式不对");
    		return false;
    	}
    }
}

var validateRePwd = function (password, rePwd){
	if($.trim(rePwd) == "" || $.trim(rePwd) == null){
		$("#oncePwd_info").show();
		$("#oncePwd_info .msg_word").html("请输入确认密码");
		return false;
	}else{
		if($.trim(password) != $.trim(rePwd)){
			$("#oncePwd_info").show();
			$("#oncePwd_info .msg_word").html("两次输入的密码不一致");
			return false;
		}else{
			$("#oncePwd_info").hide();
			$("#oncePwd_info .msg_word").html("");
			return true;
		}
	}
}
