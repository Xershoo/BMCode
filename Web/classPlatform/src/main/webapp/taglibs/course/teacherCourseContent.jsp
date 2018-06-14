	<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<div class="courseCalWrap">
		<div class="courseCalLeft">
			<div class="dateTop">
				<div class="scroll">
					<span class="scrollLeft"></span>
					<span id="focusDate" class="focusDate"></span>
					<span class="scrollRight"></span>
					<div class="threeImg">
						<span class="monthImg current">月</span>
						<span class="weekImg">周</span>
						<span class="dayImg">日</span>
					</div>	
				</div>
			</div>
			<ul class="threeImgList">
				<li class="monthCourse current1 threeImgListLi">
					<div id ="container" class="container"></div>
			        
				</li>
				<li class="weekCourse threeImgListLi">
					<div class="weekCourseCon">
						<h3 class="weekCourseTittle">
							<span class="jieci">星期<br>节次</span>
							<span class="first_weekTitle">星期一</span>
							<span>星期二</span>
							<span>星期三</span>
							<span>星期四</span>
							<span>星期五</span>
							<span>星期六</span>
							<span>星期日</span>
						</h3>
						<div class="weekDays clearfix">
							<ul class="weekEvery">
								<li>1</li>
								<li>2</li>
								<li>3</li>
								<li>4</li>
								<li>5</li>
								<li>6</li>
								<li>7</li>
								<li>8</li>
								<li>9</li>
								<li>10</li>
								<li>11</li>
								<li>12</li>
							</ul>
							<ul class="weekEveryCon first_weekEveryCon">
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
							</ul>
							<ul class="weekEveryCon">
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
							</ul>
							<ul class="weekEveryCon">
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
							</ul>
							<ul class="weekEveryCon">
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
							</ul>
							<ul class="weekEveryCon">
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
							</ul>
							<ul class="weekEveryCon">
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
							</ul>
							<ul class="weekEveryCon" id="lastWeekCon">
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
								<li><p class="courseName"><span></span><span class="courses"></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p></li>
							</ul>

						</div>
					</div>
				</li>
				<li class="dayCourse threeImgListLi">
					<div class="dayCourseCon">
						<div class="dayCourseTitleWrap">
							<span class="jieci">星期<br>节次</span>
							<span class="dayCourseTitle">星期三</span>
							
						</div>
						<div class="dayCourseMain">
							<div class="liDiv">
								<div class="olLeft">1</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">2</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">3</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">4</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">5</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">6</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">7</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>

							<div class="liDiv">
								<div class="olLeft">8</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">9</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">10</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">11</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
							<div class="liDiv">
								<div class="olLeft">12</div>
								<div class="olRight">
									<p class="courseName"><span></span><span class="courses"></span><span></span></p>
									<p class="courseTime"><span></span><span></span><span></span></p>
								</div>
							</div>
						</ol>
					</div>
				</li>
			</ul>	
		</div><!--courseCalLeft end-->
		<div class="courseCalRight">
			<div class="littleCal">
				<div class="scroll littleScroll">
					<span class="scrollLeft"> </span>
					<span id="littleFocusDate" class="focusDate"></span>
					<span class="scrollRight">  </span>
				</div>
				<div id ="littleContainer" class="container"></div>
			</div><!--littleCal end-->
			<div class="myCourse">
				<h3>我的课程</h3>
				<!-- <p class="courseNameTitle">课程类型</p> -->
				<ul class="myCourseList" id="myCourseList">
				</ul>
			</div><!--myCourse end-->
		</div><!--courseCalRight end-->
	</div><!--courseCalWrap end-->