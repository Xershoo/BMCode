<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<div id="left_menu">
		<div id="left_menu_top">
			<div id="school_logo"><img src="${user.schoolLogoUrl }" width="130px" height="130px" style="border-radius:65px;"></div>
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
					<option value="school" selected="selected">我是校长</option>
					<option value="teacher">我是老师</option>
					<option value="student">我是学生</option>
				</select>
			</div> -->
			<!-- end -->
		</div>
		<%-- <div id="space"></div>
		<div id="wealth_and_set">
				<div id="wealth_logo"><img id="wealth_img" src="<%=request.getContextPath()%>/images/teacher/wealth.png"></div>
				<div id="wealth_title" class="link_a"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/myAccount'">我的财富</a></div>
				<div id="set_logo"><img id="set_img" src="<%=request.getContextPath()%>/images/teacher/person_set.png"></div>
				<div id="set_title" class="link_a"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/basicInfo'">主页设置</a></div>
		</div> --%>
		<c:if test="${param.module == 'home'}">
			<div class="school_link_menu common_link" style="margin-top:26px;">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/home_select.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/center';return false;">学校主页</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'home'}">
			<div class="school_link_menu" style="margin-top:26px;">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/home.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/center';return false;">学校主页</a></div>
			</div>
		</c:if>
<%-- 		<c:if test="${param.module == 'school_course'}"> --%>
<!-- 			<div class="school_link_menu common_link"> -->
<%-- 				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_course_select.png"></div> --%>
<!-- 				<div class="menu_word"><a href="javascript:void(0);">学校课表</a></div> -->
<!-- 			</div> -->
<%-- 		</c:if> --%>
<%-- 		<c:if test="${param.module != 'school_course'}"> --%>
<!-- 			<div class="school_link_menu"> -->
<%-- 				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_course.png"></div> --%>
<!-- 				<div class="menu_word"><a href="javascript:void(0);">学校课表</a></div> -->
<!-- 			</div> -->
<%-- 		</c:if> --%>
		<c:if test="${param.module == 'teacher_mgn'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/school/teacher_manage_select.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/teacher'">老师管理</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'teacher_mgn'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/school/teacher_manage.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/teacher'">老师管理</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'stu_mgn'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/school/student_manage.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/student'">学生管理</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'stu_mgn'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_student.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/student'">学生管理</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'class_mgn'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/school/class_manage_select.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/course'">课程管理</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'class_mgn'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/school/class_manage.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/course'">课程管理</a></div>
			</div>
		</c:if>
		<%-- <c:if test="${param.module == 'school_order'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_order_select.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">学校订单</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'school_order'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_order.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">学校订单</a></div>
			</div>
		</c:if> --%>
		<!-- <div class="school_link_menu">
			<div class="menu_logo"><img id="main_img" src="../images/c2-1coursedetail/u905.png"></div>
			<div class="menu_word"><a href="javascript:void(0);">优惠券</a></div>
		</div>
		<div class="school_link_menu">
			<div class="menu_logo"><img id="main_img" src="../images/c3-1-2courseteacher/u162.png"></div>
			<div class="menu_word"><a href="javascript:void(0);">数据统计</a></div>
		</div> -->
	</div>