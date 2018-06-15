var courseInCount = 0;
$(function() {
		queryCourse('','',0);
	
})
function queryCourse(courseName,courseTime,type){
	var url;
	var data;
		 url=getRootPath() + '/student/course/list';
	if(courseName==''&&courseTime==''){
		data={
	            'page':1,
	            'courseStatus':type,
	            
			};
	}else if(courseName==''&&courseTime!=''){
		data={
	            'page':1,
	            'courseStatus':type,
	            'startSignupTime':courseTime+" 00:00",
	            'endSignupTime':courseTime+" 23:59",
			};
	}else if(courseName!=''&&courseTime==''){
		
		data={
	            'page':1,
	            'courseStatus':type,
	            'courseName':courseName
			};
	}else if(courseName!=''&&courseTime!=''){
		data={
	            'page':1,
	            'courseStatus':type,
	            'startSignupTime':courseTime+" 00:00",
	            'endSignupTime':courseTime+" 23:59",
	            'courseName':courseName
			};
	}
	
	
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
		$("#grTable1").html('');
		$('#page').html('');
	}else if(pageNum == 1){
		$.ajax({
			url : url,
			type : 'POST',
			dataType : 'json',
			data:data,
			success : function(data) {
				
				var courses;
					courses=data.result.list
				var table="";
				 for(var i=0; i<courses.length; i++){
						
					 table=table+"<div class='liebiao1'><div class='jibenxinxi1'><div class='time'></div><div class='img11'>"
					 +"<li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'></li></div>"
					 +"<div class='mc'><li style='height: 30px'/><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname'>"
					 if(courses[i].courseName.length>12){
						 table=table+courses[i].courseName.substring(0, 12)+"...";
					 }else{
						 table=table+courses[i].courseName;
					 }
					 table=table+"</li><li style='height: 22px'>"+courses[i].teacherName;
					 if(courses[i].schoolName!=undefined){
//						 table=table+"|"+courses[i].schoolName;
						 if(courses[i].schoolName.length>6){
							 table=table+"|"+courses[i].schoolName.substring(0, 6)+"...";
						 }else{
							 table=table+"|"+courses[i].schoolName;
						 }
						 
					 }
					 table=table+"</li><li style='height: 22px'>"+courses[i].signupTime+"</li></div>"
					 +"</div><div class='jiage1'><li style='line-height: 120px;'>￥"+courses[i].price_total+"</li></div><div class='renshu1'><span class='yibo'>"+courses[i].signupTime+"</div>";
					 if(courses[i].courseStatus==0){
						 table=table+"<div class='zhuangtai1'>未报名</div>"
					 }else if(courses[i].courseStatus==5){
						 table=table+"<div class='zhuangtai1'>报名中</div>"
					 }else if(courses[i].courseStatus==6){
						 table=table+"<div class='zhuangtai1'>待上课</div>"
					 }else if(courses[i].courseStatus==7){
						 table=table+"<div class='zhuangtai1'>已取消</div>"
					 }else if(courses[i].courseStatus==30){
						 table=table+"<div class='zhuangtai1'>已完成</div>"
					 }else if(courses[i].courseStatus==40){
					 table=table+"<div class='zhuangtai1'>已完成</div>"
				 }else if(courses[i].courseStatus==41){
					 table=table+"<div class='zhuangtai1'>已取消</div>"
				 }else if(courses[i].courseStatus==100){
					 table=table+"<div class='zhuangtai1'>已取消</div>"
				 }else if(courses[i].courseStatus==200){
					 table=table+"<div class='zhuangtai1'>已停售</div>"
				 }else if(courses[i].courseStatus==10){
					 table=table+"<div class='zhuangtai1'><span id='jinse'>进行中</span></div>"
				 }
					 table=table+"<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div><div class='caozuo1'><ul>"
//					 +"<li>申请退款</li><li>查看原因</li><li>删除课程</li>"
					 +"</ul></div></div>";
				 }    
				$("#grTable1").html(table);
			},
		});	
		
	}else{
		if(pageNum > 1 && pageNum < 10){
			pageSize = pageNum;
		}else{
			pageSize = 10;
		}
		
		if(courseName==''&&courseTime==''){
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu1Data',
		    		url:url,
		    		dataType: "json",
		    		cache:false,
		    		param:{on:true, page:1, start:1,rows:10, 'courseStatus':type}
		    	}
		    });
		}else if(courseName==''&&courseTime!=''){
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu1Data',
		    		url:url,
		    		dataType: "json",
		    		cache:false,
		    		param:{on:true, page:1, start:1,rows:10, 'courseStatus':type,'startSignupTime':courseTime+' 00:00','endSignupTime':courseTime+' 23:59'}
		    	}
		    });
		}else if(courseName!=''&&courseTime==''){
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu1Data',
		    		url:url,
		    		dataType: "json",
		    		cache:false,
		    		param:{on:true, page:1, start:1,rows:10, 'courseStatus':type,'courseName':courseName}
		    	}
		    });
		}else if(courseName!=''&&courseTime!=''){
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu1Data',
		    		url:url,
		    		dataType: "json",
		    		cache:false,
		    		param:{on:true, page:1, start:1,rows:10, 'courseStatus':type,'courseName':courseName,'startSignupTime':courseTime+' 00:00','endSignupTime':courseTime+' 23:59'}
		    	}
		    });
		}
		
	}
}

function callBackMenu1Data(data){
	var result = eval("("+data+")");
	var courses=result.result.list;
	var table="";
	 for(var i=0; i<courses.length; i++){
			
		 table=table+"<div class='liebiao1'><div class='jibenxinxi1'><div class='time'></div><div class='img11'>"
		 +"<li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")'></li></div>"
		 +"<div class='mc'><li style='height: 30px'/><li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname'>"
		 if(courses[i].courseName.length>12){
			 table=table+courses[i].courseName.substring(0, 12)+"...";
		 }else{
			 table=table+courses[i].courseName;
		 }
		 table=table+"</li><li style='height: 22px'>"+courses[i].teacherName;
		 if(courses[i].schoolName!=undefined){
//			 table=table+"|"+courses[i].schoolName;
			 if(courses[i].schoolName.length>6){
				 table=table+"|"+courses[i].schoolName.substring(0, 6)+"...";
			 }else{
				 table=table+"|"+courses[i].schoolName;
			 }
			 
		 }
		 table=table+"</li><li style='height: 22px'>"+courses[i].signupTime+"</li></div>"
		 +"</div><div class='jiage1'><li style='line-height: 120px;'>￥"+courses[i].price_total+"</li></div><div class='renshu1'><span class='yibo'>"+courses[i].signupTime+"</div>";
		 if(courses[i].courseStatus==0){
			 table=table+"<div class='zhuangtai1'>未报名</div>"
		 }else if(courses[i].courseStatus==5){
			 table=table+"<div class='zhuangtai1'>报名中</div>"
		 }else if(courses[i].courseStatus==6){
			 table=table+"<div class='zhuangtai1'>待上课</div>"
		 }else if(courses[i].courseStatus==7){
			 table=table+"<div class='zhuangtai1'>已取消</div>"
		 }else if(courses[i].courseStatus==30){
			 table=table+"<div class='zhuangtai1'>已完成</div>"
		 }else if(courses[i].courseStatus==40){
		 table=table+"<div class='zhuangtai1'>已完成</div>"
	 }else if(courses[i].courseStatus==41){
		 table=table+"<div class='zhuangtai1'>已取消</div>"
	 }else if(courses[i].courseStatus==100){
		 table=table+"<div class='zhuangtai1'>已取消</div>"
	 }else if(courses[i].courseStatus==200){
		 table=table+"<div class='zhuangtai1'>已停售</div>"
	 }else if(courses[i].courseStatus==10){
		 table=table+"<div class='zhuangtai1'><span id='jinse'>进行中</span></div>"
	 }
		 table=table+"<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div><div class='caozuo1'><ul>"
//		 +"<li>申请退款</li><li>查看原因</li><li>删除课程</li>"
		 +"</ul></div></div>";
	 }    
	$("#grTable1").html(table);
}
function publish(courseId){
	$.ajax({
		url : getRootPath() + '/teacher/course/publish',
		type : 'POST',
		dataType : 'json',
		data:{
			'courseid':courseId,
		},
		success : function(data) {
			if(data.success==true){
				alert("发布成功");
			}
			

		},
	});	
	
}
function unpublish(courseId){
	$.ajax({
		url : getRootPath() + '/teacher/course/unpublish',
		type : 'POST',
		dataType : 'json',
		data:{
			'courseid':courseId,
		},
		success : function(data) {
			if(data.success==true){
				alert("已取消发布");
			}
		},
	});	
	
}
function changeType(flag){
	
	var courseName =$('#courseName').val();
	var courseTime =$('#courseTime').val();
	
	queryCourse(courseName,courseTime,flag);
	
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
 function searchCourse(){
	var courseName =$('#courseName').val();
	var courseTime =$('#courseTime').val();
	queryCourse(courseName,courseTime,0);
 }
 function toCourseDetail(courseId){
		location.href = getRootPath() + "/course/detail/" + courseId;
	}