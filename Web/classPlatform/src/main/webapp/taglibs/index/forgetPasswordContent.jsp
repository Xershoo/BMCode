<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="title">找回密码</div>
<div id="main">
	<div id="menu">
		<div id="step4">完成</div>
		<div id="step3">重置密码</div>
		<div id="step2">进行验证</div>
		<div id="step1">选择找回方式</div>
	</div>
	
	<div id="mainCon" class="content">
		<div id="findPwdType">
			<div id="mobileType" class="typeDiv">
				<img src="./images/login/find_by_phone.png" alt="手机找回">
				<p class="desc1">通过手机验证找回</p>
				<p class="desc2">可以通过您之前绑定的手机号重置密码</p>
				<div id="mobileBtn" class="findBtn">立即找回</div>
			</div>
			<div id="mibaoType" class="typeDiv">
				<img src="./images/login/find_by_mibao.png" alt="密保问题找回">
				<p class="desc1">通过密保问题找回</p>
				<p class="desc2">可以通过您之前设置的密保问题重置密码</p>
				<div id="mibaoBtn" class="findBtn">立即找回</div>
			</div>
		</div>
	</div>
	
	<div id="mobileCon" class="content">
	</div>
	
	<div id="changeCon" class="content">
		<div class="findTypeDesc"><div class="find_logo"><img src="images/login/find_step_logo.png"></div>已通过手机验证，开始设置新密码吧：</div>
		<div class="changeInput">
			<div class="changeLabel">新密码:</div>
			<div class="changeVal"><input id="newPwd" type="password" placeholder="密码可以由6到12位数字、字母及下划线组成"></div>
			<div class="changeInfo"></div>
		</div>
		<div class="changeInput">
			<div class="changeLabel">确认密码:</div>
			<div class="changeVal"><input id="newPwdOnce" type="password"></div>
			<div class="changeInfo"></div>
		</div>
		<div class="changeInput">
			<div class="changeLabel"></div>
			<div id="step3Btn" class="btn_common">完&nbsp;&nbsp;成</div>
		</div>
	</div>
	
	<div id="overCon" class="content">
		<div id="overDiv">
			<div id="smileDesc">
				<div id="over" class="find_logo"><img src="images/login/find_step_logo.png"></div>
				<p>恭喜你，密码设置成功!</p>
				<div id="logBtn">立即登录</div>
			</div>
		</div>
	</div>
</div>