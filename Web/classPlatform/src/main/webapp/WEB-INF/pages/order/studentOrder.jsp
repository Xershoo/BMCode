<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
<title>订单管理导航栏</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/order/studentOrder.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/navigation.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/order/studentOrder.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
	
<script type="text/javascript">
	
</script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div class="m_order">
	<jsp:include page="/taglibs/common/studentMenu.jsp">
		<jsp:param value="my_order" name="module"/>
	</jsp:include>
	

	<div class="liebiao">
		<div class="title">
			<div class="title1"><a class="a1" >我的订单</a></div>
		</div>

<div class="tt">
<div class="tt1"><li >订单号：<input id="orderNum"/></li><li >课程名称：<input id="courseName"/></li>

</div>
<div class="tt1"><li >购买者：<input id="buyer"/></li><li>提交时间：<input id="submitTime"  value="" onClick="WdatePicker()" type="text"/></li><li> <div style="width:119px;height:34px;line-height:30px;text-align: center;" class="chax"><a onclick="query()">查询</a></div> </li>
<li><select id="timeselect"><option value="1">最近3个月</option></select></li>

</div>
<div class="tt2" style="height:30px;"> 
<div class="lx" style="height:30px;">订单状态：</div>
				<div class="lxa" style="height:30px;">
					<input type="radio" name="leixing" value="1" onclick="change()" checked="checked"><span
						class="a">全部</span> </input> <input type="radio" name="leixing"
						value="2" onclick="changeType(1)"><span class="a">待支付</span> </input> <input
						type="radio" name="leixing" value="3" onclick="changeType(2)"><span class="a">支付成功
					</span> </input>
					<input type="radio" name="leixing" value="1" onclick="changeType(10)" checked="checked"><span
						class="a">待退款</span> </input>
						<input type="radio" name="leixing" value="1" onclick="changeType(11)" checked="checked"><span
						class="a">退款成功</span> </input>
						<input type="radio" name="leixing" value="1" onclick="changeType(0)" checked="checked"><span
						class="a">已关闭</span> </input>
				</div>

</div>
</div>
<div  id="xn1">
		<div class="biaoge">
			<div class="jibenxinxi">订单信息</div>
			<div class="jiage">原价</div>
			<div class="renshu">优惠方式</div>
			<div class="jiage">小计</div>
			<div class="zhuangtai">订单状态</div>
			<div class="caozuo">操作</div>
		</div>
<div id="xnTable1">
<!-- 		<div class="liebiao1"> -->
<!-- 		<div class="liebiao11"> -->
<!-- 			<div class="jibenxinxi1"> -->
<!-- 			<div class="time"></div> -->
<!-- 				<div class="img11"> -->
					
<!-- 					<div class="i2"> -->
<%-- 					<div class="i21"><img id="u202_img" class="img" src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></div> --%>
<!-- 					<div class="i22"><li>课程名称</li>  <li>老师姓名|学校名称</li>   <li>上课日期</li></div> -->
<!-- 					</div> -->
				
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="jiage1"> -->
<!-- 				<li style="line-height: 140px;" class="jg1">￥购买价格</li> -->
<!-- 				<li class="jg2" style="line-height: 0px;">(折扣)</li> -->
<!-- 			</div> -->
<!-- 			<div class="renshu1"> -->
<!-- 				满30元减20元 -->
<!-- 			</div> -->
<!-- 			<div class="jiage1"> -->
<!-- 				￥10 -->
<!-- 			</div> -->
<!-- 			<div class="zhuangtai1">待发布</div> -->
<!-- 			<div class="caozuo1"> -->
<!-- 			<div class="caozuo2"> -->
<!-- 				<li><div class="tuike">申请退课</div></li> -->
<!-- 				<li>订单详情</li> -->
<!-- 				<li>删除订单</li> -->
<!-- 				<li><div class="zhifu">立即支付</div></li> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			</div> -->
<!-- 			<div class="liebiao12"> -->
			
<!-- 			<div class="i1"><input type="checkbox" name="order">订单号：16659755445</div> -->
<!-- 			<div class="i3">提交时间：2015-10-29 12:00:00</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 		<div class="qx"> -->
<!-- 		<input type="checkbox" name="">全选     <a>删除</a> -->
<!-- 		</div> -->

</div>		
<div id="page"></div>
<!-- <div id="" class='tj1'>累计售出<span>4</span>个课程</div> -->
<!-- <div id="" class='tj2'>累计收益<span class="s11">￥</span><span class="s2">10.00</span></div> -->
</div>	
		</div>
		</div>
	<%@ include file="/taglibs/common/footer.jsp"%>	
</body>
</html>