<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
<title>课程管理导航栏</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/navigation.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/studentCourse.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/course/studentCourse.js"></script>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
	
<script type="text/javascript">
	
</script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div class="m_order">
	<jsp:include page="/taglibs/common/studentMenu.jsp">
		<jsp:param value="my_class" name="module"/>
	</jsp:include>
	<div class="liebiao">
<div class="title" id="studentCourseTitle">
			<div class="title1">
			
			
			<div id="xn_title" class="xn_title1"><span class="a1" >我报名的课程</span></div>
			</div>
		</div>
		<div class="kongbai"></div>
<div class="tt">
<div class="tt1">
<li>课程名称 ：<input id="courseName" /></li><li>报名时间 ：<input id="courseTime"  value="" onClick="WdatePicker()" type="text"> </li><li> <div style="width:68px;height:26px;line-height:30px;text-indent: 30px;" class="chax" onclick="searchCourse()"></div> </li>
<li><select id="timeselect"><option value="1">最近3个月</option></select></li>
</div>
<div class="tt2"> 
<div class="lx">课程状态 ：</div>
				<div class="lxa">
					<input type="radio" name="leixing" value="1" onclick="changeType(0)" checked="checked"><span
						class="a">全部</span> </input> <input type="radio" name="leixing"
						value="2" onclick="changeType(1)"><span class="a">已完成</span> </input> <input
						type="radio" name="leixing" value="3" onclick="changeType(2)"><span class="a">已取消
					</span> </input>
				</div>

</div>
</div>
<div  id="gr1">
		<div class="biaoge">
			<div class="jibenxinxi">基本信息|上课时间</div>
			<div class="jiage">价格</div>
			<div class="renshu">报名时间</div>
			<div class="zhuangtai">课程状态</div>
			<div class="jindu">上课进度</div>
			<div class="caozuo">操作</div>
		</div>
<div id="grTable1">
<!-- 		<div class="liebiao1"> -->
<!-- 			<div class="jibenxinxi1"> -->
<!-- 			<div class="time"></div> -->
<!-- 				<div class="img11"> -->
<%-- 					<li class="i2"><img id="u202_img" class="img" src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></li> --%>
<!-- 				</div> -->
<!-- 				<div class="mc"> -->
<!-- 					<li style="height: 22px">课程名称</li> -->
<!-- 					<li style="height: 22px">老师姓名|学校名字</li> -->
<!-- 					<li style="height: 22px">上课时间</li> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="jiage1"> -->
<!-- 				<li style="line-height: 100px;">￥购买价格</li> -->
<!-- 				<li class="jg2">(折扣)</li> -->
<!-- 			</div> -->
<!-- 			<div class="renshu1"> -->
<!-- 				<span class="yibo">报名时间 -->
<!-- 			</div> -->
<!-- 			<div class="zhuangtai1">待发布</div> -->
<!-- 			<div class="jindu1"> -->
<!-- 				<span class="yishang">以上</span>/总节数 -->
<!-- 			</div> -->
<!-- 			<div class="caozuo1"> -->
<!-- 				<li>申请退款</li> -->

<!-- 				<li>查看原因</li> -->
<!-- 				<li>删除课程</li> -->
<!-- 			</div> -->
<!-- 		</div> -->
		

</div>		

</div>	
		
		<div id="page"></div>
		</div>
		</div>
		<%@ include file="/taglibs/common/footer.jsp"%>
</body>
</html>