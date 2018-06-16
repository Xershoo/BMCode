<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<input type="hidden" value="<%=request.getAttribute("teacher")%>">
<input type="hidden" value="<%=request.getAttribute("countCourse")%>">
<input type="hidden" value="<%=request.getAttribute("countStudent")%>">
<input type="hidden" value="<%=request.getAttribute("authSchoolInfo")%>">
<input type="hidden" value="${teacher.uid}" id="uid">
<input type="hidden" value="${teacher.uid}" id="teacherUid">
<input type="hidden" value="${teacher.realName}" id="realName">
<input type="hidden" value="${teacher.nickName}" id="nickName">

<div class="th_page">
	<!-- top -->
	<div class="th_top">
		<c:if test="${empty teacher.avatarUrl}">
			<c:choose>
				<c:when test="${teacher.sex == 1}">
					<img alt=""
						src="<%=request.getContextPath()%>/images/teacher/male_teacher.png"
						title="${teacher.nickName}老师头像" class="head_img">
				</c:when>
				<c:otherwise>
					<img alt=""
						src="<%=request.getContextPath()%>/images/teacher/female_teacher.png"
						title="${teacher.nickName}老师头像" class="head_img">
				</c:otherwise>
			</c:choose>
		</c:if>
		<c:if test="${not empty teacher.avatarUrl}">
			<img alt="" src="${teacher.avatarUrl}"
				title="${teacher.nickName}老师头像" class="head_img">
		</c:if>
		<c:if test="${teacher.uid == user.uid}">
			<img alt=""
				src="<%=request.getContextPath()%>/images/teacher/pen.png"
				class="pen" title="修改资料"
				onclick="location.href='<%=request.getContextPath()%>/persondata/toAccount'">
		</c:if>

		<div class="th_other">
			<div class="t_real">${teacher.realName}</div>
			<c:if test="${teacher.uid != user.uid}">
				<div class="t_msg">
					<div id="directMsg"
						onclick="location.href='<%=request.getContextPath()%>/message/message?type=3'">
						<img alt=""
							src="<%=request.getContextPath()%>/images/teacher/mail.png"
							title="私信她咯" class="msg_img"> 私信
					</div>
				</div>
			</c:if>
		</div>
		<div class="own_campus">
			<a href="javascript:void(0);"
				onclick="location.href='<%=request.getContextPath()%>/infocenter/school/${authSchoolInfo.id}'">${authSchoolInfo.name}</a>
		</div>
	</div>

	<div class="navigate">
		<div id="mainPage" class="head">老师主页</div>
		<div id="allCourses" class="head">所有课程</div>
		<div id="allCoupons">优惠券</div>
	</div>
	<!-- top -->
	<!-- left -->
	<div id="basicInfo">
		<div class="th_course">
			<p class="th_avg">${countCourse}</p>
			<p class="th_title">课程</p>
		</div>
		<img  alt="" src="<%=request.getContextPath()%>/images/course/straight_line.png" class="straight_line">
		<div class="th_course th_student">
			<p class="th_avg">${countStudent}</p>
			<p class="th_title">学生</p>
		</div>
		<img  alt="" src="<%=request.getContextPath()%>/images/course/straight_line.png" class="straight_line">
		<div class="th_course th_comment">
			<p class="th_avg">5.0</p>
			<p class="th_title">评分</p>
		</div>
		<div class="b_tab">
			<h2>
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/straight.png" title="教师认证" class="b_img">教师认证
			</h2>
			<p>
				<%-- <img alt=""src="<%=request.getContextPath()%>/images/teacher/data_img.png" class="imgs">
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/personal.png" class="imgs">
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/c_logo.png" class="imgs">
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/camera.png" class="imgs">
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/card.png"> --%>
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/auth_icon.png" width="16px" height="16px">
			</p>
			<h2>
				<img alt=""src="<%=request.getContextPath()%>/images/teacher/straight.png" title="基本信息" class="b_img">基本信息
			</h2>
			<table>
				<tr>
					<th>昵&nbsp;&nbsp;&nbsp;称&nbsp;：</th>
					<c:if test="${empty teacher.nickName}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
					</c:if>
					<c:if test="${not empty teacher.nickName}">
						<td>${teacher.nickName}</td>
					</c:if>
				</tr>
				<tr>
					<th>教&nbsp;&nbsp;&nbsp;龄&nbsp;：</th>
					<c:if test="${empty teacher.teachYears}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
					</c:if>
					<c:if test="${not empty teacher.teachYears}">
						<td>
							<fmt:formatNumber pattern="#">
								${teacher.teachYears}
							</fmt:formatNumber>	 年							
						</td>
					</c:if>
				</tr>
				<%-- <tr>
					<th>职&nbsp;&nbsp;&nbsp;业&nbsp;：</th>
					<c:if test="${empty teacher.occupation}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
					</c:if>
					<c:if test="${not empty teacher.occupation}">
						<td>${teacher.occupation}</td>
					</c:if>
				</tr>
				<tr>
					<th>就职于&nbsp;：</th>
					<c:if test="${empty teacher.company}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
					</c:if>
					<c:if test="${not empty teacher.company}">
						<td>${teacher.company}</td>
					</c:if>
				</tr> --%>
				<tr>
					<th>性&nbsp;&nbsp;&nbsp;别&nbsp;：</th>
					<c:if test="${empty teacher.sex}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
					</c:if>
					<c:if test="${not empty teacher.sex}">
						<c:choose>
							<c:when test="${teacher.sex == 1}">
								<td>男</td>
							</c:when>
							<c:otherwise>
								<td>女</td>
							</c:otherwise>
						</c:choose>
					</c:if>
				</tr>
				<tr>
					<th>生&nbsp;&nbsp;&nbsp;日&nbsp;：</th>
					<c:if test="${empty teacher.birthYear}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
					</c:if>
					<c:if test="${not empty teacher.birthYear}">
						<td>${teacher.birthYear}年${teacher.birthMonth}月${teacher.birthDay}日</td>
					</c:if>
				</tr>
				<%-- <tr>
					<th>个性签名：</th>
					<c:if test="${empty teacher.signature}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
					</c:if>
					<c:if test="${not empty teacher.signature}">
						<td>${teacher.signature}</td>
					</c:if>
				</tr> --%>
			</table>
		</div>
		<div class="b_more">
			<h2>
				<img alt="" src="<%=request.getContextPath()%>/images/teacher/straight.png" title="基本信息" class="b_img">更多信息
			</h2>
			<div class="m_info">
				<c:if test="${empty teacher.description}">
						<td><font color="red">未填写，赶快去完善资料吧~</font></td>
				</c:if>
				<c:if test="${not empty teacher.description}">
					${teacher.description}
				</c:if>
				
			</div>
		</div>
	</div>
	<!-- left -->
	<!-- right -->
	<div id="pageContent">
		<div id="newCourses">
			<h2>
				<img alt=""
					src="<%=request.getContextPath()%>/images/teacher/new.png"
					title="最新课程" class="n_img">最新课程
			</h2>
			<div id="goCreateCor" class="goCreateCor" style="display:none;">
				<p>暂无相关课程~</p>
<!-- 				<input type="button" id="createCourse" value="创建课程" class="c_btn"> -->
			</div>

		</div>
		<div id="hotCourses">
			<h2>
				<img alt=""
					src="<%=request.getContextPath()%>/images/teacher/hot.png"
					title="热门课程" class="n_img">热门课程
			</h2>
			<div id="goCreateHotCor" class="goCreateCor" style="display:none;">
				<p>暂无相关课程~</p>
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
				<p>暂无相关课程~</p>
<!-- 				<input type="button" id="createCourse" value="创建课程" class="c_btn"> -->
		</div>
		<div id="page"></div>
	</div>
	<!-- all courses -->
</div>