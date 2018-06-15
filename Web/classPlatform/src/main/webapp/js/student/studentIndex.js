var uid;

$(function() {
	uid = $("#uid").val();
	var realname = $("#realName").val();
	 var nickname = $("#nickName").val();
	 $("#directMsg").on("click", function() {
		 location.href=getRootPath() + "/message/message?type=5&uid="+uid+"&realname="+encodeURI(encodeURI(realname))+"&nickname="+encodeURI(encodeURI(nickname));
		 
	 }
	 )
		queryCourse();
		querylearnedCourse();
		
		
})
function queryCourse(){
	var url;
		 url=getRootPath() + '/infocenter/student/getLearningCourses';
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		async:false,
		data:{
            'page':1,'studentUid':uid
		},
		success : function(data) {
			var courses;
			courses=data.result
		if(courses.length!=0){
			var table="";
			 for(var i=0; i<courses.length; i++){
				 table=table+"<div class='kecheng' onclick='toCourseDetail("+courses[i].courseid+")'><div class='k1'><img src='"+courses[i].coverUrl+"' class='k1_img'></div>";
				 if(courses[i].courseName.length > 10){
					 table += "<div class='k2'><li ><span class='courseName' title="+courses[i].courseName+">"+courses[i].courseName.substring(0,5)+" ···</span></li><li>"+courses[i].teacherName;
				 }else{
					 table += "<div class='k2'><li ><span class='courseName' title="+courses[i].courseName+">"+courses[i].courseName+"</span></li><li>"+courses[i].teacherName;
				 }
				
				 if(courses[i].schoolName!=""){
					 table += " | "+courses[i].schoolName;
				 }
				 if(courses[i].categotyPath == null || courses[i].categotyPath == ''){
					 table=table+"</li><li>暂无课程分类</li>" ;
				 }else{
					 table=table+"</li><li>"+courses[i].categotyPath[1].name+" | "+courses[i].categotyPath[2].name+"</li>" ;
				 }
				 if(courses[i].priceTotal == null || courses[i].priceTotal == ''){
					 table +="<li><span class='jg1'>免费</span> </li>" ;	 
				 }else{
					 table +="<li><span class='jg1'>￥"+courses[i].priceTotal+"</span> </li>" ;
				 }
				 table += "</div></div>";
				 table += "<div class='hx'></div>";
			 }    
			$("#index_course_etail").html(table);
		}else{
			$("#index_course_etail").html("<div class='ziti30'>暂无相关课程~</div>");
		}
		},
	});	
		
}
function querylearnedCourse(){
	var url;
		 url=getRootPath() + '/infocenter/student/getLearnedCourses';
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		async:false,
		data:{
            'page':1,'studentUid':uid
		},
		success : function(data) {

		
			var courses;
			courses=data.result
			if(courses.length!=0){
			var table="";
			 for(var i=0; i<courses.length; i++){
				 table=table+"<div class='kecheng' onclick='toCourseDetail("+courses[i].courseid+")'><div class='k1'><img src='"+courses[i].coverUrl+"' class='k1_img'></div>"
				 +"<div class='k2'><li ><span class='courseName'>"+courses[i].courseName+"</span></li><li>"+isVerifyNull(courses[i].teacherName);
				 if(courses[i].schoolName!=""){
					 table=table+" | "+courses[i].schoolName;
				 }
				 if(courses[i].categotyPath == null || courses[i].categotyPath == ''){
					 table=table+"</li><li>暂无课程分类</li>" ;
				 }else{
					 table=table+"</li><li>"+courses[i].categotyPath[1].name+" | "+courses[i].categotyPath[2].name+"</li>" ;
				 }
				 if(courses[i].priceTotal == null || courses[i].priceTotal == ''){
					 table +="<li><span class='jg1'>免费</span> </li>" ;	 
				 }else{
					 table +="<li><span class='jg1'>￥"+courses[i].priceTotal+"</span> </li>" ;
				 }
				 table += "</div></div>";
				 table += "<div class='hx'></div>";
			 }    
			$("#index_course_etail_learned").html(table);
		}else{
			$("#index_course_etail_learned").html("<div class='ziti30'>暂无相关课程~</div>");
		}
		
		
		},
	});	
		
}
function isVerifyNull(data) {
	if (data == null || data == "") {
		return "无";
	} else {
		return data;
	}
}

function toCourseDetail(courseId){
	location.href = getRootPath() + "/course/detail/" + courseId;
}