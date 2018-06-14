var courseInCount = 0;
$(function() {
	
	$("#dialog1").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 600, // 窗口宽度
		height : 600,
	});
	var identity= $('#identity').val();
	
	queryCourse('','','',1,0);
	
	$(".title2").hover(function(){
//		$(this).css("background", "#e5e5e5");
		$('.title2 span').css("color", "#ffb933");
		$('#add').attr("src", "/images/manageCourse/addb_03.png");
		
	}, function(){
//		$(this).css("background", "#fff");
		$('.title2 span').css("color", "#FF9C00");
		$('#add').attr("src", "/images/manageCourse/add_03.png");
	});
	
	
	
})
function queryCourse(courseName,courseTime,creatorName,type,status){
	var data;
	var param;
	if(courseName==''&&courseTime==''&&creatorName==''){
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status
	            
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status}
	}else if(courseName!=''&&courseTime==''&&creatorName==''){
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status,
	            'courseName':courseName
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status, 'courseName':courseName}
	}else if(courseName==''&&courseTime!=''&&creatorName==''){
		
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status,
	            'startCreateTime':courseTime+" 00:00",
	            'endCreateTime':courseTime+" 23:59"
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status, 'startCreateTime':courseTime+" 00:00",'endCreateTime':courseTime+" 23:59"}
	}else if(courseName==''&&courseTime==''&&creatorName!=''){
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status,
	            'creatorName':creatorName,
	            
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status, 'creatorName':creatorName}
	}else if(courseName!=''&&courseTime!=''&&creatorName==''){
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status,
	            'courseName':courseName,
	            'startCreateTime':courseTime+" 00:00",
	            'endCreateTime':courseTime+" 23:59"
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status, 'courseName':courseName,'startCreateTime':courseTime+" 00:00",'endCreateTime':courseTime+" 23:59"}
	}else if(courseName!=''&&courseTime==''&&creatorName!=''){
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status,
	            'courseName':courseName,
	            'creatorName':creatorName
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status, 'courseName':courseName,'creatorName':creatorName}
	}else if(courseName==''&&courseTime!=''&&creatorName!=''){
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status,
	            'creatorName':creatorName,
	            'startCreateTime':courseTime+" 00:00",
	            'endCreateTime':courseTime+" 23:59"
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status, 'creatorName':creatorName,'startCreateTime':courseTime+" 00:00",'endCreateTime':courseTime+" 23:59"}
	}else if(courseName!=''&&courseTime!=''&&creatorName!=''){
		data={
				'courseType':type,
	            'page':1,
	            'courseStatus':status,
	            'creatorName':creatorName,
	            'courseName':courseName,
	            'startCreateTime':courseTime+" 00:00",
	            'endCreateTime':courseTime+" 23:59"
			};
		param={on:true, page:1, start:1,rows:10,'courseType':type, 'courseStatus':status, 'creatorName':creatorName,'courseName':courseName,'startCreateTime':courseTime+" 00:00",'endCreateTime':courseTime+" 23:59"}
	}
	var url;
		 url=getRootPath() + '/school/listCourses';
	
	
	$.ajax({
		url : url,
		type : 'post',
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
				if(type==1){
				
				$('#xn1').css("display", "block");
				$('#gr1').css("display", "none");
				$('#gk1').css("display", "none");
				$('#page').html('');
				var courses;
					courses=data.result.list;
				var table="";
				 for(var i=0; i<courses.length; i++){
					 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
					 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")' ></li>"
					 +"<li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>"
					 if(courses[i].courseName.length>12){
						 table=table+courses[i].courseName.substring(0, 12)+"...";
					 }else{
						 table=table+courses[i].courseName;
					 }
					 
					 table=table+"</li></div></div><div class='chuangkeren1'><li style='line-height: 140px;' title='"+courses[i].createName+"'>"
					 if(courses[i].createName.length>6){
						 table=table+courses[i].createName.substring(0, 6)+"...";
					 }else{
						 table=table+courses[i].createName;
					 }
					 table=table+"</li></div><div class='jiage1'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
					 +"<div class='renshu1'><span class='yibo'>"+courses[i].totalSchoolStudent+"</div><div class='renshu1'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
					 
					 if(courses[i].courseStatus==0){
						 table=table+"<div class='zhuangtai1'>未报名</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn1'><table class='xxx'><td>";
						 if(courses[i].displayType==1){
						 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
						 }else{
							 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>"; 
						 }
						 if(courses[i].createUid==userid){
							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
						 }else{
							 
						 }
						 table=table +"</td></table></div></div>"
					 }else if(courses[i].courseStatus==5){
						 table=table+"<div class='zhuangtai1'>报名中</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn1'><table class='xxx'><td>";
						 if(courses[i].displayType==1){
							 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
						 }else{
						 }
						 if(courses[i].createUid==userid){
							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
						 }else{
						 }
						 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
					 }else if(courses[i].courseStatus==6){
						 table=table+"<div class='zhuangtai1'>待上课</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn1'><table class='xxx'><td>"
						 if(courses[i].displayType==1){
							 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
						 }else{
							
						 }
						 if(courses[i].createUid==userid){
							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
						 }else{
							 
						 }
						 
						 table=table +"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
					 }else if(courses[i].courseStatus==7){
						 table=table+"<div class='zhuangtai1'>已取消</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn1'><table class='xxx'><td>"
						 if(courses[i].displayType==1){
							 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
						 }else{
							 table=table+"";
						 }
						 if(courses[i].createUid==userid){
							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
						 }else{
							
						 }
						 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
					 }else if(courses[i].courseStatus==30){
						 table=table+"<div class='zhuangtai1'>已完成</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn1'></div></div>"
					 }else if(courses[i].courseStatus==40){
					 table=table+"<div class='zhuangtai1'>已完成</div>";
					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
					 +"<div class='caozuo_xn1'></div></div>"
				 }else if(courses[i].courseStatus==41){
					 table=table+"<div class='zhuangtai1'>已取消</div>";
					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
					 +"<div class='caozuo_xn1'></div></div>"
				 }else if(courses[i].courseStatus==100){
					 table=table+"<div class='zhuangtai1'>已取消</div>";
					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
					 +"<div class='caozuo_xn1'></div></div>"
				 }else if(courses[i].courseStatus==200){
					 table=table+"<div class='zhuangtai1'>已停售</div>";
					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
					 +"<div class='caozuo_xn1'></div></div>"
				 }else if(courses[i].courseStatus==10){

					 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
					 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
					 +"<div class='caozuo_xn1'><table class='xxx'><td>"
					 
					 if(courses[i].createUid==userid){
						 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
					 }else{
						
					 }
					 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
				 
				 }
					 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
				 }    
				$("#xnTable1").html(table);
				 $(".caozuoli").hover(function(){
						$(this).css("background", "#e5e5e5");
					}, function(){
						$(this).css("background", "#fff");
					});
				}else if(type==3){
					$('#xn1').css("display", "none");
					$('#gr1').css("display", "block");
					$('#gk1').css("display", "none");
					$('#page').html('');
					var courses;
						courses=data.result.list
					var table="";
					 for(var i=0; i<courses.length; i++){
						 table=table+"<div class='liebiao1'><div class='jibenxinxi1'><div class='img11'>"
						 +"<li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")' ></li>"
						 +"<li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname'>"+courses[i].courseName+"</li></div></div>"
						 +"<div class='jiage1'><li style='line-height: 150px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
						 +"<div class='renshu1'><span class='yibo'>"+courses[i].nMaxStudents+"</div>"
//						 +"<div class='zhuangtai1'>"+courses[i].recordStatus+"</div>"
						 if(courses[i].courseStatus==0){
							 table=table+"<div class='zhuangtai1'>未报名</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='unpublish("+courses[i].courseid+")'>取消发布</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li>"
							 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
						 }else if(courses[i].courseStatus==5){
							 table=table+"<div class='zhuangtai1'>报名中</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li><li></li>"
							 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
						 }else if(courses[i].courseStatus==6){
							 table=table+"<div class='zhuangtai1'>报名结束</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li><li></li>"
							 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
						 }else if(courses[i].courseStatus==7){
							 table=table+"<div class='zhuangtai1'>被取消</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li><li></li>"
							 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
						 }else if(courses[i].courseStatus==30){
							 table=table+"<div class='zhuangtai1'>已完成</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
							 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
						 }else if(courses[i].courseStatus==40){
						 table=table+"<div class='zhuangtai1'>已结束</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
						 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
					 }else if(courses[i].courseStatus==41){
						 table=table+"<div class='zhuangtai1'>已取消</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
						 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
					 }else if(courses[i].courseStatus==100){
						 table=table+"<div class='zhuangtai1'>被冻结</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
						 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
					 }else if(courses[i].courseStatus==200){
						 table=table+"<div class='zhuangtai1'>已删除</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
						 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
					 }
						 
						 
					 }    
					$("#grTable1").html(table);
					
					
				}if(type==2){
					$('#gk1').css("display", "block");
					$('#xn1').css("display", "none");
					$('#gr1').css("display", "none");
					$('#page').html('');
					var courses;
						courses=data.result.list;
					var table="";
					 for(var i=0; i<courses.length; i++){
						 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
						 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")' ></li>"
						 +"<li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>"
						 if(courses[i].courseName.length>12){
							 table=table+courses[i].courseName.substring(0, 12)+"...";
						 }else{
							 table=table+courses[i].courseName;
						 }
						 
						 table=table+"</li></div></div><div class='chuangkeren1'><li style='line-height: 140px;' title='"+courses[i].createName+"'>"
						 if(courses[i].createName.length>6){
							 table=table+courses[i].createName.substring(0, 6)+"...";
						 }else{
							 table=table+courses[i].createName;
						 }
						 table=table+"</li></div><div class='jiage1'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
						 +"<div class='renshu1'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
						 
						 if(courses[i].courseStatus==0){
							 table=table+"<div class='zhuangtai1'>未报名</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
							 if(courses[i].displayType==1){
							 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
							 }else{
								 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>"; 
							 }
							 if(courses[i].createUid==userid){
								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
							 }else{
								 
							 }
							 table=table +"</td></table></div></div>"
						 }else if(courses[i].courseStatus==5){
							 table=table+"<div class='zhuangtai1'>报名中</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo_xn3'><table class='xxx3'><td>";
							 if(courses[i].displayType==1){
								 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
							 }else{
							 }
							 if(courses[i].createUid==userid){
								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
							 }else{
							 }
							 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
						 }else if(courses[i].courseStatus==6){
							 table=table+"<div class='zhuangtai1'>待上课</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
							 if(courses[i].displayType==1){
								 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
							 }else{
								
							 }
							 if(courses[i].createUid==userid){
								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
							 }else{
								 
							 }
							 
							 table=table +"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
						 }else if(courses[i].courseStatus==7){
							 table=table+"<div class='zhuangtai1'>已取消</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
							 if(courses[i].displayType==1){
								 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
							 }else{
								 table=table+"";
							 }
							 if(courses[i].createUid==userid){
								 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
							 }else{
								
							 }
							 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
						 }else if(courses[i].courseStatus==30){
							 table=table+"<div class='zhuangtai1'>已完成</div>";
							 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
							 +"<div class='caozuo_xn3'></div></div>"
						 }else if(courses[i].courseStatus==40){
						 table=table+"<div class='zhuangtai1'>已完成</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn3'></div></div>"
					 }else if(courses[i].courseStatus==41){
						 table=table+"<div class='zhuangtai1'>已取消</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn3'></div></div>"
					 }else if(courses[i].courseStatus==100){
						 table=table+"<div class='zhuangtai1'>已取消</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn3'></div></div>"
					 }else if(courses[i].courseStatus==200){
						 table=table+"<div class='zhuangtai1'>已停售</div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn3'></div></div>"
					 }else if(courses[i].courseStatus==10){

						 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
						 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
						 +"<div class='caozuo_xn3'><table class='xxx3'><td>"
						 
						 if(courses[i].createUid==userid){
							 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
						 }else{
							
						 }
						 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
					 
					 }
						 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
					 }    
					$("#gkTable1").html(table);
					
					}
				
				
			},
		});	
		
	}else{
		if(pageNum > 1 && pageNum < 10){
			pageSize = pageNum;
		}else{
			pageSize = 10;
		}
		
		if(type==2){
				$("#page").myPagination({
			    	currPage:1,
			    	pageCount:pageNum,
			    	pageSize:10,
			    	ajax:{
			    		on: true,
			    		callback: 'callBackMenu1Data',
			    		url:url,
			    		dataType: "json",
			    		cache:false,
			    		param:param
			    	}
			    });
			
		}else if(type==1){
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu3Data',
		    		url:url,
		    		dataType: "json",
		    		cache:false,
		    		param:param
		    	}
		    });	
		
		
	}else if(type==3){
				$("#page").myPagination({
			    	currPage:1,
			    	pageCount:pageNum,
			    	pageSize:pageSize,
			    	ajax:{
			    		on: true,
			    		callback: 'callBackMenu2Data',
			    		url:url,
			    		dataType: "json",
			    		cache:false,
			    		param:param
			    	}
			    });	
			
			
		}
		
		 
		
	}
}

function callBackMenu1Data(data){
	//公开课程
	$('#xn1').css("display", "none");
	$('#gk1').css("display", "block");
	$('#gr1').css("display", "none");
	var result = eval("("+data+")");
	var courses=result.result.list;
	var table="";
	 for(var i=0; i<courses.length; i++){
		 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
		 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")' ></li>"
		 +"<li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname'>"+courses[i].courseName+"</li></div></div><div class='chuangkeren1'><li style='line-height: 150px;'>"+courses[i].teacherName+"</li>"
		 +"</div><div class='jiage1'><li style='line-height: 150px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
		 +"<div class='renshu1'><span class='yibo'>"+courses[i].nMaxStudents+"</div>"
//		 +"<div class='zhuangtai1'>"+courses[i].recordStatus+"</div>"
		 if(courses[i].courseStatus==0){
			 table=table+"<div class='zhuangtai1'>未报名</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_gk1'><li></li>";
			 if(courses[i].displayType==1){
				 table=table+"<li onclick='publish("+courses[i].courseid+")'>发布课程</li>"
			 }else{
				 table=table+"<li onclick='unpublish("+courses[i].courseid+")'>取消发布</li>"
			 }
			 table=table+"<li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li></div></div>"
			 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
		 }else if(courses[i].courseStatus==5){
			 table=table+"<div class='zhuangtai1'>报名中</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_gk1'><li></li>";
			 if(courses[i].displayType==1){
				 table=table+"<li onclick='publish("+courses[i].courseid+")'>发布课程</li>";
			 }else{
				 table=table+"<li ></li>";
			 }
			 table=table+"<li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li></div></div>"
			 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
		 }else if(courses[i].courseStatus==6){
			 table=table+"<div class='zhuangtai1'>报名结束</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_gk1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li></div></div>"
			 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
		 }else if(courses[i].courseStatus==7){
			 table=table+"<div class='zhuangtai1'>被取消</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_gk1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li></div></div>"
			 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
		 }else if(courses[i].courseStatus==30){
			 table=table+"<div class='zhuangtai1'>已完成</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_gk1'><li></li><li></li><li></li><li></li><li></li><li></li></div></div>"
			 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
		 }else if(courses[i].courseStatus==40){
		 table=table+"<div class='zhuangtai1'>已结束</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo_gk1'><li></li><li></li><li></li><li></li><li></li><li></li></div></div>"
		 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
	 }else if(courses[i].courseStatus==41){
		 table=table+"<div class='zhuangtai1'>已取消</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo_gk1'><li></li><li></li><li></li><li></li><li></li><li></li></div></div>"
		 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
	 }else if(courses[i].courseStatus==100){
		 table=table+"<div class='zhuangtai1'>被冻结</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo_gk1'><li></li><li></li><li></li><li></li><li></li><li></li></div></div>"
		 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
	 }else if(courses[i].courseStatus==200){
		 table=table+"<div class='zhuangtai1'>已删除</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo_gk1'><li></li><li></li><li></li><li></li><li></li><li></li></div></div>"
		 +"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
	 }
		 
		 
	 }    
	$("#gkTable1").html(table);
}
function callBackMenu3Data(data){
	//校内课程
	$('#xn1').css("display", "block");
	$('#gr1').css("display", "none");
	$('#gk1').css("display", "none");
		var result = eval("("+data+")");

		var courses=result.result.list;
		var table="";
		
		 for(var i=0; i<courses.length; i++){
			 table=table+"<div class='liebiao1'><div class='liebiao11' style='float:none;'><div class='jibenxinxi1'><div class='time'></div>"
			 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")' ></li>"
			 +"<li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname' title='"+courses[i].courseName+"'>"
			 if(courses[i].courseName.length>12){
				 table=table+courses[i].courseName.substring(0, 12)+"...";
			 }else{
				 table=table+courses[i].courseName;
			 }
			 
			 table=table+"</li></div></div><div class='chuangkeren1'><li style='line-height: 140px;' title='"+courses[i].createName+"'>"
			 if(courses[i].createName.length>6){
				 table=table+courses[i].createName.substring(0, 6)+"...";
			 }else{
				 table=table+courses[i].createName;
			 }
			 table=table+"</li></div><div class='jiage1'><li style='line-height: 140px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
			 +"<div class='renshu1'><span class='yibo'>"+courses[i].totalSchoolStudent+"</div><div class='renshu1'><span class='yibo'>"+courses[i].totalSignupStudent+"</div>";
			 
			 if(courses[i].courseStatus==0){
				 table=table+"<div class='zhuangtai1'>未报名</div>";
				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
				 +"<div class='caozuo_xn1'><table class='xxx'><td>";
				 if(courses[i].displayType==1){
				 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
				 }else{
					 table=table+"<li class='caozuoli' onclick='unpublish("+courses[i].courseid+")'>取消发布</li>"; 
				 }
				 if(courses[i].createUid==userid){
					 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
				 }else{
					 
				 }
				 table=table +"</td></table></div></div>"
			 }else if(courses[i].courseStatus==5){
				 table=table+"<div class='zhuangtai1'>报名中</div>";
				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
				 +"<div class='caozuo_xn1'><table class='xxx'><td>";
				 if(courses[i].displayType==1){
					 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
				 }else{
				 }
				 if(courses[i].createUid==userid){
					 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
				 }else{
				 }
				 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
			 }else if(courses[i].courseStatus==6){
				 table=table+"<div class='zhuangtai1'>待上课</div>";
				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
				 +"<div class='caozuo_xn1'><table class='xxx'><td>"
				 if(courses[i].displayType==1){
					 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
				 }else{
					
				 }
				 if(courses[i].createUid==userid){
					 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
				 }else{
					 
				 }
				 
				 table=table +"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
			 }else if(courses[i].courseStatus==7){
				 table=table+"<div class='zhuangtai1'>已取消</div>";
				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
				 +"<div class='caozuo_xn1'><table class='xxx'><td>"
				 if(courses[i].displayType==1){
					 table=table+"<li class='caozuoli' onclick='publish("+courses[i].courseid+")'>发布课程</li>";
				 }else{
					 table=table+"<li ></li>";
				 }
				 if(courses[i].createUid==userid){
					 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
				 }else{
					
				 }
				 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
			 }else if(courses[i].courseStatus==30){
				 table=table+"<div class='zhuangtai1'>已完成</div>";
				 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
				 +"<div class='caozuo_xn1'></div></div>"
			 }else if(courses[i].courseStatus==40){
			 table=table+"<div class='zhuangtai1'>已完成</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_xn1'></div></div>"
		 }else if(courses[i].courseStatus==41){
			 table=table+"<div class='zhuangtai1'>已取消</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_xn1'></div></div>"
		 }else if(courses[i].courseStatus==100){
			 table=table+"<div class='zhuangtai1'>已取消</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_xn1'></div></div>"
		 }else if(courses[i].courseStatus==200){
			 table=table+"<div class='zhuangtai1'>已停售</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_xn1'></div></div>"
		 }else if(courses[i].courseStatus==10){

			 table=table+"<div class='zhuangtai1'><span id='jinse1'>进行中</span></div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo_xn1'><table class='xxx'><td>"
			 
			 if(courses[i].createUid==userid){
				 table=table +"<li class='caozuoli' onclick='update("+courses[i].courseid+")'>修改详情</li>"
			 }else{
				
			 }
			 table=table+"<li class='caozuoli' onclick='stop("+courses[i].courseid+")'>停售课程</li></td></table></div></div>"
		 
		 }
			 table=table+"	<div class='liebiao12' style='float:none;text-indent: 64em;'> 创建于"+courses[i].createTime+"</div>	</div>";
		 }    
		 $("#xnTable1").html(table);
		
		 $(".caozuoli").hover(function(){
				$(this).css("background", "#e5e5e5");
			}, function(){
				$(this).css("background", "#fff");
			});
	}
function callBackMenu2Data(data){
//个人公开课程
	$('#xn1').css("display", "none");
	$('#gr1').css("display", "block");
	$('#gk1').css("display", "none");
	var result = eval("("+data+")");

	var courses=result.result.list;
	var table="";
	 for(var i=0; i<courses.length; i++){
		 table=table+"<div class='liebiao1'><div class='jibenxinxi1'><div class='img11'>"
		 +"<li class='i2'><img id='u202_img' class='img' src='"+courses[i].coverUrl+"' onclick='toCourseDetail("+courses[i].courseid+")' ></li>"
		 +"<li style='height: 22px' onclick='toCourseDetail("+courses[i].courseid+")' class='cname'>"+courses[i].courseName+"</li></div></div>"
		 +"<div class='jiage1'><li style='line-height: 150px;'><span class='jinse'>￥"+courses[i].price_total+"</span></li></div>"
		 +"<div class='renshu1'><span class='yibo'>"+courses[i].nMaxStudents+"</div>"
//		 +"<div class='zhuangtai1'>"+courses[i].recordStatus+"</div>"
		 if(courses[i].courseStatus==0){
			 table=table+"<div class='zhuangtai1'>未报名</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='unpublish("+courses[i].courseid+")'>取消发布</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li>"
			 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
		 }else if(courses[i].courseStatus==5){
			 table=table+"<div class='zhuangtai1'>报名中</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li><li></li>"
			 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
		 }else if(courses[i].courseStatus==6){
			 table=table+"<div class='zhuangtai1'>报名结束</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li><li></li>"
			 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
		 }else if(courses[i].courseStatus==7){
			 table=table+"<div class='zhuangtai1'>被取消</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo1'><li></li><li onclick='publish("+courses[i].courseid+")'>发布课程</li><li onclick='update("+courses[i].courseid+")'>修改详情</li><li onclick='stop("+courses[i].courseid+")'>停售课程</li><li></li><li></li>"
			 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
		 }else if(courses[i].courseStatus==30){
			 table=table+"<div class='zhuangtai1'>已完成</div>";
			 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
			 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
			 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
		 }else if(courses[i].courseStatus==40){
		 table=table+"<div class='zhuangtai1'>已结束</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
		 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
	 }else if(courses[i].courseStatus==41){
		 table=table+"<div class='zhuangtai1'>已取消</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
		 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
	 }else if(courses[i].courseStatus==100){
		 table=table+"<div class='zhuangtai1'>被冻结</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
		 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
	 }else if(courses[i].courseStatus==200){
		 table=table+"<div class='zhuangtai1'>已删除</div>";
		 table=table+ "<div class='jindu1'><span class='yishang'>"+courses[i].classHadFinished+"</span>/"+courses[i].classTotal+"</div>"
		 +"<div class='caozuo1'><li></li><li></li><li></li><li></li><li></li><li></li>"
		 +"<li style='margin-top:25px;' class='caozuo1_li'>创建于"+courses[i].createTime+"</li></div></div>";
	 }
		 
		 
	 }    
	$("#grTable1").html(table);
	
	
}
function changeType2() {
	$('#xn1').css("display", "none");
	$('#xn2').css("display", "block");
	$('#xn3').css("display", "none");
}
function changeType1() {
	$('#xn1').css("display", "block");
	$('#xn2').css("display", "none");
	$('#xn3').css("display", "none");
}
function changeType3() {
	$('#xn1').css("display", "none");
	$('#xn2').css("display", "none");
	$('#xn3').css("display", "block");

}
function publish(courseId){
	$.ajax({
		url : getRootPath() + '/school/course/publishOrUnpublish',
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
				getDialog("fail", data.msg);
			
			}
			
			

		},
	});	
	
}
function unpublish(courseId){
	$.ajax({
		url : getRootPath() + '/school/course/publishOrUnpublish',
		type : 'POST',
		dataType : 'json',
		data:{
			'courseid':courseId,
		},
		success : function(data) {
			if(data.success==true){
//				alert("已取消发布");
				getDialogCue('success', "已取消发布")
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
		queryCourse('','','',1,0);
	}else if(flag==2){
		$('#xn_title').removeClass('xn_title1');
		$('#gk_title').addClass('gk_title1');
		$('#gr_title').removeClass('gr_title1');
		$('#xn_status').css('display','none');
		$('#xx_status').css('display','block');
		$('#gr_status').css('display','none');
		$('#courseType').val('2');
		$('#creator').css("display", "block");
		queryCourse('','','',2,0);
	}else if(flag==3){
		$('#xn_title').removeClass('xn_title1');
		$('#gk_title').removeClass('gk_title1');
		$('#gr_title').addClass('gr_title1');
		$('#xn_status').css('display','none');
		$('#xx_status').css('display','none');
		$('#gr_status').css('display','block');
		$('#creator').css("display", "none");
		$('#courseType').val('3');
		queryCourse('','','',3,0);
	}
	
}
 function changeIdentity1(){
	var identity= $('#identity').val();
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
	
					 window.location.href= getRootPath() + '/school/course/create';
					
			
	}
 function stop(courseId){
//	 暂时注释掉，不需要钱
//	 $.ajax({
//			url : getRootPath() + '/teacher/course/tostopcourse',
//			type : 'POST',
//			dataType : 'json',
//			data:{
//				'courseid':courseId,
//			},
//			success : function(data) {
//				
//				$('#weiyuejin').text(data.stoptopayfee);
//				$('#courseId ').val(courseId);
//				if(data.stoptopayfee>data.account){
//					$('#chongzhi_stop').css('display','block');
//					$('#stop_flag').val('1');
//					
//				}else{
//					$('#chongzhi_stop').css('display','none');
//					$('#stop_flag').val('0');
//				}
//			},
//		});	
	 $('#courseId ').val(courseId);
	 $("#dialog1").dialog("open");
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
			 }else{
				 alert(data.message);
			 }
			
		 },
	 });	
 }
 function stopCourse1(){
	 var courseId=$('#courseId').val();
//	 var paypwd=$('#password').val();
	 var stopreason=$('#reason1').val();
	 var strReason=$('#reason_description1').val();
//	 var stop_flag=$('#stop_flag').val();
	 
//	 if(paypwd==''){
//		 alert("支付密码不能为空");
//		 return false;
//	 }
	 if(stopreason==0){
		 alert("请选择停售原因");
		 return false;
	 }
//	 if(stop_flag==1){
//		 alert("余额不足，请充值 ！");
//		 return false;
//	 }
	 $.ajax({
		 url : getRootPath() + '/school/course/stopcourse',
		 type : 'POST',
		 dataType : 'json',
		 data:{
			 'courseid':courseId,
			 'paypwd':"0",
			 'stopreason':stopreason,
			 'strReason':strReason,
//			 'stoptopayfee':0,
//			 'stopcourseid':courseId
			 
			 
		 },
		 success : function(data) {
			 if(data.success==true){
//				 alert('退课成功');
				 getDialogCue("success", "退课成功");
				 location.reload();
			 }else{
//				 alert(data.message);
				 getDialog("fail", data.message);
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
function update(courseId){
	location.href = getRootPath() + '/school/course/update/'+courseId;
	
}