<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<body>
<input type="hidden" value="${keyword}" id="keywords"> 
<input type="hidden" value="${minPrice}" id="minPrices"> 
<input type="hidden" value="${maxPrice}" id="maxPrices"> 
<input type="hidden" value="${startTime}" id="startTime"> 
<input type="hidden" value="${endTime}" id="endTime"> 
<input type="hidden" value="${onlineType}" id="onlineType"> 
<input type="hidden" value="${courses.pages}" id="pages">
<input type="hidden" value="${courses.total}" id="count">
<input type="hidden" value="${courses.pageNum}" id="pageNum">


<div class="bg_course">
<div class="m_order">
	<input type="hidden" value="1" id="courseType"/>
	<div class="liebiao">
		<div class="title" id="teacherCourseTitle">
			<div class="pn_price">价格：</div>
			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check1" ></div> <div>0-100元</div>
			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check2" ></div> <div>100-200元</div>
			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check3" ></div> <div>200元以上</div>
			<div class="pn_price pn_other"> |　</div>
			<div class="pn_price">类型：</div>
			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check8" ></div> <div>直播课程</div>
			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check9" ></div> <div>录播课程</div>
			<div class="pn_price pn_other"> |　</div>
			<div class="pn_price">时间：</div>
<%-- 			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check4" ></div> <div>三天以内</div> --%>
<%-- 			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check5" ></div> <div>一周以内</div> --%>
<%-- 			<div class="check"><img src="<%=request.getContextPath()%>/images/course/check_05.png" id="check6" ></div> <div>一个月内</div> --%>
			<img class="pn_sh_time" src="<%=request.getContextPath()%>/images/piano_course/pn_time.gif">
			<div class="pn_picker"><input type="text"  id="startTimes" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'endTimes\')}'})" class="pn_time">  
			</div>
			<div class="pn_pgg">至</div>
			<img class="pn_sh_time2" src="<%=request.getContextPath()%>/images/piano_course/pn_time.gif">
			<div class="pn_picker"><input type="text" id="endTimes" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'startTimes\')}'})" class="pn_time"></div>
			<div class="pn_search_key">
				<input type="text" placeholder="搜索课程或老师" class="pn_time pn_key pn_sn_other" id="keyword">
				<div class="search_btn" id="searchBtn">搜索</div>
			</div>
		</div>
<div  id="gr1">
<div id="grTable1"> 
		<c:forEach var="course" items="${courses.list}">
		 <div class="liebiao1"> 
			  <div class="jibenxinxi1"> 
			 	 <div class="img11"> 
			 	 	<c:if test="${empty course.coverUrl}">
					  <li class="i2"><img id="u202_img" class="img" src="../images/c1-1index/u362.png" onclick="toCourseDetail(${course.courseid})"></li> 
			 	 	</c:if>
			 	 	<c:if test="${not empty course.coverUrl}">
					  <li class="i2"><img id="u202_img" class="img" src="${course.coverUrl}" onclick="toCourseDetail(${course.courseid})"></li> 
			 	 	</c:if>
				  </div> 
			  </div> 
			  <div class="jiage1"> 
			  	<c:if test="${empty course.courseName}">
			  		<div class="cor-title"><span style="cursor:pointer;" onclick="toCourseDetail(${course.courseid})">${course.className}</span></div> 
			  	</c:if>
				<c:if test="${not empty course.courseName}">
			  		<div class="cor-title"><span style="cursor:pointer;" onclick="toCourseDetail(${course.courseid})">${course.courseName}</span></div> 
			  	</c:if>
			 	 <div class="cor-progress"> 
			 		 <div class="cor-progress1"><img src="../../images/piano_teacher/progress.gif"></div><div class="cor-progress2"> 课程进度：${course.classHadFinished} / ${course.classTotal}&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="cor-progress3"><img src="../../images/piano_teacher/apply.gif" class="cor-app"> </div><div class="cor-progress4">报名学生： ${course.totalStudent} / ${course.nMaxStudents}  </div>
				 </div> 
			  <div class="cor-time"><div class="cor-time1"><img src="../../images/piano_teacher/time.gif"></div> <div class="cor-time2">上课时间：<fmt:formatDate value="${course.startTimePlan}" pattern="yyyy-MM-dd HH:mm"/></div></div> 
			  </div> 
			  	<div class="renshu1 pn-tech">${course.teacherName}老师</div>
			  	<c:if test="${empty course.price_total}">
			  		<div class="renshu1">免费</div> 
			  	</c:if>
			  	<c:if test="${not empty course.price_total}">
			  		<div class="renshu1">￥ ${course.price_total}</div> 
			  	</c:if>
			  <div class="zhuangtai1">
			  	<c:choose>
			  		<c:when test="${course.courseStatus == 5}"> <div class="cor-status">已开课</div> </c:when>
			  		<c:when test="${course.courseStatus == 0}"> <div class="cor-status">未开课</div> </c:when>
			  		<c:when test="${course.courseStatus == 7}"> <div class="cor-status">已取消</div> </c:when>
			  		<c:when test="${course.courseStatus == 10}"> <div class="cor-status">正在上课</div> </c:when>
			  		<c:otherwise><div class="cor-status">已开课</div></c:otherwise>
			  	</c:choose>
			  	<div class="cor-view" onclick="toCourseDetail(${course.courseid})">查看详情</div>
<%-- 			  	<div class="cor-sign" onclick="signCourse(${course.courseid})">立即报名</div> --%>
		  		<c:if test="${course.courseStatus == 5}"> 
		  			<shiro:notAuthenticated>
			  			<div class="cor-sign" onclick="goLogin();">立即报名</div> 
		  			</shiro:notAuthenticated>
		  			<shiro:authenticated>
		  				<div class="cor-sign" onclick="signCourse(${course.courseid})">立即报名</div> 
		  			</shiro:authenticated>
		  		</c:if>
<%-- 			 	  <div class="cor-view" onclick="toCourseDetail(${courses.courseid})">查看详情</div>  --%>
			  </div> 
		</div> 
		</c:forEach>
		<c:if test="${empty courses.list}">
			<div class="pn-nodata">没有查到您要搜索的数据╮(╯▽╰)╭</div>
		</c:if>
		<c:if test="${not empty courses.list && courses.total > 10}">
			<div class="pages">
	        	<div id="Pagination"></div>
	        	<div class="searchPage">
	          		<span class="page-sum">共<strong class="allPage">${courses.pages}</strong>页</span>
	          		<span class="page-go">跳转<input type="text" id="jumpCor">页</span>
	          		<a href="javascript:;" class="page-btn" id="gogogo">GO</a>
	        	</div>
	    	</div>
		</c:if>

</div>		

</div>	
		
		<div id="page"></div>
		</div>
		</div>
		</div>
<!-- <div class="pn_efff"></div> -->
<div class="pn_blank"></div>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>