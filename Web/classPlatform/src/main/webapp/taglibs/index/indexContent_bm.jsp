<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript">
 	function gotoCourseDetailPage(courseId) {
 		location.href = getRootPath()+"/course/detail/"+courseId;
 	}
 </script>
 
<!--3.banner -->
<div class="banner">
	<ul class="pic">
		<li><a href="#"><img src="images/index/bm/banner0.png" alt=""
				width="1440" height="431"></a></li>
		<li><a href="#"><img src="images/index/bm/banner1.png" alt=""
				width="1440" height="431"></a></li>
	</ul>

	<ul class="anniu">
		<li class="on"></li>
		<li></li>
	</ul>
</div>
<!--4.R 推荐课程 -->
<div id="R">
	<img id="pic" src="images/index/bm/R.png" />
	<div id="R1">
		<font>Recommended</font></br>
	</div>

	<div id="R2">
		<font>推荐课程</font>
	</div>
</div>

<!--5推荐课程展示-->
<div style="background: #f5f5f5;">
	<div class="zhanwei"></div>
	<div id="recommendCourse" class="courseList">
		<!--    	
		<div class="course_info">
			<div id="recom12005">
				<img src="/images/course/creatcourse.png">
			</div>
			<div class="courseName">
				<font>ceshi</font>
			</div>
			<div class="coursePeron">
				<font>时间: 2018-06-04 10:45上课</font>
			</div>
			<div class="coursePeron">
				<font>授课老师：刘老师</font>
			</div>
			<div id="coursePrice">
				<font>￥0</font><span>元
			</div>
		</div>
	
		<div class="course_info">
			<div id="recom10000">
				<img
					src="http://121.43.33.4:12080/PicDown/coursebg/53750c6b-6c17-4140-adab-778d7075c3273411484331854670620.jpg">
			</div>
			<div class="courseName">
				<font>ABC One</font>
			</div>
			<div class="coursePeron">
				<font>时间: 2018-04-25 22:42上课</font>
			</div>
			<div class="coursePeron">
				<font>授课老师：刘老师</font>
			</div>
			<div id="coursePrice">
				<font>￥0</font><span>元
			</div>
		</div>

		<div class="course_info">
			<div id="recom10001">
				<img
					src="http://121.43.33.4:12080/PicDown/coursebg/e56cce9b-58e0-4a5e-8fba-d3b28e561e4a3468925423450998087.jpg">
			</div>
			<div class="courseName">
				<font>ABC - bunny</font>
			</div>
			<div class="coursePeron">
				<font>时间: 2018-04-26 18:15上课</font>
			</div>
			<div class="coursePeron">
				<font>授课老师：刘老师</font>
			</div>
			<div id="coursePrice">
				<font>￥0</font><span>元
			</div>
		</div>
		-->
	</div>
	<div class="zhanwei2"></div>
	<a href="/course/searchAll"><div class="seeMore">查看更多</div></a>
	<div class="zhanwei3"></div>
</div>

<!--6.N 最新课程 -->
<div id="R">
	<img id="pic" src="images/index/bm/N.png" />
	<div id="R1">
		<font id="Newest">Newest</font></br>
	</div>
	<div id="R2">
		<font>最新课程</font>
	</div>
</div>

<!--7.最新课程展示-->
<div style="background: #fff;">
	<div class="zhanwei" style="background: #fff;"></div>
	<div id="newCourse" class="courseList" style="background: #fff;">
		<!-- 
		<div class="course_info">
			<div>
				<img src="images/index/bm/tu.png" />
			</div>
			<div class="courseName">
				<font>ABC One</font>
			</div>
			<div class="coursePeron">
				<font>6373人已报名</font>
			</div>
			<div class="coursePeron">
				<font>时间：2018-06-01 12:00上课</font>
			</div>
			<div class="coursePeron">
				<font>授课老师：陆敏技老师</font>
			</div>
			<div id="coursePrice">
				<font>￥199.0</font><span>元</span>
			</div>
		</div>

		<div class="course_info">
			<div>
				<img src="images/index/bm/tu.png" />
			</div>
			<div class="courseName">
				<font>ABC One</font>
			</div>
			<div class="coursePeron">
				<font>6373人已报名</font>
			</div>
			<div class="coursePeron">
				<font>时间：2018-06-01 12:00上课</font>
			</div>
			<div class="coursePeron">
				<font>授课老师：陆敏技老师</font>
			</div>
			<div id="coursePrice">
				<font>￥199.0</font><span>元</span>
			</div>
		</div>
		 -->
	</div>
	<div class="zhanwei2" style="background: #fff;"></div>
</div>