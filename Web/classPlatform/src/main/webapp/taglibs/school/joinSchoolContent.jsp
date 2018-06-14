<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="teacher_main">
	<jsp:include page="/taglibs/common/teacherMenu.jsp">
		<jsp:param value="join_school" name="module"/>
	</jsp:include>
	
	<!-- 右侧数据 -->
	<div id="right_data">
		<div id="right_data_menu">
			<div id="school_teacher" class="right_menu_word four_word teacher_common_style">我的学校</div>
			<div id="sign_teacher" class="right_menu_word five_word">申请加入记录</div>
			<div id="teacher_apply" class="right_menu_word five_word">学校邀请记录</div>
			<div id="invite_teacher" class="right_menu_word five_word">解除签约记录</div>
		</div>
		
		<!-- 我的学校数据 -->
		<div id="menu1_data_list" class="data_list">
			<div class="data_table_head">
				<div id="teacher_name" class="head_word">学校基本信息</div>
				<div id="school_name" class="head_word">学校负责人</div>
				<div id="faculty_name" class="head_word">加入时间</div>
				<div id="teacher_status" class="head_word">状态</div>
				<div id="teacher_opt1" class="head_word">操作</div>
			</div>
			<div id="withNoSchools" style="display:none;">
				<div class="go_all">
					<img alt="" src="../images/school/schools.png" class="d_schools">
					<p>您目前还没加入任何学校，看看有没有感兴趣的学校，申请加入他们吧~~</p>
					<input type="button" value="查看学校" class="v_schools" id="viewSchools" onClick="go_all();">
				</div>
			</div>
			<div class="no_data" id="no_data" style="display:none;">
					<font color="red">没有查到学校数据！</font>
			</div>
		</div>
		<!-- over -->
		
		<!-- 申请加入记录数据  -->
		<div id="menu2_data_list"  class="data_list">
			<div class="data_table_head">
				<div id="teacher_name" class="head_word">学校基本信息</div>
				<div id="school_name" class="head_word">学校负责人</div>
				<div id="faculty_name" class="head_word">申请时间</div>
				<div id="teacher_status" class="head_word">申请状态</div>
				<div id="teacher_opt1" class="head_word">操作</div>
			</div>
			
			<div class="no_data" id="no_data" style="display:none;">
					<font color="red">没有查到学校数据！</font>
			</div>
		</div>
		<!-- over -->
		
		<!-- 学校邀请记录数据  -->
		<div id="menu3_data_list"  class="data_list">
			<div class="data_table_head">
				<div id="teacher_name" class="head_word">学校基本信息</div>
				<div id="school_name" class="head_word">学校负责人</div>
				<div id="faculty_name" class="head_word">邀请时间</div>
				<div id="teacher_status" class="head_word">邀请状态</div>
				<div id="teacher_opt1" class="head_word">操作</div>
			</div>
			
			<div class="no_data" id="no_data" style="display:none;">
					<font color="red">没有查到学校数据！</font>
			</div>
		</div>
		<!-- over -->
		
		<!-- 解除签约记录数据  -->
		<div id="menu4_data_list"  class="data_list">
			<div class="data_table_head">
				<div id="teacher_infor2" class="head_word">学校基本信息</div>
				<div id="register_time" class="head_word">学校负责人</div>
				<div id="apply_time" class="head_word">签约时间</div>
				<div id="apply_status" class="head_word">解约时间</div>
				<div id="ter_reason" class="head_word">解约原因</div>
				<div id="teacher_opt3" class="head_word">操作</div>
			</div>
			
			<div class="no_data" id="no_data" style="display:none;">
					<font color="red">没有查到学校数据！</font>
			</div>
		</div>
		<!-- over -->
	</div>
	<div id="apply_school" title="申请加入学校" style="display: none;">
		<div class="apply_content">
			<table class="apply_tab">
				<tr>
					<th>申请学校：</th>
					<td id="s_name"></td>
				</tr>
				<tr>
					<th>申请时间：</th>
					<td id="current_time"></td>
				</tr>
				<tr>
					<td colspan="2" class="r_oth">
					<input type="hidden" id="sch_id" name="sch_id">
					<input type="checkbox"
						class="r_agree r_int" name="r_agree" id="r_agree">已阅读并同意课吧平台的<a>《老师签约学校协议》</a>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<!-- over -->
</div>