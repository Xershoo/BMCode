<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="teacher_main">
	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/schoolMenu.jsp">
		<jsp:param value="teacher_mgn" name="module"/>
	</jsp:include>
	<!-- over -->
	
	<!-- 右侧数据 -->
	<div id="right_data">
		<div id="right_data_menu">
			<div id="school_teacher" class="right_menu_word four_word">本校在职老师</div>
			<!-- <div id="sign_teacher" class="right_menu_word">校外签约老师</div>
			<div id="teacher_apply" class="right_menu_word">老师的申请</div>
			<div id="invite_teacher" class="right_menu_word">邀请的老师</div> -->
			<div id="import_teacher_btn">
				<div id="import_logo"><img src="../images/manageCourse/add_03.png"></div>
				导入老师
			</div>
		</div>	
		
		<!-- 校内老师数据 -->
		<div id="menu1_data_list" class="data_list">
			<div class="search_condition">
				<div id="menu1_name_lable" class="condition_lable">搜索老师:</div>
				<div id="menu1_name_input" class="condition_input"><input type="text" id="search_teacher" placeholder="输入老师姓名、手机号、工号"></div>
				<div id="menu1_status_lable" class="condition_lable">老师状态:</div>
				<div id="menu1_status_select" class="condition_input"><select id="search_teacher_status" style="margin-top:2px;"><option value="-1">全部</option><option value="0">正常</option><option value="1">停用</option></select></div>
				<div id="inSearchBtn" class="searchBtn">搜索</div>
			</div>
			<div class="data_table_head">
				<div id="teacher_name" class="head_word">老师姓名</div>
				<div id="school_name" class="head_word">所属学校</div>
				<div id="faculty_name" class="head_word">院系</div>
				<div id="subject_name" class="head_word">专业</div>
				<div id="teacher_num" class="head_word">教师工号</div>
				<div id="teacher_sex" class="head_word">性别</div>
				<div id="teacher_status" class="head_word">状态</div>
				<div id="teacher_opt1" class="head_word">操作</div>
			</div>
		</div>
		<!-- over -->
		
		<!-- 签约老师数据  -->
		<div id="menu2_data_list"  class="data_list">
			<div class="search_condition">
				<div id="menu2_name_lable" class="condition_lable">搜索老师:</div>
				<div id="menu2_name_input" class="condition_input"><input type="text" id="search_teacher1" placeholder="输入老师姓名、手机号"></div>
				<div id="menu2_status_lable" class="condition_lable">老师状态:</div>
				<div id="menu2_status_select" class="condition_input"><select id="search_teacher_status1" style="margin-top:2px;"><option value="-1">全部</option><option value="0">合约期间</option><option value="1">合约到期</option></select></div>
				<div id="menu2_time_lable" class="condition_lable">时间查询:</div>
				<div id="menu2_time_input" class="condition_input">
					<input type="text" id="menu2_start_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'menu2_end_time\')}'})">&nbsp;至
					<input type="text" id="menu2_end_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'menu2_start_time\')}'})"></div>
				<div id="outSearchBtn" class="searchBtn">搜索</div>
			</div>
			<div class="data_table_head">
				<div id="teacher_infor" class="head_word">老师信息</div>
				<div id="sign_time" class="head_word">签约时间</div>
				<div id="order_count" class="head_word">订单数量</div>
				<div id="student_count" class="head_word">学生数量</div>
				<div id="income" class="head_word">收入</div>
				<div id="assess_count" class="head_word">状态</div>
				<div id="teacher_opt2" class="head_word">操作</div>
			</div>	
		</div>
		<!-- over -->
		
		<!-- 老师的申请数据  -->
		<div id="menu3_data_list"  class="data_list">
			<div class="search_condition">
				<div id="menu3_name_lable" class="condition_lable">搜索老师:</div>
				<div id="menu3_name_input" class="condition_input"><input type="text" id="search_teacher2" placeholder="输入老师姓名、手机号"></div>
				<div id="menu3_time_lable" class="condition_lable">申请时间:</div>
				<div id="menu3_time_input" class="condition_input">
					<input type="text" id="menu3_start_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'menu3_end_time\')}'})">&nbsp;至
					<input type="text" id="menu3_end_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'menu3_start_time\')}'})"></div>
				<div id="applySearchBtn" class="searchBtn">搜索</div>
			</div>
			<div class="data_table_head">
				<div id="teacher_infor2" class="head_word">老师姓名</div>
				<div id="register_time" class="head_word">注册时间</div>
				<div id="apply_time" class="head_word">申请时间</div>
				<div id="apply_status" class="head_word">状态</div>
				<div id="teacher_opt3" class="head_word">操作</div>
			</div>
		</div>
		<!-- over -->
		
		<!-- 邀请的老师数据  -->
		<div id="menu4_data_list"  class="data_list">
			<div class="search_condition">
				<div id="menu4_name_lable" class="condition_lable">搜索老师:</div>
				<div id="menu4_name_input" class="condition_input"><input type="text" id="search_teacher3" placeholder="输入老师姓名、手机号"></div>
				<div id="menu4_time_lable" class="condition_lable">邀请时间:</div>
				<div id="menu4_time_input" class="condition_input">
					<input type="text" id="menu4_start_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'menu4_end_time\')}'})">&nbsp;至
					<input type="text" id="menu4_end_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'menu4_start_time\')}'})"></div>
				<div id="inviteSearchBtn" class="searchBtn">搜索</div>
			</div>
			<div class="data_table_head">
				<div id="teacher_infor2" class="head_word">老师姓名</div>
				<div id="register_time" class="head_word">注册时间</div>
				<div id="apply_time" class="head_word">邀请时间</div>
				<div id="apply_status" class="head_word">状态</div>
				<div id="teacher_opt3" class="head_word">操作</div>
			</div>
		</div>
		<!-- over -->
	</div>
	<!-- over -->
	
	
	<!-- 弹出窗口 -->
	<div id="importDialog" title="批量添加老师" style="display: none">
		<div class="dialog_item">
			<div class="item_left">导入的文件</div>
			<div class="item_right"><input type="file" id="myFiles" name="myFiles" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></div>
		</div>
		<div class="dialog_item" style="height:20px;">
			<div class="item_left"  style="height:20px;"></div>
			<div class="item_right" style="height:20px;line-height:20px;">下载老师信息导入模板</div>
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