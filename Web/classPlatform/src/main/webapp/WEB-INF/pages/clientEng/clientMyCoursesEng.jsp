<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/clientMyCourses.css">

<% 
response.setHeader("Cache-Control","no-store"); 
response.setHeader("Pragrma","no-cache"); 
response.setDateHeader("Expires",0); 
%>
<script type="text/javascript">
	function tests(classid, courseId) {
		CoursePage.enterClass(courseId, classid);
	}
</script>

</head>
<body>
	<input type="hidden" value="${myCourses.userId }" id="userId">
	<div id="coursesMain">
		<div id="myCoursesHead">
			<div id="myCourses" class="headCommon activeCommon" style="width:120px">class registered</div>
			<div id="myCreate" class="headCommon" style="width:120px">class created</div>
			<div id="clientCreateCourseLink" style="width:120px">create class</div>
		</div>
		<div id="coursesList">
			<div class="coursesListMain"></div>
			<div id="coursesPage" class="page"></div>
			<div id="createPage" class="page"></div>
		</div>
	</div>
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/clientEng/jquery.myPagination.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/clientEng/clientMyCourses.js?0817"></script>
</body>
</html>