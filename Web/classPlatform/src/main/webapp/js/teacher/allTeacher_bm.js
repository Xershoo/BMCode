/**
 * search all teacher javascript source file
 */

var teacherCount = 0;
var keyWord = "";

$(function(){
	ajaxGetAllTeacherCount();
});

function ajaxGetAllTeacherCount(){
	var url = getRootPath() + '/searchTeacher';
	$.ajax({
		url:url,
		type:'post',
		data:{'keyword':''},
		dataType:'json',
		async:false,
		success:function(data){
			if(data.status == 0){
				teacherCount = data.result.total;
				if(teacherCount != 0){
					ajaxGetAllTeacher();
				}
			}
		}
	});
}

function showTeacherPageList(jsonTeacherListObj) {
	if(jsonTeacherListObj.length <= 0){
		return;
	}
	
	var html = '';
	$.each(jsonTeacherListObj, function (i, item) {
		html += '<div><div class="photoKuang"><div class="photo"><img src="';
		if(item.largeHeadimge == null || item.largeHeadimge == "" || item.largeHeadimge.indexOf("null") > 0) {
			if(item.sex != 1) {
				html += '/images/teacher/female_teacher.png';
			} else {
				html += '/images/teacher/male_teacher.png';
			}
		}else {
			html += item.largeHeadimge;
		}
		
		html +='"/></div><div class="teaName">';
		html += item.realName + '老师</div>';
		
		html += '<div class="teaPerson" onclick="goToTeacherPage(\''+item.teacherUid+'\')">个人主页</div></div>';
		
	});
			
	$("#teacherList").html(html);
	
	var numPage = jsonTeacherListObj.length/12;
	if(numPage>5) {
		numPage = 5;
	}
	
	var  htmlPage = '<ul><div class="tolpageli"><</div><li class="tolpageli2"><div><span> 1 </span></div></li>';
	for(var i=1;i<=numPage;i++){
		htmlPage += '<li><div class=""><span> ' + i + ' </span></div></li>';
	}
	
	htmlPage += '<div class="tolpageli">></div></ul>';
	$("#tolpage").html(htmlPage);
}


function ajaxGetAllTeacher(){
	var pageNum = Math.ceil(teacherCount/12);
	var pageSize = 0;

	if(pageNum <= 1){
		var url = getRootPath() + '/searchTeacher';
		var html = '';
		$.ajax({
			url:url,
			type:'post',
			data:{'keyword':''},
			dataType:'json',
			success:function(data){
				if(data.status == 0){
					var jsonObj = data.result.list;
					showTeacherPageList(jsonObj);
				}
			}
		});
	}else{
		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		
	    $("#teacherPage").myPagination({
	    	currPage:1,
	    	pageCount:pageNum,
	    	pageSize:pageSize,
	    	ajax:{
	    		on: true,
	    		callback: 'callBackTeacherData',
	    		url:getRootPath()+'/searchTeacher',
	    		dataType: "json",
	    		cache:false,
	    		param:{on:true, page:1, start:1,rows:25,keyword:keyWord}
	    	}
	    });
	}
}

function callBackTeacherData(data){
	var result = data;
	
	if(result.status == 0){
		var jsonObj = result.result.list;
		showTeacherPageList(jsonObj);
	}
}

function goToTeacherPage(userId){
	location.href = getRootPath() + '/infocenter/teacher/' + userId;
}