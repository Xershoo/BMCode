<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>我的主页（老师）</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/teacher/teacherHomePage.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<%-- <link rel="stylesheet" href="<%=request.getContextPath()%>/css/school/teacherManage.css"> --%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/teacher/teacherHomePage.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>

</head>
<body>
	<%@ include file="/taglibs/common/head.jsp" %>
	<%@ include file="/taglibs/teacher/teacherPageDtl.jsp"%>
	<%@ include file="/taglibs/common/footer.jsp"%>
</body>
</html>