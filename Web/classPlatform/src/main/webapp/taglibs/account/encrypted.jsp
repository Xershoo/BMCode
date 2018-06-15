<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="u_myData">
	<!-- <div class="m_r_content">
		<h2 class="m_r_fs">账号安全</h2>
		<span class="u_h2">安全第一，切记「防人」之心不可无~~</span>
	</div> -->

	<h3>
		<img alt="" src="../images/account/tips.png" width="15px"
			height="15px"><span class="tips_img">设置密保问题</span>
	</h3>
	<p class="m_warn set_mobile">为了方便记住，请选择最有印象的三个问题，并根据真实情况填写相关答案！</p>
	<div class="m_r_tab tab_content">
		<table class="m_encry">
			<tr>
				<th>问题一：</th>
				<td>
					<select name="question1" id="question1" class="question">
						<!-- <option value="0">请选择你的密保问题</option>
						<option value="你闺蜜叫什么名字？">你闺蜜叫什么名字？</option>
						<option value="你大学班主任叫什么名字？">你大学班主任叫什么名字？</option>
						<option value="你的父亲叫什么名字？">你的父亲叫什么名字？</option>
						<option value="你的母亲叫什么名字？">你的母亲叫什么名字？</option>
						<option value="你就读的小学叫什么名字？">你就读的小学叫什么名字？</option>
						<option value="你就读的初中叫什么名字？">你就读的初中叫什么名字？</option>
						<option value="你就读的高中叫什么名字？">你就读的高中叫什么名字？</option>
						<option value="你父亲的生日是哪天 （如19720802）？">你父亲的生日是哪天 （如19720802）？</option>
						<option value="你母亲的生日是哪天 （如19720802）？">你母亲的生日是哪天 （如19720802）？</option>
						<option value="你最感兴趣的一门课程是？">你最感兴趣的一门课程是？</option>
						<option value="你最喜欢的一本书是？">你最喜欢的一本书是？</option>
						<option value="你最擅长的一种运动是？">你最擅长的一种运动是？</option>
						<option value="你最喜欢的车是？">你最喜欢的车是？</option> -->
					</select>
				<span class="question_info"></span></td>
			</tr>
			<tr>
				<th>答案一：</th>
				<td><input type="text" name="answer1" id="answer1" class="m_answer" placeholder="2-20个中文或4-40个英文/数字" maxlength="20"><span class="question_info"></span></td>
			</tr>
			<tr>
				<th>问题二：</th>
				<td>
					<select name="question2" id="question2" class="question">
						<!-- <option value="0">请选择你的密保问题</option>
						<option value="你闺蜜叫什么名字？">你闺蜜叫什么名字？</option>
						<option value="你大学班主任叫什么名字？">你大学班主任叫什么名字？</option>
						<option value="你的父亲叫什么名字？">你的父亲叫什么名字？</option>
						<option value="你的母亲叫什么名字？">你的母亲叫什么名字？</option>
						<option value="你就读的小学叫什么名字？">你就读的小学叫什么名字？</option>
						<option value="你就读的初中叫什么名字？">你就读的初中叫什么名字？</option>
						<option value="你就读的高中叫什么名字？">你就读的高中叫什么名字？</option>
						<option value="你父亲的生日是哪天 （如19720802）？">你父亲的生日是哪天 （如19720802）？</option>
						<option value="你母亲的生日是哪天 （如19720802）？">你母亲的生日是哪天 （如19720802）？</option>
						<option value="你最感兴趣的一门课程是？">你最感兴趣的一门课程是？</option>
						<option value="你最喜欢的一本书是？">你最喜欢的一本书是？</option>
						<option value="你最擅长的一种运动是？">你最擅长的一种运动是？</option>
						<option value="你最喜欢的车是？">你最喜欢的车是？</option> -->
					</select>
				<span class="question_info"></span></td>
			</tr>
			<tr>
				<th>答案二：</th>
				<td><input type="text" name="answer2" id="answer2" class="m_answer" placeholder="2-20个中文或4-40个英文/数字" maxlength="20"><span class="question_info"></span></td>
			</tr>
			<tr>
				<th>问题三：</th>
				<td>
					<select name="question3" id="question3" class="question">
						<!-- <option value="0">请选择你的密保问题</option>
						<option value="你闺蜜叫什么名字？">你闺蜜叫什么名字？</option>
						<option value="你大学班主任叫什么名字？">你大学班主任叫什么名字？</option>
						<option value="你的父亲叫什么名字？">你的父亲叫什么名字？</option>
						<option value="你的母亲叫什么名字？">你的母亲叫什么名字？</option>
						<option value="你就读的小学叫什么名字？">你就读的小学叫什么名字？</option>
						<option value="你就读的初中叫什么名字？">你就读的初中叫什么名字？</option>
						<option value="你就读的高中叫什么名字？">你就读的高中叫什么名字？</option>
						<option value="你父亲的生日是哪天 （如19720802）？">你父亲的生日是哪天 （如19720802）？</option>
						<option value="你母亲的生日是哪天 （如19720802）？">你母亲的生日是哪天 （如19720802）？</option>
						<option value="你最感兴趣的一门课程是？">你最感兴趣的一门课程是？</option>
						<option value="你最喜欢的一本书是？">你最喜欢的一本书是？</option>
						<option value="你最擅长的一种运动是？">你最擅长的一种运动是？</option>
						<option value="你最喜欢的车是？">你最喜欢的车是？</option> -->
					</select>
				<span class="question_info"></span></td>
			</tr>
			<tr>
				<th>答案三：</th>
				<td><input type="text" name="answer3" id="answer3" class="m_answer" placeholder="2-20个中文或4-40个英文/数字" maxlength="20"><span class="question_info"></span></td>
			</tr>
			<tr>
				<td colspan="2">
					<input type="button" id="m_next" class="m_sure" value="下一步">
					<input type="button" id="cancelEncrypted" class="m_cancel" value="取  消">
				</td>
			</tr>
		</table>
	</div>
</div>
	
