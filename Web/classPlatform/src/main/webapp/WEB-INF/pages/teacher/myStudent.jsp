<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>我的学生</title>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/school/teacherManage.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/school/studentManage.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/user/myStudent.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/ajaxRequestInterceptor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/user/myStudent.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>

</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<%@ include file="/taglibs/user/myStudentContent.jsp"%>
<%@ include file="/taglibs/common/footer.jsp"%>
</body> 
</html>