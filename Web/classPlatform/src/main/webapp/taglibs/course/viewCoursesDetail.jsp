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
	<!--top-->
	<div class="top_content">
		<div class="c_top_bor">
			<%-- <div class="c_title">
			<c:if test="${not empty categoryPath}">
				<img alt="" src="<%=request.getContextPath()%>/images/course/cata_img.png">
			</c:if>
				<c:forEach items="${categoryPath}" var="category" varStatus="status">
					<c:if test="${status.last}">
						${category.name}
					</c:if>
					<c:if test="${not status.last}">
						${category.name} > 
					</c:if>
				</c:forEach>
			</div> --%>
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
					<h1 title="${courseDetail.courseName}"></h1>
<%-- 					<img alt="" src="<%=request.getContextPath()%>/images/course/straight.png" class="straight"> h1里面--%>
					<%-- <div class="c_top_price">
						<c:choose>
							<c:when test="${courseDetail.priceTotal == 0.0}">
								课程价格：<font color="#ffa800" style="font-size:26px;">免费&nbsp;&nbsp;&nbsp;</font>
							</c:when>
							<c:when test="${not empty courseDetail.priceTotal}">
								课程价格：<font color="#ffa800" style="font-size:26px;">￥${courseDetail.priceTotal}&nbsp;&nbsp;&nbsp;</font>
							</c:when>
							<c:otherwise>
								课程价格：<font color="#ffa800" style="font-size:26px;">免费&nbsp;&nbsp;&nbsp;</font>
							</c:otherwise>
						</c:choose>
					</div> --%>
					<%-- <div class="c_coupons">
						<img src="<%=request.getContextPath()%>/images/course/c_coupon.png"
							class="c_cp"> <a class="get_coupons">领取优惠券</a>
					</div> --%>
<!-- 					<img alt="" -->
<%-- 						src="<%=request.getContextPath()%>/images/course/under_line.png" --%>
<!-- 						width="625px" class="c_under"> -->
					<div class="c_top_tab">
						<table class="c_tab_dtl">
							<tr>
								<th width="75px">课程价格：</th>
								<td width="150px">￥${courseDetail.priceTotal}</td>
								<%-- <th width="75px">课程分类：</th>
								<td width="150px">
									<c:forEach items="${categoryPath}" var="category" varStatus="status">
										<c:if test="${status.last}">
											${category.name}
										</c:if>
									</c:forEach>
								</td> --%>
								<th width="75px">课程时间：</th> 
								<td width="200px"><fmt:formatDate value="${courseDetail.courseStartTime}" pattern="yyyy-MM-dd HH:mm" /> ~ 
													<fmt:formatDate value="${courseDetail.courseEndTime}" pattern="yyyy-MM-dd HH:mm" /></td>
							</tr>
							<tr>
								<th>课节总数：</th>
								<td>共<font color="#ffa800">${courseDetail.classTotal}</font>节
								</td>
								<th>报名人数：</th>
								<td>${courseDetail.studentTotal} /
									${courseDetail.nMaxStudents}</td>
							</tr>
							<%-- <tr>
								<th>适合人群：</th>
									<c:if test="${!empty courseDetail.people}">
										<c:choose>
											<c:when test="${fn:length(courseDetail.people) > 12 }">
												<td title="${courseDetail.people}">${fn:substring(courseDetail.people,0,12)}...</td>
											</c:when>
											<c:otherwise>
												<td>${courseDetail.people}</td>
											</c:otherwise>
										</c:choose>
									</c:if>
									<c:if test="${empty courseDetail.people}">
										<td></td>
									</c:if>
								<th>报名人数：</th>
								<td>${courseDetail.studentTotal} /
									${courseDetail.nMaxStudents}</td>
							</tr> --%>
							<tr>
								<td colspan="4">
										<div class="c_btn">
	<%-- 										<c:if test="${courseDetail.courseStatus == 0}"> --%>
	<!-- 											<input type="button" name="" id="c_apply" value="立即报名" class="c_apply add_btn" disabled> -->
	<%-- 										</c:if> --%>
											<c:if test="${user.uid != courseDetail.teacherUid}">
												<c:if test="${courseDetail.courseStatus == 6}">
													<input type="button" name="" id="c_end" value="报名结束" class="c_end" disabled>
												</c:if>
												<c:if test="${courseDetail.courseStatus == 30 || courseDetail.courseStatus == 40 || courseDetail.courseStatus == 41}">
													<input type="button" name="" id="c_end" value="课程已结束" class="c_end" disabled>
												</c:if>
												<c:if test="${courseDetail.courseStatus == 100}">
													<input type="button" name="" id="c_end" value="课程已冻结" class="c_end" disabled>
												</c:if>
												<c:if test="${courseDetail.courseStatus == 200}">
													<input type="button" name="" id="c_end" value="课程已停售" class="c_end" disabled>
												</c:if>
												<shiro:notAuthenticated>
													<c:if test="${courseDetail.courseStatus == 5}">
														<input type="button" name="" id="goLogin" value="立即报名" class="c_apply add_btn" >
													</c:if>
												</shiro:notAuthenticated>
											</c:if>
											<shiro:authenticated>
												<c:if test="${user.uid != courseDetail.teacherUid}">
													<c:if test="${order == 1}">
														<input type="button" name="" id="unpay" value="报名待支付" class="c_apply add_btn"  onClick="location.href='<%=request.getContextPath()%>/order/studentOrder'">
													</c:if>
													<c:if test="${order == 2 || order == 3}">
														<input type="button" name="" id="c_apply" value="已报名" class="c_apply add_btn alpay" disabled>
													</c:if>
													<c:if test="${order != 1 && order != 2 && order != 3 && courseDetail.courseStatus == 5}">
														<input type="button" name="" id="c_apply" value="立即报名" class="c_apply add_btn">
													</c:if>
												</c:if>
												<c:if test="${courseDetail.canEnterClassid != 0}">
													<input type="button" name="" id="goInClass" value="进入课堂" class="c_end in_class c_cursor" onClick="actix();">
												</c:if>
												<%-- <c:choose>
													<c:when test="${courseDetail.canEnterClassid == 0}">
														<input type="button" name="" id="goInClass" value="进入课堂" class="c_end c_dis" disabled>
													</c:when>
												</c:choose> --%>
											</shiro:authenticated>
										</div>
								</td>
							</tr>
						</table>
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
					<div id="course_evaluation" class="course_evaluation">
						课程评价(<font color="red">${courseDetail.countComment}</font> 条)
					</div>
					<div id="course_data" class="course_data">课件资料</div>
				</div>
				<div class="course_content">
					<h2 class="c_target_h2">
						<img src="<%=request.getContextPath()%>/images/account/tips.png"
							class="c_t_tip">课程目标：
					</h2>
					<div class="c_target">${courseDetail.target}</div>
					<h2 class="c_target_h2">
						<img src="<%=request.getContextPath()%>/images/account/tips.png"
							class="c_t_tip">教学对象：
					</h2>
					<div class="c_target">${courseDetail.people}</div>
					<h2 class="c_target_h2">
						<img src="<%=request.getContextPath()%>/images/account/tips.png"
							class="c_t_tip">课程简介：
					</h2>
					<div class="c_target c_intro">${courseDetail.description}</div>

				</div>
			</div>
			<div id="ccPage" style="display:none;"></div>
			<div id="evaluate" style="display:none">
				<div class="eva-course">
					<div class="eva-star"><div class="eva-th-cour">老师的课程评价：</div><div id="star2"></div><div id="result2"></div><span class="eva-prompt"></span></div>
					<div class="eva-info"><textarea id="eva-area" cols="1" rows="1" placeholder="发表一下评论吧~" class="eva-area" maxlength="200"></textarea></div>
					<div class="eva-star"><div class="eva-th-cour"><span class="data-prompt"></span></div></div>
				</div>
				<div id="pubEvaluate">发表评论</div>
			</div>
			<div class="c_middle_right">
				<div class="middle_right">
					<div class="middle_img"  onclick="location.href='<%=request.getContextPath()%>/infocenter/teacher/${courseDetail.teacherUid}'">
						<c:if test="${not empty courseDetail.teacherAvatarUrl}">
							<img alt="" src="${courseDetail.teacherAvatarUrl}" class="self_img">
						</c:if>
						<c:if test="${empty courseDetail.teacherAvatarUrl}">
							<c:choose>
								<c:when test="${courseDetail.teacherSex == 1}">
									<img alt="" src="<%=request.getContextPath()%>/images/teacher/male_teacher.png" class="self_img">
								</c:when>
								<c:otherwise>
									<img alt="" src="<%=request.getContextPath()%>/images/teacher/female_teacher.png" class="self_img">
								</c:otherwise>
							</c:choose>
						</c:if>
					</div>
					<div class="middle_self_info">
						<p class="t_name">
							<c:if test="${courseDetail.teacherSex == 0}">
								<img alt="" src="<%=request.getContextPath()%>/images/course/female_img.png" class="t_sex">
							</c:if>
							<c:if test="${courseDetail.teacherSex == 1}">
								<img alt="" src="<%=request.getContextPath()%>/images/course/male_img.png" class="t_sex">
							</c:if>
							${courseDetail.teacherName}
						</p>
						<p>教龄：
							<c:if test="${empty courseDetail.teachyears}">
								0
							</c:if>
							<c:if test="${not empty courseDetail.teachyears}">
								<fmt:formatNumber pattern="#">
									${courseDetail.teachyears} 
								</fmt:formatNumber>
							</c:if>
						年</p>
						<p>${courseDetail.schoolName}</p>
					</div>
					<p class="c_score">讲解综合评分：</p>
					<p class="c_score s_score" id="thCorsScore">
						<%-- <img alt=""
							src="<%=request.getContextPath()%>/images/course/y_e_star.png">
						<img alt=""
							src="<%=request.getContextPath()%>/images/course/y_e_star.png">
						<img alt=""
							src="<%=request.getContextPath()%>/images/course/y_e_star.png">
						<img alt=""
							src="<%=request.getContextPath()%>/images/course/y_e_star.png">
						<img alt=""
							src="<%=request.getContextPath()%>/images/course/y_e_star.png">
						<span class="d_score">${courseDetail.avgScore}分</span> --%>
					</p>
				</div>
				<div class="middle_right right_bottom" id="otherCourses">
					<div>
						<span class="c_other">TA的其他课程</span> <a class="go_cor" onclick="location.href='<%=request.getContextPath()%>/infocenter/teacher/${courseDetail.teacherUid}'">...</a>
					</div>
				</div>
				<div class="middle_right c_bottom">
					<!-- 			<p class="c_applyed">已报名的学生(100人)</p> -->
					<!-- 			<table class="st_tab"> -->
	
					<!-- 			</table> -->
				</div>
<!-- 					<div id="page"></div> -->
			</div>
		</div>
	</div>
	<!-- end -->
	<%-- <%@ include file="/taglibs/common/loginWindow.jsp"%> --%>
</div>