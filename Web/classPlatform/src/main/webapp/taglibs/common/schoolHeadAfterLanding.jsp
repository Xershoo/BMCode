<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="top">
	<div id="head_main">
		<div id="logo">
			<div id="logoImghead">
				<img src="/eduPlatform2c/images/common/class8_logo.png" alt="课吧">
			</div>
			<div id="logoDesc">
				<div id="classChn">课 吧</div>
				<div id="classUrl">www.class8.com</div>
			</div>
		</div>
		<div id="search">
			<div class="t1"><a href="<%=request.getContextPath()%>/login1">首页</a></div>
			<!-- 隐藏全部课程功能 -->
			<%-- <div class="t2" onclick="location.href='<%=request.getContextPath()%>/course/toSignUp'">全部课程</div> --%>
			<div class="t2">下载课吧</div>
			<!-- 隐藏搜索功能 -->
			<%-- <div class="t3">
				<div class="t3_select">
					<div class="t3_select1">学生</div>
					<div class="t3_option" style="display: none">
						<li onclick="confirmIdentity(2)">学生</li>
						<li onclick="confirmIdentity(1)">老师</li>
						<li onclick="confirmIdentity(3)">校长</li>
					</div>
					<div class="t3_select2" onclick="selectIdentity()">
						<img src="/eduPlatform2c/images/head/aaa_03.png" id="head_search">
					</div>
				</div>
	
				<div class="t3_select_button1"></div>
				<div class="t3_input">
					<input class="input_type1">
				</div>
				<div class="t3_search" onclick="location.href='<%=request.getContextPath()%>/course/toSignUp'"></div>
			</div> --%>
			<!-- end -->
			<%-- 			<div class="search_button"><img src="<%=request.getContextPath()%>/images/searchLogo.png" ></div> --%>
		</div>
		<c:choose>
			<c:when test="${empty user.uid }">
				<div id="rightLogin">登录</div>
			</c:when>
			<c:otherwise>
				<div id="rightMenu">
					<%-- <div class="s1">
						<div id="change_identity">
							<c:if test="${user.roleName == 'student' }">我是学生</c:if>
							<c:if test="${user.roleName == 'teacher' }">我是老师</c:if>
							<c:if test="${user.roleName == 'school' }">我是校长</c:if>
							<c:if test="${empty user.roleName}">我是学生</c:if>
						</div>
						<div id="head_01">
							<img
								src="<%=request.getContextPath()%>/images/head/head_01_03.png"
								id="change_identity_image">
						</div>
						<div class="s1_option" style="display: none">
							<li onclick="confirmIden(1)">我是学生</li>
							<li onclick="confirmIden(2)">我是老师</li>
							<li onclick="confirmIden(3)">我是校长</li>
						</div>
					</div>
					<div class="s1">
						<img id="u63_line" class="img "
							src="<%=request.getContextPath()%>/images/u60_line.png"
							alt="u63_line">
					</div> --%>
					<div class="message_head">
						<div class="m1">
							消息<span id="count_head">5</span>
						</div>
					</div>
					<%-- <div class="message_list" style="display: none;">
						<li class="message_list_weidu">未读新消息</li>
						<li class="message_list1"><a
							href="<%=request.getContextPath()%>/message/message?type=1">课程消息</a><span
							id="course_message_head" class="red_head"></span></li>
						<li class="message_list1"><a
							href="<%=request.getContextPath()%>/message/message?type=2">评论<span
								id=""></span></a></li>
						<li class="message_list1"><a
							href="<%=request.getContextPath()%>/message/message?type=3">私信</a><span
							id="private_message_head" class="red_head"></span></li>
						<li class="message_list1"><a
							href="<%=request.getContextPath()%>/message/message?type=4">系统消息</a><span
							id="system_message_head" class="red_head"></span></li>
					</div> --%>
					<div class="touxiang">
						<img id="u104_img" class="img " src="${user.avatarUrl }"
							width="40px" height="40px">
					</div>
					<%-- <div class="user_list" style="display: none;">
						<c:if test="${user.roleName == 'student' }">
							<li>我的主页</li>
							<li><a
								href="<%=request.getContextPath()%>/student/schedule/toMyCourse">我的课表</a></li>
							<li><a href="<%=request.getContextPath()%>/student/course">我的课程</a></li>
							<li style="border-bottom: 1px solid #e4e4e4;"><a
								href="<%=request.getContextPath()%>/order/studentOrder">我的订单</a></li>
						</c:if>
						<c:if test="${user.roleName == 'teacher' }">
							<li><a href="javascript:void(0);"
								onclick="location.href='<%=request.getContextPath()%>/infocenter/teacher/${user.uid }'">我的主页</a></li>
							<li><a href="javascript:void(0);"
								onclick="location.href='<%=request.getContextPath()%>/teacher/schedule/toMyCourse'">我的课表</a></li>
							<li><a href="javascript:void(0);"
								onclick="location.href='<%=request.getContextPath()%>/teacher/course/manage'">课程管理</a></li>
							<li style="border-bottom: 1px solid #e4e4e4;"><a
								href="<%=request.getContextPath()%>/order/studentOrder">我的订单</a></li>
						</c:if>
						<c:if test="${user.roleName == 'school' }">
							<li><a href="javascript:void(0);"
								onclick="location.href='<%=request.getContextPath()%>/infocenter/school/${user.schoolId}'">学校主页</a></li>
							<!-- <li><a href="javascript:void(0);">我的课表</a></li> -->
							<li><a href="javascript:void(0);">课程管理</a></li>
							<li><a href="javascript:void(0);"
								onclick="location.href='<%=request.getContextPath()%>/school/teacher'">老师管理</a></li>
							<li style="border-bottom: 1px solid #e4e4e4;"><a
								href="<%=request.getContextPath()%>/order/studentOrder">学校订单</a></li>
						</c:if>
						<c:if test="${empty user.roleName}">
							<li>我的主页</li>
							<li><a
								href="<%=request.getContextPath()%>/student/schedule/toMyCourse">我的课表</a></li>
							<li><a href="<%=request.getContextPath()%>/student/course">我的课程</a></li>
							<li style="border-bottom: 1px solid #e4e4e4;"><a
								href="<%=request.getContextPath()%>/order/studentOrder">我的订单</a></li>
						</c:if>
						<li><a href="<%=request.getContextPath()%>/persondata/myAccount">我的财富</a></li>
						<li style="border-bottom: 1px solid #e4e4e4;"><a
							href="<%=request.getContextPath()%>/persondata/toAccount">个人设置</a></li>
						<li><a href="javascript:void(0);"
							onclick="location.href='<%=request.getContextPath()%>/logout'">退出登录</a></li>
					</div> --%>
				</div>
			</c:otherwise>
		</c:choose>
	</div>
</div>