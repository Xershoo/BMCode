<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
	
<input type="hidden" id="teacherId" value="${course.teacherUid }">
<div class="videoMain">
	<div id="videoPlay"></div>
	<div id="videoInfor">
		<div id="video_top">
			<div id="video_title" title="${course.className }">
				<c:choose>
					<c:when test="${fn:length(course.className) > 42 }">
						${fn:substring(course.className,0,42)}...
					</c:when>
					<c:otherwise>
						${course.className}
					</c:otherwise>
				</c:choose>
			</div>
			<div class="infor_main">
				<div class="infor_logo"><img src="<%=request.getContextPath()%>/images/course/teacher_logo.jpg"></div>
				<div class="infor_label">老&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师：</div>
				<div class="infor_value">${course.teacherName }</div>
			</div>
			<%-- <div class="infor_main">
				<div class="infor_logo" style="margin-left:4px;"><img src="<%=request.getContextPath()%>/images/course/time_logo.png"></div>
				<div class="infor_label">直播时间：</div>
				<div class="infor_value">2016-06-01 14:00</div>
			</div> --%>
			<div id="priceAndBtn">
				<!-- <div id="video_price">￥380</div> -->
				<div id="teacher_courses">TA的课堂</div>
			</div>
		</div>
		<div id="course_introduce">
			<div id="introduce_label">课程简介:</div>
			<!-- <div id="introduce_word">今天为大家介绍这款钢琴就是在钢琴里面定位非常高端的，具有超高的性价比，全实木制造，金色踏板、直分腿设计，线条流畅，简约典雅。高贵黑色外观受广大热爱钢琴音乐艺术者的喜爱。机芯内部采用实木音板，追求背柱与钢板的完美结合，采用特制的内衬羊毛弦槌，保证产生最佳音色的同时具有高灵敏度和耐久性，音色明亮轻快，手感舒适</div> -->
			<div id="introduce_word">
				<c:if test="${!empty course.description}">
					${course.description }
				</c:if>
				<c:if test="${empty course.description}">
					无	
				</c:if>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	var urls = "${course.recordDataUrls}";
	urls = urls.substring(1,(urls.length-1)).split(",");
	var coverImg = "${course.coverUrl}";
	var playList = [];
	$.each(urls, function (i, item) {
		var playItem = '{duration : 32 ,file :"'+item+'",image :"'+coverImg+'"}';
		playList.push(eval("("+playItem+")"));
	});

	jwplayer("videoPlay").setup({
	      stretching: "fill",
	      flashplayer: "../../js/common/player.swf",
	      //image: "${course.coverUrl}",
	      width: 640,
	      height:536,
	      //levels: [{file: "视频路径"}]
		  //file:"https://content.jwplatform.com/videos/HkauGhRi-640.mp4"  
		  playlist: playList
		  /* playlist: [

	                 { duration : 32 , file : "https://content.jwplatform.com/videos/HkauGhRi-640.mp4" , image : "${course.coverUrl}" },

	                 { duration : 124 , file : "http://61.147.188.56/export/Storage/34000/34000/2016_6_7_15/Media/34000/9000_0_20160607_152016.mp4" , image : "${course.coverUrl}" },

	                 { duration : 542 , file : "https://content.jwplatform.com/videos/HkauGhRi-642.mp4" , image : "${course.coverUrl}" }

	        ] */
	});

</script> 