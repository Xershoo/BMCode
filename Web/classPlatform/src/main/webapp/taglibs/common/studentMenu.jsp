<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<div id="left_menu">
		<div id="left_menu_top">
			<c:if test="${not empty user.avatarUrl}">
				<div id="school_logo"><img src="${user.avatarUrl}" width="130px" height="130px" style="border-radius:65px;"></div>
			</c:if>
			<c:if test="${empty user.avatarUrl}">
				<c:choose>
					<c:when test="${user.sex == 1}">
						<div id="school_logo"><img src="<%=request.getContextPath() %>/images/course/boy_student.png" width="130px" height="130px" style="border-radius:65px;"></div>		
					</c:when>
					<c:otherwise>
						<div id="school_logo"><img src="<%=request.getContextPath() %>/images/course/girl_student.png" width="130px" height="130px" style="border-radius:65px;"></div>
					</c:otherwise>
				</c:choose>
			</c:if>
			<div id="school_name_title">${user.nickName }&nbsp;&nbsp;&nbsp;  
				<c:choose>
					<c:when test="${user.sex == 1}">
						男		
					</c:when>
					<c:otherwise>
						女
					</c:otherwise>
				</c:choose>
			</div>
			<!-- 隐藏切换身份功能 -->
			<!-- <div id="user_type_change">
				<select id="userType" name="userType">
					<option value="school">我是校长</option>
					<option value="teacher">我是老师</option>
					<option value="student" selected="selected">我是学生</option>
				</select>
			</div> -->
			<!-- end -->
		</div>
		<!-- <div id="space"></div> -->
		<%-- <div id="wealth_and_set">
				<div id="wealth_logo"><img id="wealth_img" src="<%=request.getContextPath()%>/images/teacher/wealth.png"></div>
				<div id="wealth_title" class="link_a"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/myAccount'">我的财富</a></div>
				<div id="set_logo"><img id="set_img" src="<%=request.getContextPath()%>/images/teacher/person_set.png"></div>
				<div id="set_title" class="link_a"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/toAccount'">个人设置</a></div>
		</div> --%>
		<c:if test="${param.module == 'home'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/home_select.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/infocenter/student/${user.uid }'">我的主页</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'home'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/home.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/infocenter/student/${user.uid }'">我的主页</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'my_course'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_course_select.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/student/schedule/toMyCourse'">我的课表</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_course'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_course.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/student/schedule/toMyCourse'">我的课表</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'my_class'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/course_manage_select.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/student/course'">我的课程</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_class'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/course_manage.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/student/course'">我的课程</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'my_order'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_order_select.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/order/studentOrder'">我的订单</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_order'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_order.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/order/studentOrder'">我的订单</a></div>
			</div>
		</c:if>
		<%-- <c:if test="${param.module == 'my_coupon_mgn'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/coupon_select.png" style="margin-right:2px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">我的优惠券</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_coupon'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/coupon.png" style="margin-right:2px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">我的优惠券</a></div>
			</div>
		</c:if> --%>
	</div>