<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>学校主页幻灯片</title>

<style>
html {
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	background-color: #fff;
	font-weight: 300;
}
body {
	margin: 0px;
	padding: 0px;
}
a, a:visited {
/* 	color: #E54028; */
	text-decoration: none;
}
a:hover {
/* 	color: #c22d18; */
	text-decoration: underline;
	cursor: pointer;
}
</style>
<script type="text/javascript">
	function goBanner(url){
		if(url.substring(0,7) == 'http://' || url.substring(0,8) == 'https://'){
			window.open(url,'newwindow');
		}else{
			window.open("http://"+url,'newwindow');
		}
	}
</script>


<!--Required libraries-->
<%-- <script src="<%=request.getContextPath()%>/js/jquery-v1.10.2.min.js" type="text/javascript"></script> --%>
<script src="<%=request.getContextPath()%>/js/modernizr-custom-v2.7.1.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/js/jquery-finger-v0.1.0.min.js" type="text/javascript"></script>
<!--Include flickerplate-->
<link href="<%=request.getContextPath()%>/css/flickerplate.css"  type="text/css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/flickerplate.min.js" type="text/javascript"></script>
<!--Execute flickerplate-->
<script>
$(document).ready(function(){
	$('.flicker-example').flicker();
});
</script>
</head>
<body>

	<div class="flicker-example" data-block-text="false">
		<ul>
			<c:forEach items="${schoolBanners}" var="banners" varStatus="banner">
				<li data-background="${banners.bannerUrl}"
					title="${banners.description}"
					onclick="goBanner('${banners.linkUrl}');"
<%-- 					 onclick="parent.location.href='${banners.linkUrl}'" target="_blank" --%>
					style="cursor: pointer;">
				</li>
			</c:forEach>
		</ul>
	</div>

</body>
</html>
