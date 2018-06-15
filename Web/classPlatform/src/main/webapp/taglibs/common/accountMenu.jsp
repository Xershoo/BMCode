<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- <div class="m_left">
	<p class="m_person">
		<img alt="" src="<%=request.getContextPath()%>/images/account/set.png"
			class="m_email" width="15px" height="15px"><span class="p_set">个人设置</span>
	</p>
	<ul>
		<li class="data_chk" id="basic_info">基本信息</li>
		<c:if test="${user.roleName == 'student' || user.roleName == 'teacher'}">
			<li class="data_chk" id="student_info">学籍信息</li>
		</c:if>
		<li class="data_chk" id="account_info">账号安全</li>
	</ul>
</div>
 --%>
<%-- <c:if test="${user.roleName == 'student' }"> --%>
<%-- 	<%@ include file="/taglibs/common/studentMenu.jsp" %> --%>
<%-- </c:if> --%>
<%-- <c:if test="${user.roleName == 'teacher' }"> --%>
<%-- 	<%@ include file="/taglibs/common/teacherMenu.jsp" %> --%>
<%-- </c:if> --%>
<%-- <c:if test="${user.roleName == 'school' }"> --%>
<%-- 	<%@ include file="/taglibs/common/schoolMenu.jsp" %> --%>
<%-- </c:if> --%>

	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/teacherMenu.jsp">
		<jsp:param value="personalSet" name="module"/>
	</jsp:include>
	<!-- over -->