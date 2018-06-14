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
			<div id="myCourses" class="headCommon activeCommon">我的订购</div>
			<div id="myCreate" class="headCommon">我的创建</div>
			<div id="clientCreateCourseLink">创建课程</div>
		</div>
		<div id="coursesList">
			<div class="coursesListMain">
				<%-- <div class="courseInfo">
					<div class="coverImg"><img src="<%=request.getContextPath()%>/images/index/course1.png"></div>
					<div class="courseInfoBasic">
						<div class="courseName">哆来音乐课之钢琴专业三级训练哆来音乐课之钢琴钢琴专业三级训练</div>
						<div class="proAndStu">
							<div class="proImg"><img src="<%=request.getContextPath()%>/images/piano_teacher/progress.gif"></div>
							<div class="infoVal">课程进度：11/13</div>
							<div class="stuImg"><img src="<%=request.getContextPath()%>/images/piano_teacher/apply.gif"></div>
							<div class="infoVal">报名学生：10/56</div>
						</div>
						<div class="courseTime">
							<div class="timeImg"><img src="<%=request.getContextPath()%>/images/piano_teacher/time.gif"></div>
							<div class="infoVal">课程时间：2015/05/20 14:30</div>
						</div>
					</div>
					<div class="coursePrice">￥300</div>
					<div class="courseOpt">
						<div class="opt_status">未开课</div>
						<div class="opt_info">查看详情</div>
						<div class="opt_enterClass">进入课堂</div>
					</div>
				</div> --%>
			</div>
			<div id="coursesPage" class="page"></div>
			<div id="createPage" class="page"></div>
		</div>
	</div>

	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/clientMyCourses.js?0602"></script>
</body>
</html>