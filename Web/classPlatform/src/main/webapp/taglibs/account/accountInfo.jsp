<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="u_myData">
	<!-- change pwd begin -->
	<h3><img alt="" src="../images/account/tips.png" width="15px"
			height="15px"><span class="tips_img">修改密码</span></h3>
	<div class="m_r_tab">
		<div class="m_chg_pwd">
			<img src="../images/account/a_pwd.png">			
		</div>
		<div class="m_chg_cot">
<!-- 			<p class="m_content1">安全度：<img src="../images/account/t_strong.png"><span class="m_st" id="safe_level"></span>   </p> -->
			<p class="m_content1" id="safeStrong" style="display:none">安全度：<img src="../images/account/t_strong.png" class="s_strong"><img src="../images/account/strong.png"></p>
			<p class="m_content1" id="safeMiddle" style="display:none">安全度：<img src="../images/account/t_middle.png" class="s_strong"><font color="green">中</font></p>
			<p class="m_content1" id="safeWeak">安全度：<img src="../images/account/weak.png" class="s_strong"><img src="../images/account/t_weak.png"></p>
			<p class="m_content2">密码可以由6到12位数字、大小写字母及下划线组成，</p>
			<p class="m_content2">建议混合元素设置密码，并且不要和支付密码设成一样！</p>
		</div>
		<div class="m_chg_btn">
			<input type="button" id="chgPwd" value="去修改" class="chg_btn">
		</div>
	</div>
	<!-- change pwd over -->
	<!-- bind mobile begin -->
	<h3><img alt="" src="../images/account/tips.png" width="15px"
			height="15px"><span class="tips_img">绑定手机</span></h3>
	<div class="m_r_tab">
		<div class="m_chg_pwd">
			<img src="../images/account/a_mbl.png">			
		</div>
		<div class="m_chg_cot">
			<p class="m_content1" id="unbind">未绑定：<font color="red">抓紧绑定手机号码，提升安全度吧~</font></p>
			<p class="m_content1" style="display:none;" id="alreadyBind">已绑定：<span id="b_mobile"></span></p>
			<p class="m_content2">您可以使用该手机号登录Class8及找回密码！</p>
			<p class="m_content2">请勿随意泄露手机号，以防被不法分子利用，骗取账号信息等！！</p>
		</div>
		<div class="m_chg_btn">
			<input type="button" id="bind_mobile_imme" value="去绑定" class="chg_btn">
			<input type="button" id="change_mobile" value="去修改" class="chg_btn" style="display:none;">
		</div>
	</div>
	<h3><img alt="" src="../images/account/tips.png" width="15px"
			height="15px"><span class="tips_img">密保问题</span></h3>
	<div class="m_r_tab" id="setOrChgEncry">
		<div class="m_chg_pwd">
			<img src="../images/account/a_secur.png">			
		</div>
		<div class="m_chg_cot">
			<p class="m_content2 pn_set_ep">为了您的账号安全与方便找回密码，</p>
			<p class="m_content2">请赶快设置密保问题增强防御吧~</p>
		</div>
		<div class="m_chg_btn">
			<input type="button" id="set_imme" value="去设置" class="chg_btn">
			<input type="button" id="changeEncrypted" value="去修改" class="chg_btn" style="display:none;">
		</div>
	</div>
	<!-- security problem begin -->
</div>
	
