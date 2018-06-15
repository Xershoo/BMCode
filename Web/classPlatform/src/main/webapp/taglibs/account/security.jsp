<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="u_myData">
	<!-- <div class="m_r_content">
		<p class="m_r_fs">账号安全</p>
		<span class="u_h2">安全第一，切记「防人」之心不可无~~</span>
	</div> -->
	<h3>
		<img alt="" src="../images/account/tips.png" width="15px"
			height="15px"><span class="tips_img">修改登录密码</span>
	</h3>
	<img alt="" src="../images/account/s_tips.png" class="tip_img">
	<div class="tp_warn">
		<p class="m_warn tp_title">保障账号安全小贴士：</p>
		<p class="m_warn">1.定期更换登录密码；</p>
		<p class="m_warn">2.确保登录密码与支付密码不一样；</p>
		<p class="m_warn">3.建议设置含大小字母、数字及下划线，并≥10位的密码！</p>
	</div>
	<div class="m_r_tab tab_content">
		<table class="m_table" id="changePwdTab">
			<tr>
				<th>旧密码：</th>
				<td><input type="password" name="oldPwd" id="oldPwd"
					class="class8"><span class="info"></span></td>
			</tr>
			<tr>
				<th>新密码：</th>
				<td><input type="password" name="newPwd" id="newPwd"
					class="class8"><span class="info"></span>
					<p class="m_warn m_new">密码可以由6到12位数字、字母及下划线组成</p></td>
			</tr>
			<tr>
				<th>再次输入：</th>
				<td><input type="password" name="newAgainPwd" id="newAgainPwd"
					class="class8"><span class="info"></span></td>
			</tr>
			<tr>
				<td colspan="2"><input type="button" id="chgPwdSure" name=""
					class="m_sure" value="确  定"> <input type="button"
					id="cancelChgPwd" name="" class="m_cancel" value="取  消"></td>
			</tr>
		</table>
	</div>
</div>

