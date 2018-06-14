<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title></title>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div style="width:100%;height:810px;background:#17b8ef;text-align:center;">
	<div style="width:560px;height:auto;overflow:hidden;margin:0 auto;padding-top:165px;">
		<div style="width:560px;height:319px;float:left;"><img src="<%=request.getContextPath()%>/images/error.png"></div>
		<div style="width:100%;height:33px;float:left;margin-top:42px;color:#fff;font-size:22px;letter-spacing: 70px;padding-left:35px;">页面找不到了</div>
		<div style="width:100%;height:57px;float:left;margin-top:89px;text-align:center;">
			<div style="width:253px;height:55px;margin:0 auto;border:1px solid #fff;line-height:55px;color:#fff;font-size:18px;border-radius:50px;cursor:pointer;" onclick="location.href='<%=request.getContextPath()%>/'">返回首页</div>
		</div>
	</div>
</div>
<%@ include file="/taglibs/common/footer.jsp"%>
</body>
</html>