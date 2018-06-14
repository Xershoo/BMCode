<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<input type="hidden" value="<%=request.getAttribute("message")%>">
<div class="sh_manage">
	<jsp:include page="/taglibs/common/schoolMenu.jsp">
		<jsp:param value="stu_mgns" name="module"/>
	</jsp:include>
	
<div class="sh_content">
	<div class="navigate">
		<div id="basicInfo" class="navigate_info">学校公告详情</div>
	</div>
	<!-- basic info -->
	<div id="bulletinInfoContent">
		<div class="sh_info">
			<div class="sh_name">公告标题：</div>
			<div class="sh_name_info">${message.title}</div>
		</div>
		<div class="sh_label">
			<div class="sh_label_name">公告链接：</div>
			<c:if test="${empty message.linkUrl}">
				<div class="sh_label_info unpublish">此公告还没有链接哎，快去添加一下吧~</div>
			</c:if>
			<c:if test="${not empty message.linkUrl}">
				<div class="sh_label_info">${message.linkUrl}</div>
			</c:if>
		</div>
		<div class="sh_intro">
			<div class="sh_intro_name">公告内容：</div>
			<c:if test="${empty message.content}">
				<div class="sh_label_info unpublish">此公告还没有内容哎，快去添加一下吧~</div>
			</c:if>
			<c:if test="${not empty message.content}">
				<div class="sh_intro_info">${message.content}</div>
			</c:if>
		</div>
		<div class="sh_info">
			<div class="sh_name">公告发布人：</div>
			<div class="sh_name_info">${message.strPublicName}</div>
		</div>
		<div class="sh_info">
			<div class="sh_name">公告发布时间：</div>
			<div class="sh_name_info">${message.publishTime}</div>
		</div>
		<div class="sh_info">
			<div class="sh_name">公告状态：</div>
			<c:choose>
				<c:when test="${message.publishFlag == 1}">
					<div class="sh_name_info publish">已发布</div>
				</c:when>
				<c:otherwise>
					<div class="sh_name_info unpublish">未发布</div>
				</c:otherwise>
			</c:choose>
		</div>
	</div>
	<!-- basic info -->
</div>
</div>
