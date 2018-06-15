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
			<div id="school_teacher"
				class="right_menu_word four_word teacher_common_style">我报名的课程</div>
		</div>

		<div class="q_course">
			<table class="c_q_tab">
				<tr>
					<th>课程名称：</th>
					<td><input type="text" name="cName" id="c_name" maxlength="30"></td>
					<th>报名时间：</th>
					<td><input type="text" name="applyTime" id="apply_time"
						class="Wdate"
						onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true})"></td>
					<td><input type="button" class="c_btn" name="corQuery"
						id="cor_query" value="查询"></td>
					<td><select class="query_course" id="s_course" name="s_course">
							<option value="0">全部课程</option>
							<option value="1">今天</option>
							<option value="2">最近一周</option>
							<option value="3">最近一个月</option>
							<option value="4">最近三个月</option>
							<option value="5">最近一年</option>
					</select></td>
				</tr>
				<tr>
					<th>课程状态：</th>
					<td colspan="2"><input type="radio" name="c_status"
						checked="checked" value="0">&nbsp;&nbsp;全部 <input
						type="radio" name="c_status" value="1">&nbsp;&nbsp;已完成 <input
						type="radio" name="c_status" value="2">&nbsp;&nbsp;未完成 <input
						type="radio" name="c_status" value="3">&nbsp;&nbsp;已取消</td>
				</tr>
			</table>
		</div>

		<!-- 我报名的课程 -->
		<div id="menu1_data_list" class="data_list">
			<div class="data_table_head">
				<div id="teacher_name" class="head_word">基本信息 | 上课时间</div>
				<div id="school_name" class="head_word">价格</div>
				<div id="faculty_name" class="head_word">报名时间</div>
				<div id="subject_name" class="head_word">课程状态</div>
				<div id="teacher_num" class="head_word">上课进度</div>
				<div id="teacher_opt1" class="head_word">操作</div>
			</div>
			<div class="no_data" id="no_data" style="display: none;">
				<font color="red">没有查到学校数据！</font>
			</div>
		</div>

	</div>
</div>