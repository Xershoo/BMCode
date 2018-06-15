<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="u_myData">
	<!-- <div class="m_r_content">
		<h2 class="m_r_fs">账号安全</h2>
		<span class="u_h2">安全第一，切记「防人」之心不可无~~</span>
	</div> -->
	<h3>
		<img alt="" src="../images/account/tips.png" width="15px"
			height="15px"><span class="tips_img">更换绑定手机</span>
	</h3>
	<p class="m_warn add_warn">
		<span class="set_mobile">更换手机后，您将无法继续使用原手机号进行登录及找回密码等操作！</span>
	</p>
	<div class="m_r_tab tab_content" id="changeOrBindMobile">
		<table class="m_table" id="changeMobile">
			<tr>
				<th>原手机号：</th>
				<td><input type="text" name="oldMobile" id="oldMobile"
					class="class8" maxlength="11"><span class="mobileInfo"></span></td>
			</tr>
			<tr>
				<th>新手机号码：</th>
				<td><input type="text" name="newMobile" id="newMobile"
					class="class8" maxlength="11"><span class="mobileInfo"></span>
				</td>
			</tr>
			<tr>
				<th>短信验证码：</th>
				<td><input type="text" name="verifyChangeCode"
					id="verifyChangeCode" class="class8 ver_code" maxlength="8"><input
					type="button" id="getChangeVerifyCode" name="getChangeVerifyCode"
					class="verifyCode" value="获取验证码"><span class="mobileInfo"></span></td>
			</tr>
			<tr>
				<td colspan="2"><input type="button" id="bind_mobile" name=""
					class="m_sure" value="确  定"> <input type="button"
					id="cancelChgMobile" name="" class="m_cancel" value="取  消"></td>
			</tr>
		</table>
	</div>
</div>

