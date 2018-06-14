<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>我爱课堂</title>
<meta property="qc:admins" content="106036373163413306375" />
<meta property="wb:webmaster" content="ce11f2358edf704e" />

<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head_bm.css"/>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer_bm.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/error_bm.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/index_bm.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js" ></script>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<script type="text/javascript">
	$(function(){
		setTimeout(ChangeTime, 1000);
	});
 
	function ChangeTime() {
		var time;
		time = $("#errorTime").text();
		time = parseInt(time);
		time--;
		if (time <= 0) {
			window.location.href = "/";
		} else {
			$("#errorTime").text(time);
			setTimeout(ChangeTime, 1000);
		}
	}
</script>
</head>
<body>
<div id="outskirts" >
<%@ include file="/taglibs/common/head_bm.jsp"%>
<!-- 错误展示 -->
<div class="midKuang">
	<span class="errot1"><img src="<%=request.getContextPath()%>/images/index/bm/error1.png" /></span>
	<span class="errotFont"><img src="<%=request.getContextPath()%>/images/index/bm/errotFont.png" /></span>
	<div class="errorfont1">
		<span>哎呀！您访问的页面不存在</span>
		<span class="eimg"><img src="<%=request.getContextPath()%>/images/index/bm/errorBack.png" /></span>
		<a href="/"><div>回到首页</div></a>
	</div>
	<div class="errorfont1">
		<font>提示：您可能输错了网址，或该网页已删除或不存在，系统将在&nbsp;<font id="errorTime">5</font>&nbsp;秒后返回首页</font>
	</div>
</div>
<%@ include file="/taglibs/common/footer_bm.jsp"%>
</div>
</body>
</html>