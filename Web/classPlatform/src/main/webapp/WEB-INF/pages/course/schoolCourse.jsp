<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
<title>课程管理导航栏</title>
<script type="text/javascript">
	var userid=${user.uid}
</script>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />

<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/course/schoolCourse.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/course/schoolCourse.js"></script>	
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/dialog.css">

</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div>
<div class="m_order">
	<jsp:include page="/taglibs/common/schoolMenu.jsp">
		<jsp:param value="class_mgn" name="module"/>
	</jsp:include>
	<input type="hidden" value="1" id="courseType"/>
	<div class="liebiao">
		<div class="title" id="teacherCourseTitle">
			<div class="title1">
			<div id="xn_title" class="xn_title1"><a class="a1" onclick="changeType(1)">校内课程</a></div>
			
 			<div id="gk_title"><a class="a2" onclick="changeType(2)">学校公开课程</a></div> 
			
			
<!-- 			<div id="gr_title"><a class="a3" onclick="changeType(3)"> 个人公开课程</a></div>  -->
			</div>
			<div class="title2">
				<div class="title2_img"><img id="add" class="img" src="<%=request.getContextPath()%>/images/manageCourse/add_03.png"></div><div class="title2_course"><span onclick="toCreateCourse()">创建课程</span></div>
			</div>
		</div>
		<div class="title_block">
		</div>
<!-- <div class="title" id="studentCourseTitle"> -->
<!-- 			<div class="title1">我报名的课程</div> -->
<!-- 		</div> -->
<div class="tt">
<div class="tt1"><li>课程名称 ：<input id="courseName"/></li><li id="creator">创课人 ：<input id="creatorName"/></li><li>创建时间 ：<input id="courseTime"  value="" onClick="WdatePicker()" type="text"/></li><li> <div style="width:68px;height:26px;line-height:30px;text-indent: 30px;" class="chax" onclick="searchCourse()"></div> </li>
<li style="float:right;margin-right:10px;"><select id="timeselect"><option value="1">最近3个月</option></select></li>
</div>
<div class="tt2"> 
<div class="lx">课程状态 ：</div>
				<div class="lxa" id="xn_status" >
					<input type="radio" name="leixing" value="1" onclick="changeStatus(1,0)" checked="checked"><span
						class="a">全部</span> </input> <input type="radio" name="leixing"
						value="2" onclick="changeStatus(1,1)"><span class="a">已完成</span> </input> <input
						type="radio" name="leixing" value="3" onclick="changeStatus(1,2)"><span class="a">已取消
					</span> </input>
				</div>
<div class="lxa" id="xx_status" style="display:none">
					<input type="radio" name="leixing" value="1" onclick="changeStatus(2,0)" checked="checked"><span
						class="a">全部</span> </input> <input type="radio" name="leixing"
						value="2" onclick="changeStatus(2,1)"><span class="a">已完成</span> </input> <input
						type="radio" name="leixing" value="3" onclick="changeStatus(2,2)"><span class="a">已取消
					</span> </input>
				</div>
				<div class="lxa" id="gr_status" style="display:none">
					<input type="radio" name="leixing" value="1" onclick="changeStatus(3,0)" checked="checked"><span
						class="a">全部</span> </input> <input type="radio" name="leixing"
						value="2" onclick="changeStatus(3,1)"><span class="a">已完成</span> </input> <input
						type="radio" name="leixing" value="3" onclick="changeStatus(3,2)"><span class="a">已取消
					</span> </input>
				</div>
</div>
</div>
<!-- 校内课程 -->
<div  id="xn1" style="display:none;">
		<div class="biaoge">
			<div class="jibenxinxi">基本信息</div>
			<div class="chuangkeren">创课人</div>
			<div class="jiage">价格</div>
			<div class="renshu">校内学生</div>
			<div class="renshu">报名学生</div>
			<div class="zhuangtai">课程状态</div>
			<div class="jindu">上课进度</div>
			<div class="caozuoxn">操作</div>
		</div>
<div id="xnTable1">
		<div class="liebiao1">
		<div class="liebiao11" style="float:none;">
			<div class="jibenxinxi1">
			<div class="time"></div>
				<div class="img11">
					<li class="i2"><img id="u202_img" class="img" src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></li>
					<li style="height: 22px">课程名称</li>
				</div>
			</div>
			<div class="chuangkeren1">
				<li style="line-height: 100px;">创建者名字</li>
			</div>
			<div class="jiage1">
				<li style="line-height: 100px;">￥购买价格</li>
				<li class="jg2">(折扣)</li>
			</div>
			<div class="renshu1">
				<span class="yibo">以报</span>/总人数
			</div>
			<div class="renshu1">
				<span class="yibo">多大的
			</div>
			<div class="zhuangtai1">待发布</div>
			<div class="jindu1">
				<span class="yishang">以上</span>/总节数
			</div>
			<div class="caozuo_xn1">
				<li>发布课程</li>
                <li>取消发布</li>
				<li>修改详情</li>
				<li>停售课程</li>
				<li>删除课程</li>
			</div>
		</div>	
		<div class="liebiao12" style="float:none;text-indent: 55em;"> 创建于2014/10/12 12:24:29</div>	
			
		</div>
		

</div>		

</div>	
<!-- 个人课程 -->
<div  id="gr1" style="display:none;">
		<div class="biaoge">
			<div class="jibenxinxi">基本信息</div>
			<div class="jiage">价格</div>
			<div class="renshu">报名学生</div>
			<div class="zhuangtai">课程状态</div>
			<div class="jindu">上课进度</div>
			<div class="caozuo">操作</div>
		</div>
<div id="grTable1"> 
		<div class="liebiao1">
			<div class="jibenxinxi1">
				<div class="img11">
					<li class="i2"><img id="u202_img" class="img" src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></li>
				<li style="height: 22px">课程名称</li>
				
				</div>
			</div>
			<div class="jiage1">
				<li style="line-height: 100px;">￥购买价格</li>
				<li class="jg2">(折扣)</li>
			</div>
			<div class="renshu1">
				<span class="yibo">多大的
			</div>
			<div class="zhuangtai1">待发布</div>
			<div class="jindu1">
				<span class="yishang">以上</span>/总节数
			</div>
			<div class="caozuo1">
				<li>发布课程</li>
				<li>修改详情</li>
				<li>停售课程</li>
				<li>删除课程</li>
				
				<li style="margin-top:70px;" class="caozuo1_li">创建于2015</li>
			</div>
		</div>
		

</div>		

</div>	
<!-- 公开课程 -->
<div  id="gk1" style="display:none;">
		<div class="biaoge">
			<div class="jibenxinxi">基本信息</div>
			<div class="chuangkeren">创课人</div>
			<div class="jiage">价格</div>
			<div class="renshu">报名人数</div>
			<div class="zhuangtai">课程状态</div>
			<div class="jindu">上课进度</div>
			<div class="caozuogk">操作</div>
		</div>
<div id="gkTable1">
		<div class="liebiao1">
		<div class="liebiao11" style="float:none;">
			<div class="jibenxinxi1">
			<div class="time"></div>
				<div class="img11">
					<li class="i2"><img id="u202_img" class="img" src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></li>
					<li style="height: 22px">课程名称</li>
				</div>
			</div>
			<div class="chuangkeren1">
				<li style="line-height: 100px;">创建者名字</li>
			</div>
			<div class="jiage1">
				<li style="line-height: 100px;">￥购买价格</li>
				<li class="jg2">(折扣)</li>
			</div>
			<div class="renshu1">
				<span class="yibo">以报</span>/总人数
			</div>
			<div class="zhuangtai1">待发布</div>
			<div class="jindu1">
				<span class="yishang">以上</span>/总节数
			</div>
			<div class="caozuo_xn1">
				<li>发布课程</li>
                <li>取消发布</li>
				<li>修改详情</li>
				<li>停售课程</li>
				<li>删除课程</li>
			</div>
		</div>	
		<div class="liebiao12" style="float:none;text-indent: 55em;"> 创建于2014/10/12 12:24:29</div>	
			
		</div>
		

</div>		

</div>

<div style="display:none;" id="xn2">
		<div class="biaoge">
			<div class="jibenxinxixn">基本信息</div>
			<div class="chuangkerenxn">创课人</div>
			<div class="jiagexn">价格</div>
			<div class="renshuxn">报名人数</div>
			<div class="jinduxn">上课进度</div>
			<div class="caozuoxn">操作</div>
		</div>

		<div class="liebiao1">
			<div class="jibenxinxi1xn">
				<div class="img11">
					<li class="i1">创建时间</li>
					<li class="i2"><img id="u202_img" class="img "
						src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></li>
				</div>
				<div class="mc">
					<li style="height: 22px">课程名称</li>
				</div>
			</div>
			<div class="chuangkeren1xn">
				<li style="line-height: 100px;">创建者名字</li>
				<li>(学校名称老师姓名)</li>
			</div>
			<div class="jiage1xn">
				<li style="line-height: 100px;">￥购买价格</li>
				<li class="jg2">(折扣)</li>
			</div>
			<div class="renshu1xn">
				<span class="yibo">以报</span>/总人数
			</div>
			<div class="jindu1xn">
				<span class="yishang">以上</span>/总节数
			</div>
			<div class="caozuo1xn">
				<li>发布课程</li>

				<li>修改详情</li>
				<li>停售课程</li>
				<li>删除课程</li>
			</div>
		</div>
		</div>	
		<div style="display:none;" id="xn3">
	<div class="biaoge">
			<div class="jibenxinxixn">基本信息</div>
			<div class="chuangkerenxn">创课人</div>
			<div class="jiagexn">价格</div>
			<div class="renshuxn">报名人数</div>
			<div class="jinduxn">取消原因</div>
			<div class="caozuoxn">操作</div>
		</div>

		<div class="liebiao1">
			<div class="jibenxinxi1xn">
				<div class="img11">
					<li class="i1">创建时间</li>
					<li class="i2"><img id="u202_img" class="img "
						src="<%=request.getContextPath()%>/images/c1-1index/u362.png"></li>
				</div>
				<div class="mc">
					<li style="height: 22px">课程名称</li>
				</div>
			</div>
			<div class="chuangkeren1xn">
				<li style="line-height: 100px;">创建者名字</li>
				<li>(学校名称老师姓名)</li>
			</div>
			<div class="jiage1xn">
				<li style="line-height: 100px;">￥购买价格</li>
				<li class="jg2">(折扣)</li>
			</div>
			<div class="renshu1xn">
				<span class="yibo">以报</span>/总人数
			</div>
			<div class="jindu1xn">
				审核未通过
			</div>
			<div class="caozuo1xn">
				<li>发布课程</li>

				<li>修改详情</li>
				<li>停售课程</li>
				<li>删除课程</li>
			</div>
		</div>	
	</div>
		
<!-- 		<div class="fenye"> -->
<!-- 			<li><</li> -->
<!-- 			<li>1</li> -->
<!-- 			<li>...</li> -->
<!-- 			<li>10</li> -->
<!-- 			<li>11</li> -->
<!-- 			<li>12</li> -->
<!-- 			<li>></li> -->
<!-- 		</div> -->
		<div id="page"></div>
		</div>
		</div>
		</div>
		<div id="dialog" title="停售课程" style="display: none">
		<div class="stopCourse">
		<div class="stopCourse_reason"><span id="red">*</span>停售原因:<select id="reason"><option value="0">请选择</option><option value="1">个人时间问题</option><option value="2">其他原因</option></select></div>
		<div class="stopCourse_description"><div id="buchong">补充说明:</div><div id="buchong_textarea"><textarea rows="" cols="" id="reason_description"></textarea></div></div>
		<div class="stopCourse_reason">违约金额：<span id="weiyuejin">123.00 </span>元<span  id="chongzhi_stop"> <a href='<%=request.getContextPath()%>/myAccount'><span id="red">*余额不足请先</span><span id="blue"> 充值  </span></a><span id="red">!</span></span></div>
		<div class="stopCourse_reason">支付密码：<input type="password" id="password"/></div>
		<div class="stopCourse_tip"><img id="u2601_img" class="img " src="<%=request.getContextPath()%>/images/course/u2707.png">课程停售前需先缴清违约金！课程停售后，您和学生将无法继续上课！另外会根据课程进度退回学生学费及您的酬劳。（   退款说明   ）</div>
		<div class="ts6">
		<input type="hidden" value='' id="courseId">
		<input type="hidden" value='0' id="stop_flag">
				<a><div class="qx" onclick="cancel()">取消</div></a><a><div class="qd" onclick="stopCourse()">确定</div></a>
			</div>
		</div>
		
		</div>
		<div id="dialog1" title="停售课程" style="display: none">
		<div class="stopCourse">
		<div class="stopCourse_reason"><span id="red">*</span>停售原因:<select id="reason1"><option value="0">请选择</option><option value="1">个人时间问题</option><option value="2">其他原因</option></select></div>
		<div class="stopCourse_description"><div id="buchong">补充说明:</div><div id="buchong_textarea"><textarea rows="" cols="" id="reason_description1"></textarea></div></div>
		<div class="stopCourse_tip"><img id="u2601_img" class="img " src="<%=request.getContextPath()%>/images/course/u2707.png">课程停售后，老师和学生无法上课！</div>
		<div class="ts6">
		<input type="hidden" value='' id="courseId">
		<input type="hidden" value='0' id="stop_flag">
				<a><div class="qx" onclick="cancel()">取消</div></a><a><div class="qd" onclick="stopCourse1()">确定</div></a>
			</div>
		</div>
		
		</div>
		<%@ include file="/taglibs/common/footer.jsp"%>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>