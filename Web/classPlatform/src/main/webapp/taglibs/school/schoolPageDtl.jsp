<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<input type="hidden" value="<%=request.getAttribute("authSchoolInfo")%>">
<input type="hidden" value="<%=request.getAttribute("principalBasicInfo")%>">
<input type="hidden" value="<%=request.getAttribute("countCourse")%>">
<input type="hidden" value="<%=request.getAttribute("countStudent")%>">
<input type="hidden" value="${principalBasicInfo.uid}" id="uid">
<input type="hidden" value="${authSchoolInfo.homePageUrl}" id="homePageUrl">
<input type="hidden" value="${authSchoolInfo.id}" id="schoolId">
<input type="hidden" value="${authSchoolInfo.name}" id="schoolName">
<input type="hidden" value="${schoolBanners}" id="schoolBanners">
<input type="hidden" value="${principalBasicInfo.realName}" id="realName">
<input type="hidden" value="${principalBasicInfo.nickName}" id="nickName">

	<!-- top -->
	<div class="th_top">
<%--  		<img src="<%=request.getContextPath()%>/images/school/s_back.png" class="canvas_back"/>	 --%>
<%-- 	<%@ include file="/taglibs/school/viwepager.jsp"%> --%>
		<div class="s_top">
			<c:choose>
				<c:when test="${empty authSchoolInfo.logoUrl}">
					<img alt="" src="<%=request.getContextPath()%>/images/school/s_head.png" title="学校头像" class="s_head">
				</c:when>	
				<c:otherwise>
					<img alt="" src="${authSchoolInfo.logoUrl}" title="学校头像" class="s_head">
				</c:otherwise>
			</c:choose>
			<c:if test="${principalBasicInfo.uid == user.uid}">
				<img alt="" src="<%=request.getContextPath()%>/images/school/s_setting.png" class="pen" title="主页设置" id="dressUpHome" >
			</c:if>
			<p class="s_school">${authSchoolInfo.name}</p>
			<c:choose>
				<c:when test="${not empty principalBasicInfo.realName}">
					<p class="s_school s_head_master">校长 ： ${principalBasicInfo.realName}</p>
				</c:when>
				<c:otherwise>
					<p class="s_school s_head_master">校长 ： ${principalBasicInfo.nickName}</p>
				</c:otherwise>
			</c:choose>
			<c:if test="${principalBasicInfo.uid != user.uid}"> 
			<div class="th_other"> 
				<div id="directMsg" onclick="location.href='<%=request.getContextPath()%>/message/message?type=5&uid=${principalBasicInfo.uid}&realname=${principalBasicInfo.realName}&nickname=${principalBasicInfo.nickName}'"> 
 					<img alt="" src="<%=request.getContextPath()%>/images/teacher/mail.png" title="私信她咯" class="msg_img"> 私信 
 				</div>
<!--  				<div id="editInfo">   -->
<%--  					<img alt="" src="<%=request.getContextPath()%>/images/school/a_photo.png" title="申请成为老师" class="edit_img"> 申请成为老师    --%>
<!--  				</div>  -->
 			</div> 
 			</c:if>
		</div>
	</div>
	
	<div class="navigate">
		<div class="ngt_content">
			<div id="mainPage" class="head">学校主页</div>
			<div id="allCourses" class="head">课程中心</div>
			<div id="teachersTeam">教师团队</div>
			<%-- <c:if test="${principalBasicInfo.uid == user.uid}">
				<div id="dressUpHome">装扮主页</div>
			</c:if> --%>
		</div>
	</div>
<div class="th_page">
	<!-- top -->
	<!-- left -->
	<div id="basicInfo">
		<div class="th_course">
			<p class="th_avg">${countCourse}</p>
			<p class="th_title">课程</p>
		</div>
		<img  alt="" src="<%=request.getContextPath()%>/images/course/straight_line.png" class="straight_line">
		<div class="th_course th_comment">
			<p class="th_avg">${countTeacher}</p>
			<p class="th_title">老师</p>
		</div>
		<img  alt="" src="<%=request.getContextPath()%>/images/course/straight_line.png" class="straight_line">
		<div class="th_course th_student">
			<p class="th_avg">${countStudent}</p>
			<p class="th_title">学生</p>
		</div>
		<div class="b_tab">
			<h2>
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/straight.png" title="教师认证" class="b_img">学校介绍
			</h2>
			<p>${authSchoolInfo.introduce}</p>
		</div>
		<div class="b_more">
			<h2>
				<img alt="" src="<%=request.getContextPath()%>/images/teacher/straight.png" title="基本信息" class="b_img">学校公告
			</h2>
<%-- 			<a id="moreInfos" href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/school/basicInfo'">更多</a> --%>
		</div>
	</div>
	<!-- left -->
	<!-- right -->
	<div id="pageContent">
		<div id="newCourses">
			<h2>
				<img alt=""
					src="<%=request.getContextPath()%>/images/teacher/hot.png"
					title="最新课程" class="n_img">精品课程
			</h2>


			<div id="goCreateCor" class="goCreateCor" style="display:none;">
				<p>暂无课程~</p>
<!-- 				<input type="button" id="createCourse" value="创建课程" class="c_btn"> -->
			</div>

		</div>
		<div id="hotCourses">
			<h2>
				<img alt=""
					src="<%=request.getContextPath()%>/images/teacher/hot.png"
					title="热门课程" class="n_img">明星老师
			</h2>
			
			<div id="goCreateHotCor" class="goCreateCor" style="display:none;">
				<p>暂无课程~</p>
<!-- 				<input type="button" id="createHotCourse" value="创建课程" class="c_btn"> -->
			</div>

		</div>

	</div>
	<!-- right -->
	<!-- all courses -->
	<div id="coursesInfo" style="display:none">
		<div id="allDatas">
			
		</div>
		<div id="goCreateAllCor" class="goCreateCor" style="display:none;">
				<p>暂无课程~</p>
<!-- 				<input type="button" id="createCourse" value="创建课程" class="c_btn"> -->
		</div>
		<div id="page"></div>
	</div>
	<!-- all courses -->
	<!-- teachers team -->
	<div id="teamsInfo" style="display:none">
		<div id="allTeachersData">
			
		</div>
		<div id="goCreateAllTeachers" class="goCreateCor" style="display:none;">
				<p>还没有教师团队，赶紧去邀请老师加入学校吧~</p>
		</div>
		<div id="teacherPage"></div>
	</div>
	<!-- teachers team -->
	<!-- jquery dialog -->
	<div id="apply_school" title="申请加入学校" style="display: none;">
		<div class="apply_content">
			<table class="apply_tab">
				<tr>
					<th>申请学校：</th>
					<td id="s_name"></td>
				</tr>
				<tr>
					<th>申请时间：</th>
					<td id="current_time"></td>
				</tr>
				<tr>
					<td colspan="2" class="r_oth">
					<input type="hidden" id="sch_id" name="sch_id">
					<input type="checkbox"
						class="r_agree r_int" name="r_agree" id="r_agree">已阅读并同意课吧平台的<a>《老师签约学校协议》</a>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<!-- jquery dialog -->
	<!-- school bulletin -->
	<div id="viewCampusBulletin" title="公告详情" style="display: none;">
		<div class="campus_content">
			<div class="ad_title">
				<div class="ad_title_info">公告标题：</div>
				<div class="ad_file" id="adTitle"></div>
			</div>
			 <div class="ad_title">
				<div class="ad_pub_time"></div>
<!-- 				<div class="ad_file" id="adLinkUrl"></div> -->
			</div>
			<div class="ad_info">
			</div>
		</div>
	</div>
	<!-- school bulletin -->
</div>