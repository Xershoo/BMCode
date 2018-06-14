<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<head>
<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script> --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/loginWindow.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/loginWindow.css">
<style type="text/css">
.ui-widget{
	font-family:'微软雅黑 Regular','微软雅黑';
}
.ui-dialog .ui-dialog-titlebar-close span{
	display:block;
}
</style>
</head>
		<div id="right"  title="登录" style="display: none">
			<div id="login_desc">
				<div id="name_login">
				账号登录
				</div>
				<!-- 隐藏快速注册 -->
				<!-- <div id="quick_register">快速注册</div> -->
			</div>
			<div class="input">
				<input type="text" id="username" name="userName" value="${username }" placeholder="请输入手机号、学号或者工号" maxlength="32">
			</div>
			<div id="message">
				<div id="msg_warn"><img src="<%=request.getContextPath()%>/images/login/login_warn.png"></div>
				<div id="msg_word"></div>
			</div>
			<div class="input">
				<input type="password" id="password" name="password" value="${password }" placeholder="请输入密码">
			</div>
			<div id="loginBtn" onclick="login()">
				立即登录
			</div>
			<div id="toRegister">
				<input type="checkbox" id="rememberMe" name="rememberMe" ${rememberMe?"checked":""}/>记住密码
			</div>
			<div id="forgetPwd">
				忘记密码了?
			</div>
			<!-- 隐藏第三方登录功能 -->
			<%-- <div id="other_login">
				<div id="word">
					<div class="line"></div>
					<div id="other_word">或使用社交账号登录</div>
					<div class="line"></div>
				</div>
				<div id="other_logo">
					<div id="qq_login" class="login_logo"><img src="<%=request.getContextPath()%>/images/login/qq_login.png"></div>
					<div id="weixin_login" class="login_logo"><img src="<%=request.getContextPath()%>/images/login/weixin_login.png"></div>
					<div id="weibo_login" class="login_logo"><img src="<%=request.getContextPath()%>/images/login/weibo_login.png"></div>
				</div>
			</div> --%>
			<!-- end -->
		</div>
		<div class="suoping" style="display: none"></div>
