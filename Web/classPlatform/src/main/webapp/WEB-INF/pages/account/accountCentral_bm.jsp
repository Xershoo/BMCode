<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<% String path=request.getContextPath();%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>用户中心</title>
	<link rel="stylesheet" href="<%=path%>/css/account/userData_bm.css" />
	<link rel="stylesheet" href="<%=path%>/css/index/head_bm.css"/>
	<link rel="stylesheet" href="<%=path%>/css/index/index_bm.css"/>
	<link rel="stylesheet" href="<%=path%>/css/index/footer_bm.css" />
	<script type="text/javascript" src="<%=path%>/js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="<%=path%>/js/common.js"></script>
	<script type="text/javascript" src="<%=path%>/js/index/index_bm.js" ></script>
	<script type="text/javascript" src="<%=path%>/js/common.js" ></script>
	<link rel="shortcut icon" href="<%=path%>/images/favicon.png" type="image/x-icon" />
</head>
<body>

	<%@ include file="/taglibs/common/head_bm.jsp"%>
	<%@ include file="/taglibs/account/mysettingsContent_bm.jsp"%>
	<%@ include file="/taglibs/common/footer_bm.jsp"%>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>