<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<input type="hidden" id="uid" value="${user.uid }">

<div id="top">  
	<c:choose>
		<c:when test="${empty user.uid }">
			<!-- before login -->
			<div id="login_element">
				<div id="login_main" style="width:1215px;">
					<%-- <div id="classLogo"><img src="<%=request.getContextPath()%>/images/class8logo.png"></div> --%>
					<%-- <div class="search_piano"><input id="search_blank" placeholder="关键词~"><img src="<%=request.getContextPath()%>/images/head/search_piano.png" class="search_img"></div> --%>
					<div id="login_input" style="width:720px;">
						<div class="input_label">账号:</div>
						<div class="input_text"><input type="text" id="username" name="userName" value="${loginName }" maxlength="32"></div>
						<div class="input_label">密码:</div>
						<div class="input_text"><input type="password" id="password" name="password" value="${password }"></div>
						<div id="loginBtn" class="btnCommon" onclick="login()">登录</div>
						<div id="registerBtn" class="btnCommon">注册</div>
						<div id="forgetPwd">忘记密码?</div>
						<div class="head_img" id="qq_login"><img src="<%=request.getContextPath()%>/images/head/qq_login.png" title="QQ登录"></div>
						<div class="head_img" id="weixin_login"><img src="<%=request.getContextPath()%>/images/head/weixin_login.png" title="微信登录" onclick="weixinlogin()"></div>
						<div class="head_img" id="weibo_login"><img src="<%=request.getContextPath()%>/images/head/weibo_login.png" title="微博登录"></div>
					</div>
				</div>
			</div>
		</c:when>
		<c:otherwise>
		<!-- after login -->
			<div id="login_element">
				<div id="login_main">
					<%-- <div id="classLogo"><img src="<%=request.getContextPath()%>/images/class8logo.png"></div> --%>
					<div id="login_input" style="width:420px;">
						<div id="after_login_menu">
							<c:if test="${user.roleName == 'student' }">
								<!-- <div class="after_login_menuCommon" onclick="goToMainPage('student')">我的主页</div><div class="menu_line">|</div>
								<div class="after_login_menuCommon" onclick="goToMyCourse('student')">我的课表</div><div class="menu_line">|</div>
								<div class="after_login_menuCommon" onclick="goToMyClass('student')">我的课程</div><div class="menu_line">|</div> -->
							</c:if>
							<c:if test="${user.roleName == 'teacher' }">
								<!-- <div class="after_login_menuCommon" onclick="goToMainPage('teacher')">我的主页</div><div class="menu_line">|</div> -->
								<!-- <!-- <div class="after_login_menuCommon" onclick="goToMyCourse('teacher')">我的课表</div><div class="menu_line">|</div> -->
								<!-- <div class="after_login_menuCommon" onclick="goToMyClass('teacher')">我的课程</div><div class="menu_line">|</div> --> 
							</c:if>
							<c:if test="${user.roleName == 'school' }">
								<!-- <div class="after_login_menuCommon" onclick="goToMainPage('teacher')">我的主页</div><div class="menu_line">|</div> -->
								<!-- <div class="after_login_menuCommon" onclick="goToMyClass('school')">我的课程</div><div class="menu_line">|</div> -->
							</c:if>
							<div class="after_login_menuCommon" onclick="goToMyClass('teacher')">我的课程</div><div class="menu_line">|</div>
							<div id="loginOut" class="after_login_menuCommon">退出登录</div>
						</div>
						<div id="touxiang"><img src="${user.avatarUrl }"></div>
						<div id="message"><img src="<%=request.getContextPath()%>/images/head/message.png"><div id="redDot"><img src="<%=request.getContextPath()%>/images/head/redDot.png"></div></div>
						
					</div>
					<div class="arrow-up" style="display: none;">
     					<!--向上的三角-->
					</div>
					<div class="message_list" style="display: none;">
						<c:if test="${user.roleName != 'school' }">
							<a id="headCourseMessage" href="<%=request.getContextPath()%>/message/message?type=1"><li class="message_list1">课程消息<span
								id="course_message_head" class="red_head"></span></li></a>
						</c:if>	
						<a id="headPrivateMessage" href="<%=request.getContextPath()%>/message/message?type=3"><li class="message_list1">私信<span
							id="private_message_head" class="red_head"></span></li></a>
						<a id="headSystemMessage" href="<%=request.getContextPath()%>/message/message?type=4"><li class="message_list1">系统消息<span
							id="system_message_head" class="red_head"></span></li></a>
					</div>
					<div class="user_list" style="display: none;">
						<a id="headttoAccount" href="<%=request.getContextPath()%>/persondata/toAccount"><li>个人设置</li></a>
					</div>
					<!-- <div class="s1_option" style="display: none;">
							<li onclick="confirmIden(1)">我是学生</li>
							<li onclick="confirmIden(2)">我是老师</li>
							<li onclick="confirmIden(3)">我是校长</li>
					</div> -->
				</div>
			</div>
		</c:otherwise>
	</c:choose>  
	<!-- menu -->
			<div id="menu_element">
				<div id="menu_main">
					<div id="menu_logo">
						<div id="logo_img" class="menu_img"><img src="<%=request.getContextPath()%>/images/head/class8_logo.png"></div>
						<div id="intro_img" class="menu_img"><img src="<%=request.getContextPath()%>/images/head/logo_intro.png"></div>
					</div>
					<div id="search_main">
						<div id="search_input">
							<div id="search_select">
								<div id="select_word">课程</div>
								<div id="change_select"><img src="<%=request.getContextPath()%>/images/head/arrow_down.png"></div>
							</div>
							<div id="keyword_input"><input type="text" id="search_blank" placeholder="想找什么课,搜搜呗"></div>
							<div id="search_btn"><img src="<%=request.getContextPath()%>/images/head/search_white.png"></div>
							<div class="searchType">
								<li class="searchKeyword">课程</li>
								<li class="searchKeyword">老师</li>
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
					<div id="head_qrcode"><img src="<%=request.getContextPath()%>/images/head/erweima.png"></div>
					<div id="qrcode_word">快扫码关注<br />内容更丰富</div>
				</div>
			</div>
			
			<div id="head_menu">
				<div id="head_menu_main">
					<div id="menu_infor">
						<c:if test="${page == 'index' }">
						<div id="mainLink">首页</div>
						</c:if>
						<c:if test="${page != 'index' }">
						<div id="mainLinkcourses" class="menuCommon">首页</div>
						</c:if>
						<c:if test="${page == 'allCourses' }">
						<div id="head_allCourses" class="menuCommons">全部课程</div>
						</c:if>
						<c:if test="${page != 'allCourses' }">
						<div id="head_allCourse" class="menuCommon">全部课程</div>
						</c:if>
						<c:if test="${page == 'allTeachers' }">
						<div id="head_allTeachers" class="menuCommons">全部老师</div>
						</c:if>
						<c:if test="${page != 'allTeachers' }">
						<div id="head_allTeacher" class="menuCommon">全部老师</div>
						</c:if>
						<c:if test="${page != 'appDownload' }">
						<div id="head_downClient" class="menuCommon">下载客户端</div>
						</c:if>
						<c:if test="${page == 'appDownload' }">
						<div id="head_downClients" class="menuCommons">下载客户端</div>
						</c:if>
						
						<!-- <div id="head_settlePiano" class="menuCommon">学校入驻</div> -->
						<div id="head_activities" class="menuCommon">活动盛典</div>
									
						</div>
					<div id="head_createCourseLink">创建课程</div>
				</div>
			</div>
			
</div>