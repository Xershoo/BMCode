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
	href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/course/signUpImmediately.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/page.css">

<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/course/signUpImmediately.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/index/head.js"></script>

</head>
<body>
	<%@ include file="/taglibs/common/head.jsp"%>
	<div class="s_index in_top">
		<div class=h1>
			<div class="fenlei">
				<ul>
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
				</ul>
			</div>

			<div class="guanggao">
				<div class="title">
					<ul>
						<li>首页</li>
						<li>全部课程</li>
						<li>平台流程</li>
						<li>下载课吧</li>
					</ul>
				</div>
				<div class="guanggao1">
					<div class="guanggao2"></div>
					<div class="guanggao3" style="display: none"></div>
					<div class="guanggao4" style="display: none"></div>
					<div class="guanggao5" style="display: none"></div>
					<div class="aa">
						<div class="a1" onclick="change1()">1</div>
						<div class="a2" onclick="change2()">2</div>
						<div class="a3" onclick="change3()">3</div>
						<div class="a4" onclick="change4()">4</div>
					</div>
				</div>
				<div class="denglu">
					<ul>
						<li class="denglu1"></li>
						<li class="denglu2">
							<div class="huanying">
								<br> <br> <br> <br>哈喽~欢迎来到课吧！ <br>
								您现在就可以：
							</div>
							<div class="anniu">
								<div class="denglu3">
									<div class="dl">登陆</div>
								</div>
								<div class="zhuce">
									<div class="zc">注册</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
	<div class="h2">
		<img id="u311_img" class="img "
			src="<%=request.getContextPath()%>/images/c1-1index/u311.png">
		现时特价 <img id="u122_img" class="img122"
			src="<%=request.getContextPath()%>/images/c1-1index/u122.png">
	</div>

	<div class="s_h3"></div>
	<div id="page"></div>
	<%@ include file="/taglibs/common/footer.jsp"%>

</body>
</html>