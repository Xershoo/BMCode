<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div>
    <div class="topMenu">
        <ul >
            <li id="tclick"><font>基本信息</font></li>
            <a href="../accountSecurity/accountSecurity.html"><li ><font>账户安全</font></li></a>
            <a href="../photo/personPhoto.html"><li ><font>形象照</font></li></a>
        </ul>
    </div>
    <div class="zhanwei40"></div>

    <div class="zhanwei200">
        <div class="touxiang"><img src="${user.avatarUrl}"/></div>
        <div class="loginData">
            <div class="Tphone">您好，${user.nickName}</div>
            <div class="Tlogin">上次登录时间：2016-01-15 12:45:46</div>
            <div class="Tphoto">
                <img src=""/>
                <img src=""/>
            </div>
        </div>
    </div>

    <div class="zhanwei58">填写个人信息</div>
    <form>
        <div class="formKuang">
            <div class="zhanwei50"></div>
            <div class="uID">
                <font>用户ID</font>
                <input type="text"  readonly="readonly" value="16101" />
            </div>
            <div class="uID">
                <font>手机号</font>
                <input type="text"  readonly="readonly" value="133****3333" />
            </div>
            <div class="uName">
                <font>姓名</font>
                <input type="text"   />
            </div>
            <div class="uName">
                <font>昵称</font>
                <input type="text"   />
            </div>
            <div class="uSex">
                <font>性别</font>
                <input type="radio"  name="sex" /><span>男</span>
                <input type="radio"  name="sex" /><span>女</span>
            </div>
            <div class="uName">
                <font>生日</font>
                <input type="text"   />
            </div>
            <div class="moreInfo">
                <div class="moreFont"><font>个性签名</font></div>
                <textarea ></textarea>
            </div>
            <div class="moreInfo">
                <div class="moreFont"><font>更多信息</font></div>
                <textarea ></textarea>
            </div>

            <div class="submit"><input type="button" value="保存" /></div>
        </div>
    </form>

</div>
