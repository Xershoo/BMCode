var courseInCount = 0;
$(function() {
	$("#dialog").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 600, // 窗口宽度
		height : 600,
	});
	var identity= $('#identity').val();
	
//	queryCourse('','','',1,0);
	changeType(2);
//	queryCourses('');
	$(".title2").hover(function(){
//		$(this).css("background", "#e5e5e5");
		$('.title2 span').css("color", "#ffb933");
		$('#add').attr("src", "/images/manageCourse/addb_03.png");
		
	}, function(){
//		$(this).css("background", "#fff");
		$('.title2 span').css("color", "#FF9C00");
		$('#add').attr("src", "/images/manageCourse/add_03.png");
	});
	
	checkbox();
	
})
function checkbox(){
	$("#check1").click(function() {
		var courseType=$("#courseType").val();
			$('#check1').attr("src", "/images/course/check_03.png");
			$('#check2').attr("src", "/images/course/check_05.png");
			$('#check3').attr("src", "/images/course/check_05.png");
			$('#check4').attr("src", "/images/course/check_05.png");
			if(courseType==1){
				queryCourses('');
			}else{
				queryCoursesByStudent(0);
			}
	})
	$("#check2").click(function() {
		var courseType=$("#courseType").val();
		$('#check1').attr("src", "/images/course/check_05.png");
		$('#check2').attr("src", "/images/course/check_03.png");
		$('#check3').attr("src", "/images/course/check_05.png");
		$('#check4').attr("src", "/images/course/check_05.png");
		
		if(courseType==1){
			queryCourses('');
		}else{
			queryCoursesByStudent(0);
		}
	})
	$("#check3").click(function() {
		var courseType=$("#courseType").val();
		$('#check1').attr("src", "/images/course/check_05.png");
		$('#check2').attr("src", "/images/course/check_05.png");
		$('#check3').attr("src", "/images/course/check_03.png");
		$('#check4').attr("src", "/images/course/check_05.png");
		if(courseType==1){
			queryCourses('1');
		}else{
			queryCoursesByStudent(1);
		}
	})
	$("#check4").click(function() {
		var courseType=$("#courseType").val();
		$('#check1').attr("src", "/images/course/check_05.png");
		$('#check2').attr("src", "/images/course/check_05.png");
		$('#check3').attr("src", "/images/course/check_05.png");
		$('#check4').attr("src", "/images/course/check_03.png");
		if(courseType==1){
			queryCourses('2');
		}else{
			queryCoursesByStudent(2);
		}
	})
}
function queryCourses(courseStatus){
	$("#grTable1").html('');
	data={
			'courseType':'',
            'page':1,
            'courseStatus':courseStatus
		};
	param={on:true, page:1, start:1,rows:10,'courseType':'', 'courseStatus':''}

var url;
	 url=getRootPath() + '/teacher/course/list';


$.ajax({
	url : url,
	type : 'POST',
	dataType : 'json',
	async:false,
	data:data,
	success : function(data) {
		
			courseInCount=data.result.total;
		
		
	},
	
});	

var pageNum = Math.ceil(courseInCount/10);
var pageSize = 0;
if(pageNum == 0){
	$('#page').html('');
	$('#xn1').css("display", "none");
	$('#gr1').css("display", "none");
	$('#gk1').css("display", "none");
}else if(pageNum == 1){
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		data:data,
		success : function(data) {
//			if(type==1){
			
			$('#xn1').css("display", "none");
			$('#gr1').css("display", "block");
			$('#gk1').css("display", "none");
			$('#page').html('');
			var courses;
				courses=data.result.list;
			var html='';
			 for(var i=0; i<courses.length; i++){
				 html += '<div class="liebiao1">';
				 html += '<div class="jibenxinxi1">';
				 html += '<div class="img11">';
				 if(courses[i].coverUrl == '' || courses[i].coverUrl == null){
					 html += '<li class="i2"><img id="u202_img" class="img" src="/images/c1-1index/u362.png"></li>';
				 }else{
					 html += '<li class="i2"><img id="u202_img" class="img" src='+courses[i].coverUrl+'></li>';
				 }
				 html += '</div>';
				 html += '</div>';
				 html += '<div class="jiage1">';
				 if(courses[i].courseName.length > 40){
					 html += '<div class="cor-title">'+courses[i].courseName.substring(0,38)+' ···</div>';
				 }else{
					 html += '<div class="cor-title">'+courses[i].courseName+'</div>';
				 }
				 html += '<div class="cor-progress">';
				 html += '<div class="cor-progress1"><img src="../../images/piano_teacher/progress.gif"></div><div class="cor-progress2"> 课程进度：'+courses[i].classHadFinished+' / '+courses[i].classTotal+'&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="cor-progress3"><img src="../../images/piano_teacher/apply.gif" class="cor-app"> </div><div class="cor-progress4">报名学生： '+courses[i].totalSignupStudent+' / '+courses[i].nMaxStudents+'';
				 html += '</div></div>';
				 html += '<div class="cor-time"><div class="cor-time1"><img src="../../images/piano_teacher/time.gif"></div> <div class="cor-time2">课程时间： '+courses[i].startTimePlan+'</div></div>';
				 html += '</div>';
				 if(courses[i].price_total == '' || courses[i].price_total == 0){
					 html += '<div class="renshu1">免费</div>';
				 }else{
					 html += '<div class="renshu1">￥ '+courses[i].price_total+'</div>';
				 }
				 html += '<div class="zhuangtai1"><table class="xxx3"><td>';
				 if(courses[i].courseStatus == 5){
					 html += '<div class="cor-status">报名中</div>';
				 }else  if(courses[i].courseStatus == 0){
					 html += '<div class="cor-status">未开课</div>';
				 }else  if(courses[i].courseStatus == 7){
					 html += '<div class="cor-status">已取消</div>';
				 }else  if(courses[i].courseStatus == 10){
					 html += '<div class="cor-status">正在上课</div>';
				 }else{
					 html += '<div class="cor-status">已结束</div>';
				 }
				 if(courses[i].courseStatus == 5){
					 var startDate= new Date(); 
					 var endDate= new Date(courses[i].startTimePlan.replace(/-/g,'/')); 
//					 var endDate= new Date("2016/5/17 16:49"); 
//					 alert(courses[i].startTimePlan.replace(/-/g,'/'));
					 var df=(endDate.getTime()-startDate.getTime()); 
					 if(parseInt(df)>1800000){
						 html += '<div class="cor-view1" onclick="stop('+courses[i].courseid+')">取消课程</div>';
					 }
					 
				 }
				 if(courses[i].classState == 17||courses[i].classState == 20){
					 html += '<div class="cor-view1" onclick="del('+courses[i].courseid+')">删除课程</div>';
					 }
				 html += '<div class="cor-view1" onclick="update('+courses[i].courseid+')">修改详情</div>';
				 html += '<div class="cor-view" onclick="toCourseDetail('+courses[i].courseid+')">查看详情</div>';
				 html += '</td></table></div>'
				 html += '</div>';
			 }
			 $("#grTable1").html(html);
			 $(".liebiao1").hover(function(){
					$(this).css("background", "#e5e5e5");
				}, function(){
					$(this).css("background", "#fff");
				});
			 $(".cor-view").on("mouseover",function(){
				 $(this).css("background","#24ABF2");
			 }).on("mouseout",function(){
				 $(this).css("background","#42b8f6");
			 });
//		}
	}
})
}else{

	if(pageNum > 1 && pageNum < 10){
		pageSize = pageNum;
	}else{
		pageSize = 10;
	}
	
	
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu4Data',
		    		url:url,
		    		dataType: "json",
		    		cache:false,
		    		param:param
		    	}
		    });	
		
}
}
function queryCoursesByStudent(courseStatus){
	$("#grTable1").html('');
	data={
			'courseType':'',
            'page':1,
            'courseStatus':courseStatus
		};
	param={on:true, page:1, start:1,rows:10,'courseType':'', 'courseStatus':''}

var url;
	 url=getRootPath() + '/student/course/list';


$.ajax({
	url : url,
	type : 'POST',
	dataType : 'json',
	async:false,
	data:data,
	success : function(data) {
		
			courseInCount=data.result.total;
		
		
	},
	
});	

var pageNum = Math.ceil(courseInCount/10);
var pageSize = 0;
if(pageNum == 0){
	$('#page').html('');
	$('#xn1').css("display", "none");
	$('#gr1').css("display", "none");
	$('#gk1').css("display", "none");
}else if(pageNum == 1){
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		data:data,
		success : function(data) {
//			if(type==1){
			
			$('#xn1').css("display", "none");
			$('#gr1').css("display", "block");
			$('#gk1').css("display", "none");
			$('#page').html('');
			var courses;
				courses=data.result.list;
			var html='';
			 for(var i=0; i<courses.length; i++){
				 html += '<div class="liebiao1">';
				 html += '<div class="jibenxinxi1">';
				 html += '<div class="img11">';
				 if(courses[i].coverUrl == '' || courses[i].coverUrl == null){
					 html += '<li class="i2"><img id="u202_img" class="img" src="/images/c1-1index/u362.png"></li>';
				 }else{
					 html += '<li class="i2"><img id="u202_img" class="img" src='+courses[i].coverUrl+'></li>';
				 }
				 html += '</div>';
				 html += '</div>';
				 html += '<div class="jiage1">';
				 if(courses[i].courseName.length > 40){
					 html += '<div class="cor-title">'+courses[i].courseName.substring(0,38)+' ···</div>';
				 }else{
					 html += '<div class="cor-title">'+courses[i].courseName+'</div>';
				 }
				 html += '<div class="cor-progress">';
				 html += '<div class="cor-progress1"><img src="../../images/piano_teacher/progress.gif"></div><div class="cor-progress2"> 课程进度：'+courses[i].classHadFinished+' / '+courses[i].classTotal+'&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="cor-progress3"><img src="../../images/piano_teacher/apply.gif" class="cor-app"> </div>';
				 
				 if(courses[i].teacherName!=undefined){
					 html += '<div class="cor-progress4">老师姓名： '+courses[i].teacherName;
				 }else{
					 html += '<div class="cor-progress4">老师姓名： ';
				 }
				 html += '</div></div>';
				 html += '<div class="cor-time"><div class="cor-time1"><img src="../../images/piano_teacher/time.gif"></div> <div class="cor-time2">课程时间： '+courses[i].signupTime+'</div></div>';
				 html += '</div>';
				 if(courses[i].price_total == '' || courses[i].price_total == 0){
					 html += '<div class="renshu1">免费</div>';
				 }else{
					 html += '<div class="renshu1">￥ '+courses[i].price_total+'</div>';
				 }
				 html += '<div class="zhuangtai1"><table class="xxx3"><td>';
				 if(courses[i].courseStatus == 5){
					 html += '<div class="cor-status">报名中</div>';
				 }else  if(courses[i].courseStatus == 0){
					 html += '<div class="cor-status">未开课</div>';
				 }else  if(courses[i].courseStatus == 7){
					 html += '<div class="cor-status">已取消</div>';
				 }else  if(courses[i].courseStatus == 10){
					 html += '<div class="cor-status">正在上课</div>';
				 }else{
					 html += '<div class="cor-status">已结束</div>';
				 }
				 html += '<div class="cor-view" onclick="toCourseDetail('+courses[i].courseid+')">查看详情</div>';
					 html += '</td></table></div>';
				 html += '</div>';
			 }
			 $("#grTable1").html(html);
			 $(".liebiao1").hover(function(){
					$(this).css("background", "#e5e5e5");
				}, function(){
					$(this).css("background", "#fff");
				});
			 $(".cor-view").on("mouseover",function(){
				 $(this).css("background","#24ABF2");
			 }).on("mouseout",function(){
				 $(this).css("background","#42b8f6");
			 });
//		}
	}
})
}else{

	if(pageNum > 1 && pageNum < 10){
		pageSize = pageNum;
	}else{
		pageSize = 10;
	}
	
	
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu5Data',
		    		url:url,
		    		dataType: "json",
		    		cache:false,
		    		param:param
		    	}
		    });	
		
}
}
function getHoursDiff(dt1,dt2) {
    if(typeof(dt1)=="string") {
        dt1=new Date(dt1.replace(/-/,'/'));
        dt2=new Date(dt2.replace(/-/,'/'));
    }
    var res=dt2-dt1;
    if(isNaN(res))
        throw Error("invalid dates arguments");
    return res/(1000*60*60);
}
//function queryCourse(courseName,courseTime,creatorName,type,status){
//	var data;
//	var param;
//	if(courseName==''&&courseTime==''&&creatorName==''){
//		data={
//				'courseType':type,
//	            'page':1,
//	            'courseStatus':status
//	            
//			};
//		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status}
//	}
//	
//	var url;
//		 url=getRootPath() + '/teacher/course/list';
//	
//	
//	$.ajax({
//		url : url,
//		type : 'POST',
//		dataType : 'json',
//		async:false,
//		data:data,
//		success : function(data) {
//			
//				courseInCount=data.result.total;
//			
//			
//		},
//	});	
//
//	var pageNum = Math.ceil(courseInCount/10);
//	var pageSize = 0;
//	if(pageNum == 0){
//		$('#page').html('');
//		$('#xn1').css("display", "none");
//		$('#gr1').css("display", "none");
//		$('#gk1').css("display", "none");
//	}else if(pageNum == 1){
//		$.ajax({
//			url : url,
//			type : 'POST',
//			dataType : 'json',
//			data:data,
//			success : function(data) {
//				if(type==1){
//				
//				$('#xn1').css("display", "block");
//				$('#gr1').css("display", "none");
//				$('#gk1').css("display", "none");
//				$('#page').html('');
//				var courses;
//					courses=data.result.list;
//				var table="";
//				 for(var i=0; i<courses.length; i++){
//					 
//					 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
//					 +"<div class='img11'><li class='i2'>" ;
//					 if(courses[i].coverUrl==''){
//						 
//						 table=table+"<img id='u202_img' class='img' src='/images/c1-1index/u362.png' onclick='toCourseDetail("+courses[i].courseid+")'>";
//					 }else{
//						 table=table+"<img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'>";
//					 }
//					 table=table +"</li><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>"
//					 if(courses[i].courseName.length>12){
//						 table=table+courses[i].courseName.substring(0, 12)+"...";
//					 }else{
//						 table=table+courses[i].courseName;
//					 }
//					 table=table+"</li></div></div><div class='chuangkeren1'><li style='line-height: 140px;' class='createName' title='"+courses[i].createName+"'>";
//					 
//					 if(courses[i].createName.length>6){
//						 table=table+courses[i].createName.substring(0, 6)+"...";
//					 }else{
//						 table=table+courses[i].createName;
//					 }
//					 
//					 
//					 table=table+"</li></div><div class='jiage1'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
//					 +"<div class='renshu1'><span class='yibo'>"+courses[i].totalSchoolStudent+"</div><div class='renshu1'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
//					 
//					 if(courses[i].courseStatus==0){
//						 table=table+"<div class='zhuangtai1'>未报名</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn1'><table class='xxx'><td>";
//						 if(courses[i].displayType==1){
//							 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//							 }else{
//								 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>";
//							 }
//						 
//						 if(courses[i].createUid==userid){
//							 table=table +"</td></table><li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//						 }else{
//							 
//						 }
//						 table=table+"<</div></div>"
//					 }else if(courses[i].courseStatus==5){
//						 table=table+"<div class='zhuangtai1'>报名中</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn1'><table class='xxx'><td>";
//						 if(courses[i].displayType==1){
//							 table=table +"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//						 }else{
//							 table=table +"";
//						 }
//						 if(courses[i].createUid==userid){
//							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//						 }else{
//							 
//						 }
//						 table=table+"</td></table></div></div>"
//					 }else if(courses[i].courseStatus==6){
//						 table=table+"<div class='zhuangtai1'>待上课</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn1'><table class='xxx'><td>";
//						 if(courses[i].displayType!=0){
//							 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//						 }else if(courses[i].displayType==0){
//							
//						 }
//						 if(courses[i].createUid==userid){
//							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//						 }else{
//							 
//						 }
//						 table=table+"</td></table></div></div>"
//					 }else if(courses[i].courseStatus==7){
//						 table=table+"<div class='zhuangtai1'>已取消</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn1'><table class='xxx'><td>"
//						 if(courses[i].createUid==userid){
//							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//						 }else{
//							 
//						 }
//						 
//						 table=table+"</td></table></div></div>"
//					 }else if(courses[i].courseStatus==30){
//						 table=table+"<div class='zhuangtai1'>已完成</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn1'></div></div>"
//					 }else if(courses[i].courseStatus==40){
//					 table=table+"<div class='zhuangtai1'>已完成</div>";
//					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//					 +"<div class='caozuo_xn1'></div></div>"
//				 }else if(courses[i].courseStatus==41){
//					 table=table+"<div class='zhuangtai1'>已取消</div>";
//					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//					 +"<div class='caozuo_xn1'></div></div>"
//				 }else if(courses[i].courseStatus==100){
//					 table=table+"<div class='zhuangtai1'>已取消</div>";
//					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//					 +"<div class='caozuo_xn1'></div></div>"
//				 }else if(courses[i].courseStatus==200){
//					 table=table+"<div class='zhuangtai1'>已停售</div>";
//					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//					 +"<div class='caozuo_xn1'></div></div>"
//				 }else if(courses[i].courseStatus==10){
//					 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
//					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//					 +"<div class='caozuo_xn1'><table class='xxx'><td>"
//					 if(courses[i].createUid==userid){
//						 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//					 }else{
//						 
//					 }
//					 
//					 table=table+"</td></table></div></div>"
//				 }
////					 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
//				 }    
//				$("#xnTable1").html(table);
//				 $(".caozuoli").hover(function(){
//						$(this).css("background", "#e5e5e5");
//					}, function(){
//						$(this).css("background", "#fff");
//					});
//				}else if(type==3){
//					$('#xn1').css("display", "none");
//					$('#gr1').css("display", "block");
//					$('#gk1').css("display", "none");
//					$('#page').html('');
//					var courses;
//						courses=data.result.list
//					var table="";
//					 for(var i=0; i<courses.length; i++){
//						 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
//						 +"<div class='img11'><li class='i2'>";
//						 if(courses[i].coverUrl==''){
//							 table=table+"<img id='u202_img' class='img' src='/images/c1-1index/u362.png' onclick='toCourseDetail("+courses[i].courseid+")'>";
//						 }else{
//							 table=table+"<img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'>";
//						 }
//						 table=table+"</li><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>";
//						 if(courses[i].courseName.length>12){
//							 table=table+courses[i].courseName.substring(0, 12)+"...";
//						 }else{
//							 table=table+courses[i].courseName;
//						 }
//						 table=table+"</li></div></div>";
//						 table=table+"<div class='jiage3'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
//						 +"<div class='renshu3'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
//						 
//						 if(courses[i].courseStatus==0){
//							 table=table+"<div class='zhuangtai1'>未报名</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//							 if(courses[i].displayType==1){
//								 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//								 }else{
//									 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>";
//								 }
//							 
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==5){
//							 table=table+"<div class='zhuangtai1'>报名中</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//							 if(courses[i].displayType==1){
//								 table=table +"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//							 }else{
//								 table=table +"";
//							 }
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==6){
//							 table=table+"<div class='zhuangtai1'>待上课</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//							 if(courses[i].displayType!=0){
//								 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//							 }else if(courses[i].displayType==0){
//								
//							 }
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==7){
//							 table=table+"<div class='zhuangtai1'>已取消</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==30){
//							 table=table+"<div class='zhuangtai1'>已完成</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'></div></div>"
//						 }else if(courses[i].courseStatus==40){
//						 table=table+"<div class='zhuangtai1'>已完成</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn1'></div></div>"
//					 }else if(courses[i].courseStatus==41){
//						 table=table+"<div class='zhuangtai1'>已取消</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'></div></div>"
//					 }else if(courses[i].courseStatus==100){
//						 table=table+"<div class='zhuangtai1'>已取消</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'></div></div>"
//					 }else if(courses[i].courseStatus==200){
//						 table=table+"<div class='zhuangtai1'>已停售</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'></div></div>"
//					 }else if(courses[i].courseStatus==10){
//						 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//						 if(courses[i].createUid==userid){
//							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//						 }else{
//							 
//						 }
//						 
//						 table=table+"</td></table></div></div>"
//					 }
////						 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
//					 }    
//					$("#grTable1").html(table);
//					
//					
//				}if(type==2){
//					$('#gk1').css("display", "block");
//					$('#xn1').css("display", "none");
//					$('#gr1').css("display", "none");
//					$('#page').html('');
//					var courses;
//						courses=data.result.list;
//					var table="";
//					 for(var i=0; i<courses.length; i++){
//						 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
//						 +"<div class='img11'><li class='i2'>" ;
//						 if(courses[i].coverUrl==''){
//							 table=table+"<img id='u202_img' class='img' src='/images/c1-1index/u362.png' onclick='toCourseDetail("+courses[i].courseid+")'>";
//						 }else{
//							 table=table+"<img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'>";
//						 }
//						 
//						 table=table+"</li><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>"
//						 if(courses[i].courseName.length>12){
//							 table=table+courses[i].courseName.substring(0, 12)+"...";
//						 }else{
//							 table=table+courses[i].courseName;
//						 }
//						 table=table+"</li></div></div><div class='chuangkeren1'><li style='line-height: 140px;' class='createName' title='"+courses[i].createName+"'>";
//						 
//						 if(courses[i].createName.length>6){
//							 table=table+courses[i].createName.substring(0, 6)+"...";
//						 }else{
//							 table=table+courses[i].createName;
//						 }
//						 
//						 
//						 table=table+"</li></div><div class='jiage1'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
//						 +"<div class='renshu1'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
//						 
//						 if(courses[i].courseStatus==0){
//							 table=table+"<div class='zhuangtai1'>未报名</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//							 if(courses[i].displayType==1){
//								 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//								 }else{
//									 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>";
//								 }
//							 
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==5){
//							 table=table+"<div class='zhuangtai1'>报名中</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//							 if(courses[i].displayType==1){
//								 table=table +"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//							 }else{
//								 table=table +"";
//							 }
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==6){
//							 table=table+"<div class='zhuangtai1'>待上课</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//							 if(courses[i].displayType!=0){
//								 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//							 }else if(courses[i].displayType==0){
//								
//							 }
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==7){
//							 table=table+"<div class='zhuangtai1'>已取消</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//							 if(courses[i].createUid==userid){
//								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//							 }else{
//								 
//							 }
//							 
//							 table=table+"</td></table></div></div>"
//						 }else if(courses[i].courseStatus==30){
//							 table=table+"<div class='zhuangtai1'>已完成</div>";
//							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//							 +"<div class='caozuo_xn3'></div></div>"
//						 }else if(courses[i].courseStatus==40){
//						 table=table+"<div class='zhuangtai1'>已完成</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'></div></div>"
//					 }else if(courses[i].courseStatus==41){
//						 table=table+"<div class='zhuangtai1'>已取消</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'></div></div>"
//					 }else if(courses[i].courseStatus==100){
//						 table=table+"<div class='zhuangtai1'>已取消</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'></div></div>"
//					 }else if(courses[i].courseStatus==200){
//						 table=table+"<div class='zhuangtai1'>已停售</div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'></div></div>"
//					 }else if(courses[i].courseStatus==10){
//						 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
//						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//						 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//						 if(courses[i].createUid==userid){
//							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//						 }else{
//							 
//						 }
//						 
//						 table=table+"</td></table></div></div>"
//					 }
////						 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
//					 }    
//					$("#gkTable1").html(table);
//					
//					}
//				
//				
//			},
//		});	
//		
//	}else{
//		if(pageNum > 1 && pageNum < 10){
//			pageSize = pageNum;
//		}else{
//			pageSize = 10;
//		}
//		
//		if(type==2){
//				$("#page").myPagination({
//			    	currPage:1,
//			    	pageCount:pageNum,
//			    	pageSize:10,
//			    	ajax:{
//			    		on: true,
//			    		callback: 'callBackMenu1Data',
//			    		url:url,
//			    		dataType: "json",
//			    		cache:false,
//			    		param:param
//			    	}
//			    });
//			
//		}else if(type==1){
//			$("#page").myPagination({
//		    	currPage:1,
//		    	pageCount:pageNum,
//		    	pageSize:pageSize,
//		    	ajax:{
//		    		on: true,
//		    		callback: 'callBackMenu3Data',
//		    		url:url,
//		    		dataType: "json",
//		    		cache:false,
//		    		param:param
//		    	}
//		    });	
//		
//		
//	}else if(type==3){
//				$("#page").myPagination({
//			    	currPage:1,
//			    	pageCount:pageNum,
//			    	pageSize:pageSize,
//			    	ajax:{
//			    		on: true,
//			    		callback: 'callBackMenu2Data',
//			    		url:url,
//			    		dataType: "json",
//			    		cache:false,
//			    		param:param
//			    	}
//			    });	
//			
//			
//		}
//		
//		 
//		
//	}
//}
function callBackMenu4Data(data){
	//校内课程
	$('#xn1').css("display", "none");
	$('#gr1').css("display", "block");
	$('#gk1').css("display", "none");
		var result = eval("("+data+")");

		var courses=result.result.list;
		var html='';
		
		 for(var i=0; i<courses.length; i++){
			 html += '<div class="liebiao1">';
			 html += '<div class="jibenxinxi1">';
			 html += '<div class="img11">';
			 if(courses[i].coverUrl == '' || courses[i].coverUrl == null){
				 html += '<li class="i2"><img id="u202_img" class="img" src="/images/c1-1index/u362.png"></li>';
			 }else{
				 html += '<li class="i2"><img id="u202_img" class="img" src='+courses[i].coverUrl+'></li>';
			 }
			 html += '</div>';
			 html += '</div>';
			 html += '<div class="jiage1">';
			 if(courses[i].courseName.length > 40){
				 html += '<div class="cor-title">'+courses[i].courseName.substring(0,38)+' ···</div>';
			 }else{
				 html += '<div class="cor-title">'+courses[i].courseName+'</div>';
			 }
			 html += '<div class="cor-progress">';
			 html += '<div class="cor-progress1"><img src="../../images/piano_teacher/progress.gif"></div><div class="cor-progress2"> 课程进度：'+courses[i].classHadFinished+' / '+courses[i].classTotal+'&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="cor-progress3"><img src="../../images/piano_teacher/apply.gif" class="cor-app"> </div><div class="cor-progress4">报名学生： '+courses[i].totalSignupStudent+' / '+courses[i].nMaxStudents+'';
			 html += '</div></div>';
			 html += '<div class="cor-time"><div class="cor-time1"><img src="../../images/piano_teacher/time.gif"></div> <div class="cor-time2">课程时间： '+courses[i].startTimePlan+'</div></div>';
			 html += '</div>';
			 if(courses[i].price_total == '' || courses[i].price_total == 0){
				 html += '<div class="renshu1">免费</div>';
			 }else{
				 html += '<div class="renshu1">￥ '+courses[i].price_total+'</div>';
			 }
			 html += '<div class="zhuangtai1"><table class="xxx3"><td>';
			 if(courses[i].courseStatus == 5){
				 html += '<div class="cor-status">报名中</div>';
			 }else  if(courses[i].courseStatus == 0){
				 html += '<div class="cor-status">未开课</div>';
			 }else  if(courses[i].courseStatus == 7){
				 html += '<div class="cor-status">已取消</div>';
			 }else  if(courses[i].courseStatus == 10){
				 html += '<div class="cor-status">正在上课</div>';
			 }else{
				 html += '<div class="cor-status">已结束</div>';
			 }
			 if(courses[i].courseStatus == 5){
				 var startDate= new Date(); 
				 var endDate= new Date(courses[i].startTimePlan.replace(/-/g,'/')); 
//				 var endDate= new Date("2016/5/17 16:49"); 
//				 alert(courses[i].startTimePlan.replace(/-/g,'/'));
				 var df=(endDate.getTime()-startDate.getTime()); 
				 if(parseInt(df)>1800000){
					 html += '<div class="cor-view1" onclick="stop('+courses[i].courseid+')">取消课程</div>';
				 }
				 
			 }
			 if(courses[i].classState == 17||courses[i].classState == 20){
			 html += '<div class="cor-view1" onclick="del('+courses[i].courseid+')">删除课程</div>';
			 }
			 html += '<div class="cor-view1" onclick="update('+courses[i].courseid+')">修改详情</div>';
			 html += '<div class="cor-view" onclick="toCourseDetail('+courses[i].courseid+')">查看详情</div>';
			 html += '</td></table></div>'
			 html += '</div>';
		 }
		 $("#grTable1").html(html);  
		 $(".liebiao1").hover(function(){
				$(this).css("background", "#e5e5e5");
			}, function(){
				$(this).css("background", "#fff");
			});
		 $(".cor-view").on("mouseover",function(){
			 $(this).css("background","#24ABF2");
		 }).on("mouseout",function(){
			 $(this).css("background","#42b8f6");
		 });
		
	}
function callBackMenu5Data(data){
	//校内课程
	$('#xn1').css("display", "none");
	$('#gr1').css("display", "block");
	$('#gk1').css("display", "none");
	var result = eval("("+data+")");
	
	var courses=result.result.list;
	var html='';
	
//	for(var i=0; i<courses.length; i++){
////		if(type==1){
//		
//		$('#xn1').css("display", "none");
//		$('#gr1').css("display", "block");
//		$('#gk1').css("display", "none");
//		$('#page').html('');
//		var courses;
//			courses=data.result.list;
//		var html='';
		 for(var i=0; i<courses.length; i++){
			 html += '<div class="liebiao1">';
			 html += '<div class="jibenxinxi1">';
			 html += '<div class="img11">';
			 if(courses[i].coverUrl == '' || courses[i].coverUrl == null){
				 html += '<li class="i2"><img id="u202_img" class="img" src="/images/c1-1index/u362.png"></li>';
			 }else{
				 html += '<li class="i2"><img id="u202_img" class="img" src='+courses[i].coverUrl+'></li>';
			 }
			 html += '</div>';
			 html += '</div>';
			 html += '<div class="jiage1">';
			 if(courses[i].courseName.length > 40){
				 html += '<div class="cor-title">'+courses[i].courseName.substring(0,38)+' ···</div>';
			 }else{
				 html += '<div class="cor-title">'+courses[i].courseName+'</div>';
			 }
			 html += '<div class="cor-progress">';
			 html += '<div class="cor-progress1"><img src="../../images/piano_teacher/progress.gif"></div><div class="cor-progress2"> 课程进度：'+courses[i].classHadFinished+' / '+courses[i].classTotal+'&nbsp;&nbsp;&nbsp;&nbsp;</div><div class="cor-progress3"><img src="../../images/piano_teacher/apply.gif" class="cor-app"> </div>';
			 
			 if(courses[i].teacherName!=undefined){
				 html += '<div class="cor-progress4">老师姓名： '+courses[i].teacherName;
			 }else{
				 html += '<div class="cor-progress4">老师姓名： ';
			 }
			 html += '</div></div>';
			 html += '<div class="cor-time"><div class="cor-time1"><img src="../../images/piano_teacher/time.gif"></div> <div class="cor-time2">课程时间： '+courses[i].signupTime+'</div></div>';
			 html += '</div>';
			 if(courses[i].price_total == '' || courses[i].price_total == 0){
				 html += '<div class="renshu1">免费</div>';
			 }else{
				 html += '<div class="renshu1">￥ '+courses[i].price_total+'</div>';
			 }
			 html += '<div class="zhuangtai1"><table class="xxx3"><td>';
			 if(courses[i].courseStatus == 5){
				 html += '<div class="cor-status">报名中</div>';
			 }else  if(courses[i].courseStatus == 0){
				 html += '<div class="cor-status">未开课</div>';
			 }else  if(courses[i].courseStatus == 7){
				 html += '<div class="cor-status">已取消</div>';
			 }else  if(courses[i].courseStatus == 10){
				 html += '<div class="cor-status">正在上课</div>';
			 }else{
				 html += '<div class="cor-status">已结束</div>';
			 }
			 html += '<div class="cor-view" onclick="toCourseDetail('+courses[i].courseid+')">查看详情</div>';
				 html += '</td></table></div>';
			 html += '</div>';
		 }
		 $("#grTable1").html(html);
		 $(".liebiao1").hover(function(){
				$(this).css("background", "#e5e5e5");
			}, function(){
				$(this).css("background", "#fff");
			});
		 $(".cor-view").on("mouseover",function(){
			 $(this).css("background","#24ABF2");
		 }).on("mouseout",function(){
			 $(this).css("background","#42b8f6");
		 });
//	}
//}
//	$("#grTable1").html(html);  
//	$(".liebiao1").hover(function(){
//		$(this).css("background", "#e5e5e5");
//	}, function(){
//		$(this).css("background", "#fff");
//	});
//	$(".cor-view").on("mouseover",function(){
//		$(this).css("background","#24ABF2");
//	}).on("mouseout",function(){
//		$(this).css("background","#42b8f6");
//	});
	
}
//function callBackMenu1Data(data){
//	//公开课程
//	$('#xn1').css("display", "none");
//	$('#gk1').css("display", "block");
//	$('#gr1').css("display", "none");
//	var result = eval("("+data+")");
//	var courses=result.result.list;
//	var table="";
//	 for(var i=0; i<courses.length; i++){
//		 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
//		 +"<div class='img11'><li class='i2'>" ;
//		 if(courses[i].coverUrl==''){
//			 table=table+"<img id='u202_img' class='img' src='/images/c1-1index/u362.png' onclick='toCourseDetail("+courses[i].courseid+")'>";
//		 }else{
//			 table=table+"<img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'>";
//		 }
//		 
//		 table=table+"</li><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>"
//		 if(courses[i].courseName.length>12){
//			 table=table+courses[i].courseName.substring(0, 12)+"...";
//		 }else{
//			 table=table+courses[i].courseName;
//		 }
//		 table=table+"</li></div></div><div class='chuangkeren1'><li style='line-height: 140px;' class='createName' title='"+courses[i].createName+"'>";
//		 
//		 if(courses[i].createName.length>6){
//			 table=table+courses[i].createName.substring(0, 6)+"...";
//		 }else{
//			 table=table+courses[i].createName;
//		 }
//		 
//		 
//		 table=table+"</li></div><div class='jiage1'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
//		 +"<div class='renshu1'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
//		 
//		 if(courses[i].courseStatus==0){
//			 table=table+"<div class='zhuangtai1'>未报名</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//			 if(courses[i].displayType==1){
//				 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//				 }else{
//					 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>";
//				 }
//			 
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==5){
//			 table=table+"<div class='zhuangtai1'>报名中</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//			 if(courses[i].displayType==1){
//				 table=table +"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//			 }else{
//				 table=table +"";
//			 }
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==6){
//			 table=table+"<div class='zhuangtai1'>待上课</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//			 if(courses[i].displayType!=0){
//				 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//			 }else if(courses[i].displayType==0){
//				
//			 }
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==7){
//			 table=table+"<div class='zhuangtai1'>已取消</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==30){
//			 table=table+"<div class='zhuangtai1'>已完成</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'></div></div>"
//		 }else if(courses[i].courseStatus==40){
//		 table=table+"<div class='zhuangtai1'>已完成</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'></div></div>"
//	 }else if(courses[i].courseStatus==41){
//		 table=table+"<div class='zhuangtai1'>已取消</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'></div></div>"
//	 }else if(courses[i].courseStatus==100){
//		 table=table+"<div class='zhuangtai1'>已取消</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'></div></div>"
//	 }else if(courses[i].courseStatus==200){
//		 table=table+"<div class='zhuangtai1'>已停售</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'></div></div>"
//	 }else if(courses[i].courseStatus==10){
//		 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//		 if(courses[i].createUid==userid){
//			 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//		 }else{
//			 
//		 }
//		 
//		 table=table+"</td></table></div></div>"
//	 }
////		 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
//	 }    
//	$("#gkTable1").html(table);
//}
//function callBackMenu3Data(data){
//	//校内课程
//	$('#xn1').css("display", "block");
//	$('#gr1').css("display", "none");
//	$('#gk1').css("display", "none");
//		var result = eval("("+data+")");
//
//		var courses=result.result.list;
//		var table="";
//		
//		 for(var i=0; i<courses.length; i++){
//			 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
//			 +"<div class='img11'><li class='i2'>" ;
//			 if(courses[i].coverUrl==''){
//				 
//				 table=table+"<img id='u202_img' class='img' src='/images/c1-1index/u362.png' onclick='toCourseDetail("+courses[i].courseid+")'>";
//			 }else{
//				 table=table+"<img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'>";
//			 }
//			 table=table +"</li><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>"
//			 if(courses[i].courseName.length>12){
//				 table=table+courses[i].courseName.substring(0, 12)+"...";
//			 }else{
//				 table=table+courses[i].courseName;
//			 }
//			 table=table+"</li></div></div><div class='chuangkeren1'><li style='line-height: 140px;' class='createName' title='"+courses[i].createName+"'>";
//			 
//			 if(courses[i].createName.length>6){
//				 table=table+courses[i].createName.substring(0, 6)+"...";
//			 }else{
//				 table=table+courses[i].createName;
//			 }
//			 
//			 
//			 table=table+"</li></div><div class='jiage1'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
//			 +"<div class='renshu1'><span class='yibo'>"+courses[i].totalSchoolStudent+"</div><div class='renshu1'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
//			 
//			 if(courses[i].courseStatus==0){
//				 table=table+"<div class='zhuangtai1'>未报名</div>";
//				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//				 +"<div class='caozuo_xn1'><table class='xxx'><td>";
//				 if(courses[i].displayType==1){
//					 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//					 }else{
//						 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>";
//					 }
//				 
//				 if(courses[i].createUid==userid){
//					 table=table +"</td></table><li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//				 }else{
//					 
//				 }
//				 table=table+"<</div></div>"
//			 }else if(courses[i].courseStatus==5){
//				 table=table+"<div class='zhuangtai1'>报名中</div>";
//				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//				 +"<div class='caozuo_xn1'><table class='xxx'><td>";
//				 if(courses[i].displayType==1){
//					 table=table +"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//				 }else{
//					 table=table +"";
//				 }
//				 if(courses[i].createUid==userid){
//					 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//				 }else{
//					 
//				 }
//				 table=table+"</td></table></div></div>"
//			 }else if(courses[i].courseStatus==6){
//				 table=table+"<div class='zhuangtai1'>待上课</div>";
//				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//				 +"<div class='caozuo_xn1'><table class='xxx'><td>";
//				 if(courses[i].displayType!=0){
//					 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//				 }else if(courses[i].displayType==0){
//					
//				 }
//				 if(courses[i].createUid==userid){
//					 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//				 }else{
//					 
//				 }
//				 table=table+"</td></table></div></div>"
//			 }else if(courses[i].courseStatus==7){
//				 table=table+"<div class='zhuangtai1'>已取消</div>";
//				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//				 +"<div class='caozuo_xn1'><table class='xxx'><td>"
//				 if(courses[i].createUid==userid){
//					 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//				 }else{
//					 
//				 }
//				 
//				 table=table+"</td></table></div></div>"
//			 }else if(courses[i].courseStatus==30){
//				 table=table+"<div class='zhuangtai1'>已完成</div>";
//				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//				 +"<div class='caozuo_xn1'></div></div>"
//			 }else if(courses[i].courseStatus==40){
//			 table=table+"<div class='zhuangtai1'>已完成</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn1'></div></div>"
//		 }else if(courses[i].courseStatus==41){
//			 table=table+"<div class='zhuangtai1'>已取消</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn1'></div></div>"
//		 }else if(courses[i].courseStatus==100){
//			 table=table+"<div class='zhuangtai1'>已取消</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn1'></div></div>"
//		 }else if(courses[i].courseStatus==200){
//			 table=table+"<div class='zhuangtai1'>已停售</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn1'></div></div>"
//		 }else if(courses[i].courseStatus==10){
//			 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn1'><table class='xxx'><td>"
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 
//			 table=table+"</td></table></div></div>"
//		 }
////			 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
//		 }    
//		 $("#xnTable1").html(table);
//		 $(".caozuoli").hover(function(){
//				$(this).css("background", "#e5e5e5");
//			}, function(){
//				$(this).css("background", "#fff");
//			});
//		
//	}
//function callBackMenu2Data(data){
////个人公开课程
//	$('#xn1').css("display", "none");
//	$('#gr1').css("display", "block");
//	$('#gk1').css("display", "none");
//	var result = eval("("+data+")");
//
//	var courses=result.result.list;
//	var table="";
//	 for(var i=0; i<courses.length; i++){
//		 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
//		 +"<div class='img11'><li class='i2'>";
//		 if(courses[i].coverUrl==''){
//			 table=table+"<img id='u202_img' class='img' src='/images/c1-1index/u362.png' onclick='toCourseDetail("+courses[i].courseid+")'>";
//		 }else{
//			 table=table+"<img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'>";
//		 }
//		 table=table+"</li><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>";
//		 if(courses[i].courseName.length>12){
//			 table=table+courses[i].courseName.substring(0, 12)+"...";
//		 }else{
//			 table=table+courses[i].courseName;
//		 }
//		 table=table+"</li></div></div>";
//		 table=table+"<div class='jiage3'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
//		 +"<div class='renshu3'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
//		 
//		 if(courses[i].courseStatus==0){
//			 table=table+"<div class='zhuangtai1'>未报名</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//			 if(courses[i].displayType==1){
//				 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//				 }else{
//					 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>";
//				 }
//			 
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==5){
//			 table=table+"<div class='zhuangtai1'>报名中</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//			 if(courses[i].displayType==1){
//				 table=table +"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//			 }else{
//				 table=table +"";
//			 }
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==6){
//			 table=table+"<div class='zhuangtai1'>待上课</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
//			 if(courses[i].displayType!=0){
//				 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
//			 }else if(courses[i].displayType==0){
//				
//			 }
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==7){
//			 table=table+"<div class='zhuangtai1'>已取消</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//			 if(courses[i].createUid==userid){
//				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//			 }else{
//				 
//			 }
//			 
//			 table=table+"</td></table></div></div>"
//		 }else if(courses[i].courseStatus==30){
//			 table=table+"<div class='zhuangtai1'>已完成</div>";
//			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//			 +"<div class='caozuo_xn3'></div></div>"
//		 }else if(courses[i].courseStatus==40){
//		 table=table+"<div class='zhuangtai1'>已完成</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn1'></div></div>"
//	 }else if(courses[i].courseStatus==41){
//		 table=table+"<div class='zhuangtai1'>已取消</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'></div></div>"
//	 }else if(courses[i].courseStatus==100){
//		 table=table+"<div class='zhuangtai1'>已取消</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'></div></div>"
//	 }else if(courses[i].courseStatus==200){
//		 table=table+"<div class='zhuangtai1'>已停售</div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'></div></div>"
//	 }else if(courses[i].courseStatus==10){
//		 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
//		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
//		 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
//		 if(courses[i].createUid==userid){
//			 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
//		 }else{
//			 
//		 }
//		 
//		 table=table+"</td></table></div></div>"
//	 }
////		 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
//	 }    
//	$("#grTable1").html(table);
//	
//	
//}
function publish(courseId){
	$.ajax({
		url : getRootPath() + '/teacher/course/publishOrUnpublish',
		type : 'POST',
		dataType : 'json',
		data:{
			'courseid':courseId,
		},
		success : function(data) {
			
			if(data.success==true){
//				alert("发布成功");
				getDialogCue('success', '发布成功！')
				location.reload();
			}else{
//				alert(data.message);
				getDialog('fail', data.message)
			}
			
			

		},
	});	
	
}
function update(courseId){
	location.href = getRootPath() + '/teacher/course/update/'+courseId;
	
}
function del(courseId){
	$.ajax({
		url : getRootPath() + '/teacher/course/delete',
		type : 'POST',
		dataType : 'json',
		data:{
			'courseid':courseId,
		},
		success : function(data) {
		
				
			
			
			
			if(data.success==true){
				getDialogCue('success', '删除成功！')
//				location.reload();
				changeType(1);
			}else{
				getDialog('fail', data.message)
			}
		},
	});	
	
}
function unpublish(courseId){
	$.ajax({
		url : getRootPath() + '/teacher/course/publishOrUnpublish',
		type : 'POST',
		dataType : 'json',
		data:{
			'courseid':courseId,
		},
		success : function(data) {
			if(data.status==-1){
//				alert(data.message);
				getDialog('fail', data.message)
			}else if(data.status==-2){
//				alert(data.message);
				getDialog('fail', data.message)
			}else if(data.status==-3){
//			alert(data.message);
				getDialog('fail', data.message)
		}
			
			if(data.success==true){
//				alert("已取消发布");
				getDialogCue('success', '已取消发布！')
				location.reload();
			}
		},
	});	
	
}
function changeType(flag){
	
	if(flag==1){
		//#xn_title
//		$('#xn_title').css('border-left',' 1px solid #E4E4E4');
//		$('#xn_title').css('border-right',' 1px solid #E4E4E4');
//		$('#xn_title').css('border-top',' 2px solid #51a4f6');
//		$('#xn_title').css('background-color',' #ffffff');
		$('#xn_title').addClass('xn_title1');
		$('#gk_title').removeClass('gk_title1');
		$('#gr_title').removeClass('gr_title1');
		$('#xn_status').css('display','block');
		$('#xx_status').css('display','none');
		$('#gr_status').css('display','none');
		$('#courseType').val('1');
		$('#creator').css("display", "block");
		$('#xn_title').css("background-color", "#eff3f4");
		$('#xn_title').css("border-bottom", "1px solid #E4E4E4");
		$('#gk_title').css("border-bottom", "0px");
		$('#gk_title').css("background-color", "#ffffff");
		$('#gk_title').css("border-right", "1px solid #E4E4E4");
		queryCourses('');
	}else if(flag==2){
		$('#xn_title').removeClass('xn_title1');
//		$('#gk_title').addClass('gk_title1');
		$('#gr_title').removeClass('gr_title1');
		$('#xn_status').css('display','none');
		$('#xx_status').css('display','block');
		$('#gr_status').css('display','none');
		$('#courseType').val('2');
		$('#creator').css("display", "block");
		$('#xn_title').css("background-color", "#ffffff");
		$('#gk_title').css("background-color", "#eff3f4");
		$('#gk_title').css("border-bottom", "1px solid #E4E4E4");
		$('#xn_title').css("border-bottom", "0px ");
//		$('#xn_title').css("border-right", "1px solid #E4E4E4");
		$('#gk_title').css("border-right", "0px");
		queryCoursesByStudent(0);
	}
	
}
 function changeIdentity1(){
	var identity= $('#identity').val();
//	queryCourse(identity);
	if(identity==1){
		window.location.href= getRootPath() + '/course/list';
	}else if(identity==2){
		window.location.href= getRootPath() + '/student/course';
	}
 
 
 }
 function toCreateCourse(){
	 getAuthCertificates();
	
 }
 function getAuthCertificates(){
		var url=getRootPath()+"/teacher/getauthteacherinfo";
		$.ajax({
			url:url,
			type:'post',
			data:{},
			dataType:'json',
			success:function(data){
				if(data.status == -1){
					alert("请登录后重试！");
					location.href = getRoot() + "/index";
				}else if(data.status == 1){
					alert("请先认证老师");
					 window.location.href= getRootPath() + '/teacher/techCertification';
				}else if(data.status == 0){
					 window.location.href= getRootPath() + '/teacher/course/create';
					
				}
			}
		})
	}
 
 function stop(courseId){
	 $.ajax({
			url : getRootPath() + '/teacher/course/tostopcourse',
			type : 'POST',
			dataType : 'json',
			data:{
				'courseid':courseId,
			},
			success : function(data) {
				
				$('#weiyuejin').text(data.stoptopayfee);
				$('#courseId ').val(courseId);
				if(data.stoptopayfee>data.account){
					$('#chongzhi_stop').css('display','block');
					$('#stop_flag').val('1');
					
				}else{
					$('#chongzhi_stop').css('display','none');
					$('#stop_flag').val('0');
				}
			},
		});	
	 $("#dialog").dialog("open");
 }
 function stopCourse(){
	var courseId=$('#courseId').val();
	var paypwd=$('#password').val();
	var stopreason=$('#reason').val();
	var strReason=$('#reason_description').val();
	var stop_flag=$('#stop_flag').val();
	
	if(paypwd==''){
		alert("支付密码不能为空");
		return false;
	}
	if(stopreason==0){
		alert("请选择停售原因");
		return false;
	}
	if(stop_flag==1){
		alert("余额不足，请充值 ！");
		return false;
	}
	 $.ajax({
		 url : getRootPath() + '/teacher/course/stopcourse',
		 type : 'POST',
		 dataType : 'json',
		 data:{
			 'courseid':courseId,
			 'paypwd':paypwd,
			 'stopreason':stopreason,
			 'strReason':strReason,
			 
		 },
		 success : function(data) {
			 if(data.success==true){
				 alert('退课成功');
				 location.href = getRootPath() + "/teacher/course/manage";
			 }else{
				 alert(data.message);
			 }
			
		 },
	 });	
 }
 function cancel(){
	 $("#dialog").dialog("close");
 }
 function searchCourse(){
		var courseName =$('#courseName').val();
		var courseTime =$('#courseTime').val();
		var creatorName =$('#creatorName').val();
		var courseType =$('#courseType').val();
		if(courseType==3){
			queryCourse(courseName,courseTime,'',courseType,0);
		}else{
			queryCourse(courseName,courseTime,creatorName,courseType,0);
		}
		
	 }
function changeStatus(type,status){
	var courseName =$('#courseName').val();
	var courseTime =$('#courseTime').val();
	var creatorName =$('#creatorName').val();
//	var courseType =$('#courseType').val();
	if(courseType==3){
		queryCourse(courseName,courseTime,'',type,status);
	}else{
		queryCourse(courseName,courseTime,creatorName,type,status);
	}
 }
function toCourseDetail(courseId){
	location.href = getRootPath() + "/course/detail/" + courseId;
}
function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
    //单字节加1 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
}
