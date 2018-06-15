/**
 * pay safety set javascript source file
 */
var phoneReg = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/);
var verifySerialid = 0;

var countdown=60;
var disabledBtn = false; 
var timeout;

$(function(){
	
	verifyPayPassword();
	
	$(".opt_btn").hover(function() {
        $(this).find("div").css("background", "#fcfcfc");
    },
    	function() {
        $(this).find("div").css("background", "#f6f6f6");
    });
	
	$("#set_pwd_btn").on("click", function(){
		$("#step1").hide();
		if($(this).hasClass("changePwd")){
			$("#step2_change_password").show();
		}else{
			$("#step2_set_password").show();
		}
		
	});
	
	$("#find_pwd").on("click", function(){
		$("#step1").hide();
		$("#step2_forget_password").show();
	});
	
	$("#change_queren_btn").hover(function() {
        $(this).css("background", "#ffd200");
    },function() {
        $(this).css("background", "#ffa800");
    }).mousedown(function(){
    	$(this).css("background", "#ff9c00");
    }).mouseup(function(){
    	$(this).css("background", "#ffa800");
    }).on("click", function(){
		var pwd_old = $.trim($("#set_password_old").val());
		var pwd_new = $.trim($("#set_password_new").val());
		var pwd_verify = $.trim($("#set_password_new_once").val());
		
		if(pwd_old == null || pwd_old == ""){
			$("#set_password_old").parent().next().html("*请输入原密码").show();
		}
		if(pwd_new == null || pwd_new == ""){
			$("#set_password_new").parent().next().html("*请输入新密码").show();
		}
		if(pwd_verify == null || pwd_verify == ""){
			$("#set_password_new_once").parent().next().html("*请再次输入新密码").show();
		}
		if(pwd_new != "" && pwd_new.length < 6){
			$("#set_password_new").parent().next().html("*输入密码过短").show();
		}
		if(pwd_new != "" && pwd_new.length > 12){
			$("#set_password_new").parent().next().html("*输入密码过长").show();
		}
		if(pwd_old != "" && pwd_new != "" && pwd_old == pwd_new){
			$("#set_password_new").parent().next().html("*新密码不能与原密码一致").show();
		}
		if(pwd_new != "" && pwd_verify != "" && pwd_new != pwd_verify){
			$("#set_password_new_once").parent().next().html("*两次输入的密码不一致").show();
		}
		
		if(pwd_old != "" && pwd_new != "" && pwd_verify != "" && pwd_new.length > 5
				&& pwd_new.length < 13 && pwd_new == pwd_verify && pwd_old != pwd_new){
			changePayPassword(pwd_old, pwd_new);
		}
	});
	
	$("#change_cancel_btn").hover(function() {
        $(this).css("background", "#8cc6ff");
    },function() {
        $(this).css("background", "#51a4f6");
    }).mousedown(function(){
    	$(this).css("background", "#3a94ec");
    }).mouseup(function(){
    	$(this).css("background", "#51a4f6");
    }).on("click", function(){
		$("#set_password_old").val("").parent().next().html("").hide();
		$("#set_password_new").val("").parent().next().html("").hide();
		$("#set_password_new_once").val("").parent().next().html("").hide();
		
		$("#step2_change_password").hide();
		$("#step1").show();
	});
	
	$("#change_phone_btn").on("click", function(){
		$("#step1").hide();
		if($(this).hasClass("changePhone")){
			$("#step2_change_phone").show();
		}else{
			$("#step2_set_phone").show();
		}
	});
	
	$("#set_queren_btn").hover(function() {
        $(this).css("background", "#ffd200");
    },function() {
        $(this).css("background", "#ffa800");
    }).mousedown(function(){
    	$(this).css("background", "#ff9c00");
    }).mouseup(function(){
    	$(this).css("background", "#ffa800");
    }).on("click", function(){
		var password = $.trim($("#set_password").val());
		var pwd_verify = $.trim($("#set_password_once").val());
		
		if(password == null || password == ""){
			$("#set_password").parent().next().html("*请输入密码").show();
		}
		if(pwd_verify == null || pwd_verify == ""){
			$("#set_password_once").parent().next().html("*请再次输入密码").show();
		}
		if(password != "" && password.length < 6){
			$("#set_password").parent().next().html("*输入密码过短").show();
		}
		if(password != "" && password.length > 12){
			$("#set_password").parent().next().html("*输入密码过长").show();
		}
		if(password != "" && pwd_verify != "" && password != pwd_verify){
			$("#set_password_once").parent().next().html("*两次输入的密码不一致").show();
		}
		if(password != "" && pwd_verify != "" && password.length > 5
				&& password.length < 13 && password == pwd_verify){
			setPayPassword(password);
		}
	});
	
	$("#set_cancel_btn").hover(function() {
        $(this).css("background", "#8cc6ff");
    },function() {
        $(this).css("background", "#51a4f6");
    }).mousedown(function(){
    	$(this).css("background", "#3a94ec");
    }).mouseup(function(){
    	$(this).css("background", "#51a4f6");
    }).on("click", function(){
		$("#set_password").val("").parent().next().html("").hide();
		$("#set_password_once").val("").parent().next().html("").hide();
		$("#step2_set_password").hide();
		$("#step1").show();
	});
	
	$("#phone_cancel_btn").hover(function() {
        $(this).css("background", "#8cc6ff");
    },function() {
        $(this).css("background", "#51a4f6");
    }).mousedown(function(){
    	$(this).css("background", "#3a94ec");
    }).mouseup(function(){
    	$(this).css("background", "#51a4f6");
    }).on("click", function(){
    	disabledBtn = false;
		$("#getVerify").html("获取验证码");
		clearTimeout(timeout);
		$("#change_phone_old").val("").parent().next().html("").hide();
		$("#change_phone_new").val("").parent().next().html("").hide();
		$("#verifyNum").val("");
		$("#getVerify").next().html("").hide();
		$("#step2_change_phone").hide();
		$("#step1").show();
	});
	
	$("#set_phone_cancel_btn").hover(function() {
        $(this).css("background", "#8cc6ff");
    },function() {
        $(this).css("background", "#51a4f6");
    }).mousedown(function(){
    	$(this).css("background", "#3a94ec");
    }).mouseup(function(){
    	$(this).css("background", "#51a4f6");
    }).on("click", function(){
		$("#set_phone_new").val("").parent().next().html("").hide();
		$("#setVerifyNum").val("");
		$("#setGetVerify").next().html("").hide();
		$("#step2_set_phone").hide();
		$("#step1").show();
	});
	
	$("#reset_cancel_btn").hover(function() {
        $(this).css("background", "#8cc6ff");
    },function() {
        $(this).css("background", "#51a4f6");
    }).mousedown(function(){
    	$(this).css("background", "#3a94ec");
    }).mouseup(function(){
    	$(this).css("background", "#51a4f6");
    }).on("click", function(){
    	disabledBtn = false;
		$("#resetGetVerify").html("获取验证码");
		clearTimeout(timeout);
		$("#reset_password_new").val("").parent().next().html("").hide();
		$("#reset_password_new_once").val("").parent().next().html("").hide();
		$("#resetVerifyNum").val("");
		$("#resetGetVerify").next().html("").hide();
		$("#step2_forget_password").hide();
		$("#step1").show();
	});
	
	$("#set_password").on("blur", function(){
		var password = $.trim($(this).val());
		if(password == ""){
			$(this).parent().next().html("*请输入密码").show();
		}else if(password.length < 6 || password.length >12){
			$(this).parent().next().html("*输入的密码有误").show();
		}else{
			$(this).parent().next().html("").hide();
		}
	});
	
	$("#set_password_once").on("keyup", function(){
		var password = $.trim($("#set_password").val());
		var password_once = $.trim($(this).val());
		if(password_once == ""){
			$(this).parent().next().html("*请再次输入密码").show();
		}else if(password != password_once){
			$(this).parent().next().html("*两次输入的密码不一致").show();
		}else{
			$(this).parent().next().html("").hide();
		}
	});
	
	$("#set_password_old").on("blur", function(){
		var password = $.trim($(this).val());
		if(password == null || password == ""){
			$(this).parent().next().html("*请输入原密码").show();
		}else{
			$(this).parent().next().html("").hide();
		}
	});
	
	$("#set_password_new").on("blur", function(){
		var pwd_old = $.trim($("#set_password_old").val());
		var pwd_new = $.trim($(this).val());
		
		if(pwd_new == ""){
			$(this).parent().next().html("*请输入密码").show();
		}else if(pwd_new.length < 6 || pwd_new.length >12){
			$(this).parent().next().html("*输入的密码有误").show();
		}else if(pwd_new == pwd_old){
			$(this).parent().next().html("*新密码不能与原密码一致").show();
		}else{
			$(this).parent().next().html("").hide();
		}
	});
	
	$("#set_password_new_once").on("keyup", function(){
		var password = $.trim($("#set_password_new").val());
		var password_once = $.trim($(this).val());
		if(password_once == ""){
			$(this).parent().next().html("*请再次输入密码").show();
		}else if(password != password_once){
			$(this).parent().next().html("*两次输入的密码不一致").show();
		}else{
			$(this).parent().next().html("").hide();
		}
	});
	
	$("#set_phone_new").on("blur", function(){
		var phone = $.trim($(this).val());
		
		if(phone == null || phone == ""){
			$(this).parent().next().html("*请输入手机号码").show();
		}else{
			if(!phoneReg.test(phone)){
				$(this).parent().next().html("*输入的手机号码格式不对").show();
			}else{
				$(this).parent().next().html("").hide();
			}
		}
	});
	
	$("#change_phone_new").on("blur", function(){
		var phone_old = $.trim($("#change_phone_old").val());
		var phone = $.trim($(this).val());
		
		if(phone == null || phone == ""){
			$(this).parent().next().html("*请输入手机号码").show();
		}else{
			if(!phoneReg.test(phone)){
				$(this).parent().next().html("*输入的手机号码格式不对").show();
			}else if(phone == phone_old){
				$(this).parent().next().html("*新手机号码不能与原手机号码一致").show();
			}else{
				$(this).parent().next().html("").hide();
			}
		}
	});
	
	$("#change_phone_old").on("blur", function(){
		var phone = $.trim($(this).val());
		
		if(phone == null || phone == ""){
			$(this).parent().next().html("*请输入手机号码").show();
		}else{
			if(!phoneReg.test(phone)){
				$(this).parent().next().html("*输入的手机号码格式不对").show();
			}else{
				$(this).parent().next().html("").hide();
			}
		}
	});
	
	$("#resetVerifyNum").on("blur", function(){
		var phone = $.trim($(this).val());
		
		if(phone == null || phone == ""){
			$("#resetGetVerify").next().html("*请输入验证码").show();
		}else{
			$("#resetGetVerify").next().html("").hide();
		}
	});
	
	$("#reset_password_new").on("blur", function(){
		var pwd_new = $.trim($(this).val());
		
		if(pwd_new == ""){
			$(this).parent().next().html("*请输入密码").show();
		}else if(pwd_new.length < 6 || pwd_new.length >12){
			$(this).parent().next().html("*输入的密码有误").show();
		}else{
			$(this).parent().next().html("").hide();
		}
	});
	
	$("#reset_password_new_once").on("keyup", function(){
		var password = $.trim($("#reset_password_new").val());
		var password_once = $.trim($(this).val());
		if(password_once == ""){
			$(this).parent().next().html("*请再次输入密码").show();
		}else if(password != password_once){
			$(this).parent().next().html("*两次输入的密码不一致").show();
		}else{
			$(this).parent().next().html("").hide();
		}
	});
	
	$("#setGetVerify").on("click", function(){
		if (disabledBtn == false) {
			var telnum = $("#set_phone_new").val();
			if (!phoneReg.test(telnum)) {
				$("#set_phone_new").parent().next().html("*输入的手机号码格式不对").show();
				return;
			}
			var url = getRootPath() + "/persondata/sendMobileCode";
			$.ajax({
				url:url,
				type:'post',
				data:{"mobile" : telnum, "type" : 20},
				dataType:'text',
				success:function(data){
					verifySerialid = parseInt(data);
					if(verifySerialid > 0){
						console.log("发送验证码成功");
					}else{
						if(verifySerialid == -1){
							getDialog("fail", "登录已超时，请重新登录!");
							location.href = getRootPath() + "/loginPage";
						}else if(verifySerialid == -2){
				        	$("#set_phone_new").parent().next().html("*两次发送间隔过短").show();
						}else if(verifySerialid == -3){
				        	$("#set_phone_new").parent().next().html("*该手机号码当日发送次数过多").show();
						}else if(verifySerialid == -4 || verifySerialid == -100){
				        	$("#set_phone_new").parent().next().html("*短信发送失败").show();
						}else if(verifySerialid == -5){
				        	$("#set_phone_new").parent().next().html("*该手机号已经存在").show();
						}else if(verifySerialid == -6){
							
						}else if(verifySerialid == -20){
							$("#set_phone_new").parent().next().html("*不能重复绑定手机号").show();
						}else if(verifySerialid == -21){
							$("#set_phone_new").parent().next().html("*该手机号已经被占用").show();
						}else if(verifySerialid == -10){
							getDialog("fail", "该操作不支持发送短信验证码!");
						}else{
							$("#set_phone_new").parent().next().html("").hide();
						}
					}
				}
			});
			countdown = 60;
			settime("setGetVerify");
		}
	});
	
	$("#getVerify").on("click", function(){
		if (disabledBtn == false) {
			var telnum = $("#change_phone_new").val();
			if (!phoneReg.test(telnum)) {
				$("#change_phone_new").parent().next().html("*输入的手机号码格式不对").show();
				return;
			}
			var url = getRootPath() + "/persondata/sendMobileCode";
			$.ajax({
				url:url,
				type:'post',
				data:{"mobile" : telnum, "type" : 22},
				dataType:'text',
				success:function(data){
					verifySerialid = parseInt(data);
					if(verifySerialid > 0){
						console.log("发送验证码成功");
					}else{
						if(verifySerialid == -1){
							getDialog("fail", "登录已超时，请重新登录!");
							location.href = getRootPath() + "/loginPage";
						}else if(verifySerialid == -2){
				        	$("#change_phone_new").parent().next().html("*两次发送间隔过短").show();
						}else if(verifySerialid == -3){
				        	$("#change_phone_new").parent().next().html("*该手机号码当日发送次数过多").show();
						}else if(verifySerialid == -4 || verifySerialid == -100){
				        	$("#change_phone_new").parent().next().html("*短信发送失败").show();
						}else if(verifySerialid == -5){
				        	$("#change_phone_new").parent().next().html("*该手机号已经存在").show();
						}else if(verifySerialid == -6){
							
						}else if(verifySerialid == -10){
							getDialog("fail", "该操作不支持发送短信验证码!");
						}else if(verifySerialid == -20){
							$("#change_phone_new").parent().next().html("*不能重复绑定手机号").show();
						}else if(verifySerialid == -21){
							$("#change_phone_new").parent().next().html("*该手机号已经被占用").show();
						}else{
							$("#change_phone_new").parent().next().html("").hide();
						}
					}
				}
			});
			countdown = 60;
			settime("getVerify");
		}
	});
	
	$("#resetGetVerify").on("click", function(){
		if (disabledBtn == false) {
			var url = getRootPath() + "/persondata/sendMobileCode";
			$.ajax({
				url:url,
				type:'post',
				data:{"mobile" : "", "type" : 21},
				dataType:'text',
				success:function(data){
					verifySerialid = parseInt(data);
					if(verifySerialid > 0){
						console.log("发送验证码成功");
					}else{
						if(verifySerialid == -1){
							getDialog("fail", "登录已超时，请重新登录!");
							location.href = getRootPath() + "/loginPage";
						}else if(verifySerialid == -2){
				        	$("#reset_phone_new").parent().next().html("*两次发送间隔过短").show();
						}else if(verifySerialid == -3){
				        	$("#reset_phone_new").parent().next().html("*该手机号码当日发送次数过多").show();
						}else if(verifySerialid == -4 || verifySerialid == -100){
				        	$("#reset_phone_new").parent().next().html("*短信发送失败").show();
						}else if(verifySerialid == -5){
				        	$("#reset_phone_new").parent().next().html("*该手机号已经存在").show();
						}else if(verifySerialid == -6){
							
						}else if(verifySerialid == -10){
							getDialog("fail", "该操作不支持发送短信验证码!");
						}else if(verifySerialid == -22){
							$("#reset_phone_new").parent().next().html("*请先绑定手机，再获取验证码").show();
						}else{
							$("#reset_phone_new").parent().next().html("").hide();
						}
					}
				}
			});
			countdown = 60;
			settime("resetGetVerify");
		}
	});
	
	$("#set_phone_queren_btn").hover(function() {
        $(this).css("background", "#ffd200");
    },function() {
        $(this).css("background", "#ffa800");
    }).mousedown(function(){
    	$(this).css("background", "#ff9c00");
    }).mouseup(function(){
    	$(this).css("background", "#ffa800");
    }).on("click", function(){
		var phone = $.trim($("#set_phone_new").val());
		var verifyNum = $.trim($("#setVerifyNum").val());
		
		if(phone == null || phone == ""){
			$("#set_phone_new").parent().next().html("*请输入手机号码").show();
		}
		if(verifyNum == null || verifyNum == ""){
			$("#setGetVerify").next().html("*请输入手机短信验证码").show();
		}
		if(phone != "" && !phoneReg.test(phone)){
			$("#set_phone_new").parent().next().html("*输入的手机号码格式不对").show();
		}
		if(phone != "" && verifyNum != "" && phoneReg.test(phone)){
			setPayMobile(verifyNum);
		}
	});
	
	$("#phone_queren_btn").hover(function() {
        $(this).css("background", "#ffd200");
    },function() {
        $(this).css("background", "#ffa800");
    }).mousedown(function(){
    	$(this).css("background", "#ff9c00");
    }).mouseup(function(){
    	$(this).css("background", "#ffa800");
    }).on("click", function(){
		var phone_old = $.trim($("#change_phone_old").val());
		var phone_new = $.trim($("#change_phone_new").val());
		var verifyNum = $.trim($("#verifyNum").val());
		
		if(phone_old == null || phone_old == ""){
			$("#change_phone_old").parent().next().html("*请输入原手机号码").show();
		}
		if(phone_new == null || phone_new == ""){
			$("#change_phone_new").parent().next().html("*请输入新手机号码").show();
		}
		if(phone_old != "" && phone_new != "" && phone_old == phone_new
				&& phoneReg.test(phone_old) && phoneReg.test(phone_new)){
			$("#change_phone_new").parent().next().html("*新手机号码不能与原号码一致").show();
		}
		if(verifyNum == null || verifyNum == ""){
			$("#getVerify").next().html("*请输入手机短信验证码").show();
		}
		if(phone_old != "" && !phoneReg.test(phone_old)){
			$("#change_phone_old").parent().next().html("*输入的原手机号码格式不对").show();
		}
		if(phone_new != "" && !phoneReg.test(phone_new)){
			$("#change_phone_new").parent().next().html("*输入的新手机号码格式不对").show();
		}
		if(phone_old != "" && phone_new != "" && verifyNum != "" 
			&& phoneReg.test(phone_old) && phoneReg.test(phone_new) && phone_old != phone_new){
			changePayMobile(phone_old, verifyNum);
		}
	});
	
	$("#reset_queren_btn").hover(function() {
        $(this).css("background", "#ffd200");
    },function() {
        $(this).css("background", "#ffa800");
    }).mousedown(function(){
    	$(this).css("background", "#ff9c00");
    }).mouseup(function(){
    	$(this).css("background", "#ffa800");
    }).on("click", function(){
		var password = $.trim($("#reset_password_new").val());
		var pwd_once = $.trim($("#reset_password_new_once").val());
		var verifyNum = $.trim($("#resetVerifyNum").val());
		
		if(verifyNum == null || verifyNum == ""){
			$("#resetGetVerify").next().html("*请输入手机短信验证码").show();
		}
		if(password == null || password == ""){
			$("#reset_password_new").parent().next().html("*请输入支付密码").show();
		}
		if(pwd_once == null || pwd_once == ""){
			$("#reset_password_new_once").parent().next().html("*请再次输入支付密码").show();
		}
		if(password != "" && password.length < 6){
			$("#reset_password_new").parent().next().html("*输入密码过短").show();
		}
		if(password != "" && password.length > 12){
			$("#reset_password_new").parent().next().html("*输入密码过长").show();
		}
		if(password != "" && pwd_once != "" && password != pwd_once){
			$("#reset_password_new_once").parent().next().html("*两次输入的密码不一致").show();
		}
		if(password != "" && pwd_once != "" && verifyNum != ""
			&& password.length > 5 && password.length < 13 && password == pwd_once){
			resetPayPassword(password, verifyNum);
		}
	});
});

function settime(id) { 
	if (countdown == 0) {
		disabledBtn = false;
		$("#"+id).html("获取验证码");
		clearTimeout(timeout);
		return;
	} else {
		disabledBtn = true;
		$("#"+id).html(countdown+"s后可获取");
		countdown--; 
	}
	timeout = setTimeout(function() {
		settime(id);
	},1000)
}

/**
 * 验证用户是否已经设置支付密码和绑定手机
 */
function verifyPayPassword(){
	var url = getRootPath() + "/persondata/hadsetpaypwd";
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		cache:false,
		async:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + "/loginPage";
			}else if(status == -2){
				$("#opt_left_pwd .result_desc").css("color", "#d8271c").html("未设置支付密码");
				$("#opt_right_phone .result_desc").css("color", "#d8271c").html("未设置手机号码");
			}else if(status == 0){
				if(data.pwd == 0){
					$("#opt_left_pwd .result_desc").css("color", "#51a4f6").html("已设置支付密码");
					$("#set_pwd_btn").addClass("changePwd").html("更换");
					$("#find_pwd").show();
				}else{
					$("#opt_left_pwd .result_desc").css("color", "#d8271c").html("未设置支付密码");
				}
				if(data.mobile == -1){
					$("#opt_right_phone .result_desc").css("color", "#d8271c").html("未设置手机号码");
				}else{
					$("#opt_right_phone .result_desc").css("color", "#51a4f6").html(data.mobile);
					$("#change_phone_btn").addClass("changePhone").html("更换");
				}
				
			}else{
				console.log("未知错误");
			}
		}
	});
}

/**
 * 设置支付密码
 * @param password
 * @returns
 */
function setPayPassword(password){
	var url = getRootPath() + '/persondata/setpaypwd';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'paypwd':password},
		success:function(data){
			var status = parseInt(data.status);
			if(status == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + '/loginPage';
			}else if(status == -2){
				getDialog("warn", "支付密码不能与登录密码一致，请修改!");
			}else if(status == -3){
				getDialog("warn", "支付密码不能与上一次设置的一致，请修改!");
			}else if(status == 0){
				getDialogCue("success", "设置成功!");
				verifyPayPassword();
				$("#set_password").val("").parent().next().html("").hide();
				$("#set_password_once").val("").parent().next().html("").hide();
				$("#step2_set_password").hide();
				$("#step1").show();
			}else{
				console.log("未知错误");
			}
		}
	});
}

/**
 * 修改支付密码
 * @param payPwdOld
 * @param payPwdNew
 * @returns
 */
function changePayPassword(payPwdOld, payPwdNew){
	var url = getRootPath() + '/persondata/resetpaypwdbyoldpwd';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'payoldpwd':payPwdOld, 'paynewpwd':payPwdNew},
		success:function(data){
			var status = parseInt(data.status);
			if(status == -1){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + '/loginPage';
			}else if(status == -2){
				getDialog("warn", "支付密码不能与登录密码一致，请修改!");
			}else if(status == -3){
				$("#set_password_old").parent().next().html("*输入的原密码不正确").show();
			}else if(status == 0){
				getDialogCue("success", "更改成功!");
				$("#set_password_old").val("").parent().next().html("").hide();
				$("#set_password_new").val("").parent().next().html("").hide();
				$("#set_password_new_once").val("").parent().next().html("").hide();
				$("#step2_change_password").hide();
				$("#step1").show();
			}else{
				console.log("未知错误");
			}
		}
	});
}

/**
 * 设置支付绑定手机
 * @param code
 */
function setPayMobile(code){
	var url = getRootPath() + '/persondata/setpaymobile';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'mobileVerifySerialid':verifySerialid, 'verifyCode':code},
		success:function(data){
			var status = parseInt(data.status);
			if(status == -10){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + '/loginPage';
			}else if(status == -1 || status == -2){
				$("#setGetVerify").next().html("*验证无效").show();
			}else if(status == -3){
				$("#setGetVerify").next().html("*验证码已经失效，请重新获取").show();
			}else if(status == -4){
				$("#setGetVerify").next().html("*验证码错误").show();
			}else if(status == -5){
				$("#setGetVerify").next().html("*已经验证过，请重新获取验证码").show();
			}else if(status == -100){
				console.log("server error");
			}else if(status >= 0){
				getDialogCue("success", "绑定成功!");
				verifyPayPassword();
				$("#set_phone_new").val("").parent().next().html("").hide();
				$("#setVerifyNum").val("");
				$("#setGetVerify").next().html("").hide();
				$("#step2_set_phone").hide();
				$("#step1").show();
			}else{
				console.log("未知错误");
			}
		}
	});
}

/**
 * 更改手机绑定
 * @param phoneOld
 * @param code
 */
function changePayMobile(phoneOld, code){
	var url = getRootPath() + '/persondata/resetpaymobile';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'mobileVerifySerialid':verifySerialid, 'oldmobile':phoneOld, 'verifyCode':code},
		success:function(data){
			var status = parseInt(data.status);
			if(status == -10){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + '/loginPage';
			}else if(status == -1 || status == -2){
				$("#getVerify").next().html("*验证无效").show();
			}else if(status == -30){
				$("#change_phone_old").parent().next().html("*输入的原手机号码错误").show();
			}else if(status == -3){
				$("#getVerify").next().html("*验证码失效").show();
			}else if(status == -4){
				$("#getVerify").next().html("*验证码错误").show();
			}else if(status == -5){
				$("#getVerify").next().html("*已经验证过，请重新获取验证码").show();
			}else if(status == -100){
				console.log("server error");
			}else if(status == 0){
				getDialogCue("success", "更改绑定成功!");
				verifyPayPassword();
				$("#change_phone_old").val("").parent().next().html("").hide();
				$("#change_phone_new").val("").parent().next().html("").hide();
				$("#verifyNum").val("");
				$("#getVerify").next().html("").hide();
				$("#step2_change_phone").hide();
				$("#step1").show();
			}else if(status == -20){
				getDialog("fail", "请先绑定手机!");
				verifyPayPassword();
				$("#change_phone_old").val("").parent().next().html("").hide();
				$("#change_phone_new").val("").parent().next().html("").hide();
				$("#verifyNum").val("");
				$("#getVerify").next().html("").hide();
				$("#step2_change_phone").hide();
				$("#step1").show();
			}else{
				console.log("未知错误");
			}
		}
	});
}

/**
 * 重置支付密码
 * @param payPwd
 * @param code
 */
function resetPayPassword(payPwd, code){
	var url = getRootPath() + '/persondata/resetpaypwdbymobile';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:{'mobileVerifySerialid':verifySerialid, 'paypwd':payPwd, 'verifyCode':code},
		success:function(data){
			var status = parseInt(data.status);
			if(status == -10){
				getDialog("fail", "登录已超时，请重新登录!");
				location.href = getRootPath() + '/loginPage';
			}else if(status == -20){
				$("#reset_password_new").parent().next().html("*支付密码不能和登录密码一致").show();
			}else if(status == -30){
				
			}else if(status == -1 || status == -2){
				$("#resetGetVerify").next().html("*验证无效").show();
			}else if(status == -3){
				$("#resetGetVerify").next().html("*验证码失效").show();
			}else if(status == -4){
				$("#resetGetVerify").next().html("*验证码错误").show();
			}else if(status == -5){
				$("#resetGetVerify").next().html("*已经验证过，请重新获取验证码").show();
			}else if(status == -100){
				console.log("server error");
			}else if(status == 0){
				getDialogCue("success", "重置成功!");
				verifyPayPassword();
				$("#reset_password_new").val("").parent().next().html("").hide();
				$("#reset_password_new_once").val("").parent().next().html("").hide();
				$("#resetVerifyNum").val("");
				$("#resetGetVerify").next().html("").hide();
				$("#step2_forget_password").hide();
				$("#step1").show();
			}else{
				console.log("未知错误");
			}
		}
	});
}