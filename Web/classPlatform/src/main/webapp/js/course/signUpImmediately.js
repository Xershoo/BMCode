/**
 * courses manage javascript source file
 */
var count;
var sign_datas;

$(function() {
	getAllCourses();
});

function goCourseDtl(courseId) {
	location.href = getRootPath() + "/course/detail/" + courseId;
}

function getAllCourses(page) {

	var url = getRootPath() + "/course/listCourses";
	$.ajax({
		url : url,
		dataType : 'json',
		async : false,
		// data:{"courseType":2,"courseName":searchVal,"pageNum":1},
		data : {
			"page" : 1
		},
		success : function(data) {
			count = data.result.total;
			sign_datas = data.result.list;
		}
	})
	var pageNum = Math.ceil(count / 10);
	var pageSize = 0;

	if (pageNum == 1) {
		var html = "";
		$.each(sign_datas, function(i, item) {
			html += '<div class="kecheng" onClick="goCourseDtl(' + item.courseid + ');"> ';
			html += '<div style="display:none;">' + item.courseid + '</div>';
			html += '<div class="k1">';
			if(item.coverUrl == null || item.coverUrl == ''){
				html += '<img alt="" title='+item.courseName+' src="../../images/c1-1index/tejia.png" class="c_img">';
			}else{
				html += '<img alt="" title='+item.courseName+' src='+item.coverUrl+' class="c_img">';
			}
			html += '<div class="k2">';
			html += '<li>' + item.courseName + '</li>';
			html += '<li>' + item.people + ' | ' + item.schoolId + '</li>';
			html += '<li>' + item.description + '</li>';
			html += '<li><span class="jg1">￥' + item.priceTotal
					+ '</span> <span class="jg2">￥' + item.priceTotal
					+ '</span></li>';
			html += '</div>';
			html += '</div>';
//			if ((i + 1) % 5 == 0) {
//			} else {
//				html += '<div class="hx"></div>';
//			}
			html += '</div>';
		})
		$(".s_h3").html(html);

	} else {
		if (pageNum > 1 && pageNum < 10) {
			pageSize = pageNum;
		} else {
			pageSize = 10;
		}
		$("#page").myPagination({
			currPage : 1,
			pageCount : pageNum,
			pageSize : pageSize,
			ajax : {
				on : true,
				callback : 'callBackCoursesData',
				url : url,
				dataType : "json",
				cache : false,
				param : {
					on : true,
					page : 1
				}
			}
		});
	}
}
function callBackCoursesData(data) {
	var data = eval("(" + data + ")");
	var sign_datas = data.result.list;
	var html = "";
	$.each(sign_datas, function(i, item) {
		html += '<div class="kecheng" onClick="goCourseDtl(' + item.courseid + ');"> ';
		html += '<div style="display:none;">' + item.courseid + '</div>'
		html += '<div class="k1">';
		if(item.coverUrl == null || item.coverUrl == ''){
			html += '<img alt="" title='+item.courseName+' src="../../images/c1-1index/tejia.png" class="c_img">';
		}else{
			html += '<img alt="" title='+item.courseName+' src='+item.coverUrl+' class="c_img">';
		}
		html += '</div>';
		html += '<div class="k2">';
		html += '<li>' + item.courseName + '</li>';
		html += '<li>' + item.people + ' | ' + item.schoolId + '</li>';
		html += '<li>' + item.description + '</li>';
		html += '<li><span class="jg1">￥' + item.priceTotal
				+ '</span> <span class="jg2">￥' + item.priceTotal
				+ '</span></li>';
		html += '</div>';
		html += '</div>';
//		if ((i + 1) % 5 == 0) {
//		} else {
//			html += '<div class="hx"></div>';
//		}
		html += '</div>';
	})
	$(".s_h3").html(html);
}