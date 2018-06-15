<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
 <script type="text/javascript">
 	function gotoCourseDetailPage(courseId) {
 		location.href = getRootPath()+"/course/detail/"+courseId;
 	}
 </script>
 
 	<input type="hidden" value="${keyword}" id="keywords"> 
	<input type="hidden" value="${minPrice}" id="minPrices"> 
	<input type="hidden" value="${maxPrice}" id="maxPrices"> 
	<input type="hidden" value="${startTime}" id="startTime"> 
	<input type="hidden" value="${endTime}" id="endTime"> 
	<input type="hidden" value="${onlineType}" id="onlineType"> 
	<input type="hidden" value="${courses.pages}" id="pages">
	<input type="hidden" value="${courses.total}" id="count">
	<input type="hidden" value="${courses.pageNum}" id="pageNum">

	<div class="all">
        <div id="all1">
        	<div class="dingwei">
        			<img src="<%=request.getContextPath()%>/images/bmclass/dingwei.png" />
        		<font>您所在位置 &nbsp;:&nbsp; </font>
        		<a id="fpage" href="/">首页</a>
        		<span> > </span>
        		<a id="Apage" href="/course/searchAll">全部课程</a>
        	</div>
        	
        	<div class="tiaojian">
        		<div class="jiage"> 
        			<font>课程价格：</font>
	        			<label>
						<input  type="checkbox" value="1" id="check1">0-100元
						</label>
						<label>
						<input  type="checkbox" value="2" id="check2">100-200元
						</label>
						<label>
						<input type="checkbox" value="C" id="check3">200-500元
						</label>
						<label>
						<input type="checkbox" value="4" id="check4">500-1000元
						</label>
						<label>
						<input type="checkbox" value="5" id="check5">1000元以上
						</label>
        		</div>
        		
        		<div class="jiage"> 
        			<font>课程类型：</font>
	        			<label>
						<input type="checkbox" value="1" id="check6">直播课程
						</label>
						<label>
						<input  type="checkbox" value="2" id="check7">录播课程
						</label>
        		</div>
        		
        		<div class="jiage"> 
        			<font>开始时间：</font>
						<input class="idate" type="text"  id="startTimes" placeholder=" 选择开始时间" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'endTimes\')}'})">
					<font>结束时间：</font>
						<input  class="idate" type="text"  id="endTimes" placeholder=" 选择结束时间" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'startTimes\')}'})">
        		</div>
        		
        		<div class="jiage"> 
        			<font>关键词&nbsp;&nbsp;&nbsp;：</font>
						<input  class="idate" type="text"  id="keyword" placeholder=" 搜索老师或者课程">
						<span class="sousuo" id="searchBtn">搜&nbsp;&nbsp;&nbsp;&nbsp;索</span>
        		</div>
        	</div>
        	<div class="zhanwei"></div>
        	<div class="content">
        		<c:forEach var="course" items="${courses.list}">
					<div class="course_info" >
						<div id="recom${course.courseid}" onclick="gotoCourseDetailPage(${course.courseid})">
							<img src="${course.coverUrl}">
						</div>
						<div class="courseName"><font>${course.courseName}</font></div>
		        		<div class="coursePeron"><font>${course.totalStudent}人已报名</font></div>
		        		<div class="coursePeron"><font>时间：<fmt:formatDate value="${course.startTimePlan}" pattern="yyyy-MM-dd HH:mm"/>上课</font></div>
		        		<div class="coursePeron"><font>授课老师：${course.teacherName}</font></div>
		        		<div id="coursePrice"><font>￥${course.price_total}</font><span>元</span></div>
					</div> 
				</c:forEach>
				<!-- 			
        		<div class="course11" >
	        		<div><img src="<%=request.getContextPath()%>/images/index/bm/tu.png"/></div>
	        		<div class="courseName"><font>ABC One</font></div>
	        		<div class="coursePeron"><font>6373人已报名</font></div>
	        		<div class="coursePeron"><font>时间：2018-06-01 12:00上课</font></div>
	        		<div class="coursePeron"><font>授课老师：陆敏技老师</font></div>
	        		<div id="coursePrice"><font>￥199.0</font><span>元</span></div>
	            </div>
	             -->
        		
        		<div class="zhanwei2"> </div>
        		<c:if test="${not empty courses.list}">
	        		<div class="tolpage"  id="tolpage"> 
	        			<ul>
	        				<div class="tolpageli"> < </div>
	        				
	        				<li class="tolpageli2">
	        					<div > <span> 1 </span> </div>
	        				</li>
	        				
	        				<c:forEach var="page" begin="2" end="${courses.pages}" step="1">
		  						<li>
		        					<div class=""> <span> ${page} </span> </div>
		        				</li>
							</c:forEach>
							
							<div class="tolpageli">  > </div>
	        			</ul>
	        		</div>
        		</c:if>
        		<div class="zhanwei3"></div>
        	</div>
        </div>	
    </div>