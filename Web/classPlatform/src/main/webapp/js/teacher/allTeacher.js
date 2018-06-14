/**
 * search all teacher javascript source file
 */

var teacherCount = 0;
var keyWord = "";

$(function(){
	keyWord = $("#keyWord").val();
	ajaxGetAllTeacherCount();
});

function ajaxGetAllTeacherCount(){
	var url = getRootPath() + '/searchTeacher';
	$.ajax({
		url:url,
		type:'post',
		data:{'keyword':keyWord},
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

function ajaxGetAllTeacher(){
	var pageNum = Math.ceil(teacherCount/25);
	var pageSize = 0;

	if(pageNum <= 1){
		var url = getRootPath() + '/searchTeacher';
		var html = '';
		$.ajax({
			url:url,
			type:'post',
			data:{'keyword':keyWord},
			dataType:'json',
			success:function(data){
				if(data.status == 0){
					var jsonObj = data.result.list;
					if(jsonObj.length > 0){
						var html = '';
							$.each(jsonObj, function (i, item) {
								html += '<div class="teacher_intro">';
								if(item.largeHeadimge == null || item.largeHeadimge == "" || item.largeHeadimge.indexOf("null") > 0){
									html += '<div class="teacher_img"><img src="images/course/creatcourse.png" onclick="goToTeacherPage(\''+item.teacherUid+'\')"></div>';
								}else{
									html += '<div class="teacher_img"><img src="'+item.largeHeadimge+'" onclick="goToTeacherPage(\''+item.teacherUid+'\')"></div>';
								}
								html += '<div class="information">'
										+ '<div class="teacher_name">'+item.realName+'（'+item.nickName+'）<span><img src="../images/index/letter.png"></span></div>'
										+ '<div class="teacher_tech">专业度：0级 |  教龄：'+item.teachYears+'年</div>'
										+ '<div class="class_price"><span>￥<span>0元</span></span>起</div>'
										+ '</div>'
										+ '</div>';
							});
							$("#teacherList").html(html);
					}
				
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
		if(jsonObj.length > 0){
			var html = '';
				$.each(jsonObj, function (i, item) {
					html += '<div class="teacher_intro">';
					if(item.largeHeadimge == null || item.largeHeadimge == "" || item.largeHeadimge.indexOf("null") > 0){
						html += '<div class="teacher_img"><img src="images/course/creatcourse.png" onclick="goToTeacherPage(\''+item.teacherUid+'\')"></div>';
					}else{
						html += '<div class="teacher_img"><img src="'+item.largeHeadimge+'" onclick="goToTeacherPage(\''+item.teacherUid+'\')"></div>';
					}
					html += '<div class="information">'
							+ '<div class="teacher_name">'+item.realName+'（'+item.nickName+'）<span><img src="../images/index/letter.png"></span></div>'
							+ '<div class="teacher_tech">专业度：0级 |  教龄：'+item.teachYears+'年</div>'
							+ '<div class="class_price"><span>￥<span>0元</span></span>起</div>'
							+ '</div>'
							+ '</div>';
				});
				$("#teacherList").html(html);
		}
	
	}
}

function goToTeacherPage(userId){
	location.href = getRootPath() + '/infocenter/teacher/' + userId;
}