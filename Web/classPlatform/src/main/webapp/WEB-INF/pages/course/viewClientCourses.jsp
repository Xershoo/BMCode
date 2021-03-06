<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>查看详情(客户端)</title>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/course/viewPianoCoursesDtl.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/dialog.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/reset.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/pagination.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.raty.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/course/viewPianoCoursesDtl.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.pagination.js"></script>
<script type="text/javascript">
	function actixs(classid, courseId) {
		CoursePage.enterClass(courseId, classid);
	}
</script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp" %>
<%@ include file="/taglibs/course/viewClientCoursesDtl.jsp"%>
<%@ include file="/taglibs/common/footer.jsp"%>
<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body> 
</html>