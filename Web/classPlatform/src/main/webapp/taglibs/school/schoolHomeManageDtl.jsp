<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<input type="hidden" value="<%=request.getAttribute("authSchoolInfo")%>">
<input type="hidden" value="${authSchoolInfo.id}" id="schoolId">
<input type="hidden" value="${authSchoolInfo.secondDomain}" id="secondDomain">
<div class="sh_manage">
	<jsp:include page="/taglibs/common/schoolMenu.jsp">
		<jsp:param value="stu_mgns" name="module"/>
	</jsp:include>
	
<div class="sh_content">
	<div class="navigate">
		<div id="basicInfo" class="navigate_info">基本信息</div>
		<div id="adImages">广告图片</div>
		<div id="schoolAnnounce">学校公告</div>
		<div id="previewHome" onclick="location.href='<%=request.getContextPath()%>/infocenter/school/${authSchoolInfo.id}'">预览主页</div>
	</div>
	<!-- basic info -->
	<div id="basicInfoContent">
		<div class="sh_info">
			<div class="sh_name">学校名称：</div>
			<div class="sh_name_info">${authSchoolInfo.name}</div>
			<div class="sh_edit">
				<input type="button" id="editInfo" class="sh_edit_info" value="编辑资料">
				<input type="button" id="saveData" class="sh_edit_info" value="保   存" style="display:none;">
				<input type="button" id="cancelSave" class="sh_cancel" value="取   消" style="display:none;">
			</div>
		</div>
		<div class="sh_label">
			<div class="sh_label_name">学校标签：</div>
			<div class="sh_label_info">${authSchoolInfo.mark}</div>
		</div>
		<div class="sh_intro">
			<div class="sh_intro_name">学校介绍：</div>
			<div class="sh_intro_info">${authSchoolInfo.introduce}</div>
		</div>
		<div class="sh_label">
			<div class="sh_sld_name">二级域名：</div>
			<div class="sh_sld_info"></div>
		</div>
		<div class="sh_logo">
			<div class="sh_logo_name">学校logo：</div>
			<div class="sh_logo_info">
					<c:if test="${empty authSchoolInfo.logoUrl}">
						<img alt="" title="学校logo" src="<%= request.getContextPath()%>/images/teacher/mask.png" class="logo">
					</c:if>
					<c:if test="${not empty authSchoolInfo.logoUrl}">
						<img alt="" title="学校logo" src="${authSchoolInfo.logoUrl}" class="logo" id="schoolLogo">
					</c:if>
					<div id="uploadImg" style="display:none"><a href="javascript:void(0);" class="sh_file_up">上传图片<input type="file" id="file" name="file" accept="image/*"/></a></div>
				</div>
			
		</div>
	</div>
	<!-- basic info -->
	<!-- AD images -->
	<div id="adImagesContent" style="display:none;">
		<div class="sh_ad_images">
			<div class="ad_back">
				<img src="<%= request.getContextPath()%>/images/teacher/mask.png" class="ad_img">
			</div>
			<div class="ad_content">
				<div class="ad_diagram">
					<div class="ad_diagram_name">广告图标题：</div>
					<div class="ad_diagram_info">广东文艺职业学院1</div>
				</div>
				<div class="ad_url">
					<div class="ad_url_name">广告图链接：</div>
					<div class="ad_url_info">www.baidu.con1</div>
				</div>
				<div class="sh_ad_info">编辑资料</div>
			</div>
		</div>
		
	</div>
	<!-- AD images -->
	<!-- school announcement -->
	<div id="schoolAnnouncement" style="display:none;">
		<div class="announce_info">
			<div class="announce_id position">公告ID</div>
			<div class="announce_title position">公告公告标题</div>
			<div class="announce_content position">公告内容</div>
			<div class="announce_issuer position">公告发布人</div>
			<div class="announce_time position">公告发布时间</div>
			<div class="announce_status position">状态</div>
			<div class="announce_top position">是否置顶</div>
			<div class="announce_op">操作</div>
		</div>
	</div>
	<div id="page"></div>
	<!-- school announcement -->
</div>
</div>
<!-- teachers team -->
<!-- jquery dialog -->
<div id="addNewSchoolAD" title="添加公告" style="display: none;">
	<div class="apply_content">
		<div class="ad_title">
			<div class="ad_title_info">公告标题：</div>
			<div class="ad_file"><input type="text" id="adTitle" name="adTitle" class="ad_announce" maxlength="50"/></div>
		</div>
		<div class="ad_title prompt" style="display:none;">
			<span class="prompt_info"></span>
		</div>
		<div class="ad_title">
			<div class="ad_title_info">公告链接：</div>
			<div class="ad_file"><input type="text" id="adLink" name="adLink" class="ad_announce" maxlength="200"/></div>
		</div>
		<div class="ad_title prompt" style="display:none;">
			<span class="prompt_info"></span>
		</div>
		<div class="ad_title ad_con_info">
			<div class="ad_title_info">公告内容：</div>
			<div class="ad_file ad_con_info"><textarea id="adContent" name="adContent" maxlength="1000"></textarea></div>
		</div>
		<div class="ad_title">
			<div class="ad_title_info">是否发布：</div>
			<div class="ad_file">
				<input type="radio" id="isPublish" name="isPublish" value="1" checked> 是
				<input type="radio" id="isPublish" name="isPublish" value="0"> 否
			</div>
		</div>
	</div>
</div>
<!-- jquery dialog -->
