<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>支付安全设置</title>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/pay/paySafeSet.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/wealthMenu.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/ajaxRequestInterceptor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/pay/paySafeSet.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>

</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div><img alt="" src="<%=request.getContextPath()%>/wxpay/qrcode?code_url=${code_url}" style="width: 300px;height: 300px;"></div>
<%@ include file="/taglibs/common/footer.jsp"%>

</body>
</html>