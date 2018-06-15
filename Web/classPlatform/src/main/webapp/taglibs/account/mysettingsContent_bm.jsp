<%@ page language="java" pageEncoding="UTF-8" %>

<div class="all">
    <div class="zhanwei20"></div>
    <div class="all1">
        <div class="leftMenu">
            <a href="/account/course">
                <div class="myCourse">
                    <div><img src="<%=request.getContextPath()%>/images/account/1.png"/></div>
                    <div><font>我的课程</font></div>
                </div>
            </a>
            <a href="/account/resLib">
                <div class="TeaData">
            <div><img src="<%=request.getContextPath()%>/images/account/2.png"/></div>
            <div><font>教学资料库</font></div>
        </div>
        </a>
        <a href="/account/wealth">
            <div class="myTreasure">
                <div><img src="<%=request.getContextPath()%>/images/account/3.png"/></div>
                <div><font>我的财富</font></div>
            </div>
        </a>
        <a href="/account/settings">
            <div class="personSet">
                <div><img src="<%=request.getContextPath()%>/images/account/4.1.png"/></div>
                <div><font>个人设置</font></div>
            </div>
        </a>
    </div>
        <div class="rightContrnt">
            <%@ include file="/taglibs/account/item_mysettings_content.jsp" %>
        </div>
    </div>
</div>








