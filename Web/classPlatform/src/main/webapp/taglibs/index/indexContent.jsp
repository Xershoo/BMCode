<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="bannerWrap" data-block-text="true">
	<ul>
		<li
			data-background="<%=request.getContextPath()%>/images/index/banner1.jpg">
			<div id="banner_title"></div>
		 	<div id="goDownload" class="flick-sub-text"></div>	
		</li>
		<li
			data-background="<%=request.getContextPath()%>/images/index/banner2.jpg"></li>
		<li
			data-background="<%=request.getContextPath()%>/images/index/banner3.jpg"></li>
		<li
			data-background="<%=request.getContextPath()%>/images/index/banner4.jpg"></li>
	</ul>
</div>
<!-- <div id="qrcode" style="display:none;"></div> -->
<div class="content">
	<div id="share_link">
		<div id="share_top">分享</div>
		<%-- <div class="share_style"><img src="<%=request.getContextPath()%>/images/index/weibo_share.png"></div> --%>
		<div class="share_style" onclick="postToWb();"><img src="<%=request.getContextPath()%>/images/index/qq_share.png"></div>
		<div class="share_style" onclick="makeQrcode();" id="weixinScan"><img src="<%=request.getContextPath()%>/images/index/weixin_share.png"></div>
		<div class="share_style" onclick="scanQrcode();"><img src="<%=request.getContextPath()%>/images/index/erweima.png"></div>
		<div id="erweima_word">扫码关注</div>
	</div>
	<!-- *******************************************************  -->
<script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
	  <script type="text/javascript">
	  function postToWb(){
		var _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://piano.class8.com/index&placeholder=说点什么吧，您还可以@朋友和QQ好友哦~&title=哆来音乐&pics=http://source.gretheer.com/logo3.png&site=http://piano.class8.com/index';
	   window.open( _u,'转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
	  }
  </script>
  <div id="scanQR" title="分享到微信朋友圈" style="display: none;">
  	<div id="qrcode"></div>
  	<div id="guide">
  		打开微信，点击底部的“发现”，使用 “扫一扫” 即可将网页分享到我的朋友圈。<a href="http://s.jiathis.com/?webid=weixin&url=http%3A%2F%2Flocalhost%3A8080%2Fcourse%2Fdetail%2F10008&title=%E6%9F%A5%E7%9C%8B%E8%AF%A6%E6%83%85...&isexit=false" target="_blank">如何使用？</a>
  	</div>
  </div>
  
  <div id="scanCode" title="扫码关注" style="display: none;">
  	<div id="codeImg"><img src="<%=request.getContextPath()%>/images/index/erweima.jpg"></div>
  </div>
	<!-- *******************************************************  -->
	<div class="title_chn">推荐课程</div>
	<div class="title_eng">
		<div class="title_eng_word" style="width:255px;">Recommended courses</div>
		<div class="title_eng_line" style="width:810px;"></div>
		<div id="allCourse" class="title_eng_more"><img src="<%=request.getContextPath()%>/images/index/more.png"></div>
	</div>
	<div class="course_list">
		<div id="newCourse" class="courseLeft">
			<div class="course_main">
				<%-- <div class="course_infor">
					<div class="course_img"><img src="<%=request.getContextPath()%>/images/index/course1.png"></div>
					<div class="course_price">￥300元</div>
					<div class="information_course">
						<div class="course_name">钢琴课程 李庆园钢琴</div>
						<div class="begin_time">2016-6-1 12:40开课</div>
						<div class="course_teacher">酸蘑菇老师</div>
					</div>
					<div class="zhibo_course">直播</div>
				</div>
				<div class="course_infor">
					<div class="course_img"><img src="<%=request.getContextPath()%>/images/index/course1.png"></div>
					<div class="course_price">￥300元</div>
					<div class="information_course">
						<div class="course_name">钢琴课程 李庆园钢琴</div>
						<div class="begin_time">2016-6-1 12:40开课</div>
						<div class="course_teacher">酸蘑菇老师</div>
					</div>
					<div class="lubo_course">直播</div>
				</div> --%>
			</div>
			<div class="course_main"></div>
		</div>
		<div class="beginCourseRight">
			<div class="courseRight">
				<div class="right_head">
					<div id="right_clock"><img src="<%=request.getContextPath()%>/images/index/clock.png"></div>
					<div id="right_title">即将开课</div>
				</div>
				<div id="rightCourseList" class="right_course">
					<%-- <div class="right_course_main">
						<div class="course_bg"><img src="<%=request.getContextPath()%>/images/index/right_course.png" ></div>
						<div class="right_course_name">快乐钢琴教程钢琴考级钢琴入门</div>
						<div class="course_begin_time">今天10:30</div>
						<div class="arrow-right"></div>
						<div class="clock_dot"><img src="<%=request.getContextPath()%>/images/index/dot.png" ></div>
					</div> --%>
				</div>
			</div>
		</div>
	</div>
	
	<div class="title_chn">新荐老师</div>
	<div class="title_eng">
		<div class="title_eng_word">New teacher</div>
		<div class="title_eng_line"></div>
		<div id="allTeacher" class="title_eng_more"><img src="<%=request.getContextPath()%>/images/index/more.png"></div>
	</div>
	<div id="newTeacher" class="teacher_list">
		<div class="teacher_main">
			<%-- <div class="teacher_intro">
				<div class="teacher_img"><img src="<%=request.getContextPath()%>/images/index/teacher1.jpg"></div>
				<div class="information">
					<div class="teacher_name">张梅梅（小娜娜的钢琴）<span><img src="<%=request.getContextPath()%>/images/index/letter.png"></span></div>
					<div class="teacher_tech">专业度：5级 |  教龄：8年</div>
					<div class="class_price"><span>￥<span>300元</span></span>起</div>
				</div>
			</div>--%>
		</div>
		<div class="teacher_main">
			<%-- <div class="teacher_intro">
				<div class="teacher_img"><img src="<%=request.getContextPath()%>/images/index/teacher1.jpg"></div>
				<div class="information">
					<div class="teacher_name">张梅梅（小娜娜的钢琴）<span><img src="<%=request.getContextPath()%>/images/index/letter.png"></span></div>
					<div class="teacher_tech">专业度：5级 |  教龄：8年</div>
					<div class="class_price"><span>￥<span>300元</span></span>起</div>
				</div>
			</div>--%>
		</div> 
	</div>
	
	
	<%-- <div id="menu_link">
		<div id="online_link">
			<div id="online_img"><img src="<%=request.getContextPath()%>/images/index/online_baoming.png"></div>
			<div class="menu_title">线上报名</div>
			<div class="menu_infor">快捷、方便、省去线下时间</div>
		</div>
		<div id="hudong_link">
			<div id="hudong_img"><img src="<%=request.getContextPath()%>/images/index/class_hudong.png"></div>
			<div class="menu_title">互动课堂</div>
			<div class="menu_infor">在线教学，实时互动指导练琴</div>
		</div>
		<div id="class_link">
			<div id="class_img"><img src="<%=request.getContextPath()%>/images/index/small_module.png"></div>
			<div class="menu_title">小班模式</div>
			<div class="menu_infor">个性教学，达到最佳练琴效果</div>
		</div>
	</div> --%>
	
</div>