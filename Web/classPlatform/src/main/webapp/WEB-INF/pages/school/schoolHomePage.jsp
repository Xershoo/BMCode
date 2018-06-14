<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>学校主页</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/school/schoolHomePage.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<%-- <link rel="stylesheet" href="<%=request.getContextPath()%>/css/school/teacherManage.css"> --%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/dialog.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/school/schoolHomePage.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>

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
	<%@ include file="/taglibs/school/viwepager.jsp"%>
	<%@ include file="/taglibs/common/head.jsp" %>
	<%@ include file="/taglibs/school/schoolPageDtl.jsp"%>
	<%@ include file="/taglibs/common/footer.jsp"%>
	
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>