<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/calendar.css">
<% 
response.setHeader("Cache-Control","no-store"); 
response.setHeader("Pragrma","no-cache"); 
response.setDateHeader("Expires",0); 
%>
<script type="text/javascript">
	var version = "${version}";
	function tests(classid, curseId, isclick) {
		if (version)
			CoursePage.enterClass(curseId, classid);
		else
			window.external.DoEnterClassRoom(classid, curseId);
	}
</script>

</head>
<body>
	<div class="calendar">
		<ul class="calendarList">
			<li class="nowMonth" style="font-size:36px;font-weight:800;width:130px;padding-top:10px;-webkit-text-stroke-width: 0.2px;"></li>
			<li class="focus"></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div><!--calendar end-->
	<div class="t_courseMain addMain">
		<div class="overflow" id="overflow">${clientCourseByDay.studentUid}</div>
		<div id="userType" style="display:none;">${clientCourseByDay.usertype}</div>
		<div id="t_courseListDiv">
			<ul class="t_courseList">
			</ul>
		</div>		
	</div>
<!-- 	<script src="js/jQuery_1.x.min.js"></script>
	<script src="js/lazyLoad.min.js"></script>
	<script src="js/Calendar.js"></script>
	<script src="js/main.js"></script>
	 -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/lazyLoad.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/CalendarClient.js"></script>


<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/mainClient.js?1205"></script>

</html>
