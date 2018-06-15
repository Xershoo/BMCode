<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="register_main">
	<img src="<%=request.getContextPath()%>/images/login/register_banner.png">
	<div id="register_elements">
		<div id="login_desc">欢迎第三方注册</div>
		<div class="inputVal" style="margin-top:0px;">
			<input id="phone" type="tel" name="phone" placeholder="输入手机号">
			<div id="phone_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
		</div>
		<div class="inputDesc_third">
			手机号注册后，可以使用手机号登录及找回密码
		</div>

		<div class="inputVal" style="margin-top:0px;">
			<input id="email" type="email" name="email" placeholder="输入邮箱">
			<div id="email_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
		</div>
		<div class="inputDesc_third">
			输入邮箱后，可以通过邮箱找回密码
		</div>
		<div class="inputVal" style="margin-top:0px;">
			<input id="password_third" type="password" name="password" placeholder="输入密码">
			<div id="pwd_info" class="info" style="top:216px;">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div> 
		</div>
		<div class="inputDesc_third">
			密码由6到12位数字、字母或者下划线组成
		</div>
		<div class="inputVal" style="margin-top:0px;">
			<input id="rePassword" type="password" name="rePassword" placeholder="再次输入密码">
			<div id="oncePwd_info" class="info" style="top:273px;">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
		</div>
		<div id="subBtn" style="margin-top:20px;">
			提交
		</div>
		<div class="inputDesc">
			点击提交注册，即表示您已同意Class8的《使用协议 》。
		</div>
	</div>
</div>
