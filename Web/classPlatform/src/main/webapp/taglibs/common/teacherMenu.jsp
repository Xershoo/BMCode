<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<div id="left_menu">
		<div id="left_menu_top">
			<c:if test="${not empty user.avatarUrl}">
				<div id="school_logo"><img src="${user.avatarUrl }" width="122px" height="122px" style="border-radius:61px;"></div>
			</c:if>
			<c:if test="${empty user.avatarUrl}">
				<c:choose>
					<c:when test="${user.sex == 1}">
						<div id="school_logo"><img src="<%=request.getContextPath()%>/images/teacher/male_teacher.png" width="122px" height="122px" style="border-radius:61px;"></div>		
					</c:when>
					<c:otherwise>
						<div id="school_logo"><img src="<%=request.getContextPath()%>/images/teacher/female_teacher.png" width="122px" height="122px" style="border-radius:61px;"></div>
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
					<option value="teacher" selected="selected">我是老师</option>
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
				<div id="set_title" class="link_a"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/toAccount'">个人设置</a></div>
		</div> --%>
		<%-- <c:if test="${param.module == 'home'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/menu/home.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/center'">我的主页</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'home'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/menu/home.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/center'">我的主页</a></div>
			</div>
		</c:if> --%>
		<%-- <c:if test="${param.module == 'my_course'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/menu/my_course.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/schedule/toMyCourse'">我的课表</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_course'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/menu/my_course.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/schedule/toMyCourse'">我的课表</a></div>
			</div>
		</c:if> --%>
		<c:if test="${param.module == 'course_mgn'}">
			<div class="school_link_menu common_link" style="margin-top:26px;">
				<div class="menu_logo"><img id="course_img" src="<%=request.getContextPath()%>/images/menu/my_course.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/course/manage'">我的课程</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'course_mgn'}">
			<div class="school_link_menu" style="margin-top:26px;">
				<div class="menu_logo"><img id="course_img" src="<%=request.getContextPath()%>/images/menu/my_course.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/course/manage'">我的课程</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'document_mgn'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="doc_img" src="<%=request.getContextPath()%>/images/menu/document.png" style="margin-right:1px;"></div>
				<div id="teacher_doc" class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/toDocManage'">教学资料库</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'document_mgn'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="doc_img" src="<%=request.getContextPath()%>/images/menu/document.png" style="margin-right:1px;"></div>
				<div id="teacher_doc" class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/toDocManage'">教学资料库</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'wealth'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="wealth_img" src="<%=request.getContextPath()%>/images/menu/wealth.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/myAccount'">我的财富</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'wealth'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="wealth_img" src="<%=request.getContextPath()%>/images/menu/wealth.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/myAccount'">我的财富</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'personalSet'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="set_img" src="<%=request.getContextPath()%>/images/menu/person_set.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/toAccount'">个人设置</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'personalSet'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="set_img" src="<%=request.getContextPath()%>/images/menu/person_set.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/toAccount'">个人设置</a></div>
			</div>
		</c:if>
		<%-- <c:if test="${param.module == 'my_student'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="stu_img" src="<%=request.getContextPath()%>/images/menu/my_student.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/student'">我的学生</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_student'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="stu_img" src="<%=request.getContextPath()%>/images/menu/my_student.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/student'">我的学生</a></div>
			</div>
		</c:if> --%>
		<%-- <c:if test="${param.module == 'teacher_auth'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/teacher_auth_select.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/techCertification'">老师认证</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'teacher_auth'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/teacher_auth.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/techCertification'">老师认证</a></div>
			</div>
		</c:if> --%>
		<%-- <c:if test="${param.module == 'data_count'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/data_select.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">数据统计</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'data_count'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/data.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">数据统计</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'my_order'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_order_select.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/order/manageOrder'">我的订单</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_order'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/my_order.png" style="margin-right:1px;"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/order/manageOrder'">我的订单</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'coupon_mgn'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/coupon_select.png" style="margin-right:2px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">优惠券管理</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'coupon_mgn'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/coupon.png" style="margin-right:2px;"></div>
				<div class="menu_word"><a href="javascript:void(0);">优惠券管理</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'join_school'}">
			<div class="school_link_menu common_link">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/join_school_select.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/toJoinSchool'">加入学校</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'join_school'}">
			<div class="school_link_menu">
				<div class="menu_logo"><img id="main_img" src="<%=request.getContextPath()%>/images/teacher/join_school.png"></div>
				<div class="menu_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/teacher/toJoinSchool'">加入学校</a></div>
			</div>
		</c:if> --%>
	</div>