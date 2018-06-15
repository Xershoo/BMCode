<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div id="teacher_main">
	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/teacherMenu.jsp">
		<jsp:param value="join_school" name="module"/>
	</jsp:include>
	<!-- over -->

	<!-- 右侧数据 -->
	<div id="right_data">
		<div id="right_data_menu">
			<div id="school_teacher"
				class="right_menu_word four_word teacher_common_style">全部学校信息</div>
		</div>

		<!-- 我的学校数据 -->
		<div id="menu1_data_list" class="data_list">
			<div class="data_table_head">
				<div id="teacher_name" class="head_word">学校基本信息</div>
				<div id="school_name" class="head_word">学校负责人</div>
				<div id="faculty_name" class="head_word">建校时间</div>
				<div id="teacher_status" class="head_word">学校地址</div>
				<div id="teacher_opt1" class="head_word">操作</div>
			</div>
		<c:if test="${!empty schools}">
		<c:forEach items="${schools}" var="schools" varStatus="vs">
			<div class="data_info">
			<div style="display:none;" id="s_id" class="s_id">${vs.index + 1}</div>
				<div class="info_name" onclick="location.href='<%=request.getContextPath()%>/infocenter/school/${schools.id}'">
					<div class="teacher_logo">
						<img src="images/teacher_logo.png">
					</div>
					<div class="teacher_name_word nick_name">
						${schools.name}
					</div>
				</div>
				<div class="info_school">邱勇</div>
				<div class="info_faculty">1911年(辛亥年)4月26日</div>
				<div class="info_status">北京市海淀区清华园</div>
				<div class="info_opt">
					<input type="hidden" value="${schools.id}">
					<input type="hidden" value="${schools.name}">
					<input type="button" name="apply_join" id="apply_join"
						value="申请加入" class="apply_join">
				</div>
			</div>
		</c:forEach>
		</c:if>
		<c:if test="${empty schools}">
			<div class="no_data">
				没有查到学校数据！
			</div>
		</c:if>
		
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