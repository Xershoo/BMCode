<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
	<div id="center">
        	<div class="kuang" >
        		<div id="kuang1" >
        			<div class="msg"></div>
        		<div class="back" >欢迎回来</div>
        		<div id="reg">
        			<font>还没有账号?</font>
        			<a href="/register"> 立即注册</a>
        		</div>
        		<form action="index.html" method="">
        		<div >
        			<input class="account-text" id="username" type="text"  placeholder="请输入账号" maxlength="32"/>
        		</div>
        		<div>
        			<img id="xian_long" src="<%=request.getContextPath()%>/images/bmclass/xian.png" />
        		</div>
        		<div >
        			<input class="account-text" id="userpwd" type="password"  placeholder="请输入密码" />
        		</div>
        		<div>
        			<img id="xian_long" src="<%=request.getContextPath()%>/images/bmclass/xian.png" />
        		</div>
        		<div id="submitBtn" type="submit">登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
        			
        		<div ><a id="forgetPwd_link">忘记密码?</a></div>
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