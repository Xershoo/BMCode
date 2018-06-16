<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
<title>课程管理导航栏</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/navigationBar.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/account.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/wealthMenu_bm.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/myAccount.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>

<div class="all">
<!-- <div id="zhezhao" style="background-color:#000;position:fixed;left:0;top:0;width:100%;height:100%;z-index:99999;display:none" ></div> -->
	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/wealthMenu_bm.jsp">
		<jsp:param value="my_account" name="module"/>
	</jsp:include>
	<!-- over -->
	<div class="zhanghu" >
		<div class="zhanghu1">我的账户<span id="tips">财富中心，方便管理你的小金库~</span></div>

		<div class="zhanghuyue" id="zhanghu">
			<div class="zhanghu2">
<!-- 				<span>小心旁人瞄你的[</span><a>小金库</a></a><span>]呦~</span> -->
			</div>
			<div class="zhanghu3">
				<div class="yue">账户余额</div>
				<div class="yue1">
					当前余额：<span id="dangqianyue1">0.0</span>元
				</div>
				<div class="chongzhi">
					<div>
						<span id="chongzhi" onclick="toRecharge()">充值</span>
					</div>
					<div>
					
<!-- 					暂时注释掉 -->
<!-- 						<span id="tixian">提现</span> -->
					</div>
				</div>
				<div></div>
			</div>
		</div>

		<div class="chongzhi0" style="display: none;" id="zhanghuchongzhi">
			<div class="chongzhi1">账户充值:</div>
			<div class="chongzhixinxi">
				<div class="chongzhixinxi1">
<!-- 					<div class="dangqianzhanghao">当前账号：135*****210</div> -->
					<div class="dangqianyue">
						当前余额：<span id="dangqianyue">0.00</span>元
					</div>
					<div class="jine">
						充值金额：<input value="0.00" id="jine" />元
					</div>
					<div class="fangshi">充值方式：</div>
					<div class="zhifubao">
						<input type="radio" name="zhifu" value="1"/><img id="zhifubao"
							src="<%=request.getContextPath()%>/images/zhifubao.png">
							<input type="radio" name="zhifu" value="2"/><img id="zhifubao"
							src="<%=request.getContextPath()%>/images/WePayLogo.png">
					</div>
					<div class="lijichongzhi">
						<a onclick="recharge()"><div>立即充值</div></a>
					</div>
				</div>
			</div>

		</div>


	</div>
	</div>
	
<%@ include file="/taglibs/common/footer.jsp"%>
</body>
</html>