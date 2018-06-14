<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div id="course_main">
	<input type="hidden" value="<%=request.getAttribute("courseDetail")%>">
	<input type="hidden" value="<%=request.getAttribute("categoryPath")%>">
	<input type="hidden" id="courseId" value="${courseid}"> 
	<input type="hidden" id="avgScore" value="${courseDetail.avgScore}">
	<input type="hidden" value="${courseDetail.courseName}" id="courseName">
	<input type="hidden" value="${courseDetail.canEnterClassid}" id="canEnterClassid">
	<input type="hidden" value="${order}" id="orderStatus">
	<input type="hidden" value="${courseDetail.courseStatus}" id="pianoStatus">
	<!--top-->
	
	<div class="topcol">
		<img src="<%=request.getContextPath()%>/images/bmclass/dingwei.png" />
		<font>您所在位置 &nbsp;:&nbsp; </font> 
		<a id="fpage" href="/">首页</a> 
		<span> > </span> 
		<a id="Apage" href="/course/searchAll">全部课程</a>
		<span> > </span> 
		<a id="Apage">课程详情</a>
	</div>

	<div class="top_content">
		<div class="c_top_bor">
			<div class="c_top">
				<div class="c_top_left">
				<c:if test="${ courseDetail.coverUrl ==''}">
					<img src="<%=request.getContextPath()%>/images/c1-1index/u362.png" alt="" width="500px"
						height="300px">
					
					</c:if>
					<c:if test="${ courseDetail.coverUrl !=''}">
					<img src="${courseDetail.coverUrl}" alt="" width="500px"
						height="300px">
					</c:if>
				</div>
				<div class="c_top_right">
					<h1 title="${courseDetail.courseName}" class="pn-cor-dtl">${courseDetail.courseName}</h1>
					<div class="c_top_tab">
						<div class="piano-data">
							<div class="piano-title">课程价格：</div>
							<c:choose>
								<c:when test="${courseDetail.priceTotal == 0}">
									<div class="piano-info piano-total">免费</div>
								</c:when>
								<c:when test="${empty courseDetail.priceTotal}">
									<div class="piano-info piano-total">免费</div>
								</c:when>
								<c:otherwise>
									<div class="piano-info piano-total">${courseDetail.priceTotal}元</div>
								</c:otherwise>
							</c:choose>
							
						</div>
						<div class="piano-data">
							<div class="piano-title">授课教师：</div>
							<div class="piano-info"><a onclick="location.href='<%=request.getContextPath()%>/infocenter/teacher/${courseDetail.teacherUid}'">${courseDetail.teacherName}</a></div>
						</div>
						<div class="piano-data">
							<div class="piano-title">所属机构：</div>
							<c:if test="${empty courseDetail.schoolName}">
								<div class="piano-info">尚未加入机构</div>
							</c:if>
							<c:if test="${not empty courseDetail.schoolName}">
								<div class="piano-info">${courseDetail.schoolName}</div>
							</c:if>
						</div>
						<div class="piano-data">
							<div class="piano-title">报名人数：</div>
							<div class="piano-other"><font color="#42b8f6">${courseDetail.studentTotal}</font> / ${courseDetail.nMaxStudents}</div>
							<div class="piano-title">综合评分：</div>
							<div class="piano-other piano-score">
								<c:choose>
									<c:when test="${courseDetail.avgScore == 0}">
										<img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png">
									</c:when>
									<c:when test="${courseDetail.avgScore > 0 && courseDetail.avgScore <= 1}">
										<img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png">
									</c:when>
									<c:when test="${courseDetail.avgScore > 1 && courseDetail.avgScore <= 2}">
										<img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png">
									</c:when>
									<c:when test="${courseDetail.avgScore > 2 && courseDetail.avgScore <= 3}">
										<img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png">
									</c:when>
									<c:when test="${courseDetail.avgScore > 3 && courseDetail.avgScore <= 4}">
										<img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png">
									</c:when>
									<c:when test="${courseDetail.avgScore > 4 && courseDetail.avgScore <= 5}">
										<img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png">
									</c:when>
									<c:otherwise>
										<img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_star.png"><img alt="" src="<%=request.getContextPath() %>/images/course/y_e_star.png">
									</c:otherwise>
								</c:choose>
								<span class="piano-score-data">${courseDetail.avgScore} 分</span>
							</div>
						</div>
						<div class="piano-data">
							<div class="piano-title">课程时间：</div>
							<div class="piano-info"><fmt:formatDate value="${courseDetail.courseStartTime}" pattern="yyyy-MM-dd HH:mm:ss" /> 到 
													<fmt:formatDate value="${courseDetail.courseEndTime}" pattern="yyyy-MM-dd HH:mm:ss" /></div>
						</div>
						<div class="c_btn">
							<c:if test="${user.uid != courseDetail.teacherUid}">
								<c:if test="${courseDetail.courseStatus == 6}">
									<input type="button" name="" id="c_end" value="报名结束"
										class="c_end" disabled>
								</c:if>
								<c:if
									test="${courseDetail.courseStatus == 30 || courseDetail.courseStatus == 40 || courseDetail.courseStatus == 41}">
									<input type="button" name="" id="c_end" value="课程已结束"
										class="c_end" disabled>
								</c:if>
								<c:if test="${courseDetail.courseStatus == 100}">
									<input type="button" name="" id="c_end" value="课程已冻结"
										class="c_end" disabled>
								</c:if>
								<c:if test="${courseDetail.courseStatus == 200}">
									<input type="button" name="" id="c_end" value="课程已停售"
										class="c_end" disabled>
								</c:if>
								<shiro:notAuthenticated>
									<c:if test="${courseDetail.courseStatus == 5}">
										<input type="button" name="" id="goLogin" value="立即报名"
											class="c_apply add_btn">
									</c:if>
								</shiro:notAuthenticated>
							</c:if>
							<shiro:authenticated>
								<c:if test="${user.uid != courseDetail.teacherUid}">
									<c:if test="${order == 1}">
										<input type="button" name="" id="unpay" value="报名待支付"
											class="c_apply add_btn"
											onClick="location.href='<%=request.getContextPath()%>/order/studentOrder'">
									</c:if>
									<c:if test="${order == 2 || order == 3}">
										<input type="button" name="" id="c_apply" value="已报名"
											class="c_apply add_btn alpay" disabled>
									</c:if>
									<c:if
										test="${order != 1 && order != 2 && order != 3 && courseDetail.courseStatus == 5}">
										<input type="button" name="" id="c_apply" value="立即报名"
											class="c_apply add_btn">
									</c:if>
								</c:if>
								<c:if test="${courseDetail.canEnterClassid != 0}">
									<input type="button" name="" id="goInClass" value="进入课堂"
										class="c_end in_class c_cursor" onClick="actix();">
								</c:if>
							</shiro:authenticated>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end -->
	<!-- middle -->
	<div class="add_middle">
		<div class="m_content">
			<div class="c_middle_left">
				<div class="c_middle_tab">
					<div id="course_info" class="course_info">课程简介</div>
					<div id="course_catalog" class="course_catalog">课程目录</div>
					<div id="course_data" class="course_data">TA的其他课程</div>
					<div id="course_evaluation" class="course_evaluation">
						课程评价( <font color="red">${courseDetail.countComment}</font> 条)
					</div>
				</div>
			</div>
			<div id="ccPage" style="display:none;"></div>
			<div id="evaluate" style="display:none">
				<div class="eva-course">
					<div class="eva-star"><div class="eva-th-cour">老师的课程评价：</div><div id="star2" style="width:180px;"></div><div id="result2"></div><span class="eva-prompt"></span></div>
					<div class="eva-info"><textarea id="eva-area" cols="1" rows="1" placeholder="发表一下评论吧~" class="eva-area" maxlength="200"></textarea></div>
					<div class="eva-star"><div class="eva-th-cour"><span class="data-prompt"></span></div></div>
				</div>
				<div id="pubEvaluate">发表评论</div>
			</div>
			<div id="page" style="display:none;"></div>
		</div>
	</div>
	<!-- end -->
</div>