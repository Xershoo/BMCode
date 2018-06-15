<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div class="register_main">
	<img src="<%=request.getContextPath()%>/images/login/register_banner.png">
	<div id="register_elements">
			<div id="login_desc">欢迎注册</div>
			<div class="inputVal" style="margin-top:0px;">
				<input id="phone" type="tel" name="phone" placeholder="输入手机号">
				<span class="info_right"><img src="<%=request.getContextPath()%>/images/login/msg_right.png"></span>
			</div>
			<div id="phone_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
			
			<div class="inputVal">
				<div id="verifyInput"><input id="verifyNum" type="text" name="validateNum" placeholder="输入验证码" ></div>
				<div id="getVerify">获取验证码</div>
				<span class="info_right"><img src="<%=request.getContextPath()%>/images/login/msg_right.png"></span>
			</div>
			<div id="verify_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
	
			<!-- <div class="inputVal">
				<input id="email" type="email" name="email" placeholder="输入邮箱" style="margin-top:5px;">
				<span class="info"></span>
			</div>
			<div class="inputDesc">
				输入邮箱后，可以通过邮箱找回密码
			</div> -->
			<div class="inputVal">
				<input id="registerPassword" type="password" name="password" placeholder="输入密码">
				<span class="info_right"><img src="<%=request.getContextPath()%>/images/login/msg_right.png"></span>
			</div>
			<!-- <div class="inputDesc">
				密码由6到12位数字、字母或者下划线组成
			</div> -->
			<div id="pwd_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
			<div class="inputVal">
				<input id="rePassword" type="password" name="rePassword" placeholder="再次输入密码">
				<span class="info_right"><img src="<%=request.getContextPath()%>/images/login/msg_right.png"></span>
			</div>
			<div id="oncePwd_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
			<div id="subBtn">注&nbsp;&nbsp;&nbsp;&nbsp;册</div>
			<div class="inputDesc">点击提交注册，即表示您已同意Class8的《使用协议 》</div>
	</div>
	<div id="other_login">
				<div id="word">
					<div class="line"></div>
					<div id="other_word">或使用社交账号登录</div>
					<div class="line"></div>
				</div>
				<div id="other_logo">
					<div id="reg_qq_login" class="login_logo"><img src="images/login/qq_login.png"></div>
					<div id="reg_weixin_login" class="login_logo"><img src="images/login/weixin_login.png"></div>
					<div id="reg_weibo_login" class="login_logo"><img src="images/login/weibo_login.png"></div>
				</div>
	</div>
</div>