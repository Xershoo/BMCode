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
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/course/creatCourse.js"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/ajaxfileupload.js"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/json2.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/cropper.js"></script>
<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.min.js"></script> --%>

<link rel="stylesheet"	href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/creatCourse.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
	<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/index/footer.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/dialog.css">

<link rel="stylesheet" href="<%=request.getContextPath()%>/css/cropper.css" type="text/css" />
 <script type="text/javascript"> 
  


 </script> 
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div class="creat_main">
	<jsp:include page="/taglibs/common/teacherMenu.jsp">
		<jsp:param value="course_mgn" name="module"/>
	</jsp:include>
	<div class="zhanghu">
	<div class="zhanghu1">创建课程</div>
<div class="zhanghu5">
		<div class="jiinxi">
			
			<div class="chuangkeleixing">
				<div class="lxa">
<input type="hidden" value="1" id="val_payPlatform">
<div onclick="changeType1()" id="lxa_xn" >校内课程</div>
<div onclick="changeType2()" id="lxa_gk">学校公开课程</div>
<div id="lxa_ge" onclick="changeType3()">个人公开课程</div>
				</div>

			</div>



			<div class="xinxi"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png"> <span>基本信息</span></div>
			<div class="fengexian"></div>
			<div class="mingcheng">
				课程名称 :<input placeholder="请输入课程名称，最多50个字" id="courseName" maxlength="50"></input><span id="cn" class="yanzheng"></span>
			</div>
<!-- 			暂时注释掉 -->
<!-- 			<div class="fenlei"> -->
<!-- 				课程分类 :<select id="courseCat" onchange="queryCourseCat1()"> -->
<!-- 				</select> <select class="yuyan" id="courseCat1" onchange="queryCourseCat2()"> -->
<!-- 				</select> <select class="yuyan" id="courseCat2"> -->
<!-- 				</select><span id="fenlei" class="yanzheng"></span> -->
<!-- 			</div> -->
<!-- 			暂时注释掉 -->
<!-- 			<div class="laoshi1"> -->
<!-- 				授课老师 <input type="text" id="shoukelaoshi"> </input><span id="skls" class="yanzheng"></span><a class="xzls" id="dialog_link"> -->
<!-- 					选择老师</a> -->

<!-- 			</div> -->

			<div class="kechengtupian">
				<div class="kechengtupian1">课程图片 :</div>
				<div class="kechengtupian2">
					<div>
						<img id="u247_img" class="img " src="<%=request.getContextPath()%>/images/c1-1index/u362.png">
						<div id="r_v_chfile3">
<!-- 						<input type="file" id="photo" name="photo" accept="image/gif, image/jpeg" onchange="ajaxFileUpload(this)"><input  type="hidden" value="0" id="f"/> -->
						<input type="button" id="sago" name="photo" value="选择头像" ><input  type="hidden" value="0" id="f"/>
						</div>
						<span>
					</div><span id="sfile" class="yanzheng"></span>
					<div class="ziti">
						支持 jpg、jpeg、png格式的图片 <br>并且小于1M，最佳效果500 px * 300 px

					</div>
				</div>
				<div class="kechengtupian3">
					<div>
						<img id="u250_img" class="img "
							src="<%=request.getContextPath()%>/images/c3-1-3createcourse/u250.png">
					</div>
					<div class="ziti">
						建议老师可上传体现课程特色的照片，这<br>样推广才会更有效果。
					</div>
				</div>
			</div>
			<div class="jianjie">
				<div class="jj">课程简介 :</div>
				<div class="jj1">
					<textarea   rows="20" cols="100" id="courseDescription"  name="editor01"> </textarea ><span id="jjy" class="yanzheng">
				</div>
			</div>


		</div>




		<div class="jiaoxuejihua0">
			<div class="jiaoxuemubiao"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png"> <span>教学计划</span></div>
			<div class="fengexian"></div>
<!-- 			<div class="mubiao" > -->
<!-- 				教学目标 : <input placeholder="最多50个字" id="courseTarget" maxlength="50"/><span id="mb" class="yanzheng"> -->
<!-- 			</div> -->
<!-- 			<div class="renqun"> -->
<!-- 				教学对象 : <input placeholder="最多50个字" id="people" maxlength="50"/><span id="rq" class="yanzheng"> -->
<!-- 			</div> -->
			<div class="kj0">
				课节安排 : 
			</div>
<div class="kj">
				 第一节： <input placeholder="最多50个字" id="classArrangement" maxlength="50"/><span id="ca" class="yanzheng"></span>
			</div>
			<div class="ks">
			<div class="del_a1">
				课节时间 :<input id="courseTime"  placeholder="YYYY-MM-DD" onClick="WdatePicker({minDate:'%y-%M-%d'})" type="text"><input class="laydate-icon" placeholder="课程开始时间" id="start"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss'})"></input><input class="laydate-icon" id="end"  placeholder="课程结束时间"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'start\')}'} )"></input>
<!-- 				<a id="aa" ><div>删除该课节</div></a>	 -->
			</div>		
					<div class="del_a"><a id="aa" >删除该课节</a></div>
			</div>
<div id="xinkejie">


</div>
			<div class="ks1">
				<img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/add_03.png"><a onclick="add()">添加新课节</a>
			</div>
			
		</div>

		<div class="xuesheng">
			<div class="xuesheng1" ><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png"> <span>选择学生</span></div>
			<div class="fengexian"></div>
			<div class="xuesheng2">
				请选择将要学习本课程的本校学生：<a id="dialog_link1" class="xzls">选择学生</a>
			</div>
<!-- 			<div class="xuesheng2" style="display:none"> -->
<!-- 				：<a id="dialog_link1" class="xzls">选择学生</a> -->
<!-- 			</div> -->
			<input type="hidden" value="" id="studentId"></input>
		</div>

<!-- 暂时注释掉 -->
<!-- 		<div class="xuesheng"> -->
<%-- 			<div class="xuesheng1"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png">公开设置</div> --%>
<!-- 			<div class="fengexian"></div> -->
<!-- 			<div class="xuesheng2"> -->
<!-- 				<input type="checkbox" name="gk" id="gk"/><span>允许校外学生报名参加课程</span> -->
<!-- 			</div> -->
<!-- 		</div> -->

<!-- <div class="jihua"> -->
<%-- 			<div class="jiage1"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png">报名计划</div> --%>
<!-- 				<div class="fengexian"></div> -->
<!-- 			<div class="jiage2"> -->
<!-- 				<span>报名人数 : </span><input type="text" value="" id="minStudents"/>~<input type="text" value="" id="maxStudents"/>人 -->
<!-- 			</div> -->
<!-- 			<div class="jiage2"> -->
<!-- 				<span>报名时间 :</span><input type="text" value="" id="startb" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd HH:mm'})"/>~<input type="text" value="" id="endb"  onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'startb\')}'} )"/> -->
<!-- 			</div> -->
	
<!-- 		</div> -->



		
<div class="jiage">
			<div class="jiage1"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png">课程价格</div>
			<div class="fengexian"></div>
			<div class="jiage2">
				<span>课程价格 : </span><input type="text" value="0.00" id="coursePrice" name="price"/>元
			</div>
			<div class="jiage3">
				<div class="jg1"><li >根据您输入的信息，我们为您计算出， 日后该课程的收益为</li></div><div  class="jg2"><li id="income"></li>
<!-- 				<li>-￥10.00。</li> -->
				</div>
			</div>
			<div class="jiage4" style="display:none;">
			为了保证您的利益，请重新调整课价。
			</div>
	
		</div>
		
		<div class="caozuo">
			<a>
				<div class=caozuo1>
<!-- 					<div class="yulan">预览</div> -->
<!-- 			</a><a><div class="baocun">发布</div></a> -->
			
			<a><div class="quxiao" id="save">发布</div></a>
		</div>
		</div>
	</div>
	
	</div>
	<div id="dialog" title="选择授课老师" style="display:none;">
		<div class="d1">
			<div class="teacher_1">
				<li>院系 <select id="colleget" onchange="getmajorlist(1)" class="college"><option value="0">请选择院系</option></select></li>
				<li>专业  <select id="majort" ></select></li>
			</div>
			<div class="teacher_2">
				<li>姓名 <input id="teacher_tname"/></li>
				<li>工号 <input id="teacher_tnum"/></li>
			</div>
			<div class="t3_creatCourse">
				<a><div onclick="queryTeacher()" class="queryTeacher">查询</div></a>
			</div>
			<div class="t4" >
				<table class="tab" id="tabTeacher">
<!-- 					<tr class="td1"> -->
<!-- 						<td>姓名</td> -->
<!-- 						<td>工号</td> -->
<!-- 						<td>院系</td> -->
<!-- 						<td>专业</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio" name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="radio"  name="teacher" value="1"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
				</table>
			</div>
			<div class="t5">
				<span>只能选择一位老师作为该课程的授课老师~</span>
			</div>
			<div class="t6">
				<a><div class="qx">取消</div></a><a><div class="qd" onclick="confirmTeacher()">确定</div></a>
			</div>
		</div>
	</div>
	
		<div id="dialog1" title="选择本校学生" style="display: none">
		<div class="dxs">
			<div class="ts1">
				<li>院系 <select id="college" onchange="getmajorlist(2)" class="college"><option value="0">请选择院系</option></select></li>
				<li>专业 <select id="major" onchange="getclasslist()"></select></li>
				<li>班级 <select id="classs"></select></li>
			</div>
			<div class="ts2">
				<li>姓名 <input id="student_sname"/></li>
				<li>工号 <input id="student_snum"/></li>
				<li><a><div onclick="queryStudent()" class="queryStudent">查询</div></a></li>
			</div>
			<div class="ts4">
			
			
			
				<table class="tabs" id="tabStudent">
<!-- 					<tr class="td1"> -->
<!-- 						<td>姓名</td> -->
<!-- 						<td>学号</td> -->
<!-- 						<td>院系</td> -->
<!-- 						<td>专业</td> -->
<!-- 						<td>班级</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
<!-- 					<tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr><tr class="td2"> -->
<!-- 						<td><input type="checkbox" name="student"/>张三丰</td> -->
<!-- 						<td>201547899</td> -->
<!-- 						<td>音乐系</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 						<td>声乐表演</td> -->
<!-- 					</tr> -->
				</table>
			</div>
			<div class="ts5" style="text-align:left;">
				<input type="checkbox" id="checkAll" >全选<span>已选<a class="shuliang" style="font-family: '微软雅黑 Bold','微软雅黑';font-weight: 700;font-size: 14px;color: #ff0000;" id="student_count">0</a>位本校学生</span>
			</div>
			<div class="ts6">
				<a><div class="qx">取消</div></a><a><div class="qd" onclick="confirmStudent()">确定</div></a>
			</div>
		</div>
		
		</div>
		
		
		
		<div id="dialog2" title="选择头像" style="display: none">
		<div class="xztx1">
		<div class="container" >
  <img src="/images/sago.jpg" class="cropper">
        </div>
         <div class="preview" ></div>
         </div>
         <div class="xztx2">
         <div class="baocun" id="btnAgain" >
<label class="btn btn-primary" for="inputImage" title="Upload image file">
          <input class="hide" id="inputImage" name="file" type="file" accept="image/*">
          选择图片
        </label>
</div>
  <div class="baocun" id="getDataURL" >上传图片</div>
  <div class="baocun" id="cancelImage" >取消</div>
  
  </div>
		</div>
		</div>
		
		
		<%@ include file="/taglibs/common/footer.jsp"%>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>