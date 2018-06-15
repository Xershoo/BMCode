<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>

<html>
<head>
<title>课程管理导航栏</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/main.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>

<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/student/studentIndex.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/student/studentIndex.js"></script>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
	
<script type="text/javascript">
	
</script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div class="m_order">

<%-- <div class="index_title">
<div class="index_title_beijing">
<div class="index_title1"></div>
<div class="index_title2"></div>
<div class="index_title3">
<img id="stuent_touxiang" src="<%=request.getContextPath()%>/images/course/touxiangstudent_03.png">
<c:if test="${fn:contains(student.avatarUrl,'null')==true}">
<img id="stuent_touxiang" src="<%=request.getContextPath()%>/images/course/touxiangstudent_03.png">
</c:if>
<c:if test="${fn:contains(student.avatarUrl,'null')==false}">
<img id="stuent_touxiang" src="${student.avatarUrl }" >
</c:if>

<img id="pen" src="<%=request.getContextPath()%>/images/teacher/pen.png" onclick="location.href='<%=request.getContextPath()%>/persondata/toAccount'">
<div class="index_title3_name">
<div class="index_title3_name1"><div class="name"><span id="ziti24">${student.realName }</span><span id="grey">学生</span></div>
<div id="directMsg" >
					<img alt="" src="<%=request.getContextPath()%>/images/teacher/mail.png" title="私信她咯" class="msg_img"> 私信
				</div>

</div > 
<div class="index_title3_name2">好好学习，天天向上</div>
</div>
<!-- <div class="index_title3_button">私信TA</div> -->
</div>
</div>
<div class="index_title4"></div>
</div> --%>
<!-- top -->
	<div class="th_top">
			<c:if test="${empty student.avatarUrl}">
				<c:choose>
					<c:when test="${student.sex == 1}">
						<img src="<%=request.getContextPath()%>/images/course/boy_student.png" class="head_img">
					</c:when>
					<c:otherwise>
						<img src="<%=request.getContextPath()%>/images/course/girl_student.png" class="head_img">
					</c:otherwise>
				</c:choose>
<%-- 				<img id="stuent_touxiang" src="<%=request.getContextPath()%>/images/course/touxiangstudent_03.png" class="head_img"> --%>
<%-- 				<img alt="" src="<%=request.getContextPath()%>/images/c1-2index/u170.png" title="学生头像" class="head_img"> --%>
			</c:if>
			<c:if test="${not empty student.avatarUrl}">
				<img alt="" src="${student.avatarUrl}" title="学生头像" class="head_img">
			</c:if>
			<c:if test="${student.uid == user.uid}"> 
 					<img alt="" src="<%=request.getContextPath()%>/images/teacher/pen.png" class="pen" title="修改资料" onclick="location.href='<%=request.getContextPath()%>/persondata/toAccount'">
 			</c:if>
			<input type="hidden" value="${student.realName }" id="realName">
			<input type="hidden" value="${student.nickName }" id="nickName">
			<input type="hidden" value="${studentUid }" id="studentUid">
			<div class="th_other">
			<div class="t_real">
				${student.realName}
			</div>
			<c:if test="${student.uid != user.uid}"> 
				<div class="t_msg">
					<div id="directMsg">
						<img alt="" src="<%=request.getContextPath()%>/images/teacher/mail.png" title="私信她咯" class="msg_img"> 私信
					</div>
				</div>
			</c:if>
			</div>
			<div class="own_campus">
				<a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/infocenter/school/${authSchoolInfo.id}'">${authSchoolInfo.name}</a>
			</div>
	</div>

	<!-- <div class="navigate">
		<div id="mainPage" class="head">老师主页</div>
		<div id="allCourses" class="head">所有课程</div>
		<div id="allCoupons">优惠券</div>
	</div> -->
	<!-- top -->


<div class="index_detail">
<div class="index_xinxi">
<div class="index_xinxi2"></div>
<div class="index_jibenxinxi"><img alt="" src="<%=request.getContextPath()%>/images/teacher/straight.png" class="straight_line">基本信息</div>
<div class="index_xinxi2">职业：${student.occupation }</div>
<div class="index_xinxi2">就职于：${student.company }</div>
<c:choose>
	<c:when test="${student.sex == '1'}">
		<div class="index_xinxi2">性别：男</div>
	</c:when>
	<c:otherwise>
		<div class="index_xinxi2">性别：女</div>
	</c:otherwise>
</c:choose>
<div class="index_xinxi2">生   日：${student.birthYear } 年${student.birthMonth } 月${student.birthDay } 日 </div>
<div class="index_xinxi3"></div>
<div class="index_xinxi2"></div>
<div class="index_jibenxinxi"><img alt="" src="<%=request.getContextPath()%>/images/teacher/straight.png" class="straight_line">更多信息</div>
<div class="index_jibenxinxi1"> ${student.description }
  </div>
  <input type="hidden" id="uid" value="${student.uid }">
</div>

<div class="index_course">
<div class="index_xinxi2"></div>
<div class="index_jibenxinxi2">
	进行中
	<c:if test="${student.uid == user.uid}"> 
		<a id="moreLearning" href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/student/course'">更多</a>
	</c:if>
</div>
<div class="index_course_etail" id="index_course_etail">

<!-- <div class="kecheng">  -->
<!-- <div class="k1"> -->
<!-- </div> -->
<!-- <div class="k2"> -->
<!-- <li>大学英语语法学习技巧</li> -->
<!-- <li>张雪|江南职业技术学院</li> -->
<!-- <li>高校/数学</li> -->
<!-- <li><span class="jg1">￥80</span> <span class="jg2">￥100</span></li> -->
<!-- </div> -->
<!-- </div> -->
<!-- <div class="hx"></div> -->

</div>

<div class="index_jibenxinxi2">已学完
	<c:if test="${student.uid == user.uid}"> 
		<a id="alreadyLearned" href="javascript:void(0);" onClick="location.href='<%=request.getContextPath()%>/student/course'">更多</a>
	</c:if>
</div>

<div class="index_course_etail" id="index_course_etail_learned">

<!-- <div class="kecheng">  -->
<!-- <div class="k1"> -->
<!-- </div> -->
<!-- <div class="k2"> -->
<!-- <li>大学英语语法学习技巧</li> -->
<!-- <li>张雪|江南职业技术学院</li> -->
<!-- <li>高校/数学</li> -->
<!-- <li><span class="jg1">￥80</span> <span class="jg2">￥100</span></li> -->
<!-- </div> -->
<!-- </div> -->
<!-- <div class="hx"></div> -->

</div>


</div>

</div>


		</div>
		<%@ include file="/taglibs/common/footer.jsp"%>
</body>
</html>