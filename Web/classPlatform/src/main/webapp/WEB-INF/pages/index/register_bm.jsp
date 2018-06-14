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
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/register_bm.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/login_bm.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/register_bm.js" ></script>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<script type="text/javascript">  
	function prevent(e) {  
	    e.preventDefault ? e.preventDefault() : e.returnValue = false;  
	}
	
	function digitInput(el, e) {  
	    var ee = e || window.event; // FF、Chrome IE下获取事件对象  
	    var c = e.charCode || e.keyCode; //FF、Chrome IE下获取键盘码  
	    var val = el.val();  
	    if (c == 110 || c == 190){ // 110 (190) - 小(主)键盘上的点  
	        (val.indexOf(".") >= 0 || !val.length) && prevent(e); // 已有小数点或者文本框为空，不允许输入点  
	    } else {  
	        if ((c != 8 && c != 46 && 	// 8 - Backspace, 46 - Delete  
	            (c < 37 || c > 40) && 	// 37 (38) (39) (40) - Left (Up) (Right) (Down) Arrow  
	            (c < 48 || c > 57) && 	// 48~57 - 主键盘上的0~9  
	            (c < 96 || c > 105)) 	// 96~105 - 小键盘的0~9  
	            || e.shiftKey) {    	// Shift键，对应的code为16  
	            prevent(e); 			// 阻止事件传播到keypress  
	        }  
	    }  
	}
	$(function(){  
	    $("input[name='phoneNumber']").keydown(function(e) {  
	        digitInput($(this), e);  
	    });  
	});  
</script>
</head>
<body>
<div id="outskirts" >
<%@ include file="/taglibs/common/head_bm.jsp"%>
<%@ include file="/taglibs/index/registerContent_bm.jsp"%>
<%@ include file="/taglibs/common/footer_bm.jsp"%>
</div>
</body>
</html>