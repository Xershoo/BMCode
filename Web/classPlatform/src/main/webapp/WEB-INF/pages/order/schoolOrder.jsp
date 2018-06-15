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
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
	<script type="text/javascript" src="./js/index/head.js"></script>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/navigationBar.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/order/schoolOrder.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">	
<script type="text/javascript">
	
</script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
	<div class="daohanglan">
		<div class="touxiang_navigationBar">
			<img id="u124_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u124.png">
			<img id="u126_img" class="img "
				src="<%=request.getContextPath()%>/images/c1-2index/u170.png">
			<img id="u165_img" class="img "
				src="<%=request.getContextPath()%>/images/c1-2index/u231.png">

			<div>

				<li class="yonghu"><a>用户姓名</a><a>/昵称</a></li>
				<li class="laoshi">（老师）<a> 切至学生 </a></li>
				<li class="caifu"><img id="u135_img" class="img "
					src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u171.png">
					<a>我的财富 |</a> <img id="u135_img" class="img "
					src="<%=request.getContextPath()%>/images/c3-1-1myjsp1/u505.png">
					<a>个人设置</a></li>
			</div>
		</div>

		<div class="daohanglan1">
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u135.png"><a>我的主页</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u143.png"><a>我的课表</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u139.png"><a>课程管理</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u167.png"><a>创建课程</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u141.png"><a>教学资料库</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u149.png"><a>我的学生</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u151.png"><a>数据统计</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c3-1-2courseteacher/u159.png"><a>我的订单</a></li>
			<li><img id="u135_img" class="img "
				src="<%=request.getContextPath()%>/images/c2-1coursedetail/u905.png"><a>我的账户</a></li>
		</div>

	</div>

	<div class="liebiao">
		<div class="title">
			<div class="title1"><a class="a1" >学校账单</a></div>
		</div>

<div class="tt">
<div class="ttt">
<div class="summary">


</div>
</div>
<div class="tt1"><li>购买者：<input /></li><li>提交时间：<input /></li><li> <div style="width:100px;height:28px;line-height:30px;text-indent: 30px;" class="chax"><a >查询</a></div> </li>
<li><select ><option value="1">最近3个月</option></select></li>

</div>
</div>
<div  id="xn1">
		<div class="biaoge">
			<div class="jibenxinxi">订单信息</div>
			<div class="chuangkeren">购买者</div>
			<div class="jiage">原价</div>
			<div class="renshu">优惠方式</div>
			<div class="jiage">小计</div>
			<div class="zhuangtai">订单状态</div>
			<div class="caozuo">操作</div>
		</div>
<div id="xnTable1">
		<div class="liebiao1">
			<div class="jibenxinxi1">
			<div class="time"></div>
				<div class="img11">
					<li class="i1"><input type="checkbox" name="order">订单号：16659755445</li>
					<li class="i1">课程名称</li>
					<li class="i2"><img id="u202_img" class="img" src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></li>
				<li class="i3">提交时间：2015-10-29 12:00:00</li>
				</div>
			</div>
			<div class="chuangkeren1">
				学生名字昵称
			</div>
			<div class="jiage1">
				<li style="line-height: 140px;" class="jg1">￥购买价格</li>
				<li class="jg2" style="line-height: 0px;">(折扣)</li>
			</div>
			<div class="renshu1">
				满30元减20元
			</div>
			<div class="jiage1">
				￥10
			</div>
			<div class="zhuangtai1">待发布</div>
			<div class="caozuo1">
			<div class="caozuo2">
				<li><div class="tuike">同意退课</div></li>
				<li>查看原因</li>
				<li>删除订单</li>
				</div>
			</div>
		</div>
		<div class="qx">
		<input type="checkbox" name="">全选     <a>删除</a>
		</div>

</div>		
<div id="page"></div>
<div id="" class='tj1'>累计售出<span>4</span>个课程</div>
<div id="" class='tj2'>累计收益<span class="s1">￥</span><span class="s2">10.00</span></div>
</div>	
</div>		
	<%@ include file="/taglibs/common/footer.jsp"%>	
</body>
</html>