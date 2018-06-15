/**
 * 注册页面js源文件
 */
var mobileVerifySerialid;

var timeout;

var verifySerialid;
$(function(){
	var countdown=60;
	var disabledBtn = false; 
	function settime() { 
		if (countdown == 0) {
			disabledBtn = false;
			$("#getVerify").css({"background":"#fff", "color":"#048bdc"});
			$("#getVerify").html("获取验证码");
			clearTimeout(timeout);
			return;
		} else {
			disabledBtn = true;
			$("#getVerify").css({"background":"#83cbef", "color":"#fff"});
			$("#getVerify").html(countdown+"s后可获取");
			countdown--; 
		}
		timeout = setTimeout(function() {
			settime();
		},1000)
	}
	
	$("#getVerify").on("click", function(){
		if (disabledBtn == false) {
			var telnum = $("#phone").val();
			if (!validatePhone(telnum)) {
				return;
			}

			var url = getRootPath() + "/sendMobileCodeNotLogin";
			$.ajax({
				url:url,
				type:'post',
				data:{"mobile" : telnum, "type":1},
				dataType:'text',
				success:function(data){
					verifySerialid = parseInt(data);
					if(verifySerialid > 0){
						
					}else{
						if(verifySerialid == -1){
							$(".info_right").eq(0).hide();
							$("#phone_info").show();
					    	$("#phone_info .msg_word").html("输入的手机号非法"); 
						}else if(verifySerialid == -2){
							$(".info_right").eq(0).hide();
							$("#phone_info").show();
					    	$("#phone_info .msg_word").html("两次发送间隔过短"); 
						}else if(verifySerialid == -3){
							$(".info_right").eq(0).hide();
							$("#phone_info").show();
					    	$("#phone_info .msg_word").html("该手机号码当日发送次数过多");  
						}else if(verifySerialid == -4 || verifySerialid == -100){
							$(".info_right").eq(0).hide();
							$("#phone_info").show();
					    	$("#phone_info .msg_word").html("短信发送失败");  
						}else if(verifySerialid == -5){
							$(".info_right").eq(0).hide();
							$("#phone_info").show();
					    	$("#phone_info .msg_word").html("该手机号已经存在");  
						}else if(verifySerialid == -6){
							
						}else{
							$("#phone_info").hide();
							$("#phone_info .msg_word").html(""); 
							$(".info_right").eq(0).show();
						}
					}
				}
			});
			countdown = 60;
			settime();
		}
	});
	
	$("#subBtn").on("click", function(){
		var phone = $("#phone").val();
		var verify = $("#verifyNum").val();
		/*var email = $("#email").val();*/
		var pwd = $("#registerPassword").val();
		var rePwd = $("#rePassword").val();
		if(validatePhone(phone) && validateVerifyNum(verify) && vaildatePwd(pwd) && validateRePwd(pwd, rePwd)){
			var url=getRootPath()+"/register";
			$.ajax({
				url:url,
				type:'post',
				data:{"mobile":phone, "password":pwd, "verifyCode":verify, "verifySerialid":verifySerialid},
				dataType:'json',
				success:function(data){
					if(data.verifyCode){
						$(".info_right").eq(1).hide();
						$("#verify_info").show();
						$("#verify_info .msg_word").html(data.verifyCode);
					}
					if(data.success){
						alert("注册成功");
						location.href = getRootPath() + "/index";
					}
				}
			});
		}
	});
	
	$("#phone").blur(function(){
		var phone = $("#phone").val();
		validatePhone(phone);
	});
	
	$("#verifyNum").blur(function(){
		var verify = $("#verifyNum").val();
		validateVerifyNum(verify);
	});
	
	/*$("#email").blur(function(){
		var email = $("#email").val();
		validateEmail(email);
	});*/
	
	$("#registerPassword").blur(function(){
		var pwd = $("#registerPassword").val();
		vaildatePwd(pwd);
	});
	
	$("#rePassword").keyup(function(){
		var pwd = $("#registerPassword").val();
		var rePwd = $("#rePassword").val();
		validateRePwd(pwd, rePwd);
	});
	
	$("#quick_login").on("click",function(){
		var url=getRootPath()+"/";
		location.href = url;
	});
	
	$("#reg_qq_login").on("click", function(){
		location.href = getRootPath() + "/qqlogin";
	});
	
	$("#reg_weibo_login").on("click", function(){
		location.href = getRootPath() + "/weibologin";
	});
});

var validateEmail = function(email){
	var reg = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/);
	if($.trim(email) =="" || $.trim(email) == null){
		$(".info").eq(2).show();
		$(".info").eq(2).html("请输入邮箱");
		return false;
	}else{
		if(reg.test(email)){
			$(".info").eq(2).hide();
			$(".info").eq(2).html("");
			return true;
		}else{
			$(".info").eq(2).show();
			$(".info").eq(2).html("输入的邮箱格式不对");
			return false;
		}
	}
}

var validatePhone = function(phone) {  
    var reg = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0123456789])[0-9]{8}$/);
    if($.trim(phone) =="" || $.trim(phone) == null){
    	$(".info_right").eq(0).hide();
    	$("#phone_info").show();
    	$("#phone_info .msg_word").html("请输入手机号码");
    	return false;
    }else{
    	if (reg.test(phone)) {  
    		$("#phone_info").hide();
    		$("#phone_info .msg_word").html("");
    		$(".info_right").eq(0).show();
    		return true;
        }  
        else  
        {
        	$(".info_right").eq(0).hide();
        	$("#phone_info").show();
        	$("#phone_info .msg_word").html("输入的手机格式不对"); 
        	return false;
        }
    }
} 

var vaildatePwd = function(password){
	var reg = RegExp(/^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/);//正则
	if($.trim(password) =="" || $.trim(password) == null){
		$(".info_right").eq(2).hide();
		$("#pwd_info").show();
    	$("#pwd_info .msg_word").html("请输入密码");
    	return false;
    }else{
    	if(reg.test(password)){
    		$("#pwd_info").hide();
    		$("#pwd_info .msg_word").html("");
    		$(".info_right").eq(2).show();
    		return true;
    	}else{
    		$(".info_right").eq(2).hide();
    		$("#pwd_info").show();
    		$("#pwd_info .msg_word").html("密码由6到12位数字、字母或者下划线组成");
    		return false;
    	}
    }
}

var validateRePwd = function (password, rePwd){
	if($.trim(rePwd) == "" || $.trim(rePwd) == null){
		$(".info_right").eq(3).hide();
		$("#oncePwd_info").eq(4).show();
		$("#oncePwd_info .msg_word").html("请输入确认密码");
		return false;
	}else{
		if($.trim(password) != $.trim(rePwd)){
			$(".info_right").eq(3).hide();
			$("#oncePwd_info").show();
			$("#oncePwd_info .msg_word").html("两次输入的密码不一致");
			return false;
		}else{
			$("#oncePwd_info").hide();
			$("#oncePwd_info .msg_word").html("");
			$(".info_right").eq(3).show();
			return true;
		}
	}
}

var validateVerifyNum = function(verify){
	if($.trim(verify) == "" || $.trim(verify) == null){
		$(".info_right").eq(1).hide();
		$("#verify_info").show();
		$("#verify_info .msg_word").html("请输入验证码");
		return false;
	}else{
		$("#verify_info").hide();
		$("#verify_info .msg_word").html("");
		$(".info_right").eq(1).show();
		return true;
	}
}
