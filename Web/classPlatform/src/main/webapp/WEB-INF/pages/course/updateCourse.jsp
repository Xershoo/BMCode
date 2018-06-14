<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	 <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
	src="<%=request.getContextPath()%>/js/course/updateCourse.js"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/ajaxfileupload.js"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/common/json2.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/cropper.js"></script>
<link rel="stylesheet"	href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/schoolMenu.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/course/updateCourse.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/common/jquery-ui-1.8.18.custom.css">
	<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/index/footer.css">
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
<!-- 	<div class="zhanghu1">修改课程</div> -->
<div class="zhanghu5">
		<div class="jiinxi">
			
			<div class="chuangkeleixing">
			<input type="hidden" value="${courseBasicInfo.onlineType }" id="val_payPlatform">
			<input type="hidden" value="${categoryPath[0].id }" id="category">
			<input type="hidden" value="${categoryPath[1].id }" id="category1">
			<input type="hidden" value="${categoryPath[2].id }" id="category2">
			<input type="hidden" value="${courseBasicInfo.courseid }" id="courseid">
			<c:if test="${courseBasicInfo.onlineType  == '1'}">
				<div class="lxa">校内课程</div>
            </c:if>
            <c:if test="${courseBasicInfo.onlineType  == '2'}">
				<div class="lxa">学校公开课程</div>
            </c:if>
            <c:if test="${courseBasicInfo.onlineType  == '3'}">
				<div class="lxa">个人公开课程</div>
            </c:if>
			</div>

<%-- 			<div class="xinxi"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png"> <span>基本信息</span></div> --%>
<!-- 			<div class="fengexian"></div> -->
			<div class="mingcheng">
				课程名称 : <input value="${courseBasicInfo.courseName }" id="courseName"></input><span id="cn" class="yanzheng"></span>
			</div>
<!-- 			暂时注释掉 -->
<!-- 			<div class="fenlei"> -->
<!-- 				课程分类 <select id="courseCat" onchange="queryCourseCat1()"></select> -->
<!-- 				 <select class="yuyan" id="courseCat1" onchange="queryCourseCat2()"></select>  -->
<!-- 				 <select class="yuyan" id="courseCat2"></select> -->
<!-- 				 <span id="fenlei" class="yanzheng"></span> -->
<!-- 			</div> -->
<!-- 			暂时注释掉 -->
<!-- 			<div class="laoshi1"> -->
<%-- 				授课老师 <input type="text" id="shoukelaoshi" value="${teacherBasicInfo.realName }"> </input> --%>
<%-- 				<input type="hidden" id="teacherId" value="${teacherBasicInfo.uid }"> </input> --%>
<!-- 				<span id="skls" class="yanzheng"></span><a class="xzls" id="dialog_link"> -->
<!-- 					选择老师</a> -->

<!-- 			</div> -->

			<div class="kechengtupian">
				<div class="kechengtupian1">课程图片 : </div>
				<div class="kechengtupian2">
					<div>
					<c:if test="${courseBasicInfo.coverUrl  != ''}">
						<img id="u247_img" class="img " src="${courseBasicInfo.coverUrl }">
						</c:if>
						<c:if test="${courseBasicInfo.coverUrl  == ''}">
						<img id="u247_img" class="img " src="<%=request.getContextPath()%>/images/c1-1index/u362.png">
						</c:if>
						<div id="r_v_chfile3">
<!-- 						<input type="file" id="photo" name="photo" accept="image/gif, image/jpeg" onchange="ajaxFileUpload(this)"><input  type="hidden" value="0" id="f"/> -->
<!-- 						<input type="button" id="sago" name="photo" value="选择头像" > -->
						<input  type="hidden" value="0" id="f"/>
						</div>
						<span>
					</div><span id="sfile" class="yanzheng"></span>
<!-- 					<div class="ziti"> -->
<!-- 						支持 jpg、jpeg、png格式的图片 <br>最佳效果200ps*300ps -->
<!-- 					</div> -->
				</div>
				<div class="kechengtupian3">
					<div>
						<img id="u250_img" class="img "
							src="<%=request.getContextPath()%>/images/course/creat_05.png">
					</div>
				</div>
				<div class="kechengtupian4">
				<div class="ziti"> 
						支持 jpg、jpeg、png格式的图片 最佳效果<br>200ps*300ps
					</div>
                 <div class="ziti"> 
						建议老师可上传体现课程特色的照片，这样推<br>广才会更有效果。
					</div>
				</div>
			</div>
			<div class="jianjie">
				<div class="jj">课程简介 : </div>
				<div class="jj1">
					<textarea   rows="20" cols="100" id="courseDescription"  name="editor01">${courseBasicInfo.description } </textarea ><span id="jjy" class="yanzheng">
				</div>
			</div>


		</div>


<c:if test="${studentCount  != '0'}">

		<div class="jiaoxuejihua0" >
<%-- 			<div class="jiaoxuemubiao"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png"> <span>教学计划</span></div> --%>
<!-- 			<div class="fengexian"></div> -->
<!-- 			<div class="mubiao" > -->
<%-- 				教学目标 <input value="${courseBasicInfo.target }" id="courseTarget" disabled="disabled"/><span id="mb" class="yanzheng"> --%>
<!-- 			</div> -->
<!-- 			<div class="renqun"> -->
<%-- 				教学对象 <input value="${courseBasicInfo.people }" id="people" disabled="disabled"/><span id="rq" class="yanzheng"> --%>
<!-- 			</div> -->
			<div class="kj0">
				课节安排 : 
			</div>
			<div class="kj">
				 第一节： <input value="${courseClasss[0].className }" id="classArrangement" disabled="disabled"/><span id="ca" class="yanzheng"></span>
			</div>

			<div class="ks">
			<div class="del_a1">
				课程时间  : <input id="courseTime"  value="<fmt:formatDate value="${courseClasss[0].startTimePlan}" pattern="yyyy-MM-dd" />" onClick="WdatePicker()" type="text" disabled="disabled"> 
				<input class="laydate-icon"  id="start"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})" value="<fmt:formatDate value="${courseClasss[0].startTimePlan}" pattern="HH:mm:ss" />" disabled="disabled"></input>
<input class="laydate-icon" id="end"  value="<fmt:formatDate value="${courseClasss[0].endTimePlan}" pattern="HH:mm:ss" />"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss',minDate:'#F{$dp.$D(\'start\')}'} )" disabled="disabled"></input>
			</div>		
<!-- <!-- 					<div class="del_a"><a id="aa" disabled="disabled">删除该课节</a></div> --> 
			</div>
<!-- <div id="xinkejie"> -->


 <c:forEach items="${courseClasss}" var="s"  begin="1" varStatus="status" >
<div id='xkj${status.index}' class='xkj'>
<div class='kj1' id='kj${status.index}'><span id="classNum${status.index}"></span>
<input value='${s.className}' id='classArrangement${status.index}' class='classArrangement' disabled="disabled"/><span id='ca${status.index}' class='yanzheng'>

</div>
<div class='ks'>课程时间 : <input id='courseTime${status.index}' onClick='WdatePicker()' type='text' value="<fmt:formatDate value="${s.startTimePlan}" pattern="yyyy-MM-dd" />" disabled="disabled"></input> <input class='laydate-icon'  id='start${status.index}'   type='text' onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})" value="<fmt:formatDate value="${s.startTimePlan}" pattern="HH:mm:ss" />" disabled="disabled"></input>
<input class='laydate-icon' id='end${status.index}'  value="<fmt:formatDate value="${s.endTimePlan}" pattern="HH:mm:ss" />" type='text' onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'} )" disabled="disabled"></input>
<%-- <%-- <div class='del_a'><a  id='a${status.index}' onclick="del(${status.index})" >删除该课节</a></div>  --%>
 </div></div> 
 </c:forEach>
</div>
</c:if>
<c:if test="${studentCount  == '0'}">

		<div class="jiaoxuejihua0" >
<%-- 			<div class="jiaoxuemubiao"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png"> <span>教学计划</span></div> --%>
<!-- 			<div class="fengexian"></div> -->
<!-- 			<div class="mubiao" > -->
<%-- 				教学目标 <input value="${courseBasicInfo.target }" id="courseTarget" disabled="disabled"/><span id="mb" class="yanzheng"> --%>
<!-- 			</div> -->
<!-- 			<div class="renqun"> -->
<%-- 				教学对象 <input value="${courseBasicInfo.people }" id="people" disabled="disabled"/><span id="rq" class="yanzheng"> --%>
<!-- 			</div> -->
			<div class="kj0">
				课节安排 : 
			</div>
			<div class="kj">
				 第一节： <input value="${courseClasss[0].className }" id="classArrangement" /><span id="ca" class="yanzheng"></span>
			</div>

			<div class="ks">
			<div class="del_a1">
				课程时间  : <input id="courseTime"  value="<fmt:formatDate value="${courseClasss[0].startTimePlan}" pattern="yyyy-MM-dd" />" onClick="WdatePicker()" type="text" > 
				<input class="laydate-icon"  id="start"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})" value="<fmt:formatDate value="${courseClasss[0].startTimePlan}" pattern="HH:mm:ss" />" ></input>
<input class="laydate-icon" id="end"  value="<fmt:formatDate value="${courseClasss[0].endTimePlan}" pattern="HH:mm:ss" />"   type="text" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss',minDate:'#F{$dp.$D(\'start\')}'} )" ></input>
			</div>		
<!-- <!-- 					<div class="del_a"><a id="aa" >删除该课节</a></div> --> 
			</div>
<!-- <div id="xinkejie"> -->


 <c:forEach items="${courseClasss}" var="s"  begin="1" varStatus="status" >
<div id='xkj${status.index}' class='xkj'>
<div class='kj1' id='kj${status.index}'><span id="classNum${status.index}"></span>
<input value='${s.className}' id='classArrangement${status.index}' class='classArrangement' /><span id='ca${status.index}' class='yanzheng'>

</div>
<div class='ks'>课程时间 : <input id='courseTime${status.index}' onClick='WdatePicker()' type='text' value="<fmt:formatDate value="${s.startTimePlan}" pattern="yyyy-MM-dd" />" ></input> <input class='laydate-icon'  id='start${status.index}'   type='text' onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})" value="<fmt:formatDate value="${s.startTimePlan}" pattern="HH:mm:ss" />" ></input>
<input class='laydate-icon' id='end${status.index}'  value="<fmt:formatDate value="${s.endTimePlan}" pattern="HH:mm:ss" />" type='text' onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss',minDate:'#F{$dp.$D(\'start${status.index}\')}'} )" ></input>
<%-- <%-- <div class='del_a'><a  id='a${status.index}' onclick="del(${status.index})" >删除该课节</a></div>  --%>
 </div></div> 
 </c:forEach>
</div> 
</c:if>
<!-- </div> -->
<!-- 			<div class="ks1"> -->
<%-- 				<img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/add_03.png"><a onclick="add()">添加新课节</a> --%>
<!-- 			</div> -->
			
<!-- 		</div> -->
<!-- 		<div class="xuesheng"> -->
<%-- 			<div class="xuesheng1" ><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png"> <span>选择学生</span></div> --%>
<!-- 			<div class="fengexian"></div> -->
<!-- <!-- 			<div class="xuesheng2"> --> 
<!-- <!-- 				请选择将要学习本课程的本校学生：<a id="dialog_link1" class="xzls">选择学生</a> --> 
<!-- <!-- 			</div> --> 
<!-- <div class="xuesheng2"> -->
<%-- 				已选择好<span id='lvse'>${studentCount}</span>位本校学生学习本课程 --%>
<!-- 			</div> -->
<%-- 			<input type="hidden" value="${studentids}"  id="studentId"></input> --%>
<!-- 		</div> -->

<!-- 暂时注释掉 -->
<!-- 		<div class="xuesheng"> -->
<%-- 			<div class="xuesheng1"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png">公开设置</div> --%>
<!-- 			<div class="xuesheng2"> -->
<%-- 				<c:if test="${courseBasicInfo.signupStartTime  == null}"> --%>
<!-- 					<input type="checkbox" name="gk" id="gk" /><span>允许校外学生报名参加课程</span> -->
<%--             </c:if> --%>
<%-- 			<c:if test="${courseBasicInfo.signupStartTime  != null}"> --%>
<!-- 					<input type="checkbox" name="gk" id="gk" checked="checked"/><span>允许校外学生报名参加课程</span> -->
<%--             </c:if> --%>
<!-- 			</div> -->
<!-- 		</div> -->

<!-- <div class="jihua"> -->
<%-- 			<div class="jiage1"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png">报名计划</div> --%>
<!-- 			<div class="jiage2"> -->
<%-- 				<span>报名人数  </span><input type="text" value="${courseBasicInfo.nMinStudents }" id="minStudents"/>~<input type="text" value="${courseBasicInfo.nMaxStudents }" id="maxStudents"/>人 --%>
<!-- 			</div> -->
<!-- 			<div class="jiage2"> -->
<%-- 				<span>报名时间 </span><input type="text" value="<fmt:formatDate value="${courseBasicInfo.signupStartTime}" pattern="yyyy-MM-dd HH:mm" />" id="startb" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd HH:mm'})"/> --%>
<%--              ~<input type="text" value="<fmt:formatDate value="${courseBasicInfo.signupEndTime}" pattern="yyyy-MM-dd HH:mm" />" id="endb"  onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'startb\')}'} )"/> --%>
<!-- 			</div> -->
	
<!-- 		</div> -->



		
<!-- <div class="jiage"> -->
<%-- <%-- 			<div class="jiage1"><img id="main_img" src="<%=request.getContextPath()%>/images/manageCourse/creatCourse_03.png">课程价格</div> --%> 
<!-- 			<div class="jiage2"> -->
<%-- 				<span>课程价格  </span><input type="text" value="${courseBasicInfo.priceTotal}" id="coursePrice" disabled="disabled"/>元 --%>
<!-- 			</div> -->
<!-- 			<div class="jiage3"> -->
<!-- 				<div class="jg1"><li >根据您输入的信息，我们为您计算出， 日后该课程的收益为</li></div><div  class="jg2"><li id="income">0</li></div> -->
<!-- 			</div> -->
<!-- 			<div class="jiage4" style="display:none;"> -->
<!-- 			为了保证您的利益，请重新调整课价。 -->
<!-- 			</div> -->
	
<!-- 		</div> -->
<c:if test="${studentCount  != '0'}">
<div class="jiage">
			<div class="jiage2">
				<div class="jg1"><span>课程价格  ：</span><input type="text" value="${courseBasicInfo.priceTotal}" id="coursePrice" name="price" disabled="disabled"/>元</div>
<!-- 				<div class="jg4"><div class="jg3"><li >提示： 根据您输入的信息，我们为您计算出， 日后该课程的收益为</li></div><div  class="jg2"><li id="income">0</li></div></div> -->
			</div>
			<div class="jiage4" style="display:none;">
			为了保证您的利益，请重新调整课价。
			</div>
	
		</div>	
		</c:if>	
		<c:if test="${studentCount  == '0'}">
<div class="jiage">
			<div class="jiage2">
				<div class="jg1"><span>课程价格  ：</span><input type="text" value="${courseBasicInfo.priceTotal}" id="coursePrice" name="price" />元</div>
<!-- 				<div class="jg4"><div class="jg3"><li >提示： 根据您输入的信息，我们为您计算出， 日后该课程的收益为</li></div><div  class="jg2"><li id="income">0</li></div></div> -->
			</div>
			<div class="jiage4" style="display:none;">
			为了保证您的利益，请重新调整课价。
			</div>
	
		</div>	
		</c:if>	
		<div class="caozuo">
<!-- 			<a> -->
				<div class=caozuo1>
<!-- 					<div class="yulan">预览</div> -->
<!-- 			</a> -->
<!-- 			<a><div class="baocun">发布</div></a> -->
			<a><div class="quxiao" id="save">保存</div></a>
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
  <div class="baocun" id="getDataURL" >保存图片</div>
  <div class="baocun" id="cancelImage" >取消</div>
  
  </div>
		</div>
		</div>
		<%@ include file="/taglibs/common/footer.jsp"%>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>