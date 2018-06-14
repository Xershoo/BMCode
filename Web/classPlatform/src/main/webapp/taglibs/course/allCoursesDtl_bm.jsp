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
        			<font>价格：</font>
	        			<label>
						<input  type="checkbox" value="1" name="1">1元-5000元
						</label>
						<label>
						<input  type="checkbox" value="2" name="1">5000元-10000元
						</label>
						<label>
						<input type="checkbox" value="C" name="1">10000元-15000元
						</label>
						<label>
						<input type="checkbox" value="4" name="1">15000元-20000元
						</label>
						<label>
						<input type="checkbox" value="5" name="1">20000元以上
						</label>
        		</div>
        		
        		<div class="jiage"> 
        			<font>类型：</font>
	        			<label>
						<input type="checkbox" value="1" name="2">直播课程
						</label>
						<label>
						<input  type="checkbox" value="2" name="2">录播课程
						</label>
        		</div>
        		
        		<div class="jiage"> 
        			<font>时间：</font>
						<input class="idate" type="text"  name="1" placeholder=" 选择开始时间">
        		</div>
        		
        		<div class="jiage"> 
        			<font>时间：</font>
						<input  class="idate" type="text"  name="1" placeholder=" 选择结束时间">
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
        		<div class="tolpage"  id="tolpage"> 
        			<ul>
        				
        					<div class="tolpageli"> < </div>
        				
        				<li class="tolpageli2">
        					<div > <span> 1 </span> </div>
        				</li>
        				<li>
        					<div class=""> <span> 2 </span> </div>
        				</li>
        				<li>
        					<div class=""> <span> 3 </span>  </div>
        				</li>
        				<li>
        					<div class=""> <span> 4 </span> </div>
        				</li>
        				<li>
        					<div class=""> <span> 5 </span></div>
        				</li>
        				<li>
        					<div class=""> <span>6</span> </div>
        				</li>
        			
        					<div class="tolpageli">  > </div>
        				
        				
        			</ul>
        		</div>
        		<div class="zhanwei3"> </div>
        		
        	</div>
        </div>	
        </div>