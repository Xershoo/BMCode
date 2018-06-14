<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	function gotoUserCenter() {
		location.href = getRootPath() + '/persondata/toAccount';
	}
	
	function searchCourse(){
		var keyWords = $.trim($("#serch").val());
		location.href = getRootPath() + '/course/search?keyword=' + encodeURI(encodeURI(keyWords));
	}
</script>
<input type="hidden" id="uid" value="${user.uid }">
<c:choose>
<c:when test="${empty user.uid }">
<!--1.顶部黑条 -->
<div id="topBlack">
	<div id="topBlack1200">
			<span>
				<font>您好，欢迎来到我爱课堂</font>
			</span>
		    <span id="font1">
				<span>
					<a href="/loginPage"><font>请登录</font></a>
				</span>
				<span>
					<a href="/register"><font>免费注册</font></a>
				</span>
				<span>
					<font>|</font>
				</span>
				<span>
					<a href="#"><font>下载客户端</font></a>
				</span>
		    </span>
		<span id="topBlackRight">
			<span id="img1">
				<img src="<%=request.getContextPath()%>/images/index/bm/qq.png" />
				<img src="<%=request.getContextPath()%>/images/index/bm/wx.png" />
				<img src="<%=request.getContextPath()%>/images/index/bm/wb.png" />
			</span>
		</span>
	</div>
</div>
</c:when>
<c:otherwise>
<div id="topToolbarBack">
	<div id="topToolbarFront">
		<div class="headWelcom">
			<p>${user.nickName}好，欢迎来到我爱课堂</p>
		</div>
		<div class="headUserImage">
			<img class="imageUserHeader" src="${user.avatarUrl}" onclick="gotoUserCenter()"></img>
		</div>
		<div class="headTextRight">
			<a id="headLinkText" href="/teacher/course/manage">我的课程</a>
		</div>
		<div class="headVline">
			<p >|</p>
		</div>
		<div class="headTextRight">
			<a id="headLinkText" href="/logout">退出登录</a>
		</div>
		<div class="headTextEnd">
			<a id="headLinkText" href="/app/download">客户端下载</a>
		</div>
	</div>
</div>
</c:otherwise>
</c:choose>
 <!--2.logo_导航_搜索-->
 <div id="logoMenuSerch">
 	<span id="logo">
 		<img src="<%=request.getContextPath()%>/images/index/bm/logo.png" />
 	</span>
 	<ul style="list-style-type:none">
 	<c:if test="${page == 'index' }">
  	<a href="/"><li class="firstPage"><font>首页</font></li></a>
  	</c:if>
  	<c:if test="${page != 'index' }">
  	<a href="/"><li><font>首页</font></li></a>
  	</c:if>
  	
  	<c:if test="${page == 'allCourses' }">
 	<a href="/course/searchAll"> <li class="firstPage"><font>全部课程</font></li></a>
 	</c:if>
 	<c:if test="${page != 'allCourses' }">
 	<a href="/course/searchAll"> <li ><font>全部课程</font></li></a>
 	</c:if>
 	
 	<c:if test="${page == 'allTeachers' }">
  	<a href="/searchAllTeacher"><li class="firstPage"><font>全部老师</font></li></a>
  	</c:if>
  	<c:if test="${page != 'allTeachers' }">
  	<a href="/searchAllTeacher"><li ><font>全部老师</font></li></a>
  	</c:if>
  	
  	<c:if test="${page == 'recordCourse' }">
  	<a href="/course/playback"><li class="firstPage"><font>课程回放</font></li></a>
  	</c:if>
  	<c:if test="${page != 'recordCourse' }">
  	<a href="/course/playback"><li ><font>课程回放</font></li></a>
  	</c:if>
  	
 	</ul>
    	
	<div id="sp1">
	<input id="serch" type="text"  placeholder=" 直播课程  录播课程  免费课程"/>
		<div id="sp2">
			<img id="serchIcon" src="<%=request.getContextPath()%>/images/index/bm/fd.png"/ onclick="searchCourse()">
		</div >
	</div>
</div>