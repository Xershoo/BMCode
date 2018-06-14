$(function() {

   //鼠标滑过banner，左右按钮进行显示和隐藏
   /* 
   $(".banner").hover(function(){
     $(".lr").show();
   },function(){
     $(".lr").hide();
   });
   */
   
	ajaxGetRecommandCourses();
	ajaxGetRecentCourses();
	
	//点击下面的小按钮，图片进行左右切换效果
	$(".anniu li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var num=$(this).index();
		$(".pic").animate({marginLeft:-1440*num},"slow");
	});
	   

	// 图片自动轮播效果
	var a = 0;
	var automatic = setInterval(function() {
		a++;
		a = a % 2;
		$(".pic").animate({
			marginLeft : -1440 * a
		}, "slow");
		$(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
	}, 5000);

	// 导航切换
	$(document).ready(function() {
		$("#logoMenuSerch ul li").each(function(index) {
			$(this).click(function() {
				$("#logoMenuSerch ul li").eq(index).addClass("firstPage").siblings().removeClass("firstPage");
			})
		})
	});

	// 页面切换
	$(document).ready(function() {
		$("#tolpage ul li").each(function(index) {
			$(this).click(function() {
				$("#tolpage ul li").eq(index).addClass("tolpageli2").siblings().removeClass("tolpageli2");
			})
		})
	});

	// 详情跳转
	$(document).ready(function() {
		$(".course11").each(function(index) {
			$(this).click(function() {
				window.location.href = ("HTML/allCourse/catagory.html");
			})
		})
	});
});

function courseSlideUp(courseId, courseName, teacherName, finishedclass, totalclass, latelyStartTimePlan){
	var html = '<div class="course_baoming" onclick="goToCourseDetail(\''+courseId+'\')">详情</div>'
	   html += '<div class="information_course" style="margin-top:38px;">'
			+ '<div class="course_name" style="color:#fff;" onclick="goToCourseDetail(\''+courseId+'\')" title="'+courseName+'">'+cut_str(courseName, 10)+'</div>'
			+ '<div class="begin_time" style="color:#fff;">时间: '+latelyStartTimePlan+'上课</div>'
			+ '<div class="course_teacher" style="color:#fff;"><div class="teaName">老师: '+teacherName+'</div><div class="courseFinish">完成: '+finishedclass+'/'+totalclass+'</div></div>'
			+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#42b8f6", "opacity":"0.8"}).animate({marginTop:"-148px",height:"100%"});
}

function courseSlideDown(courseId, courseName, teacherName, finishedclass, totalclass, latelyStartTimePlan){
	var html = '<div class="information_course">'
		+ '<div class="course_name" onclick="goToCourseDetail(\''+courseId+'\')" title="'+courseName+'">'+cut_str(courseName, 10)+'</div>'
		+ '<div class="begin_time">时间: '+latelyStartTimePlan+'上课</div>'
		+ '<div class="course_teacher"><div class="teaName">老师: '+teacherName+'</div><div class="courseFinish">完成: '+finishedclass+'/'+totalclass+'</div></div>'
		+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#eff3f3", "opacity":"1"}).animate({marginTop:"0px",height:"91px"});
}

function gotoCourseDetailPage(courseId) {
	location.href = getRootPath()+"/course/detail/"+courseId;
}

function ajaxGetRecommandCourses(){
	var url = getRootPath() + '/course/getRecommendCourses';
	var html = '';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		cache:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var jsonObj = data.result.list;
				
				if(jsonObj.length > 0){
					var html = '';
					$.each(jsonObj, function (i, item) {
						html += '<div class="course_info">'
						    + '<div id="recom'+item.courseid+'" onclick="gotoCourseDetailPage(' + item.courseid + ')"><img src="'+item.coverUrl+'"></div>'
						    + '<div class="courseName"><font>'+cut_str(item.courseName, 10) + '</font></div> '
						    + '<div class="coursePeron"><font>'+item.totalStudent+'人报名</font></div>'
						    + '<div class="coursePeron"><font>时间: '+item.latelyStartTimePlan+'上课</font></div>'
						    + '<div class="coursePeron"><font>授课老师：'+item.teacherName+'</font></div>'
						    + '<div id="coursePrice"><font>￥'+item.priceTotal+'</font><span>元</div>'
							+ '</div>';
						if(i==7) {
							return;
						}
					});
					
					$("#recommendCourse").html(html);
				}
			}
		}
	});
}

function ajaxGetRecentCourses(){
	var url = getRootPath() + '/course/getRecentCourses';
	var html = '';
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		cache:false,
		success:function(data){
			var status = parseInt(data.status);
			if(status == 0){
				var jsonObj = data.result.list;
				
				if(jsonObj.length > 0){
					var html = '';
					$.each(jsonObj, function (i, item) {
						html += '<div class="course_info">'
						    + '<div id="newCourse'+item.courseid+'" onclick="gotoCourseDetailPage(' + item.courseid + ')"><img src="'+item.coverUrl+'"></div>'
						    + '<div class="courseName"><font>'+cut_str(item.courseName, 10) + '</font></div> '
						    + '<div class="coursePeron"><font>'+item.totalStudent+'人报名</font></div>'
						    + '<div class="coursePeron"><font>时间: '+item.startTimePlan+'上课</font></div>'						    
						    + '<div class="coursePeron"><font>授课老师：'+item.teacherName+'</font></div>'
						    + '<div id="coursePrice"><font>￥'+item.price_total+'</font><span>元</div>'
							+ '</div>';
						if(i==7) {
							return;
						}
					});
					
					$("#newCourse").html(html);
				}
			}
		}
	});
}
