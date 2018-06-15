<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="teacher_main">
	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/schoolMenu.jsp">
		<jsp:param value="stu_mgn" name="module"/>
	</jsp:include>
	<!-- over -->
	
	<!-- 右侧数据 -->
	<div id="right_data">
		<div id="right_data_menu">
			<div id="in_student" class="right_menu_word four_word">校内学生</div>
			<!-- 隐藏校外学生切换 -->
			<!-- <div id="out_student" class="right_menu_word">校外学生</div> -->
			<div id="import_student_btn">
				<div id="import_logo"><img src="../images/manageCourse/add_03.png"></div>
				导入学生
			</div>
		</div>
		
		<!-- 校内学生数据 -->
		<div id="menu1_data_list" class="data_list">
			<div class="search_condition">
				<div id="menu1_name_lable" class="condition_lable">搜索学生:</div>
				<div id="menu1_name_input" class="condition_input"><input type="text" id="search_student_name1" placeholder="输入学生姓名、手机号、工号"></div>
				<div id="menu1_status_lable" class="condition_lable">学生状态:</div>
				<div id="menu1_status_select" class="condition_input"><select id="search_student_status1" style="margin-top:2px;"><option value="-1">全部</option><option value="0">正常</option><option value="1">停用</option></select></div>
				<div id="menu1Search" class="searchBtn">搜&nbsp;&nbsp;索</div>
			</div>
			<div class="data_table_head">
				<div id="student_name" class="head_word">学生姓名</div>
				<div id="student_school" class="head_word">所属学校</div>
				<div id="student_faculty" class="head_word">院系</div>
				<div id="student_subject" class="head_word">专业</div>
				<div id="student_class" class="head_word">班级</div>
				<div id="student_num" class="head_word">学生学号</div>
				<div id="student_sex" class="head_word">性别</div>
				<div id="student_status" class="head_word">状态</div>
				<div id="student_opt1" class="head_word">操作</div>
			</div>
		</div>
		<!-- over -->
		
		<!-- 校外学生数据  -->
		<div id="menu2_data_list"  class="data_list">
			<div class="search_condition">
				<div id="menu1_name_lable" class="condition_lable">搜索学生:</div>
				<div id="menu1_name_input" class="condition_input"><input type="text" id="search_student_name2" placeholder="输入学生姓名、手机号、工号"></div>
				<div id="menu1_status_lable" class="condition_lable">学生状态:</div>
				<div id="menu1_status_select" class="condition_input"><select id="search_student_status2" style="margin-top:2px;"><option value="-1">全部</option><option value="0">正常</option><option value="1">停用</option></select></div>
				<div id="menu2Search" class="searchBtn">搜&nbsp;&nbsp;索</div>
			</div>
			<div class="data_table_head">
				<div id="student_infor" class="head_word">学生信息</div>
				<div id="buy_course_count" class="head_word">购买课程数</div>
				<div id="buy_money_count" class="head_word">购买总金额</div>
				<div id="last_buy_time" class="head_word">最后购买时间</div>
				<div id="last_class_time" class="head_word">最后上课时间</div>
				<div id="student_opt2" class="head_word">操作</div>
			</div>			
		</div>
		<!-- over -->
		
	</div>
	<!-- over -->
	
	<!-- 弹出窗口 -->
	<div id="importDialog" title="批量添加学生" style="display: none">
		<div class="dialog_item">
			<div class="item_left">导入的文件</div>
			<div class="item_right"><input type="file" id="myFiles" name="myFiles" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></div>
		</div>
		<div class="dialog_item" style="height:20px;">
			<div class="item_left"  style="height:20px;"></div>
			<div class="item_right" style="height:20px;line-height:20px;">下载学生信息导入模板</div>
		</div>
		<div class="dialog_item">
			<div class="item_left" style="line-height:20px;color:red;">温馨提示:</div>
			<div class="item_right">
				<p>1、导入文件支持xls、xlsx结尾的文件</p>
				<p>2、文件大小不能超过4M</p>
			</div>
		</div>
	</div>
	<!-- over -->
</div>