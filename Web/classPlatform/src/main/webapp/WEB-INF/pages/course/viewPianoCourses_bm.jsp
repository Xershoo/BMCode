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
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/course/viewPianoCoursesDtl_bm.css">

<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/dialog.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/reset.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/pagination.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.raty.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/course/viewPianoCoursesDtl.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.pagination.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/index_bm.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js" ></script>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<script type="text/javascript">
	function actixs(classid, courseId) {
		CoursePage.enterClass(courseId, classid);
	}
</script>
</head>
<body>
<div id="outskirts" >
<%@ include file="/taglibs/common/head_bm.jsp"%>
<%@ include file="/taglibs/course/viewPianoCoursesDtl_bm.jsp"%>
<%@ include file="/taglibs/common/footer_bm.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</div>

</body>
</html>