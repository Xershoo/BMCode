<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
	<div id="center" >
        	<div class="kuang" >
        		<div id="kuang1" >
        		<form action="/loginPage" method="">
        			<div id="blank" >
        					<div class="msg"></div>
        			</div>
        		<div >
        			<input  class="account-text" id="phone" name="phoneNumber" type="text"  placeholder="请输入手机号" maxlength="32"/>
        		</div>
        		<div>
        			<img id="xian_long" src="<%=request.getContextPath()%>/images/bmclass/xian.png" />
        		</div>
        		<div style="float: left;">
        			<input class="code-text" id="validcode" type="text"  placeholder="请输入验证码" maxlength="32"/>
        			<input class="buttonNormal" id="getValidCode" type="button" value="获取验证码">
        		</div>
        		<div>
        			<img id="xian_short" src="<%=request.getContextPath()%>/images/bmclass/xian2.png" />
        		</div>
        		<div >
        			<input class="account-text" id="userpwd" type="password"  placeholder="请输入密码" />
        		</div>
        		<div>
        			<img id="xian_long" src="<%=request.getContextPath()%>/images/bmclass/xian.png" />
        		</div>
        		<div id="submitBtn" type="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</div>
        			
        		<div id="login">
        			<font>已有账号,</font>
        			<span><a href="/loginPage">马上登录</a></span>
        		</div>
        		</form>
        		</div>
        		
        		<div id="kuang2">
        		<font id="third">第三方账号登录</font>
        		<div id="weibo">
        			<img src="<%=request.getContextPath()%>/images/index/bm/wb.png"/>
        			<span>新浪微博登录</span>
        		</div>
        		<div id="qq">
        			<img src="<%=request.getContextPath()%>/images/index/bm/qq.png"/>
        			<span>QQ账号登录</span>
        		</div>
        		<div id="weixin">
        			<img src="<%=request.getContextPath()%>/images/index/bm/wx.png"/>
        			<span>微信账号登录</span>
        		</div>
        		</div>
        	</div>
        </div>