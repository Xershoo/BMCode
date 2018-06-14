/**
 * forget password javascript sourcefile
 */
var timeout;

var verifySerialid=0;

var uid = 0;

var phoneReg = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/);

var passwordReg = RegExp(/^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/);//正则

$(function(){
	var countdown=60;
	var disabledBtn = false; 
	function settime() { 
		if (countdown == 0) {
			disabledBtn = false;
			$("#getVerifyNum").html("获取验证码");
			clearTimeout(timeout);
			return;
		} else {
			disabledBtn = true;
			$("#getVerifyNum").html(countdown+"s后可获取");
			countdown--; 
		}
		timeout = setTimeout(function() {
			settime();
		},1000)
	}
	
	$("#mobileBtn").on("click", function(){
		$("#step2").css({"background":"url(images/login/step2_bg_on.png)","color":"#fff"});
		$("#mainCon").hide();
		
		var html = "";
		html+='<div class="findTypeDesc"><div class="find_logo"><img src="images/login/find_step_logo.png"></div>填写您的手机号，进行手机验证：</div>';
		html+='<div class="mobileInput">'
				+'<div class="mobileLabel">手机号:</div>'
				+'<div class="mobileVal"><input id="phoneNum" type="text" placeholder="输入手机号"></div>'
				+'<div class="mobileInfo"></div>'
			    +'</div>';
		html+='<div class="mobileInput">'
				+'<div class="mobileLabel">短信验证码:</div>'
				+'<div class="mobileVal" style="width:200px;"><input id="verifyNum" type="text" placeholder="输入短信验证码"></div>'
				+'<div id="getVerifyNum">获取验证码</div>'
				+'<div class="mobileInfo"></div>'
				+'</div>';
		html+='<div class="mobileInput">'
				+'<div class="mobileLabel"></div>'
				+'<div id="phoneCancel" class="btn_common">上一步</div>'
				+'<div id="step2Btn" class="btn_common">下一步</div>'
				+'</div>';
		$("#mobileCon").html(html);
		$("#mobileCon").show();
		
		$("#phoneNum").on("blur", function(){
			var telnum = $.trim($("#phoneNum").val());
			if(telnum == "" || telnum == null){
				$(".mobileInfo").eq(0).show();
	        	$(".mobileInfo").eq(0).html("*请输入手机号码");
			}else{
				if(phoneReg.test(telnum)){
					$(".mobileInfo").eq(0).hide();
		        	$(".mobileInfo").eq(0).html("");
				}else{
					$(".mobileInfo").eq(0).show();
		        	$(".mobileInfo").eq(0).html("*输入的手机号格式不正确");
				}
			}
		});
		
		/*获取验证码*/
		$("#getVerifyNum").on("click",function(){
			if (disabledBtn == false) {
				var telnum = $("#phoneNum").val();
				if (!phoneReg.test(telnum)) {
					$(".mobileInfo").eq(0).show();
		        	$(".mobileInfo").eq(0).html("*输入手机号或手机号非法");
					return;
				}
				var url = getRootPath() + "/sendMobileCodeNotLogin";
				$.ajax({
					url:url,
					type:'post',
					data:{"mobile" : telnum, "type":11},
					dataType:'text',
					success:function(data){
						verifySerialid = parseInt(data);
						if(verifySerialid > 0){
							console.log("发送验证码成功");
						}else{
							if(verifySerialid == -1){
								$(".mobileInfo").eq(1).show();
					        	$(".mobileInfo").eq(1).html("*输入的手机号非法"); 
							}else if(verifySerialid == -2){
								$(".mobileInfo").eq(1).show();
					        	$(".mobileInfo").eq(1).html("*两次发送间隔过短"); 
							}else if(verifySerialid == -3){
								$(".mobileInfo").eq(1).show();
					        	$(".mobileInfo").eq(1).html("*该手机号码当日发送次数过多"); 
							}else if(verifySerialid == -4 || verifySerialid == -100){
								$(".mobileInfo").eq(1).show();
					        	$(".mobileInfo").eq(1).html("*短信发送失败"); 
							}else if(verifySerialid == -5){
								$(".mobileInfo").eq(1).show();
					        	$(".mobileInfo").eq(1).html("*该手机号已经存在"); 
							}else if(verifySerialid == -6){
								
							}else{
								$(".mobileInfo").eq(1).hide();
					        	$(".mobileInfo").eq(1).html(""); 
							}
						}
					}
				});
				countdown = 60;
				settime();
			}
		
		});
		
		/*获取验证码后，点击下一步，进行密码修改*/
		$("#step2Btn").hover(function() {
	        $(this).css({"background":"#e6f5ff","border":"1px solid #bbdef5"});
	    },function() {
	        $(this).css({"background":"#f8f8f8","border":"1px solid #c5c4c3"});
	    }).mousedown(function(){
	    	$(this).css("background", "#b7e2ff");
	    }).mouseup(function(){
	    	$(this).css("background", "#e6f5ff");
	    }).on("click", function(){
			
			var phoneNum = $.trim($("#phoneNum").val());
			var verifyNum = $.trim($("#verifyNum").val());
			if(phoneNum == "" || phoneNum == null){
				$(".mobileInfo").eq(0).html("*请输入手机号码");
				$(".mobileInfo").eq(0).show();
				return;
			}else{
				if(!phoneReg.test(phoneNum)){
					$(".mobileInfo").eq(0).html("*输入的手机号码格式不正确");
					$(".mobileInfo").eq(0).show();
					return;
				}
			}
			if(verifyNum == "" || verifyNum == null){
				$(".mobileInfo").eq(1).html("*请输入短信验证码");
				$(".mobileInfo").eq(1).show();
				return;
			}
			if(verifySerialid > 0){
				$.ajax({
					url:getRootPath()+"/verifyMobile",
					type:'post',
					data:{"mobileVerifySerialid":verifySerialid, "verifyCode":verifyNum},
					dataType:'json',
					success:function(data){
						if(data.status){
							if(data.status > 0){
								$("#step3").css({"background":"url(images/login/step3_bg_on.png)","color":"#fff"});
								$("#step3Btn").removeClass("mibao");
								$("#changeCon").children().eq(0).html("<div class=\"find_logo\"><img src=\"images/login/find_step_logo.png\"></div>已通过手机验证，开始设置新密码吧：");
								$("#mobileCon").hide();
								$("#changeCon").show();
							}else{
								if(data.status == -100){
									$(".mobileInfo").eq(1).html("*短信验证码验证失败");
									$(".mobileInfo").eq(1).show();
								}else{
									$(".mobileInfo").eq(1).html("*验证码不正确或已过期");
									$(".mobileInfo").eq(1).show();
								}
							}
						}else{
							console.log("未知错误");
						}
					}
				});
			}
		});
		$("#phoneCancel").hover(function() {
			$(this).css({"background":"#e6f5ff","border":"1px solid #bbdef5"});
	    },function() {
	        $(this).css({"background":"#f8f8f8","border":"1px solid #c5c4c3"});
	    }).mousedown(function(){
	    	$(this).css("background", "#b7e2ff");
	    }).mouseup(function(){
	    	$(this).css("background", "#e6f5ff");
	    }).on("click", function(){
	    	disabledBtn = false;
			$("#getVerifyNum").html("获取验证码");
			clearTimeout(timeout);
			$("#step2").css({"background":"url(images/login/step2_bg.png)","color":"#3d3d3d"});
			$("#mobileCon").html("").hide();
			$("#mainCon").show();
		});
	});
	
	$("#mibaoBtn").on("click", function(){
		$("#step2").css({"background":"url(images/login/step2_bg_on.png)","color":"#fff"});
		$("#mainCon").hide();
		var html = "";
		html+='<div class="findTypeDesc"><div class="find_logo"><img src="images/login/find_step_logo.png"></div>填写您的账号，进行验证：</div>';
		html+='<div class="mobileInput">'
				+'<div class="mobileLabel">账号:</div>'
				+'<div class="mobileVal"><input id="username" type="text"></div>'
				+'<div class="mobileInfo"></div>'
			    +'</div>';
		html+='<div class="mobileInput">'
				+'<div class="mobileLabel"></div>'
				+'<div id="mibaoCancel" class="btn_common">上一步</div>'
				+'<div id="step2MibaoBtn" class="btn_common">下一步</div>'
				+'</div>';
		$("#mobileCon").html(html);
		$("#mobileCon").show();
		
		$("#step2MibaoBtn").hover(function() {
			$(this).css({"background":"#e6f5ff","border":"1px solid #bbdef5"});
	    },function() {
	        $(this).css({"background":"#f8f8f8","border":"1px solid #c5c4c3"});
	    }).mousedown(function(){
	    	$(this).css("background", "#b7e2ff");
	    }).mouseup(function(){
	    	$(this).css("background", "#e6f5ff");
	    }).on("click", function(){
	    	var name = $.trim($("#username").val());
	    	if(name == null || name == ""){
	    		$("#username").parent().next().html("*请输入账号").show();
	    	}else{
	    		var url = getRootPath() + '/getVerifyQu';
	    		$.ajax({
	    			url:url,
	    			type:'post',
	    			dataType:'json',
	    			data:{"uname":name},
	    			async:false,
	    			cache:false,
	    			success:function(data){
	    				var status = parseInt(data.status);
	    				if(status == -1){
	    					$("#username").parent().next().html("*该用户不存在").show();
	    				}else if(status == -2){
	    					$("#username").parent().next().html("*该用户没有设置过密保问题").show();
	    				}else if(status == -100){
	    					$("#username").parent().next().html("*校验用户失败，请联系管理员").show();
	    				}else if(status == 0){
	    					var question = data.question;
	    					uid = question.uid;
	    					var html = "";
	    					html+='<div class="findTypeDesc"><div class="find_logo"><img src="images/login/find_step_logo.png"></div>填写您设置过的答案，继续进行问题验证：</div>';
	    					html+='<div class="mobileInput">'
	    							+'<div class="mobileLabel">问题一:</div>'
	    							+'<div class="mobileVal">'+question.strQuestion1+'</div>'
	    						    +'</div>';
	    					html+='<div class="mobileInput" style="margin-top:10px;">'
    							+'<div class="mobileLabel">答案一:</div>'
    							+'<div class="mobileVal"><input id="answer1" class="answer" type="text"></div>'
    							+'<div class="mobileInfo"></div>'
    						    +'</div>';
	    					html+='<div class="mobileInput" style="margin-top:10px;">'
    							+'<div class="mobileLabel">问题二:</div>'
    							+'<div class="mobileVal">'+question.strQuestion2+'</div>'
    						    +'</div>';
	    					html+='<div class="mobileInput" style="margin-top:10px;">'
    							+'<div class="mobileLabel">答案二:</div>'
    							+'<div class="mobileVal"><input id="answer2" class="answer" type="text"></div>'
    							+'<div class="mobileInfo"></div>'
    						    +'</div>';
	    					html+='<div class="mobileInput" style="margin-top:10px;">'
    							+'<div class="mobileLabel">问题三:</div>'
    							+'<div class="mobileVal">'+question.strQuestion3+'</div>'
    						    +'</div>';
	    					html+='<div class="mobileInput" style="margin-top:10px;">'
    							+'<div class="mobileLabel">答案三:</div>'
    							+'<div class="mobileVal"><input id="answer3" class="answer" type="text"></div>'
    							+'<div class="mobileInfo"></div>'
    						    +'</div>';
	    					html+='<div class="mobileInput">'
	    							+'<div class="mobileLabel"></div>'
	    							+'<div id="mibaoNextBtn" class="btn_common">下一步</div>'
	    							+'</div>'; 
	    					$("#mobileCon").html(html);
	    					
	    					$("#answer1").on("blur", function(){
	    						var answer1 = $.trim($(this).val());
	    						if(answer1 == ""){
	    							$(this).parent().next().html("*请输入答案一").show();
	    						}else{
	    							$(this).parent().next().html("").hide();
	    						}
	    					});
	    					
	    					$("#answer2").on("blur", function(){
	    						var answer2 = $.trim($(this).val());
	    						if(answer2 == ""){
	    							$(this).parent().next().html("*请输入答案二").show();
	    						}else{
	    							$(this).parent().next().html("").hide();
	    						}
	    					});
	    					
	    					$("#answer3").on("blur", function(){
	    						var answer3 = $.trim($(this).val());
	    						if(answer3 == ""){
	    							$(this).parent().next().html("*请输入答案三").show();
	    						}else{
	    							$(this).parent().next().html("").hide();
	    						}
	    					});
	    					
	    					$(".answer").keyup(function(){
	    						var answer1 = $.trim($("#answer1").val());
	    						var answer2 = $.trim($("#answer2").val());
	    						var answer3 = $.trim($("#answer3").val());
	    						if(answer1 != "" && answer2 != "" && answer3 != ""){
	    							$("#mibaoNextBtn").css({"background":"#f5f5f5", "color":"#2c2c2c"});
	    							var $events = $("#mibaoNextBtn").data("events");
	    							if( $events && $events["click"] ){
	    							}else{
	    								$("#mibaoNextBtn").bind("click", function(){
	    									ajaxValidateQuestion(uid);
		    							});
	    							}
	    						}else{
	    							$("#mibaoNextBtn").css({"background":"#f5f4f2", "color":"#bab9b8"});
	    							$("#mibaoNextBtn").unbind();
	    						}
	    					});
	    				}
	    			}
	    		})
	    	}
	    });
		$("#mibaoCancel").hover(function() {
			$(this).css({"background":"#e6f5ff","border":"1px solid #bbdef5"});
	    },function() {
	        $(this).css({"background":"#f8f8f8","border":"1px solid #c5c4c3"});
	    }).mousedown(function(){
	    	$(this).css("background", "#b7e2ff");
	    }).mouseup(function(){
	    	$(this).css("background", "#e6f5ff");
	    }).on("click", function(){
			$("#step2").css({"background":"url(images/login/step2_bg.png)","color":"#3d3d3d"});
			$("#mobileCon").html("").hide();
			$("#mainCon").show();
		});
	});
	
	$("#logBtn").on("click", function(){
		var url = getRootPath() + "/index";
		location.href = url;
	});
	
	$("#newPwd").on("blur", function(){
		var password = $.trim($(this).val());
		if(password == "" || password == null){
			$(".changeInfo").eq(0).show();
        	$(".changeInfo").eq(0).html("*请输入密码");
		}else{
			if(passwordReg.test(password)){
				$(".changeInfo").eq(0).hide();
	        	$(".changeInfo").eq(0).html("");
			}else{
				$(".changeInfo").eq(0).show();
	        	$(".changeInfo").eq(0).html("*输入的密码格式不正确");
			}
		}
	});
	
	$("#newPwdOnce").on("keyup", function(){
		var pwd = $.trim($("#newPwd").val());
		var rePwd = $.trim($(this).val());
		if(rePwd == "" || rePwd == null){
			$(".changeInfo").eq(1).show();
			$(".changeInfo").eq(1).html("*请输入确认密码");
			return false;
		}else{
			if(pwd != rePwd){
				$(".changeInfo").eq(1).show();
				$(".changeInfo").eq(1).html("*两次输入的密码不一致");
				return false;
			}else{
				$(".changeInfo").eq(1).hide();
				$(".changeInfo").eq(1).html("");
				return true;
			}
		}
	});
	
	$("#step3Btn").hover(function(){
		$(this).css("background", "#51a4f6");
	}, function(){
		$(this).css("background", "#1976d2");
	}).on("click", function(){
		var pwd = $.trim($("#newPwd").val());
		var rePwd = $.trim($("#newPwdOnce").val());
		if(pwd == ""){
			$(".changeInfo").eq(0).show();
        	$(".changeInfo").eq(0).html("*请输入密码");
		}
		if(rePwd == ""){
			$(".changeInfo").eq(1).show();
			$(".changeInfo").eq(1).html("*请输入确认密码");
		}
		if(pwd != "" && rePwd != ""){
			if(!passwordReg.test(pwd)){
				$(".changeInfo").eq(0).show();
	        	$(".changeInfo").eq(0).html("*输入的密码格式不正确");
			}else{
				if(pwd != rePwd){
					$(".changeInfo").eq(1).show();
					$(".changeInfo").eq(1).html("*两次输入的密码不一致");
				}else{
					var pwdlevel = calculatePasswordLevel(pwd);
					if($("#step3Btn").hasClass("mibao")){
						var url = getRootPath() + "/changePassByEncrypted";
						$.ajax({
							url:url,
							type:'post',
							data:{"uid":uid, "newpass":pwd, "pwdlevel":pwdlevel},
							dataType:'json',
							success:function(data){
								var result = parseInt(data.status);
								if(result == 0){
									$("#step4").css({"background":"url(images/login/step4_bg_on.png)","color":"#fff"});
									$("#changeCon").hide();
									$("#overCon").show();
								}else{
									$(".changeInfo").eq(0).show();
							        $(".changeInfo").eq(0).html("*修改密码失败");
								}
							}
						});
					}else{
						var url = getRootPath() + "/changePassByMobile";
						
						$.ajax({
							url:url,
							type:'post',
							data:{"mobileVerifySerialid":verifySerialid, "newpass":pwd, "pwdlevel":pwdlevel},
							dataType:'json',
							success:function(data){
								var result = parseInt(data.status);
								if(result == 0){
									$("#step4").css({"background":"url(images/login/step4_bg_on.png)","color":"#fff"});
									$("#changeCon").hide();
									$("#overCon").show();
								}else{
									$(".changeInfo").eq(0).show();
							        $(".changeInfo").eq(0).html("*修改密码失败");
								}
							}
						});
					}
				}
			}
		}
	});
});

/**
 * ajax验证密保问题答案是否正确
 * 
 * @param uid
 */
function ajaxValidateQuestion(uid){
	var answer1 = $.trim($("#answer1").val());
	var answer2 = $.trim($("#answer2").val());
	var answer3 = $.trim($("#answer3").val());
	
	if(answer1 == ""){
		$("#answer1").parent().next().html("*请输入答案一").show();
	}
	if(answer2 == ""){
		$("#answer2").parent().next().html("*请输入答案二").show();
	}
	if(answer3 == ""){
		$("#answer3").parent().next().html("*请输入答案三").show();
	}
	
	if(answer1 != "" && answer2 != "" && answer3 != ""){
		var url = getRootPath() + "/verifyQuestions";
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			data:{"answer1":answer1, "answer2":answer2, "answer3":answer3, "uid":uid},
			cache:false,
			success:function(data){
				var status = parseInt(data.status);
				if(status == -2){
					getDialog("fail", "该用户没有设置密保问题");
					location.href = getRootPath() + "/toForgetPassword";
				}else if(status == -100){
					getDialog("fail", "密保问题验证失败，请重试");
				}else{
					if(data.question1 == 1){
						$("#answer1").parent().next().html("*问题一回答错误").show();
					}else{
						$("#answer1").parent().next().html("").hide();
					}
					if(data.question2 == 1){
						$("#answer2").parent().next().html("*问题二回答错误").show();
					}else{
						$("#answer2").parent().next().html("").hide();
					}
					if(data.question3 == 1){
						$("#answer3").parent().next().html("*问题三回答错误").show();
					}else{
						$("#answer3").parent().next().html("").hide();
					}
					if(data.question1 == 0 && data.question2 == 0 && data.question3 == 0){
						$("#step3").css({"background":"url(images/login/step3_bg_on.png)","color":"#fff"});
						$("#changeCon").children().eq(0).html("<div class=\"find_logo\"><img src=\"images/login/find_step_logo.png\"></div>已通过密保问题验证，开始设置新密码吧：");
						$("#step3Btn").addClass("mibao");
						$("#mobileCon").hide();
						$("#changeCon").show();
					}
				}
			}
		});
	}
}

/**
 * 计算密码复杂度
 * @param password
 * @returns {Number}
 */
function calculatePasswordLevel(password) {
	var pwdlevel;
	var pwdScore = 0;
	if (password.length == 6) {
		pwdScore = 5;
	} else if (password.length < 10) {
		pwdScore = 10;
	} else {
		pwdScore = 25;
	}
	// 字母
	if (/^(([0-9A-Z_]*[A-Z][0-9A-Z_]*)|([0-9a-z_]*[a-z][0-9a-z_]*))$/.test(password)) // 字母全为大写或者小写
	{
		pwdScore += 10;
	} else if (/^(([0-9A-Za-z_]*[A-Z][0-9A-Za-z_]*[a-z][0-9A-Za-z_]*))|([0-9A-Za-z_]*[a-z][0-9A-Za-z_]*[A-Z][0-9A-Za-z_]*)$/.test(password)) // 包含大小写混合字母
	{
		pwdScore += 20;
	}

	// 数字
	var isNum = '0';
	var isNumAllSame = 1;
	var numbertimes = 0;
	for (var i = 0; i < password.length; i++) {
		var c = password[i];
		if (c >= '0' && c <= '9') {
			if (numbertimes > 0 && isNum != c) {
				isNumAllSame = 0;
				numbertimes++;
				isNum = c;
			}
		}
	}
	if (isNumAllSame == 1) // 数字全相同
	{
		pwdScore += 10;
	} else if (numbertimes >= 5) // 包含五个数字，
	{
		pwdScore += 20;
	}

	// 下划线
	if (/^(_[0-9a-zA-Z]+)$/.test(password)) // 下划线出现在首位
	{
		pwdScore += 10;
	} else if (/^([0-9a-zA-Z]+_)$/.test(password)) // 下划线出现在未尾
	{
		pwdScore += 10;
	} else if (/^([0-9a-zA-Z]+_[0-9a-zA-Z]+)$/.test(password)) // 下划线出现在中间
	{
		pwdScore += 20;
	}

	// 奖励
	if (/^([0-9a-zA-Z_]*[0-9]+[0-9a-zA-Z_]*)$/.test(password)) // 如果有数字
	{
		if (/^([0-9a-zA-Z]*_+[0-9a-zA-Z_]*)$/.test(password)) // 有下划线
		{
			if (/^([0-9A-Za-z_]*(([A-Z][0-9A-Za-z_]*[a-z])|([a-z][0-9A-Za-z_]*[A-Z]))[0-9A-Za-z_]*)$/.test(password)) // 包含大小写字母
			{
				pwdScore += 15;
			} else if (/^(([0-9A-Z_]*[A-Z][0-9A-Z_]*)|([0-9a-z_]*[a-z][0-9a-z_]*))$/.test(password)) // 大写字母或者小写字母
			{
				pwdScore += 10;
			}

		} else if (/^([0-9a-zA-Z_]*[a-zA-Z][0-9a-zA-Z_]*)$/.test(password)) // 有字母
		{
			pwdScore += 5;
		}
	}

	if (pwdScore >= 80) { // 强
		pwdlevel = 3;

	} else if (pwdScore >= 60) { // 中

		pwdlevel = 2;
	} else { // 弱

		pwdlevel = 1;

	}
	return pwdlevel;
}