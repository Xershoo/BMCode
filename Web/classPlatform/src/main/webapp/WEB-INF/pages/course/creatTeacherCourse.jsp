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
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-ui-1.8.18.custom.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/course/creatTeacherCourse.js"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/ajaxfileupload.js"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/json2.js"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/cropper.js"></script>
	
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/course/creatTeacherCourse.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/dialog.css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/cropper.css" type="text/css" />
		
<script>

</script>
</head>
<body>

<%@ include file="/taglibs/common/head.jsp"%>
<div class="creat_main">
	<jsp:include page="/taglibs/common/teacherMenu.jsp">
		<jsp:param value="course_mgn" name="module"/>
	</jsp:include>
	<div class="zhanghu">
<!-- 	<span id="tishi">您还没有授权！</span> -->
<div class="zhanghu5">
		<div class="jiinxi">
			
			<div class="chuangkeleixing">
				<div class="lxa">
<input type="hidden" value="3" id="val_payPlatform">
<div id="addimage"><img  src="<%=request.getContextPath()%>/images/course/addcourse.png"></div>
<div id="lxa_ge" >创建课程</div>
				</div>

			</div>



			<div class="mingcheng">
				课程名称 ：<input placeholder="请输入课程名称，最多50个字" id="courseName" maxlength="50"></input>
				<div id="yanzheng"><span id="cn" class="yanzheng"></span></div>
			</div>
			
			
<!-- 			<div class="fenlei"> -->
<!-- 				课程分类 ： <select id="courseCat" onchange="queryCourseCat1()"> -->
<!-- 				</select> <select class="yuyan" id="courseCat1" onchange="queryCourseCat2()"> -->
<!-- 				</select> <select class="yuyan" id="courseCat2"> -->
<!-- 				</select><span id="fenlei" class="yanzheng"></span> -->
<!-- 			</div> -->

			<div class="kechengtupian">
				<div class="kechengtupian1">课程图片 ：</div>
				<div class="kechengtupian2">
					<div>
						<img id="u247_img" class="img " src="<%=request.getContextPath()%>/images/course/creatcourseadd_03.png">
						<div id="r_v_chfile3">
<!-- 						<input type="file" id="photo" name="photo" accept="image/gif, image/jpeg" onchange="ajaxFileUpload()"><input  type="hidden" placeholder="0" id="f"/> -->
<!-- 						<input type="button" id="sago" name="photo" value="选择头像" > -->
						<input  type="hidden" value="0" id="f"/>
						</div>
						<span>
					</div><span id="sfile" class="yanzheng"></span>
				</div>
				<div class="kechengtupian3">
					<div>
						<img id="u250_img" class="img "
							src="<%=request.getContextPath()%>/images/course/creatcourse.png">
					</div>
				</div>
				<div class="kechengtupian4">
				<div class="ziti"> 
						支持 jpg、jpeg、png格式的图片 最佳效果<br>500ps*300ps
					</div>
                 <div class="ziti"> 
						建议老师可上传体现课程特色的照片，这样推<br>广才会更有效果。
					</div>
				</div>
			</div>
			<div class="jianjie">
				<div class="jj">课程简介 ：</div>
				<div class="jj1">
					<textarea   id="courseDescription"  name="editor01"> </textarea ><span id="jjy" class="yanzheng">
				</div>
			</div>


		</div>




		<div class="jiaoxuejihua0">
<!-- 			<div class="mubiao" > -->
<!-- 				教学目标 ：<input placeholder="最多50个字" id="courseTarget"/><span id="mb" class="yanzheng"> -->
<!-- 			</div> -->
<!-- 			<div class="renqun"> -->
<!-- 				适合人群 ：<input placeholder="最多50个字" id="people"/><span id="rq" class="yanzheng"> -->
<!-- 			</div> -->
			<div class="kj0">
				课节安排 ： 
			</div>
			<div class="kj">
				第一节 ： <input placeholder="最多50个字" id="classArrangement" maxlength="50"/><span id="ca" class="yanzheng"></span>
			</div>

			<div class="ks">
			<div class="del_a1">
				课程时间 ： <input id="courseTime"  placeholder="YYYY-MM-DD" onClick="WdatePicker({minDate:'%y-%M-%d'})" type="text"><input class="laydate-icon" placeholder="课程开始时间" id="start"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss'})"></input><input class="laydate-icon" id="end"  placeholder="课程结束时间"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'start\')}'} )"></input>
				</div>	
					<div class="del_a">
					<img  src="<%=request.getContextPath()%>/images/course/dd_03.png" id="dd">
					<a id="aa" >删除该课节</a>
					</div>
					<div class="del_a2" onclick="add()">
					<div class="del_a21"><img  src="<%=request.getContextPath()%>/images/course/dda_03.png" id="dd"></div>
					<div class="del_a22"><a id="aa" >新增课节</a></div>
					</div>
			</div>
<div id="xinkejie">


</div>
<!-- 			<div class="ks1"> -->
<%-- 				<img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/add_03.png"><a onclick="add()">添加新课节</a> --%>
<!-- 			</div> -->
			
		</div>



<!-- <div class="jihua"> -->
<%-- 			<div class="jiage1"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png">报名计划</div> --%>
<!-- 			<div class="fengexian"></div> -->
<!-- 			<div class="jiage2"> -->
<!-- 				<span>报名人数  ：</span><input type="text" placeholder="" id="minStudents"/>~<input type="text" placeholder="" id="maxStudents"/>人 -->
<!-- 			</div> -->
<!-- 			<div class="jiage2"> -->
<!-- 				<span>报名时间 ：</span><input type="text" placeholder="" id="startb" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd HH:mm'})"/>~<input type="text" placeholder="" id="endb"  onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'startb\')}'} )"/> -->
<!-- 			</div> -->
	
<!-- 		</div> -->



		
<div class="jiage">
			<div class="jiage2">
				<div class="jg1"><span>课程价格  ：</span><input type="text" placeholder="0.00" id="coursePrice" name="price"/>元</div>
<!-- 				<div class="jg4"><div class="jg3"><li >提示： 根据您输入的信息，我们为您计算出， 日后该课程的收益为</li></div><div  class="jg2"><li id="income">0</li></div></div> -->
			</div>
			<div class="jiage4" style="display:none;">
			为了保证您的利益，请重新调整课价。
			</div>
	
		</div>
		
		<div class="caozuo">
			<a>
				<div class=caozuo1>
			
			<a><div class="quxiao" id="save">保存</div></a>
		</div>
		</div>
	</div>
	</div>
	
	<div id="dialog2" title="选择头像" style="display: none">
		<div class="xztx1">
		<div class="container" >
  <img src="/images/course/creatcourse.png" class="cropper">
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