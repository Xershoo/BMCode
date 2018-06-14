
var myTinyDialog,mobileVerifySerialid;


//弹出框的函数
function  getDialog(dialogContent){
    if(myTinyDialog)
        {
            myTinyDialog.remove();
        }
        myTinyDialog = tinyDialog({
            'content':dialogContent,
            'width':530,
            'height':420,
            'closeX':true,
            'mask':true,  
        });
}

$(function(){
	setTimeout(function(){
		$(".logoIcon1").animate({opacity:"1"});
		setInterval(left2,1000);
		setInterval(left3,400);
	},1000);
	setTimeout(function(){
		$(".logoIcon2").animate({opacity:"1"});
	},1500);
	setTimeout(function(){
		$(".logoIcon3").animate({opacity:"1"});
	},2000);
	setTimeout(function(){
		$(".logoIcon4").animate({opacity:"1"});
	},2500);
	function left(){
		$(".logoCenterBg1").animate({left:"20px"},2000).animate({left:"0px"},2000);	
	}
	function left2(){
		$(".logoCenterBg2").animate({left:"20px"},2000).animate({left:"0px"},2000);	
	}
	function left3(){ 
		$(".logoCenterBg3").animate({right:"20px"},2000).animate({right:"40px"},2000);	
	}
	setInterval(left,1000);
    $("#h_username").on("focus",function(){
    	$("#h_v_username").css("display","none");
		$("#h_v_password").css("display","none");
    })
    $("#h_password").on("focus",function(){
    	$("#h_v_username").css("display","none");
		$("#h_v_password").css("display","none");
    })
	$(".register").on("click",function(){
        getDialog('<div class="dialogCon">'
        +'<div class="titleWrap"><img src="images/im.png" alt="" /></div>'
        +'<div class="teacherStu">'
        +'<div class="teacher"><div><img src="images/teacher.png" alt="" /></div><p>老 师 <span style="font-size:14px;color:#2aaadb;font-weight:normal">teacher</span></p></div>'
        +'<div class="student"><div><img src="images/student.png" alt="" /></div><p>学 生 <span style="font-size:14px;color:#2aaadb;font-weight:normal;">student</span></p></div>'

        +'</div>'
         +'</div>');
        $(".teacherStu .teacher").on("click",function(){
        	getDialog('<div class="dialogCon">'
	    	+'<div class="registerWrap1">'
	        +'<div class="registerLeft">'
	        +'<ul class="registerNav"><li class="cur li1">手机注册</li></ul>'
	        +'</div>'
	        +'<div class="registerCon">'
	        +'<div id="h_registerWrap" class="registerWrap"><div class="phoneWrap"><span><input id="h_tuusername" type="text" placeholder="输入用户名"></span></div><p class="phoneInfor" style="position:relative;margin:6px 0 30px;">用户名由6-15位数字和字母组成<span id="h_tusernamV" class=" red" style="width:310px;left:0;display:none">输入的用户名有误</span></p><div class="passwordWrap"><span><input id="h_tupass"  type="password" placeholder="输入密码" class="password"></span></div><p class="passwordInfor">密码由6到12位数字、字母或者下划线组成</p><div class="passwordWrap"><span><input id="h_tupassconf" type="password" placeholder="再次输入密码" class="passwordAgain"></span><p id="h_tupasswarn" style="display:none" class="passwordAgainInfor red">两次密码输入不一致</p></div><div class="verificationWrap"><span><input id="h_tuVerifiCode" type="text" placeholder="输入验证码"></span><span><a href="javascript:void(0);" onclick="javascript:reloadValidateCode();"><img id="validateCodeImg" src=getRootPath()+"/validateCode" /></a></span><p  style="display:none" class="verifyInfor red">输入的验证码有误</p></div><div id="h_tugotoCertify" class="gotoCertify">认证并进入class8</div></div>'
	        +'<div id="registerPhoneWrap" class="registerPhoneWrap"><div class="phoneWrap"><span><input id="h_tphone" type="text" placeholder="输入手机号"></span></div><p class="phoneInfor">手机号注册后，可以使用手机号登录及找回密码</p> <p id="h_tphonewarn"  style="display:none" >输入的手机号码有误</p>   <div class="verificationWrap"><span><input id="h_verifyCode" type="text" placeholder="输入验证码"></span><span id="h_getVerify" class="getVerify">获取验证码</span><span class="return_time" style="position: absolute;right: -90px;top: 4px;display:none"><em></em>s后重新获取验证码</span><p id="h_vtphoneverify" style="display:none" class="verifyInfor red">输入的验证码有误</p></div><div class="passwordWrap"><span><input id="h_tphonepass" type="password" placeholder="输入密码" class="password"></span></div><p class="passwordInfor">密码由6到12位数字、字母或者下划线组成</p><div class="passwordWrap"><span><input id="h_tphonepassconf" type="password" placeholder="再次输入密码" class="passwordAgain"></span><p id="h_tphonepasswarn" style="display:none" class="passwordAgainInfor red">两次密码输入不一致</p></div><div id="h_tgotoCertify" class="gotoCertify">认证并进入class8</div></div>'
	        +'</div>'
	        +'</div>'
	         +'</div>');
/*********************新增内容**********************/
				var countdown=300;
				var disabledBtn = false; 
				function settime() { 
					if (countdown == 0) {
						disabledBtn = false;
						$(".return_time").css("display","none");
					    /*countdown = 60;*/ 
					} else {
						disabledBtn = true;
					$(".return_time").find("em").html(countdown);
					countdown--; 
					}
					setTimeout(function() {
						settime();
					},1000)
				}
				$("#h_getVerify").on("click",function(){
					if(disabledBtn == false){
						var telnum=$("#h_tphone").val();
						if(!isPhone(telnum))
							{
							alert("输入的手机号不正确");
							return;
							}
							
						 //console.log("==老师获取验证码事件="+telnum);
							var url=getRootPath()+"/sendMobileVerifyCode";
							  $.post(url,{"telnum":telnum,"verifyType":1,"uid":0},function(result){
								 //console.log(result+"==|获取验证码返回的值||||==");
								
								 mobileVerifySerialid=parseInt(result);
					    		 if(mobileVerifySerialid==-2)
								 {
								  //console.log("两次发送间隔过短");
								  alert("两次发送间隔过短");
								  
								 }
							 else if (mobileVerifySerialid==-3)
								 {
								  //console.log("该用户当日发送次数过多");
								  alert("该用户当日发送次数过多");
								 }
							 else if (mobileVerifySerialid==-4)
							 {
								 alert("短信服务商错误");
							   //console.log("短信服务商错误");
							 }	
							 else if (mobileVerifySerialid==-100)
							 {
								 alert("内部错误");
							  //console.log("内部错误");
							 }
							 else if (mobileVerifySerialid==-5)
							 {
							  //console.log("手机已绑定");
							  alert("手机已经绑定");
							 }
							 else if (mobileVerifySerialid==-1)
							 {
							  //console.log("手机号非法");
							  alert("手机号非法");
							 }
							 else
								 {
								 //console.log("后台发送完手机验证码返回的编码为"+mobileVerifySerialid);
								 
								 }
								// mobileVerifySerialid
								  });
						countdown = 300;
						$(".return_time").css("display","block");
					    settime();
					}
					
				})
         	$(".registerCon .registerWrap").hide();
         	$(".registerCon .registerPhoneWrap").show();
         	
	         $(".registerNav .li1").on("click",function(){
	         	$(this).addClass("cur").siblings(".li2").removeClass("cur");
	         	$(".registerCon .registerWrap").hide();
	         	$(".registerCon .registerPhoneWrap").show();
	         });
	         $(".registerNav .li2").on("click",function(){
	         	$(this).addClass("cur").siblings(".li1").removeClass("cur");
	         	$(".registerCon .registerPhoneWrap").hide();
	         	$(".registerCon .registerWrap").show();
	         	reloadValidateCode();
	         });
			 
	         
	    	 $("#h_tgotoCertify").on("click",function(){
	    		 
	    		 var h_tphone=$("#h_tphone").val(); 
	    		 
	    		 if(isPhone(h_tphone))
	    			 {
	    			 $("#h_tphonewarn").css("display","none");
	    			
	    			 }
	    		 else
	    			 {
	    			 $("#h_tphonewarn").css("display","block");
	    			 return false;
	    			 }
	    		 
	    		 var h_tphonepass=$("#h_tphonepass").val(); 
	    		 var h_tphonepassconf=$("#h_tphonepassconf").val(); 
	    		 if(h_tphonepass!=h_tphonepassconf)
	    			 {
	    			 //console.log("不等");
	    			 $("#h_tphonepasswarn").css("display","block");
	    			 }
	    		 if(vaildpass(h_tphonepassconf,0))
	    			 {
	    			 	//console.log("验证通过");
	    			 	 $("#h_tphonepasswarn").css("display","none");
	    			 }
	    		 else
	    			 {
	    			 $("#h_tphonepasswarn").html("密码的格式不符合要求!");
	    			 $("#h_tphonepasswarn").css("display","block");
		    			 //console.log("手机注册密码未通过验证");
		    			 return false;
	    			 }
	    		 
	    		 
	    		 //vaildpass(h_tphonepassconf,0);
	    		 
	    		 
	    		 //console.log("老师手机注册密码验证"+vaildpass(h_tphonepassconf,0));
	    		 var url=getRootPath()+"/verifyMobile";
	    		 var verifyCode=$("#h_verifyCode").val(); 
	    		 //console.log("验证码为"+verifyCode);
	    		 if(verifyCode=="")
	    			 {
	    			 
	    				 $("#h_vtphoneverify").css("display","block");
	    				 //console.log("亲，你错了a");
	    			  return false;
	    			 }
	    		 else
	    			 {
	    			 $("#h_vtphoneverify").css("display","none");
	    			 }
	    		// mobileVerifySerialid=589092;
	    		  //console.log(verifyCode+"verifyCode=="+mobileVerifySerialid+"==mobileVerifySerialid");
						 $.post(url,{"mobileVerifySerialid":mobileVerifySerialid,"verifyCode":verifyCode},function(result){
							 var code=parseInt(result);
							 if(code==-2)
								 {
								  //console.log("serialid对应的验证项不存在");
								 }
							 else if (code==-3)
								 {
								 //console.log("验证码已经过期");
								 }
							 else if (code==-4)
								 {
								 //console.log("验证码错误");
								 }
							 else if(code==-100)
								 {
								 //console.log("内部服务器错误");
								 
								 }
							 else
								 {
								 var url=getRootPath()+"/registerByMobilePhone";
								  //console.log("原始"+result+"code为"+code);
								  //mobileVerifySerialid=589092;
								  var password=$("#h_tphonepass").val(); 
									 $.post(url,{"mobileVerifySerialid":mobileVerifySerialid,"password":password,"userType":"40"},function(result){
										 var loginCode=parseInt(result);
											if(loginCode ==-1)
											{
												//console.log("参数非法")	;
											}
											else if (loginCode ==-2)
											{
												//console.log("serialid不存在");
											}
											else if (loginCode ==-3)
											{
												//console.log("该手机号尚未通过验证");
											}
											else if(loginCode ==-4)
											{
												//console.log("该手机号已经被注册");
											}
											else if (loginCode ==-100)
											{
												//console.log("内部服务器错误");
											}else
											{
												//console.log(result+"您已经成功注册，您的账号ID为"+loginCode);
												 myTinyDialog.remove();	
											}
									 });
								  
								 }
								 
							 
								 
						 });
					 
	    	 });
	    	 
	    	 $("#h_tugotoCertify").on("click",function(){

	    		 var h_tuusername=$("#h_tuusername").val(); //用户名
	    		 var h_tupass=$("#h_tupass").val(); //密码
	      		 var h_tupassconf=$("#h_tupassconf").val(); //确认密码
	      		 
	      		if(!vaildUsername(h_tuusername,0))

	      			{
	      			//console.log(vaildUsername(h_tuusername,0)+"00000");
	      			return false;
	      			}
	    		 if(h_tupass!=h_tupassconf)
    			 {
	    			 //console.log("密码不等");
    			 $("#h_tupasswarn").css("display","block");
    			 return;
    			 }
	    		 //console.log("开始密码了");
    		 if(!vaildpass(h_tupassconf,0))
    			 {
    			 //console.log("老师密码a啊"+vaildpass(h_tupassconf,0));
    			 return false;
    			 }
	      		var submitCode=$("#h_tuVerifiCode").val(); 
	      		

	    		 var url=getRootPath()+"/registerByUserName";
						 $.post(url,{"uname":h_tuusername,"password":h_tupass,"userType":"40","submitCode":submitCode},function(result){
							 var code=parseInt(result);
								if (code == -1) {
									//console.log("参数非法");
								} else if (code == -2) {
									//console.log("username是手机号，不能通过用户名密码注册，请使用手机注册");
								} else if (code == -3) {
									//console.log("username已经存在");
								} else if (code == -100) {
									//console.log("内部服务器错误");
								} 
								else if(code==-4)
									{
									   //console.log("验证码输入错误");
									}
							 else
								 {
								  //console.log("原始"+result+"code为"+code);
								  myTinyDialog.remove();
								 }
								 
							 
								 
						 });
					 
	    	 });
	    });
		$(".teacherStu .student").on("click",function(){
        	getDialog('<div class="dialogCon">'
	    	+'<div class="registerWrap1">'
	        +'<div class="registerLeft">'
	        +'<ul class="registerNav"><li class="cur li1">手机注册</li></ul>'
	        +'</div>'
	        +'<div class="registerCon">'
	        +'<div class="registerWrap"><div class="phoneWrap"><span><input id="h_suusername" type="text" placeholder="输入用户名"></span></div><p class="phoneInfor" style="position:relative;margin:6px 0 30px;">用户名由6-15位数字和字母组成<span id="h_tsusernamV" class=" red" style="width:310px;left:0;display:none">输入的用户名有误</span></p><div class="passwordWrap"><span><input id="h_supass" type="password" placeholder="输入密码" class="password"></span></div><p class="passwordInfor">密码由6到12位数字、字母或者下划线组成</p><div class="passwordWrap"><span><input id="h_supassconf" type="password" placeholder="再次输入密码" class="passwordAgain"></span><p id="h_tupasswarn" style="display:none"  class="passwordAgainInfor red">两次密码输入不一致</p></div><div class="verificationWrap"><span><input id="h_suVerifiCode" type="text" placeholder="输入验证码"></span><span><a href="javascript:void(0);" onclick="javascript:reloadValidateCode();"><img id="validateCodeImg" src=getRootPath()+"/validateCode" /></a></span><p style="display:none" class="verifyInfor red">输入的验证码有误</p></div><div id="h_sugotoCertify" class="gotoCertify">认证并进入class8</div></div>'
	        +'<div class="registerPhoneWrap"><div class="phoneWrap"><span><input id="h_sphone" type="text" placeholder="输入手机号"></span></div><p class="phoneInfor">手机号注册后，可以使用手机号登录及找回密码</p><div class="verificationWrap"><span><input type="text" id="h_sverifyCode" placeholder="输入验证码"></span><span id="h_sgetVerify" class="getVerify">获取验证码</span><span class="return_time1" style="position: absolute;right: -90px;top: 4px;display:none"><em></em>s后重新获取验证码</span><p id="h_sverifyCodeerror" class="verifyInfor red" style="display:none">输入的验证码有误</p></div><div class="passwordWrap"><span><input id="h_sphonepass" type="password" placeholder="输入密码" class="password"></span></div><p class="passwordInfor">密码由6到12位数字、字母或者下划线组成</p><div class="passwordWrap"><span><input id="h_sphonepassconf" type="password" placeholder="再次输入密码" class="passwordAgain"></span><p id="h_sphonepasswarn" style="display:none" class="passwordAgainInfor red">两次密码输入不一致</p></div><div id="h_sgotoCertify" class="gotoCertify">认证并进入class8</div></div>'
	        +'</div>'
	        +'</div>'
	         +'</div>');
        	/*********************新增内容**********************/
			var countdown1=300;
			var disabledBtn1 = false; 
			function settime() { 
				if (countdown1 == 0) {
					disabledBtn1 = false;
					$(".return_time1").css("display","none");
				    /*countdown = 10;*/ 
				} else {
				disabledBtn1 = true;
				
				$(".return_time1").find("em").html(countdown1);
				countdown1--; 
				}
				setTimeout(function() {
					settime();
				},1000)
			}
			$("#h_sgetVerify").on("click",function(){
				if(disabledBtn1 == false){
					var telnum=$("#h_sphone").val();
					if(!isPhone(telnum))
					{
						alert("输入的手机号不正确");
						return;
					}
					 //console.log("==学生获取验证码事件="+telnum);
						var url=getRootPath()+"/sendMobileVerifyCode";
						  $.post(url,{"telnum":telnum,"verifyType":1,"uid":0},function(result){
							 //console.log(result+"==|获取验证码返回的值||||==");
							
							 mobileVerifySerialid=parseInt(result);
				    		 if(mobileVerifySerialid==-2)
							 {
							  alert("两次发送间隔过短");
							  $("#h_sverifyCodeerror").css("display","block");
							  
							 }
						 else if (mobileVerifySerialid==-3)
							 {
							 alert("该用户当日发送次数过多");
							 $("#h_sverifyCodeerror").css("display","block");
							 }
						 else if (mobileVerifySerialid==-4)
						 {
							 alert("短信服务商错误");
							 
							 $("#h_sverifyCodeerror").css("display","block");
						 }	
						 else if (mobileVerifySerialid==-100)
						 {
						  //console.log("内部错误");
						 }
						 else if (mobileVerifySerialid==-5)
						 {
						  //console.log("手机已绑定");
						  alert("手机已经绑定");
						 }
						 else if (mobileVerifySerialid==-1)
						 {
						  //console.log("手机号非法");
						  alert("手机号非法");
						 }
						 else
							 {
							 //console.log("后台发送完手机验证码返回的编码为"+mobileVerifySerialid);
							 
							 }
							// mobileVerifySerialid
							  });
					countdown1 = 300;
					$(".return_time1").css("display","block");
					
				    settime();
				}
				
			})
           	$(".registerCon .registerWrap").hide();
         	$(".registerCon .registerPhoneWrap").show();
	         $(".registerNav .li1").on("click",function(){
	         	$(this).addClass("cur").siblings(".li2").removeClass("cur");
	         	$(".registerCon .registerWrap").hide();
	         	$(".registerCon .registerPhoneWrap").show();
	         });
	         $(".registerNav .li2").on("click",function(){
	         	$(this).addClass("cur").siblings(".li1").removeClass("cur");
	         	$(".registerCon .registerPhoneWrap").hide();
	         	$(".registerCon .registerWrap").show();
	         	reloadValidateCode();
	         });
			 /*事件开始*/
			 
	         
	    	 $("#h_sgotoCertify").on("click",function(){
	    		 //console.log("----------------------");
	    		 var h_sphone=$("#h_sphone").val(); 
	    		 //console.log(isPhone(h_sphone)+"手机号码验证");
	    		 if(!isPhone)
	    			 {
	    			 $("#h_sphonewarn").css("display","block");
	    			 }
	    		 
	    		 var h_sphonepass=$("#h_sphonepass").val(); 
	    		 var h_sphonepassconf=$("#h_sphonepassconf").val(); 
	    		 if(h_sphonepass!=h_sphonepassconf)
	    			 {
	    			 //console.log("不等");
	    			 $("#h_sphonepasswarn").css("display","block");
	    			 }
	    	
	    		 var url=getRootPath()+"/verifyMobile";
	    		 var verifyCode=$("#h_sverifyCode").val(); 
	    		  //console.log(verifyCode+"verifyCode=="+mobileVerifySerialid+"==mobileVerifySerialid");
						 $.post(url,{"mobileVerifySerialid":mobileVerifySerialid,"verifyCode":verifyCode},function(result){
							 //console.log(result+"==|注册事件||||==");
							 var code=parseInt(result);
							 if(code==-2)
								 {
								 alert("serialid对应的验证项不存在");
								 }
							 else if (code==-3)
								 {
								 alert("验证码已经过期");
								 }
							 else if (code==-4)
								 {
								 alert("验证码错误");
								 }
							 else if(code==-100)
								 {
								 alert("内部服务器错误");
								 
								 }
							 else
								 {
								 var url=getRootPath()+"/registerByMobilePhone";
								  //console.log("原始"+result+"code为"+code);
								  var password=$("#h_sphonepass").val(); 
									 $.post(url,{"mobileVerifySerialid":mobileVerifySerialid,"password":password,"userType":"10"},function(result){
										 var loginCode=parseInt(result);
											if(loginCode ==-1)
											{
												alert("参数非法")	;
											}
											else if (loginCode ==-2)
											{
												alert("serialid不存在");
											}
											else if (loginCode ==-3)
											{
												alert("该手机号尚未通过验证");
											}
											else if(loginCode ==-4)
											{
												alert("该手机号已经被注册");
											}
											else if (loginCode ==-100)
											{
												alert("内部服务器错误");
											}else
											{
												//console.log(result+"您已经成功注册，您的账号ID为"+loginCode);
												myTinyDialog.remove();	
											}
									 });
								  
								 }
								 
							 
								 
						 });
					 
	    	 });
	    	 
	    	 $("#h_sugotoCertify").on("click",function(){
	    		 //console.log("hahahhahaha");
	    		 var h_suusername=$("#h_suusername").val(); //用户名
	    		 var h_supass=$("#h_supass").val(); //密码
	      		 var h_supassconf=$("#h_supassconf").val(); //确认密码
		      		vaildUsername(h_suusername,1);
	    		 if(h_supass!=h_supassconf)
	    			 {
	    			 //console.log("不等");
	    			 $("#h_supasswarn").css("display","block");
	    			 }
	    		 vaildpass(h_supassconf,1);
	    		 var submitCode=$("#h_suVerifiCode").val(); 
	    		 var url=getRootPath()+"/registerByUserName";
						 $.post(url,{"uname":h_suusername,"password":h_supass,"userType":"10","submitCode":submitCode},function(result){
							 //console.log(result+"==|用户注册事件||||==");
							 var code=parseInt(result);
								if (code == -1) {
									alert("参数非法");
								} else if (code == -2) {
									alert("username是手机号，不能通过用户名密码注册，请使用手机注册");
								} else if (code == -3) {
									alert("username已经存在");
								} else if (code == -100) {
									alert("内部服务器错误");
								} 
							 else
								 {
								 // console.log("原始"+result+"code为"+code);
								  myTinyDialog.remove();	
								 }
								 
							 
								 
						 });
					 
	    	 });
			 /*事件结束*/
	    });
    });
    $(".login").on("click",function(){
  
    	getDialog('<div class="dialogCon">'
    	+'<div class="loginWrap1">'
    //	+'<form action="'+getRootPath()+'/login"  method="post">'
        +'<div class="userNameWrap"><input id="h_username" name="h_username" type="text" placeholder="输入手机号/用户名"><p id="h_v_username" style="display:none" class="red">请输入正确的用户名/手机号</p></div>'
        +'<div class="passwordWrap"><input id="h_password"  name="h_password" type="password" placeholder="输入密码"><p id="h_v_password" style="display:none" class="red">账号密码不匹配</p></div>'
        +'<div class="forgetPas">忘记密码?</div>'
        +'<div class="loginButton h_loginButton"  onclick="test()">登  &nbsp;&nbsp; 录</div>'
      //  +'</form>'
        +'</div>'
         +'</div>');
      	//console.log("=====|||ww");
    });


	 
});
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    console.log(pathName);
    var pos=curWwwPath.indexOf(pathName);
    
   var localhostPaht=curWwwPath.substring(0,pos);
   console.log(localhostPaht);
  //  var localhostPaht="http://10.5.33.64:8080";
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    console.log(projectName);
    return(localhostPaht+projectName);
}
function test()
{
	var h_username=$("#h_username").val();
	var h_password=$("#h_password").val();
	var url=getRootPath()+"/login";
	  $.post(url,{"h_username":h_username,"h_password":h_password},function(result){
		 //console.log(result+"====");
		 if(parseInt(result)==-2)
			 {
			 
			 $("#h_v_username").css("display","block");
			 }
		 else if (parseInt(result)==-3)
			 {
			 $("#h_v_password").css("display","block");
			 }
		 else if(parseInt(result)==-100)
			 {
			  //console.log("内部错误");
			 }
		 else
			 {
			 //console.log("成功"+result);
			 myTinyDialog.remove();
			// var url=getRootPath()+"/courceMessage";
			 var url=getRootPath()+"/homepage";
			 location.href=url;
/*					 $.post(url,{"studentUid":"10009","startTimePlanMin":"2015/05/01","startTimePlanMax":"2015/05/30"},function(result){
						 console.log("返回的结果"+result);
						 var url=getRootPath()+"/home";
						 location.href=url;
					 });*/
			 
			 }

		  });
}
function isPhone(aPhone) {  
    var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);  
    if (bValidate) {  
    	//console.log("号码验证");
    	 $("#h_tphonewarn").css("display","none");
        return true;  
    }  
    else  
    	{
    	  return false; 
    	}
       
} 

function vaildUsername(username,type)
{
	//console.log(username+"穿残");
	var reg = /^[a-zA-Z\d]\w{4,14}[a-zA-Z\d]$/;//正则
	if(reg.test(username)){
	 //console.log('验证成功');
		if(type==1)
		{
		//学生
		 $("#h_tsusernamV").css("display","none");
		}
	else
		{
		 $("#h_tusernamV").css("display","none");
		}
		 return true;
	}else{
		//console.log("用户名验证失败");
		if(type==1)
			{
			//学生
			 $("#h_tsusernamV").css("display","block");
			}
		else
			{
			 $("#h_tusernamV").css("display","block");
			}
	
		 return false;
	}
}
function vaildpass(password,type)
{
	//console.log(password+"密码");
	var reg = /^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/;//正则
	if(reg.test(password)){
	 //console.log('验证成功');
		if(type==1)
		{
		 $("#h_supasswarn").css("display","none");
		}
	else
		{
		 $("#h_tupasswarn").css("display","none");
		}
	 return true;
	}else{
		//console.log("密码验证失败");
		if(type==1)
			{
			$("#h_supasswarn").html("密码格式不正确");
			 $("#h_supasswarn").css("display","block");
			}
		else
			{
			$("#h_tupasswarn").html("密码格式不正确");
			 $("#h_tupasswarn").css("display","block");
			}
	
		 return false;
	}
}
function reloadValidateCode(){
	//console.log("进入验证码的方法里面");
	$("#validateCodeImg").attr("src",getRootPath()+"/validateCode?data=" + new Date() + Math.floor(Math.random()*24));
}