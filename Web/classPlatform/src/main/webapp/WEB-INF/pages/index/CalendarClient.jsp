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
<link href="<%=request.getContextPath()%>/css/flickerplate.css"  type="text/css" rel="stylesheet">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/mainClient.css">

<% 
response.setHeader("Cache-Control","no-store"); 
response.setHeader("Pragrma","no-cache"); 
response.setDateHeader("Expires",0); 
%>
</head>
<body>
	
	<div id="client_main">
	
		<div id="client_left">
			<div class="bannerWrap">
				<ul>
					<li data-background="<%=request.getContextPath()%>/images/client/clientBanner1.png">					</li>
					<li
						data-background="<%=request.getContextPath()%>/images/client/clientBanner2.png"></li>
					<li
						data-background="<%=request.getContextPath()%>/images/client/clientBanner3.png"></li>
				</ul>
			</div>
			<div id="client_beginCourse">
				<div class="right_head">
					<div id="right_clock"><img src="<%=request.getContextPath()%>/images/index/clock.png"></div>
					<div id="right_title">即将开课</div>
				</div>
				<div id="rightCourseList" class="right_course">
					<%-- <div class="right_course_main">
						<div class="course_bg"><img src="<%=request.getContextPath()%>/images/index/right_course.png" ></div>
						<div class="right_course_name">快乐钢琴教程钢琴考级钢琴入门</div>
						<div class="course_begin_time">今天10:30</div>
						<div class="arrow-right"></div>
						<div class="clock_dot"><img src="<%=request.getContextPath()%>/images/index/dot.png" ></div>
					</div> --%>
				</div>
			</div>
		</div>
		
		<div id="client_right">
			<div id="client_right_head">
				<div id="headTitle">推荐课程</div>
				<div id="search_input">
					<div id="search_select">
						<div id="select_word">课程</div>
						<div id="change_select"><img src="<%=request.getContextPath()%>/images/head/arrow_down.png"></div>
					</div>
					<div id="keyword_input"><input type="text" id="search_blank" placeholder="想找什么课,搜搜呗"></div>
					<div id="search_btn"><img src="<%=request.getContextPath()%>/images/head/search_white.png"></div>
				</div>
			</div>
			<div id="client_courses_list">
				<%-- <div class="course_infor">
					<div class="course_img"><img src="<%=request.getContextPath()%>/images/index/course1.png"></div>
					<div class="course_price">￥300元</div>
					<div class="information_course">
						<div class="course_name">钢琴课程 李庆园钢琴</div>
						<div class="begin_time">2016-6-1 12:40开课</div>
						<div class="course_teacher">酸蘑菇老师</div>
					</div>
					<div class="zhibo_course">直播</div>
				</div>
				<div class="course_infor"></div>
				<div class="course_infor"></div>
				<div class="course_infor" style="margin-right:0px;"></div>
				<div class="course_infor"></div>
				<div class="course_infor"></div>
				<div class="course_infor"></div>
				<div class="course_infor" style="margin-right:0px;"></div> --%>
			</div>
			<div id="coursesPage" class="page"></div>
		</div>
		
	</div>

	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
	<script src="<%=request.getContextPath()%>/js/modernizr-custom-v2.7.1.min.js" type="text/javascript"></script>
	<script src="<%=request.getContextPath()%>/js/jquery-finger-v0.1.0.min.js" type="text/javascript"></script>
	<script src="<%=request.getContextPath()%>/js/flickerplate.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/mainClient.js?0601"></script>
	<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/js/common/CalendarClient.js"></script>


	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/mainClient.js?1205"></script> --%>
</body>
</html>