<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<input type="hidden" id="keyWord" value="${keyWord }">

		<div class="all" >
        	<div id="all1" >
	        	<div class="dingwei">
	        		<img src="<%=request.getContextPath()%>/images/bmclass/dingwei.png" />
	        		<font>您所在位置 &nbsp;:&nbsp; </font>
	        		<a id="fpage" href="/index">首页</a>
	        		<span> > </span>
	        		<a id="Apage" href="/searchAllTeacher">全部老师</a>
	        	</div>
	        	
	        	<div class="content" >
	        		<div id="teacherList">
				        <!-- 单个老师 -->
				        <div class="photoKuang">
		        			<div class="photo"><img src="<%=request.getContextPath()%>/images/head/touxiang.png"/></div>
		        			<div class="teaName">水龙岩老师</div>
		        			<div class="teaYear">5年教育经验</div>
		        			<div class="teaSchool">浙江工商大学优秀教师</div>
		        			<div class="teaPerson" >个人主页</div>
		        		</div>
			        </div>   
				    <!-- 分隔-->
				    <div class="zhanwei16"></div>
					<!-- 分页 -->
					<div class="tolpage" id="tolpage">
						<ul>
							<div class="tolpageli"><</div>
							<li class="tolpageli2">
								<div>
									<span> 1 </span>
								</div>
							</li>
							<li>
								<div class="">
									<span> 2 </span>
								</div>
							</li>
							<li>
								<div class="">
									<span> 3 </span>
								</div>
							</li>
							<li>
								<div class="">
									<span> 4 </span>
								</div>
							</li>
							<li>
								<div class="">
									<span> 5 </span>
								</div>
							</li>
							<li>
								<div class="">
									<span>6</span>
								</div>
							</li>
							<div class="tolpageli">></div>
						</ul>
					</div>
					<div class="zhanwei30" ></div>		
	        	</div>
        	</div>	
        </div>