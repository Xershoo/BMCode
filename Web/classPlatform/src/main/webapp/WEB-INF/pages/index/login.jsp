<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>登录</title>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/login.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/ajaxRequestInterceptor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/login.js"></script>

</head>
<body>
	<div id="top">
		<div id="menu_element" style="margin-top: 0px;">
			<div id="menu_main">
				<div id="menu_logo">
					<div id="logo_img" class="menu_img">
						<img src="<%=request.getContextPath()%>/images/head/head_logo.png">
					</div>
					<div id="title_img" class="menu_img">
						<img
							src="<%=request.getContextPath()%>/images/head/logo_title.png">
					</div>
					<div id="intro_img" class="menu_img">
						<img
							src="<%=request.getContextPath()%>/images/head/logo_intro.png">
					</div>
				</div>
				<div id="search_main">
					<div id="search_input">
						<div id="search_select">
							<div id="select_word">课程</div>
							<div id="change_select">
								<img
									src="<%=request.getContextPath()%>/images/head/arrow_down.png">
							</div>
						</div>
						<div id="keyword_input">
							<input type="text" id="search_blank" placeholder="想找什么课,搜搜呗">
						</div>
						<div id="search_btn">
							<img
								src="<%=request.getContextPath()%>/images/head/search_white.png">
						</div>
					</div>
					<div id="search_menu">
						<div class="menu_words">直播课程</div>
						<div class="menu_words">录播课程</div>
						<!-- <div class="menu_words">钢琴陪练</div>
							<div class="menu_words">钢琴十级</div>
							<div class="menu_words">海外名师</div> -->
						<div class="menu_words">免费课程</div>
					</div>
				</div>
				<div id="head_qrcode">
					<img src="<%=request.getContextPath()%>/images/head/erweima.png">
				</div>
				<div id="qrcode_word">
					快扫码关注<br />内容更丰富
				</div>
			</div>
		</div>
	</div>
	<div class="login_main">
		<img src="<%=request.getContextPath()%>/images/login/register_banner.png">
		<div id="login_elements">
			<div id="login_desc">登录哆来</div>
			<div class="inputVal" style="margin-top:0px;">
				<input type="text" id="username" name="userName" value="${loginName }" maxlength="32" placeholder="输入账号/手机号">
			</div>
			<div id="name_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
			<div class="inputVal">
				<input type="password" id="password" name="password" value="${password }" placeholder="输入密码">
			</div>
			<div id="pwd_info" class="info">
				<div class="arrow_left"></div>
				<div class="msg_word"></div>
			</div>
			<div id="login_menus">
				<div id="login_menus_main">
					<div id="register_link" class="linkCommon">注册账号</div>
					<div id="forgetPwd_link" class="linkCommon">忘记密码</div>
				</div>
			</div>
			<div id="subBtn">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
		</div>
		<div id="other_logo">
			<div id="reg_qq_login" class="login_logo"><img src="images/login/qq_login.png"></div>
			<div id="reg_weixin_login" class="login_logo"><img src="images/login/weixin_login.png"></div>
			<div id="reg_weibo_login" class="login_logo"><img src="images/login/weibo_login.png"></div>
		</div>
	</div>
<%@ include file="/taglibs/common/footer.jsp"%>

</body>
</html>