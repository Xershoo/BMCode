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

	</div>

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


</div>