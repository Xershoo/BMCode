<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div id="pay_main">
	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/wealthMenu.jsp">
		<jsp:param value="pay_set" name="module"/>
	</jsp:include>
	<!-- over -->
	
	<!-- 右侧功能设置 -->
	<div id="pay_right_opt">
		<div id="right_title">
			<div id="right_title_word">支付安全设置</div>
			<div id="right_title_desc">财富中心，方便管理你的小金库~</div>
		</div>
		
		<div id="step1"  class="change_main">
			<!-- <div id="right_set_desc">
				支付「<span id="jiacu">门槛</span>」，保障资金安全~
			</div> -->
			<div id="right_opt_main">
				<div id="opt_left_pwd">
					<div class="set_logo">
						<img src="../images/wealth/set_pay_pwd.png">
					</div>
					<div class="opt_title">支付密码</div>
					<div class="result_desc"></div>
					<div class="opt_desc">账户资金、信息变动时，需要支付密码进行验证！</div>
					<div class="opt_btn">
						<div id="set_pwd_btn">立即设置</div>
					</div>
					<div id="find_pwd">忘记密码了?</div>
				</div>
				<div id="opt_middle"></div>
				<div id="opt_right_phone">
					<div class="set_logo">
						<img src="../images/wealth/bind_phone.png">
					</div>
					<div class="opt_title">绑定手机</div>
					<div class="result_desc"></div>
					<div class="opt_desc">方便短信通知账户资金变动，及找回支付密码！</div>
					<div class="opt_btn">
						<div id="change_phone_btn">立即绑定</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="step2_set_password" class="change_main">
			<div class="step2_title"><div class="find_logo"><img src="../images/login/find_step_logo.png"></div>设置支付密码</div>
			<div class="tip">
				<div class="tip_title">保障账号安全小贴士：</div>
				<p style="top:48px;">1. 定期更换支付密码；</p>
				<p style="top:68px;">2. 确保支付密码与登录密码不一样；</p>
				<p style="top:88px;">3. 建议设置含大小字母、数字及下划线，并≥10位的密码！</p>
			</div>
			<div class="input_value">
				<div class="input_value_word">支付密码:</div>
				<div class="input_value_text"><input type="password" id="set_password" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div id="pwd_desc">
				<div id="pwd_desc_word">密码可以由6到12位数字、字母及下划线组成</div>
			</div>
			<div class="input_value" style="margin-top:45px;">
				<div class="input_value_word">再次输入:</div>
				<div class="input_value_text"><input type="password" id="set_password_once" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div class="set_opt_btn" style="margin-top:60px;">
				<div class="opt_btn_main">
					<div id="set_queren_btn">确定</div>
					<div id="set_cancel_btn">取消</div>
				</div>
			</div>
		</div>
		
		<div id="step2_change_password" class="change_main">
			<div class="step2_title"><div class="find_logo"><img src="../images/login/find_step_logo.png"></div>修改支付密码</div>
			<div class="tip">
				<div class="tip_title">保障账号安全小贴士：</div>
				<p style="top:48px;">1. 定期更换支付密码；</p>
				<p style="top:68px;">2. 确保支付密码与登录密码不一样；</p>
				<p style="top:88px;">3. 建议设置含大小字母、数字及下划线，并≥10位的密码！</p>
			</div>
			<div class="input_value">
				<div class="input_value_word">旧密码:</div>
				<div class="input_value_text"><input type="password" id="set_password_old" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div class="input_value">
				<div class="input_value_word">新密码:</div>
				<div class="input_value_text"><input type="password" id="set_password_new" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div id="pwd_desc">
				<div id="pwd_desc_word">密码可以由6到12位数字、字母及下划线组成</div>
			</div>
			<div class="input_value" style="margin-top:45px;">
				<div class="input_value_word">再次输入:</div>
				<div class="input_value_text"><input type="password" id="set_password_new_once" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div class="set_opt_btn" style="margin-top:60px;">
				<div class="opt_btn_main">
					<div id="change_queren_btn">确定</div>
					<div id="change_cancel_btn">取消</div>
				</div>
			</div>
		</div>
		
		<div id="step2_forget_password" class="change_main">
			<div class="step2_title"><div class="find_logo"><img src="../images/login/find_step_logo.png"></div>重置支付密码</div>
			<div class="tip">
				<div class="tip_title">保障账号安全小贴士：</div>
				<p style="top:48px;">1. 需用绑定的手机获取验证码来重置支付密码；</p>
				<p style="top:68px;">2. 确保支付密码与登录密码不一样；</p>
				<p style="top:88px;">3. 建议设置含大小字母、数字及下划线，并≥10位的密码！</p>
			</div>
			<div class="input_value">
				<div class="input_value_word">短信验证码:</div>
				<div class="input_value_text" style="width:198px;"><input type="text" id="resetVerifyNum" class="pwd_common"></div>
				<div id="resetGetVerify">获取验证码</div>
				<div class="info"></div>
			</div>
			<div class="input_value">
				<div class="input_value_word">新密码:</div>
				<div class="input_value_text"><input type="password" id="reset_password_new" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div id="pwd_desc">
				<div id="pwd_desc_word">密码可以由6到12位数字、字母及下划线组成</div>
			</div>
			<div class="input_value" style="margin-top:45px;">
				<div class="input_value_word">再次输入:</div>
				<div class="input_value_text"><input type="password" id="reset_password_new_once" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div class="set_opt_btn" style="margin-top:60px;">
				<div class="opt_btn_main">
					<div id="reset_queren_btn">确定</div>
					<div id="reset_cancel_btn">取消</div>
				</div>
			</div>
		</div>
		
		<div id="step2_set_phone" class="change_main">
			<div class="step2_title"><div class="find_logo"><img src="../images/login/find_step_logo.png"></div>设置绑定手机</div>
			<div class="set_pwd_desc">
				绑定手机后，您将可以使用绑定的手机号进行支付业务相关操作！
			</div>
			<div class="input_value">
				<div class="input_value_word">手机号码:</div>
				<div class="input_value_text"><input type="text" id="set_phone_new" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div class="input_value">
				<div class="input_value_word">短信验证码:</div>
				<div class="input_value_text" style="width:198px;"><input type="text" id="setVerifyNum" class="pwd_common"></div>
				<div id="setGetVerify">获取验证码</div>
				<div class="info"></div>
			</div>
			<div class="set_opt_btn" style="margin-top:60px;">
				<div class="opt_btn_main">
					<div id="set_phone_queren_btn">确定</div>
					<div id="set_phone_cancel_btn">取消</div>
				</div>
			</div>
		</div>
		
		<div id="step2_change_phone" class="change_main">
			<div class="step2_title"><div class="find_logo"><img src="../images/login/find_step_logo.png"></div>更换手机绑定</div>
			<div class="set_pwd_desc">
				更换手机后，您将无法继续使用原手机号进行支付业务相关操作！
			</div>
			<div class="input_value">
				<div class="input_value_word">原手机号:</div>
				<div class="input_value_text"><input type="text" id="change_phone_old" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div class="input_value">
				<div class="input_value_word">新手机号:</div>
				<div class="input_value_text"><input type="text" id="change_phone_new" class="pwd_common"></div>
				<div class="info"></div>
			</div>
			<div class="input_value">
				<div class="input_value_word">短信验证码:</div>
				<div class="input_value_text" style="width:198px;"><input type="text" id="verifyNum" class="pwd_common"></div>
				<div id="getVerify">获取验证码</div>
				<div class="info"></div>
			</div>
			<div class="set_opt_btn" style="margin-top:60px;">
				<div class="opt_btn_main">
					<div id="phone_queren_btn">确定</div>
					<div id="phone_cancel_btn">取消</div>
				</div>
			</div>
		</div>
		
	</div>
	<!-- over -->
</div>