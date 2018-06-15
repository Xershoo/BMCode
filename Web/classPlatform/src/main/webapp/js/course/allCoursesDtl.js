var courseInCount = 0;
$(function() {
	$("#dialog").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 600, // 窗口宽度
		height : 600,
	});
	var identity= $('#identity').val();
	$(document).ready(function() {
		var pages = $("#pages").val();
		var count = $("#count").val();
		var pageIndex = $("#pageNum").val();
		$("#Pagination").pagination(count,{
			callback: PageCallback,  
            prev_text: '上一页',       //上一页按钮里text  
            next_text: '下一页',       //下一页按钮里text  
            items_per_page: 30,  //显示条数  
            num_display_entries: 6,    //连续分页主体部分分页条目数  
            current_page: pageIndex-1,   //当前页索引  
            num_edge_entries: 1        //两侧首尾分页条目数  
		});
	});
	//翻页调用  
    function PageCallback(index) {             
        InitTable(index);  
    }  
    //请求数据  
    function InitTable(pageIndex) {
    	/*var pageIndexs = $("#pageNum").val();
    	if(pageIndexs == '' || pageIndexs == null){
    		pageIndexs = 1;
    	}else{
    		pageIndexs = parseInt(pageIndexs);
    	}*/
    	var keyword = '';
    	var minPrice = '';
    	var maxPrice = '';
    	var signupStartTime = '';
    	var signupEndTime = '';
    	var onlineType = '';
    	var minPrices = $("#minPrices").val();
    	var maxPrices = $("#maxPrices").val();
    	var startTimes = $("#startTimes").val();
    	var endTimes = $("#endTimes").val();
		if($("#check1").hasClass("checked")){
			minPrice = 0;
			maxPrice = 100;
		}else if($("#check2").hasClass("checked")){
			minPrice = 100;
			maxPrice = 200;
		}else if($("#check3").hasClass("checked")){
			minPrice = 200;
		}
		keyword = $.trim($("#keyword").val());
    	if($("#check8").hasClass("checked")){
    		onlineType = 0;
    	}else if($("#check9").hasClass("checked")){
    		onlineType = 1;
    	} 
    	$("#grTable1").html('');
    	var pageSize = 30;
//    	var url = getRootPath() + '/course/search?keyword='+keyword+'&minPrice='+minPrice+'&maxPrice='+maxPrice+'&pageNum='+(pageIndex+1);
    	var url = getRootPath() + '/course/searchAll?pageNum='+(pageIndex+1);
    	if(keyword != ''){
    		url += '&keyword='+encodeURI(encodeURI(keyword));
    	}
    	if((minPrice != '' || minPrice == 0) && maxPrice != ''){
    		url += '&minPrice='+minPrice+'&maxPrice='+maxPrice;
    	}
    	if(minPrice != '' && maxPrice == ''){
    		url += '&minPrice='+minPrice;
    	}
    	if($("#check8").hasClass("checked")){
    		onlineType = 0;
    		url += '&onlineType='+onlineType;
    	}else if($("#check9").hasClass("checked")){
    		onlineType = 1;
    		url += '&onlineType='+onlineType;
    	}
    	if(startTimes != '' && startTimes != null){
    		url += '&startTime='+startTimes;
    	}
    	if(endTimes != '' && endTimes != null){
    		url += '&endTime='+endTimes;
    	}
    	location.href = url ;
    }  
    
    getCoursesCondition();
    
	$("#searchBtn").on("mouseover",function(){
		$(this).css("background","#12A3F0");
	}).on("mouseout",function(){
		$(this).css("background","#42b8f6");
	});
	
	$(".cor-view").on("mouseover",function(){
		$(this).css("color","#12A3F0");
	}).on("mouseout",function(){
		$(this).css("color","#666666");
	});
	
	$(".cor-title").on("mouseover",function(){
		$(this).css("color","#42b8f6");
	}).on("mouseout",function(){
		$(this).css("color","#3d3d3d");
	});
	
	$("#searchBtn").on("click",function(){
		InitTable(0);
	})
	$("#gogogo").on("click",function(){
		var jumpCor = $.trim($("#jumpCor").val());
		if(jumpCor != null && jumpCor != ''){
			jumpCor = parseInt(jumpCor);
		}
		InitTable(jumpCor-1);
	})
	checkSearPrice();
//	checkSearchTime();
	checkPlayType();
})

function  getCoursesCondition(){
	var minPrices = $("#minPrices").val();
	var maxPrices = $("#maxPrices").val();
	var keywords = $.trim($("#keywords").val());
	var startTime = $.trim($("#startTime").val());
	var endTime = $.trim($("#endTime").val());
	var onlineType = $.trim($("#onlineType").val());
	if(minPrices == 0 && maxPrices == 100){
		$('#check1').attr("src", "/images/course/check_03.png");
		$("#check1").addClass("checked");
	}else if(minPrices == 100 && maxPrices == 200){
		$('#check2').attr("src", "/images/course/check_03.png");
		$("#check2").addClass("checked");
	}else if(minPrices == 200){
		$('#check3').attr("src", "/images/course/check_03.png");
		$("#check3").addClass("checked");
	}
	if(onlineType == '0'){
		$('#check8').attr("src", "/images/course/check_03.png");
		$("#check8").addClass("checked");
	}else if(onlineType == '1'){
		$('#check9').attr("src", "/images/course/check_03.png");
		$("#check9").addClass("checked");
	}
	$("#keyword").val(keywords);
	$("#startTimes").val(startTime);
	$("#endTimes").val(endTime);
//	getMillionSeconds();
}

function signCourse(courseId){
	var url = getRootPath() + "/student/toPayCourse/" + courseId;
	location.href = url;
}

function checkPlayType(){
	$("#check8").click(function() {
		$('#check8').attr("src", "/images/course/check_03.png");
		$('#check8').addClass("checked");
		$('#check9').attr("src", "/images/course/check_05.png");
		$('#check9').removeClass("checked");
	});
	$("#check9").click(function() {
		$('#check9').attr("src", "/images/course/check_03.png");
		$('#check9').addClass("checked");
		$('#check8').attr("src", "/images/course/check_05.png");
		$('#check8').removeClass("checked");
	});
}

function checkSearPrice(){
	$("#check1").click(function() {
		if($("#check1").attr('src')=='/images/course/check_05.png'){
			$('#check1').attr("src", "/images/course/check_03.png");
			$('#check1').addClass("checked");
		}else{
			$('#check1').attr("src", "/images/course/check_05.png");
			$('#check1').removeClass("checked");
		}
		
		$('#check2').attr("src", "/images/course/check_05.png");
		$('#check2').removeClass("checked");
		$('#check3').attr("src", "/images/course/check_05.png");
		$('#check3').removeClass("checked");
	});
	$("#check2").click(function() {
		if($("#check2").attr('src')=='/images/course/check_05.png'){
			$('#check2').attr("src", "/images/course/check_03.png");
			$('#check2').addClass("checked");
		}else{
			$('#check2').attr("src", "/images/course/check_05.png");
			$('#check2').removeClass("checked");
		}
		
		$('#check1').attr("src", "/images/course/check_05.png");
		$('#check1').removeClass("checked");
		$('#check3').attr("src", "/images/course/check_05.png");
		$('#check3').removeClass("checked");
	});
	$("#check3").click(function() {
		if($("#check3").attr('src')=='/images/course/check_05.png'){
			$('#check3').attr("src", "/images/course/check_03.png");
			$('#check3').addClass("checked");
		}else{
			$('#check3').attr("src", "/images/course/check_05.png");
			$('#check3').removeClass("checked");
		}
		
		$('#check2').attr("src", "/images/course/check_05.png");
		$('#check2').removeClass("checked");
		$('#check1').attr("src", "/images/course/check_05.png");
		$('#check1').removeClass("checked");
	});
}

function checkSearchTime(){
	$("#check4").click(function() {
		$('#check4').attr("src", "/images/course/check_03.png");
		$('#check4').addClass("checked");
		$('#check5').attr("src", "/images/course/check_05.png");
		$('#check5').removeClass("checked");
		$('#check6').attr("src", "/images/course/check_05.png");
		$('#check6').removeClass("checked");
		$('#check7').val('');
	})
	$("#check5").click(function() {
		$('#check5').attr("src", "/images/course/check_03.png");
		$('#check5').addClass("checked");
		$('#check4').attr("src", "/images/course/check_05.png");
		$('#check4').removeClass("checked");
		$('#check6').attr("src", "/images/course/check_05.png");
		$('#check6').removeClass("checked");
		$('#check7').val('');
	})
	$("#check6").click(function() {
		$('#check6').attr("src", "/images/course/check_03.png");
		$('#check6').addClass("checked");
		$('#check4').attr("src", "/images/course/check_05.png");
		$('#check4').removeClass("checked");
		$('#check5').attr("src", "/images/course/check_05.png");
		$('#check5').removeClass("checked");
		$('#check7').val('');
	})
	$("#check7").click(function() {
		$('#check4').attr("src", "/images/course/check_05.png");
		$('#check4').removeClass("checked");
		$('#check5').attr("src", "/images/course/check_05.png");
		$('#check5').removeClass("checked");
		$('#check6').attr("src", "/images/course/check_05.png");
		$('#check6').removeClass("checked");
	})
}

function queryCourses(){
	var minPrice;
	var maxPrice;
	if($("#check1").hasClass("checked")){
		minPrice = 0;
		maxPrice = 100;
	}else if($("#check2").hasClass("checked")){
		minPrice = 100;
		maxPrice = 200;
	}else if($("#check3").hasClass("checked")){
		minPrice = 200;
	}
	var keyword = $.trim($("#keyword").val());
	$("#grTable1").html('');
	data={
			'minPrice':minPrice,
			'maxPrice':maxPrice,
			'keyword':keyword,
            'page':1
		};
	param={on:true, page:1, start:1,rows:30,'minPrice':minPrice, 'maxPrice':maxPrice, 'keyword':keyword}

var url;
	 url=getRootPath() + '/course/searchAll';


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

var pageNum = Math.ceil(courseInCount/30);
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
			$('#page').html('');
			var courses;
				courses=data.courses.list;
			var html='';
			 for(var i=0; i<courses.length; i++){
				 html += '<div class="liebiao1">';
				 html += '<div class="jibenxinxi1">';
				 html += '<div class="img11">';
				 if(courses[i].coverUrl == '' || courses[i].coverUrl == null){
					 html += '<li class="i2"><img id="u202_img" class="img" src="../images/c1-1index/u362.png"></li>';
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
				 html += '<div class="cor-time"><div class="cor-time1"><img src="../../images/piano_teacher/time.gif"></div> <div class="cor-time2">课程时间： '+courses[i].createTime+'</div></div>';
				 html += '</div>';
				 if(courses[i].price_total == '' || courses[i].price_total == 0){
					 html += '<div class="renshu1">免费</div>';
				 }else{
					 html += '<div class="renshu1">￥ '+courses[i].price_total+'</div>';
				 }
				 html += '<div class="zhuangtai1">';
				 if(courses[i].courseStatus == 5){
					 html += '<div class="cor-status">已开课</div>';
				 }else  if(courses[i].courseStatus == 0){
					 html += '<div class="cor-status">未开课</div>';
				 }else  if(courses[i].courseStatus == 7){
					 html += '<div class="cor-status">已取消</div>';
				 }else  if(courses[i].courseStatus == 10){
					 html += '<div class="cor-status">正在上课</div>';
				 }else{
					 html += '<div class="cor-status">已开课</div>';
				 }
				 html += '<div class="cor-view" onclick="toCourseDetail('+courses[i].courseid+')">查看详情</div>';
				 html += '</div>';
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
})
}else{

	if(pageNum > 1 && pageNum < 30){
		pageSize = pageNum;
	}else{
		pageSize = 30;
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

function callBackMenu4Data(data){
		var result = eval("("+data+")");

		var courses=result.result.list;
		var html='';
		
		 for(var i=0; i<courses.length; i++){
			 html += '<div class="liebiao1">';
			 html += '<div class="jibenxinxi1">';
			 html += '<div class="img11">';
			 if(courses[i].coverUrl == '' || courses[i].coverUrl == null){
				 html += '<li class="i2"><img id="u202_img" class="img" src="../images/c1-1index/u362.png"></li>';
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
			 html += '<div class="cor-time"><div class="cor-time1"><img src="../../images/piano_teacher/time.gif"></div> <div class="cor-time2">课程时间： '+courses[i].createTime+'</div></div>';
			 html += '</div>';
			 if(courses[i].price_total == '' || courses[i].price_total == 0){
				 html += '<div class="renshu1">免费</div>';
			 }else{
				 html += '<div class="renshu1">￥ '+courses[i].price_total+'</div>';
			 }
			 html += '<div class="zhuangtai1">';
			 if(courses[i].courseStatus == 5){
				 html += '<div class="cor-status">已开课</div>';
			 }else  if(courses[i].courseStatus == 0){
				 html += '<div class="cor-status">未开课</div>';
			 }else  if(courses[i].courseStatus == 7){
				 html += '<div class="cor-status">已取消</div>';
			 }else  if(courses[i].courseStatus == 10){
				 html += '<div class="cor-status">正在上课</div>';
			 }else{
				 html += '<div class="cor-status">已开课</div>';
			 }
			 html += '<div class="cor-view" onclick="toCourseDetail('+courses[i].courseid+')">查看详情</div>';
			 html += '</div>';
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
function update(courseId){
	location.href = getRootPath() + '/teacher/course/update/'+courseId;
	
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

function getDate(){
	var date=new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var sysdate = year + '-' + month + '-' + day;
	return sysdate;
}

function getMillionSeconds(param){
	var mydate=new Date();
	var arr = new Array();
	var starttimeHaoMiao = (new Date(mydate)).getTime(); //得到毫秒数
	var seconds = mydate.getMilliseconds(); //获取当前毫秒数(0-999)
	var three = starttimeHaoMiao - 3*24*3600*1000;
	var onWeek = starttimeHaoMiao - 7*24*3600*1000;
	var onMonth = starttimeHaoMiao - 30*24*3600*1000;
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	var threeDays =  new Date(three).Format("yyyy-MM-dd"); //就得到普通的时间了
	var weeks = new Date(onWeek).Format("yyyy-MM-dd");
	var months = new Date(onMonth).Format("yyyy-MM-dd");
	if(param == 1){
		arr.push(mydate,threeDays);
	}else if(param == 2){
		arr.push(mydate,weeks);
	}else if(param == 3){
		arr.push(mydate,months);
	}
}
function courseSlideDown(courseId, courseName, startTimePlan, teacherName){
	var html = '<div class="information_course">'
		+ '<div class="course_name">'+subCourseName(courseName)+'</div>'
		+ '<div class="begin_time">时间: '+startTimePlan+'开课</div>'
		+ '<div class="course_teacher">老师: '+teacherName+'</div>'
		+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#eff3f3", "opacity":"1"}).animate({marginTop:"0px",height:"91px"});
}
function courseSlideUp(courseId, courseName, startTimePlan, teacherName, courseStatus, recordUrl){
	var html = '';
	if(recordUrl == null || recordUrl == ""){
		html += '<div class="course_baoming" onclick="goToCourseDetail(\''+courseId+'\')">报名</div>';
	}else{
		html += '<div class="course_baoming" onclick="goToVideoOnline(\''+courseId+'\')">点播</div>';
	}
	//var html = '<div class="course_baoming" onclick="goToCourseDetail(\''+courseId+'\')">报名</div>'
	   html += '<div class="information_course" style="margin-top:38px;">'
			+ '<div class="course_name" style="color:#fff;" onclick="goToCourseDetail(\''+courseId+'\')" title="'+courseName+'">'+subCourseName(courseName)+'</div>'
			+ '<div class="begin_time" style="color:#fff;">时间: '+startTimePlan+'开课</div>'
			+ '<div class="course_teacher" style="color:#fff;">老师: '+teacherName+'</div>'
			+ '</div>';
	$("#recom"+courseId).next().next().html(html);
	$("#recom"+courseId).next().next().stop();
	$("#recom"+courseId).next().next().css({"background":"#42b8f6", "opacity":"0.8"}).animate({marginTop:"-148px",height:"100%"});
}
function subCourseName(name){
	if(name == "" || name == null){
		return "无";
	}else{
		var result;
		if(name.length > 9){
			result = name.substring(0,9) + "...";
		}else{
			result = name;
		}
		return result;
	}
}
function entryCourse(courseId,courseStatus){
	if(courseStatus == 40){
		alert("该课程已经结算完成,不能报名.");
		return;
	}else if(courseStatus == 0){
		alert("该课程还未开始报名.");
		return;
	}else if(courseStatus == 6){
		alert("该课程报名已经结束,请另选其它课程.");
		return;
	}else if(courseStatus == 7){
		alert("该课程已经被取消.");
		return;
	}else if(courseStatus == 10){
		alert("该课程已经开始上课,不能报名.");
		return;
	}else if(courseStatus == 5){
		var url = getRootPath() + "/student/toPayCourse/" + courseId;
		location.href = url;
	}else{
		alert("该课程不能报名.");
		return;
	}
	
}
function goToVideoOnline(courseId){
	location.href = getRootPath() + '/course/view/' + courseId;
}
function goToCourseDetail(courseId){
	location.href = getRootPath() + '/course/detail/' + courseId;
}