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
					<li data-background="<%=request.getContextPath()%>/images/client/english/1.png">					</li>
					<li
						data-background="<%=request.getContextPath()%>/images/client/english/2.png"></li>
					<li
						data-background="<%=request.getContextPath()%>/images/client/english/3.png"></li>
				</ul>
			</div>
			<div id="client_beginCourse">
				<div class="right_head">
					<div id="right_clock"><img src="<%=request.getContextPath()%>/images/index/clock.png"></div>
					<div id="right_title">New Class</div>
				</div>
				<div id="rightCourseList" class="right_course"></div>
			</div>
		</div>
		
		<div id="client_right">
			<div id="client_right_head">
				<div id="headTitle">Recommending Class</div>
				<div id="search_input">
					<div id="search_select">
						<div id="select_word">course</div>
						<div id="change_select"><img src="<%=request.getContextPath()%>/images/head/arrow_down.png"></div>
					</div>
					<div id="keyword_input"><input type="text" id="search_blank" placeholder="search class"></div>
					<div id="search_btn"><img src="<%=request.getContextPath()%>/images/head/search_white.png"></div>
				</div>
			</div>
			<div id="client_courses_list"></div>
			<div id="coursesPage" class="page"></div>
		</div>
		
	</div>

	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
	<script src="<%=request.getContextPath()%>/js/modernizr-custom-v2.7.1.min.js" type="text/javascript"></script>
	<script src="<%=request.getContextPath()%>/js/jquery-finger-v0.1.0.min.js" type="text/javascript"></script>
	<script src="<%=request.getContextPath()%>/js/flickerplate.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/clientEng/jquery.myPagination.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/clientEng/mainClientEng.js"></script>
</body>
</html>