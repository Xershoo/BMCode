<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
<title>首页</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/indexg.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<script type="text/javascript" src="./js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="./js/main.js"></script>
<script type="text/javascript" src="./js/mainIndex.js"></script>
<script type="text/javascript" src="./js/index/head.js"></script>
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
	<div class="index">
	<div class=h1>
		<div class="fenlei">
			<li class="quanbufenlei">全部分类</li>
			<li class="fl">艺术<img id="u66_line" class="img1"
				src="<%=request.getContextPath()%>/images/c1-1index/u66_line.png"
				alt="u66_line"></li>
			<li class="fl">大学教育<img id="u66_line" class="img1"
				src="<%=request.getContextPath()%>/images/c1-1index/u66_line.png"
				alt="u66_line"></li>
			<li class="fl">职场技能<img id="u66_line" class="img1"
				src="<%=request.getContextPath()%>/images/c1-1index/u66_line.png"
				alt="u66_line"></li>
			<li class="fl">出国、留学<img id="u66_line" class="img1"
				src="<%=request.getContextPath()%>/images/c1-1index/u66_line.png"
				alt="u66_line"></li>
			<li class="fl">兴趣爱好<img id="u66_line" class="img1"
				src="<%=request.getContextPath()%>/images/c1-1index/u66_line.png"
				alt="u66_line"></li>
			<li class="fl">语言培训<img id="u66_line" class="img1"
				src="<%=request.getContextPath()%>/images/c1-1index/u66_line.png"
				alt="u66_line"></li>
			<li class="fl">更多分类</li>
		</div>

		<div class="guanggao">
			<div class="title">
				<li>首页</li>
				<li>全部课程</li>
				<li>平台流程</li>
				<li>下载课吧</li>
			</div>
			<div class="guanggao1">
				<div class="guanggao2"></div>
				<div class="guanggao3" style="display:none"></div>
				<div class="guanggao4" style="display:none"></div>
				<div class="guanggao5" style="display:none"></div>
				<div class="aa"><div calss="a1" onclick="change1()">1</div><div calss="a2" onclick="change2()">2</div><div calss="a3" onclick="change3()">3</div><div calss="a4" onclick="change4()">4</div></div>
			</div>
			<div class="denglu">
				<li class="denglu1"></li>
				<li class="denglu2">
					<div class="huanying"><br><br><br><br>哈喽~欢迎来到课吧！ 
					<br>
					您现在就可以：</div>
					<div class="anniu">
						<div class="denglu3">
							<div class="dl">登陆</div>
						</div>
						<div class="zhuce">
							<div class="zc">注册</div>
						</div>
					</div>
				</li>
			</div>
		</div>
</div>


<div class="h2">
<img id="u311_img" class="img " src="<%=request.getContextPath()%>/images/c1-1index/u311.png">
现时特价
<img id="u122_img" class="img122" src="<%=request.getContextPath()%>/images/c1-1index/u122.png">
</div>

<div class="h3">
<div class="kecheng"> 
<div class="k1">

</div>
<div class="k2">
<li>大学英语语法学习技巧</li>
<li>张雪|江南职业技术学院</li>
<li>高校/数学</li>
<li><span class="jg1">￥80</span> <span class="jg2">￥100</span></li>
</div>
</div>
<div class="hx"></div>
<div class="kecheng"> 
<div class="k1">

</div>
<div class="k2">
<li>大学英语语法学习技巧</li>
<li>张雪|江南职业技术学院</li>
<li>高校/数学</li>
<li><span class="jg1">￥80</span> <span class="jg2">￥100</span></li>
</div>
</div>
<div class="hx"></div>
<div class="kecheng"> 
<div class="k1">

</div>
<div class="k2">
<li>大学英语语法学习技巧</li>
<li>张雪|江南职业技术学院</li>
<li>高校/数学</li>
<li><span class="jg1">￥80</span> <span class="jg2">￥100</span></li>
</div>
</div>
<div class="hx"></div>
<div class="kecheng"> 
<div class="k1">

</div>
<div class="k2">
<li>大学英语语法学习技巧</li>
<li>张雪|江南职业技术学院</li>
<li>高校/数学</li>
<li><span class="jg1">￥80</span> <span class="jg2">￥100</span></li>
</div>
</div>
<div class="hx"></div>
<div class="kecheng"> 
<div class="k1">

</div>
<div class="k2">
<li>大学英语语法学习技巧</li>
<li>张雪|江南职业技术学院</li>
<li>高校/数学</li>
<li><span class="jg1">￥80</span> <span class="jg2">￥100</span></li>
</div>
</div>
</div>

<div class="h2">
<img id="u311_img" class="img " src="<%=request.getContextPath()%>/images/c1-1index/u311.png">
明星老师
<img id="u122_img" class="img122" src="<%=request.getContextPath()%>/images/c1-1index/u122.png">
</div>

<div class="h4">
<div class="laoshi"> 
<div class="l1">

</div>
<div class="l2" onmouseenter="huadong1()" id="l1" onmouseleave="huaxia1()">
<li style="height:30px;"></li>
<li>老师姓名</li>
<li>认证机构/学校名称</li>
<li><span class="jiaoling">教龄</span> <span class="lingyu">授课领域</span></li>
<li>描述词（只有一行）</li>
</div>
</div>
<div class="hx1"></div>
<div class="laoshi"> 
<div class="l1">

</div>
<div class="l2" onmouseenter="huadong()" id="l2" onmouseleave="huaxia()">
<li style="height:30px;"></li>
<li>老师姓名</li>
<li>认证机构/学校名称</li>
<li><span class="jiaoling">教龄</span> <span class="lingyu">授课领域</span></li>
<li>描述词（只有一行）
<br>
描述老师的话描述老师的话描述老师的话描述老师的话描述老师的话描述老师的话描述老师的话..
</li>
</div>
</div>
<div class="hx1"></div>
<div class="laoshi"> 
<div class="l1">

</div>
<div class="l2" onmouseenter="huadong3()" id="l3" onmouseleave="huaxia3()">
<li style="height:30px;"></li>
<li>老师姓名</li>
<li>认证机构/学校名称</li>
<li><span class="jiaoling">教龄</span> <span class="lingyu">授课领域</span></li>
<li>描述词（只有一行）</li>
</div>
</div>
<div class="hx1"></div>
<div class="laoshi"> 
<div class="l1">

</div>
<div class="l2" onmouseenter="huadong4()" id="l4" onmouseleave="huaxia4()">
<li style="height:30px;"></li>
<li>老师姓名</li>
<li>认证机构/学校名称</li>
<li><span class="jiaoling">教龄</span> <span class="lingyu">授课领域</span></li>
<li>描述词（只有一行）</li>
</div>
</div>
<div class="hx1"></div>
<div class="laoshi"> 
<div class="l1">

</div>
<div class="l2" onmouseenter="huadong5()" id="l5" onmouseleave="huaxia5()">
<li style="height:30px;"></li>
<li>老师姓名</li>
<li>认证机构/学校名称</li>
<li><span class="jiaoling">教龄</span> <span class="lingyu">授课领域</span></li>
<li>描述词（只有一行）</li>
</div>
</div>
<div class="hx1"></div>
</div>











	</div>


<%@ include file="/taglibs/common/footer.jsp"%>
</body>
</html>