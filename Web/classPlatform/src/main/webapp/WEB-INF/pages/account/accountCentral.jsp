<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>用户中心</title>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/accountMenu.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/account/userData.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/account/icon.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/dialog.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/cropper.css" type="text/css" />


<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/bootstrap.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/cropper.js"></script>

<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/cropbox.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/account/userData.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/index/head.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<style type="text/css">
.ui-widget{
	font-family:'微软雅黑 Regular','微软雅黑';
}
.ui-dialog .ui-dialog-titlebar-close span{
	display:block;
}
</style>
</head>
<body>
	<%@ include file="/taglibs/common/head.jsp"%>
	<%@ include file="/taglibs/account/userDataContent.jsp"%>
	<%@ include file="/taglibs/common/footer.jsp"%>

	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>