/**
 * courses manage javascript source file
 */

var evaScore;
$(function(){
	
//	getCourseDetails();
	getOtherCourses();
	getCourseStudent();
	getCourseInfos();
	getTeacherCoursesScore();
	$("#course_info").addClass("course_color");
	$(".c_change_a").css("color","#333333");
	$("#unpay").on("mouseover",function(){
		$(this).css("background-color","#58cb72").css("cursor","pointer");
	}).on("mouseout",function(){
		$(this).css("background-color","#5abd72");
	});
	$("#pubEvaluate").on("mouseover",function(){
		$(this).css("background-color","#41B2FE");
	}).on("mouseout",function(){
		$(this).css("background-color","#3498db");
	});
	
	$("#c_apply").on("mouseover",function(){
		$(this).css("background-color","#58cb72").css("cursor","pointer");
	}).on("mouseout",function(){
		$(this).css("background-color","#5abd72");
	});
	$("#c_go_class").on("mouseover",function(){
		$(this).css("background-color","#6ecff5").css("cursor","pointer");;
	}).on("mouseout",function(){
		$(this).css("background-color","#1ab9f3");
	});
	
	$("#goLogin").on("click",function(){
		getDialog("warn", "请先登录");
//		setTimeout('location.href = getRootPath() + "/index"',3000) ;
//		location.href = getRootPath() + "/index";
	})
	$("#c_apply").on("click",function(){
		var courseId = $("#courseId").val();
		var url = getRootPath() + "/student/toPayCourse/" + courseId;
		location.href = url;
	})
	$("#course_info").on("click",function(){
		getCourseInfos();
	})
	$("#course_catalog").on("click",function(){
		getCourseDirectory();
	})
	$("#course_evaluation").on("click",function(){
		getCourseComment();
	})
	$("#course_data").on("click",function(){
		getCourseFiles();
	})
	$("#c_applied").on("click",function(){
		location.href = getRootPath() + "/index";;
	})
	
	$(".spreadBtn").live("click",function(){
        if($(".sp_info").html()=="展开历史课节"){
            $(".sp_info").html("收起历史课节");
            $(this).find("img").attr("src","../../images/course/pack_up.png");
            $(".haveclass").css("display","block");
//            var hei = $(".detailMainC").height();
//            hei=hei-40;
//            $(".positionWrap").css("height",hei+"px");
        }else{
            $(".sp_info").html("展开历史课节");
            $(this).find("img").attr("src","../../images/course/sp_btn.png");
                $(".haveclass").css("display","none");
//                var hei = $(".detailMainC").height();
//                hei=hei-40;
//                $(".positionWrap").css("height",hei+"px");
        }
        
    })
    
    var courseName = $("#courseName").val();
	if(courseName.length > 45){
		$(".c_top_right h1").html(courseName.substring(0,44)+" ···");
	}else{
		$(".c_top_right h1").html(courseName);
	}
	
	
	rat('star1','result1',10);
	rat('star2','result2',1);
	function rat(star,result,m){

		star= '#' + star;
		result= '#' + result;
		$(result).hide();//将结果DIV隐藏

		$(star).raty({
			hints: ['很不满意','不满意', '一般', '满意', '非常满意','60', '70', '80', '90', '100'],
			path: "../../images/course/",
			starOff: 'star-off-big.png',
			starOn: 'star-on-big.png',
			size: 24,
			start: 40,
			showHalf: true,
			target: result,
			targetKeep : true,//targetKeep 属性设置为true，用户的选择值才会被保持在目标DIV中，否则只是鼠标悬停时有值，而鼠标离开后这个值就会消失
			click: function (score, evt) {
				//第一种方式：直接取值
//				alert('你的评分是'+score*m+'分');
				evaScore = score*m;
				if(evaScore == 1){
					$(".eva-prompt").eq(0).html("很不满意");
				}else if(evaScore == 2){
					$(".eva-prompt").eq(0).html("不满意");
				}else if(evaScore == 3){
					$(".eva-prompt").eq(0).html("一般");
				}else if(evaScore == 4){
					$(".eva-prompt").eq(0).html("满意");
				}else if(evaScore == 5){
					$(".eva-prompt").eq(0).html("非常满意");
				}
				
			}
		});

		/*第二种方式可以设置一个隐蔽的HTML元素来保存用户的选择值，然后可以在脚本里面通过jQuery选中这个元素来处理该值。 弹出结果
		var text = $(result).text();
		$('img').click(function () {
			if ($(result).text() != text) {
				alert('你的评分是'+$(result).text()/m+'分');
				alert(result);
				return;
			}
		});*/
	}
	
	$("#pubEvaluate").on("click",function(){
		var courseId = $("#courseId").val();
		var evaArea = $.trim($("#eva-area").val());
		addCourseEvaluation(courseId,evaArea);
	})
	
});
/*		go to class			*/
function actix() {
	$.ajax({
		url : getRootPath() + "/gettoken",// 后端需要给的接口
		type : "post",
		dataType : "json",
		success : function(result) {
			if(result.status == 0){
				var courseid = $("#courseId").val();
				var classid = $("#canEnterClassid").val();
				window.location.href = "DLMusic:///uid=" + result.uid + "&token="+ result.token + "&classid=" + classid + "&courseid="+ courseid + "&acc=" + result.username;
			}else if(result.status == -1){
				alert("请先登录");
				location.href = getRootPath() + "/index";
			}
		}
	});

}

function addCourseEvaluation(courseId,evaArea){
	if(evaScore == undefined){
		$(".eva-prompt").eq(0).html("*评价星级不能为空╮(╯▽╰)╭");
		$(".eva-prompt").show();
		return false;
	}
	if(evaArea == '' || evaArea == null){
		$(".data-prompt").eq(0).html("*评价内容不能为空╮(╯▽╰)╭");
		$(".data-prompt").show();
		return false;
	}
	var url = getRootPath() + "/course/addCourseComment";
	$.ajax({
		url : url,
		type : 'post',
		data : {
			"courseid" : courseId,
			"score" : evaScore,
			"content":evaArea
		},
		dataType : 'json',
		success : function(data) {
			if (data.status >= 0) {
				getDialogCue("success", "您已成功评价该课程");
				setTimeout('location.reload()',3000) ;
			} else if (data.status == -1) {
				getDialog("warn", "请先登录");
				setTimeout('location.href = getRootPath() + "/index"',3000) ;
			} else if(data.status == -2){
				getDialog("fail", "您已经评价过该课程，不能重复评价");
				setTimeout('location.reload()',3000) ;
			}else {
				getDialog("fail", "添加课程评价失败，请重试");
				setTimeout('location.reload()',3000) ;
			}
		}
	});
}

function getCourseDetails(){
	var url = getRootPath() + "/course/getCourseDetail";
	var courseId = $("#courseId").val();
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		async:false,
		data:{"courseid":courseId},
		success:function(data){
			if(data.success == true){
				var courseDetail = data.result;
				var html = '';
//				html += '<div class="c_top">';
				html += '<div class="c_top_left"><img src='+courseDetail.coverUrl+' alt="" width="500px" height="350px"></div>';
				html += '<div class="c_top_right">';
				html += '<h1>'+courseDetail.courseName+'</h1>';
				html += '<div class="c_top_price"><font color="red">￥'+courseDetail.price+'&nbsp;&nbsp;&nbsp;</font>￥'+courseDetail.price+'</div>';
				html += '<div class="c_coupons">';
				html += '<img src="../../images/c3-1-3createcourse/get_coupons.png" class="c_cp">';
				html += '<a class="get_coupons">领取优惠券</a>';
				html += '</div>';
				html += '<img alt="" src="../../images/c3-1-3createcourse/under_line.png" width="700px" class="c_under">';
				html += '<div class="c_top_tab">';
				html += '<table class="c_tab_dtl">';
				html += '<tr>';
				html += '<th>课程分类：</th>';
				html += '<td>';
				html += '艺术  |  唱歌';
				html += '</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<th>课程时间：</th>';
				html += '<td>';
				html += ' '+courseDetail.signupStartTime+' ~ '+courseDetail.signupEndTime+' ';
				html += '</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<th>课节总数：</th>';
				html += '<td>';
				html += '共<font color="#5dcb77">'+courseDetail.classTotal+'</font>节';	
				html += '</td>';		
				html += '</tr>';	
				html += '<tr>';
				html += '<th>所属学校：</th>';
				html += '<td>';
				html += ''+courseDetail.schoolName+'';
				html += '</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<th>适合人群：</th>';
				html += '<td>';
				html += ''+courseDetail.people+'';
				html += '</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<th>报名人数：</th>';
				html += '<td>';
				html += '<font color="#5dcb77">100</font>/'+courseDetail.studentTotal+'';
				html += '</td>';
				html += '</tr>';		
				html += '<tr>';	
				html += '<td colspan="2">';
				html += '<div class="c_btn">';
				html += '<input type="button" name="" id="c_apply" value="立即报名" class="c_apply">';	
				html += '<input type="button" name="" id="c_end" value="报名结束" class="c_end">';	
				html += '<input type="button" name="" id="c_applyed" value="已报名" class="c_end">';					
				html += '<input type="button" name="" id="c_go_class" value="进入课堂" class="c_go_class">';	
				html += '</div>';
				html += '</td>';
				html += '</tr>';	
				html += '</table>';		
				html += '</div>';			
				html += '</div>';
				html += '</div>';
				html += '<!-- end -->';
				html += '<!-- middle -->';
				html += '<div class="c_middle_left">';
				html += '<div class="c_middle_tab">';
				html += '<div id="course_info" class="course_info">课程简介</div>';
				html += '<div id="course_catalog" class="course_catalog">课程目录</div>';
				html += '<div id="course_evaluation" class="course_evaluation">课程评价(条数)</div>';
				html += '<div id="course_data" class="course_data">课件资料</div>';
				html += '</div>';
				html += '<img alt="" src="../../images/c3-1-3createcourse/under_line.png" width="900px">';
				html += '<div class="course_content">';
				html += '<table class="c_content_tab">';
				html += '<tr>';			
				html += '<th>课程目标：</th>';
				html += '<td>'+courseDetail.target+'</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<th>适合人群：</th>';
				html += '<td>'+courseDetail.people+'</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<th>课程简介：</th>';
				html += '<td>'+courseDetail.description+'</td>';
				html += '</tr>';
				html += '</table>';
				html += '</div>';
//				html += '</div>';
				
				$(".c_top").append(html);
			}
		}
	});
	$("#c_apply").on("mouseover",function(){
		$(this).css("background-color","#58cb72").css("cursor","pointer");
	}).on("mouseout",function(){
		$(this).css("background-color","#5abd72");
	});
	$("#c_go_class").on("mouseover",function(){
		$(this).css("background-color","#6ecff5").css("cursor","pointer");;
	}).on("mouseout",function(){
		$(this).css("background-color","#1ab9f3");
	});
}
/*		报名学生				*/
function getCourseStudent() {
	var url = getRootPath() + "/course/getSignedStudent";
	var courseId = $("#courseId").val();
	var result;
	var students;
	var count;
	$.ajax({
		url : url,
		type : 'get',
		dataType : 'json',
		async : false,
		data : {"courseid" : courseId},
		success : function(data) {
			if (data.success == true) {
				result = data.result;
				count = result.total;
			    students = result.students;
				
			}
		}
	})
	
	var pageNum = Math.ceil(count / 12);
	var pageSize = 0;

	if (pageNum <= 1) {
		var html = '';
		html += '<p class="c_applyed">已报名的学生('+result.total+'人)</p>';
		html += '<table class="st_tab">';
		html += '';
		$.each(students, function(i, item) {
			if (i % 3 == 0) {
				html += '<tr>';
			}
			html += '<td>';
			if(item.avatarUrl == null || item.avatarUrl == ''){
				if(item.sex == 1){
					html += '<img alt="" src="../../images/course/boy_student.png" width="50px" height="50px" style="border-radius:95px;">';
				}else{
					html += '<img alt="" src="../../images/course/girl_student.png" width="50px" height="50px" style="border-radius:95px;">';
				}
			}else{
				html += '<img alt="" src=' + item.avatarUrl + ' width="50px" height="50px" style="border-radius:95px;">';
			}
			
			html += '<p>'+ isVerifyNull(item.realName) + '</p></td>';
			if ((i + 1) % 3 == 0 || (i + 1) == students.length) {
				html += '</tr>';
			}
		})
		html += '</table>';
		$(".c_bottom").html(html);
	} else {
		if (pageNum > 1 && pageNum < 5) {
			pageSize = pageNum;
		} else {
			pageSize = 5;
		}
		$("#page").myPagination({
			currPage : 1,
			pageCount : pageNum,
			pageSize : pageSize,
			ajax : {
				on : true,
				callback : 'callBackSignedData',
				url : url,
				dataType : "json",
				cache : false,
				param : {
					on : true,page : 1,pageSize:12,courseid:courseId}
			}
		});
	}
}
function callBackSignedData(data) {
	var data = eval("(" + data + ")");
	var count = data.result.total;
	var students = data.result.students;
	var html = '';
	html += '<p class="c_applyed">已报名的学生('+count+'人)</p>';
	html += '<table class="st_tab">';
	html += '';
	$.each(students, function(i, item) {
		if (i % 3 == 0) {
			html += '<tr>';
		}
		html += '<td>';
		if(item.avatarUrl == null || item.avatarUrl == ''){
			if(item.sex == 1){
				html += '<img alt="" src="../../images/course/boy_student.png" width="50px" height="50px" style="border-radius:95px;">';
			}else{
				html += '<img alt="" src="../../images/course/girl_student.png" width="50px" height="50px" style="border-radius:95px;">';
			}
		}else{
			html += '<img alt="" src=' + item.avatarUrl + ' width="50px" height="50px" style="border-radius:95px;">';
		}
		html += '<p>'+ isVerifyNull(item.realName) + '</p></td>';
		if ((i + 1) % 3 == 0 || (i + 1) == students.length) {
			html += '</tr>';
		}
	})
	html += '</table>';
	$(".c_bottom").html(html);
}

/*		报名学生				*/
/*		课程简介				*/
function getCourseInfos() {
//	$("#course_info").css("color","#51a4f6");
//	$("#course_catalog").css("color","#546d7e");
//	$("#course_evaluation").css("color","#546d7e");
//	$("#course_data").css("color","#546d7e");
	$("#course_info").addClass("course_color");
	$("#course_catalog").removeClass("course_color");
	$("#course_evaluation").removeClass("course_color");
	$("#course_data").removeClass("course_color");
	$(".c_middle_left .course_content").remove();
	$("#evaluate").hide();
	$("#ccPage").css("display","none");
	$(".course_catalog").css("border-bottom", "0px");
	$(".course_data").css("border-bottom", "0px");
	$(".course_evaluation").css("border-bottom", "0px");
	$(".course_info").css("border-bottom", "3px solid #51a4f6");
	var url = getRootPath() + "/course/getCourseDetail";
	var courseId = $("#courseId").val();
	$
			.ajax({
				url : url,
				type : 'post',
				dataType : 'json',
				async : false,
				data : {
					"courseid" : courseId
				},
				success : function(data) {
					if (data.success == true) {
						var courseDetail = data.result;
						var html = '';
						html += '<div class="course_content">';
						html += '<h2 class="c_target_h2"><img src="../../images/account/tips.png" class="c_t_tip">课程目标：</h2>';
						html += '<div class="c_target">';
						html += '' + courseDetail.target + '';
						html += '</div>';
						html += '<h2 class="c_target_h2"> <img src="../../images/account/tips.png" class="c_t_tip">适合人群：</h2>';
						html += '<div class="c_target">';
						html += '' + courseDetail.people + '';
						html += '</div>';
						html += '<h2 class="c_target_h2"><img src="../../images/account/tips.png" class="c_t_tip">课程简介：</h2>';
						html += '<div class="c_target c_intro">';
						html += '' + courseDetail.description + '';
						html += '</div>';
						html += '</div>';

						$(".c_middle_left").append(html);
					}
				}
			})
}
/*		课程简介				*/

/*		课程目录				*/
function getCourseDirectory(){
	
//	$("#course_info").css("color","#546d7e");
//	$("#course_catalog").css("color","#51a4f6");
//	$("#course_evaluation").css("color","#546d7e");
//	$("#course_data").css("color","#546d7e");
	$("#course_info").removeClass("course_color");
	$("#course_catalog").addClass("course_color");
	$("#course_evaluation").removeClass("course_color");
	$("#course_data").removeClass("course_color");
	$(".c_middle_left .course_content").remove();
	$("#evaluate").hide();
	$("#ccPage").css("display","none");
	$(".course_info").css("border-bottom","0px");
	$(".course_data").css("border-bottom","0px");
	$(".course_evaluation").css("border-bottom","0px");
	$(".course_catalog").css("border-bottom","3px solid #51a4f6");
	
	var url = getRootPath() + "/course/getCourseClass";
		var courseId = $("#courseId").val();
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			async:false,
			data:{"courseid":courseId},
			success:function(data){
				if(data.success ==true){
					var course = data.result;
					var html = '';
					html += '<div class="course_content">';
					html += '<div class="detailMain">';
					html += '<div class="cur detailMainC">';
					html += '<img src="../../images/course/spread.png" class="spread">';
					html += '<p class="spreadBtn"><img src="../../images/course/sp_btn.png" width="21px" height="21px" class="sp_btn"><span class="sp_info">展开历史课节</span></p>';
					html += '<div class="left_line"></div>';
						
					$.each(course,function(i, item){
						html += '<div class="e_class_info">';
						html += '<img src="../../images/course/classing.png" class="r_class">';
						html += '<span class="n_class">第'+(i+1)+'节</span>';
						if(item.className.length > 16){
							html += '<span class="c_name" title="'+item.className+'">'+item.className.substring(0,15)+' ···</span>';
						}else{
							html += '<span class="c_name" title="'+item.className+'">'+item.className+'</span>';
						}
						html += '<span class="c_time">'+item.startTimePlan+' ~ '+item.endTimePlan+'</span>';
//						html += '<p class="c_status">正在上课</p>';
						if(item.classState == 15){
//							html += '<p class="c_not_bn">未开始</p>';
						}else if(item.classState == 16){
							html += '<p class="c_status">正在上课</p>';
						}else if(item.classState == 17){
							html += '<p class="c_over">已下课</p>';
						}else if(item.classState == 20){
							$(".e_class_info").eq(i).addClass("haveclass");
							$(".e_class_info").eq(i).css("display","none");
						}
						html += '</div>';
//						$(".spreadBtn").on("click",function(){
//							if($(".e_class_info").hasClass("haveclass")){
//								$(this).css("display","block");
//							}
//                            $(this).html("收起历史课节");
//                            $(this).css("background","url(../../images/spreadBtn2.png) no-repeat 32px 9px")
//                        })
					})
					html += '</div>';
					html += '</div>';
					html += '</div>';
					$(".c_middle_left").append(html);
				}
			}
		})
}
/*			课程评价				*/
function getCourseComment() {
//	$("#course_info").css("color","#546d7e");
//	$("#course_catalog").css("color","#546d7e");
//	$("#course_evaluation").css("color","#51a4f6");
//	$("#course_data").css("color","#546d7e");
	$("#course_info").removeClass("course_color");
	$("#course_catalog").removeClass("course_color");
	$("#course_evaluation").addClass("course_color");
	$("#course_data").removeClass("course_color");
	$(this).siblings().removeClass("course_color");
	$(this).addClass("course_color");
	$("#evaluate").show();
	$(".c_middle_left .course_content").remove();
	$(".course_info").css("border-bottom", "0px");
	$(".course_data").css("border-bottom", "0px");
	$(".course_catalog").css("border-bottom", "0px");
	$(".course_evaluation").css("border-bottom", "3px solid #51a4f6");
	var url = getRootPath() + "/course/getCourseComment";
	var avgScore = $("#avgScore").val();
	var courseId = $("#courseId").val();
	var result;
	var comment;
	var count;
	$.ajax({
				url : url,
				dataType : 'json',
				async : false,
				data : {
					"page" : 1,"pageSize": 10, "courseid" : courseId
				},
				success : function(data) {
					if (data.status == 0) {
						result = data.result;
						count = result.total;
						comment = result.list;
					}
				}
			})
	var pageNum = Math.ceil(count / 10);
	var pageSize = 0;
	if (pageNum <= 1) {
		var html = '';
		html += '<div class="course_content">';
		html += '<div class="ct_score">';
		html += '<h2>本课程的综合评分<font color="#ffa800" style="font-size:18px;">'
				+ avgScore + '</font>分</h2>';
		html += '</div>';
		$.each(comment,function(i, item) {
//							html += '<img alt="" src="../../images/c3-1-3createcourse/under_line.png" width="800px" style="margin-left:50px;">';
							html += '<div class="ct_content">';
							html += '<div class="st_bkimg">';
							html += '<img src='
									+ item.avatarUrl
									+ ' alt="" width="90px" height="90px" style="border-radius:90px;">';
							html += '</div>';
							html += '<div class="ct_detail">';
							html += '<h2>学生' + item.nickName
									+ '说：</h2>';
							html += '<span class="st_time">'
									+ item.createTime
									+ '</span>';
							html += '</div>';
							html += '<div class="sr_score">';
							if (item.score == 5) {
								html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"></p>';
							} else if (item.score == 4) {
								html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
							} else if (item.score == 3) {
								html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
							} else if (item.score == 2) {
								html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
							} else if (item.score == 1) {
								html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
							} else if(item.score == 0){
								html += '<p><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
							}else {
								html += '<p><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
							}
							html += '<p>' + item.content
									+ '</p>';
							html += '</div>';
							html += '</div>';
						})
		html += '</div>';
		$(".c_middle_left").append(html);
	} else {
		$("#ccPage").css("display","block");
		if (pageNum > 1 && pageNum < 10) {
			pageSize = pageNum;
		} else {
			pageSize = 10;
		}
		$("#ccPage").myPagination({
			currPage : 1,
			pageCount : pageNum,
			pageSize : pageSize,
			ajax : {
				on : true,
				callback : 'callBackCourseCommentData',
				url : url,
				dataType : "json",
				cache : false,
				param : {
					on : true,page : 1,pageSize:10,courseid:courseId}
			}
		});
	}
}

function callBackCourseCommentData(data) {
	var data = eval("(" + data + ")");
	var avgScore = $("#avgScore").val();
	var comment = data.result.list;
	$(this).siblings().removeClass("course_color");
	$(this).addClass("course_color");
	$(".c_middle_left .course_content").remove();
	$("#ccPage").css("display","block");
	var html = '';
	html += '<div class="course_content">';
	html += '<div class="ct_score">';
	html += '<h2>本课程的综合评分<font color="#ffa800" style="font-size:18px;">'
			+ avgScore + '</font>分</h2>';
	html += '</div>';
	$.each(comment,function(i, item) {
//						html += '<img alt="" src="../../images/c3-1-3createcourse/under_line.png" width="800px" style="margin-left:50px;">';
						html += '<div class="ct_content">';
						html += '<div class="st_bkimg">';
						html += '<img src='
								+ item.avatarUrl
								+ ' alt="" width="90px" height="90px" style="border-radius:90px;">';
						html += '</div>';
						html += '<div class="ct_detail">';
						html += '<h2>学生' + item.nickName
								+ '说：</h2>';
						html += '<span class="st_time">'
								+ item.createTime
								+ '</span>';
						html += '</div>';
						html += '<div class="sr_score">';
						if (item.score == 5) {
							html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"></p>';
						} else if (item.score == 4) {
							html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
						} else if (item.score == 3) {
							html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
						} else if (item.score == 2) {
							html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
						} else if (item.score == 1) {
							html += '<p><img alt="" src="../../images/course/y_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
						} else if(item.score == 0){
							html += '<p><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
						}else {
							html += '<p><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"><img alt="" src="../../images/course/y_e_star.png"></p>';
						}
						html += '<p>' + item.content
								+ '</p>';
						html += '</div>';
						html += '</div>';
					})
	html += '</div>';
	$(".c_middle_left").append(html);

	
}

/*			课件资料				*/
function getCourseFiles(){
//	$("#course_info").css("color","#546d7e");
//	$("#course_catalog").css("color","#546d7e");
//	$("#course_evaluation").css("color","#546d7e");
	$("#course_info").removeClass("course_color");
	$("#course_catalog").removeClass("course_color");
	$("#course_evaluation").removeClass("course_color");
	$("#course_data").addClass("course_color");
	$(".c_middle_left .course_content").remove();
	$("#evaluate").hide();
	$("#ccPage").css("display","none");
	$(".course_info").css("border-bottom","0px");
	$(".course_evaluation").css("border-bottom","0px");
	$(".course_catalog").css("border-bottom","0px");
	$(".course_data").css("border-bottom","3px solid #51a4f6");
	var url = getRootPath() + "/course/getCourseFile";
	var courseId = $("#courseId").val();
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		async:false,
		data:{"courseid":courseId},
		success:function(data){
			if(data.success ==true){
				var files = data.result;
				var html = '';
				html += '<div class="course_content">';
				$.each(files,function(i, item){
					var fileName = item.filename;
					if(i%3 == 0){
						html += '<tr>';
					}
					if(fileName.length > 12){
						fileName = fileName.substr(0,12) + "...";
					}
					html += '<div class="cor_file">';
					html += '<div class="cor_back_img">';
					var fileUrl = item.fileUrl.substr(item.fileUrl.lastIndexOf(".")+1).toLowerCase();
					if(fileUrl == 'jpg' || fileUrl == 'png' || fileUrl == 'jpeg' || fileUrl == 'gif' || fileUrl == 'bmp'){
						if(files.length < 3){
							html += '<img src="../../images/course/c_image.png" alt="" class="file_img">';
						}else{
							html += '<img src="../../images/course/c_image.png" alt="" class="file_img">';
						}
					}else if(fileUrl == 'doc' || fileUrl == 'docx'){
						if(files.length < 3){
							html += '<img src="../../images/course/c_doc.png" alt="" class="file_img">';
						}else{
							html += '<img src="../../images/course/c_doc.png" alt="" class="file_img">';
						}
					}else if(fileUrl == 'xls' || fileUrl == 'xlsx'){
						if(files.length < 3){
							html += '<img src="../../images/course/c_xls.png" alt="" class="file_img">';
						}else{
							html += '<img src="../../images/course/c_xls.png" alt="" class="file_img">';
						}
					}else if(fileUrl == 'ppt' || fileUrl == 'pptx'){
						if(files.length < 3){
							html += '<img src="../../images/course/c_ppt.png" alt="" class="file_img">';
						}else{
							html += '<img src="../../images/course/c_ppt.png" alt="" class="file_img">';
						}
					}else if(fileUrl == 'pdf'){
						if(files.length < 3){
							html += '<img src="../../images/course/c_pdf.png" alt="" class="file_img">';
						}else{
							html += '<img src="../../images/course/c_pdf.png" alt="" class="file_img">';
						}
					}else if(fileUrl == 'avi' || fileUrl == 'rmvb' || fileUrl == 'rm' || fileUrl == 'asf' || fileUrl == 'mpeg' || fileUrl == 'mpg' || fileUrl == 'mp3' || fileUrl == 'mp4'){
						if(files.length < 3){
							html += '<img src="../../images/course/c_video.png" alt="" class="file_img">';
						}else{
							html += '<img src="../../images/course/c_video.png" alt="" class="file_img">';
						}
					}else{
						if(files.length < 3){
							html += '<img src="../../images/c2-1coursedetail/f_img.png" alt="" class="file_img"><input type="hidden" value ='+item.fileUrl+'>';
						}else{
							html += '<img src="../../images/c2-1coursedetail/f_img.png" alt="" class="file_img"><input type="hidden" value ='+item.fileUrl+'>';
						} 
					}
					html += '</div>';
					if(files.length < 3){
						html += '<p title="'+item.filename+'">'+fileName+'<a href='+item.fileUrl+'><img src="../../images/course/dl_file.png" class="dl_file less_fl"></a></p>';
					}else{
						html += '<p title="'+item.filename+'">'+fileName+'<a href='+item.fileUrl+'><img src="../../images/course/dl_file.png" class="dl_file"></a></p>';
					}
					if((i+1)%3 == 0 || (i+1) == files.length){
						html += '</tr>';
					}
					html += '</div>';
				})

				html += '</div>';
				html += '</div>';
				
				$(".c_middle_left").append(html);
			}
		}
	})
}
function goCourseUrl(courseId){
	location.href = getRootPath()+"/course/detail/"+courseId;
}

function getTeacherCoursesScore(){
	var avgScore = $("#avgScore").val();
	var html = '';
	if(avgScore == 0.0 || avgScore == 0){
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
	}else if(avgScore > 0.0 && avgScore <= 1.0){
		if(avgScore < 1.0){
			html += '<img alt="" src="../../images/course/boom_star.png">';
		}else{
			html += '<img alt="" src="../../images/course/y_star.png">';
		}
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
	}else if(avgScore > 1.0 && avgScore <= 2.0){
		html += '<img alt="" src="../../images/course/y_star.png">';
		if(avgScore < 2.0){
			html += '<img alt="" src="../../images/course/boom_star.png">';
		}else{
			html += '<img alt="" src="../../images/course/y_star.png">';
		}
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
	}else if(avgScore > 2.0 && avgScore <= 3.0){
		html += '<img alt="" src="../../images/course/y_star.png">';
		html += '<img alt="" src="../../images/course/y_star.png">';
		if(avgScore < 3.0){
			html += '<img alt="" src="../../images/course/boom_star.png">';
		}else{
			html += '<img alt="" src="../../images/course/y_star.png">';
		}
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
	}else if(avgScore > 3.0 && avgScore <= 4.0){
		html += '<img alt="" src="../../images/course/y_star.png">';
		html += '<img alt="" src="../../images/course/y_star.png">';
		html += '<img alt="" src="../../images/course/y_star.png">';
		if(avgScore < 4.0){
			html += '<img alt="" src="../../images/course/boom_star.png">';
		}else{
			html += '<img alt="" src="../../images/course/y_star.png">';
		}
		html += '<img alt="" src="../../images/course/y_e_star.png">';
	}else if(avgScore > 4.0 && avgScore <= 5.0){
		html += '<img alt="" src="../../images/course/y_star.png">';
		html += '<img alt="" src="../../images/course/y_star.png">';
		html += '<img alt="" src="../../images/course/y_star.png">';
		html += '<img alt="" src="../../images/course/y_star.png">';
		if(avgScore < 5.0){
			html += '<img alt="" src="../../images/course/boom_star.png">';
		}else{
			html += '<img alt="" src="../../images/course/y_star.png">';
		}
	}else{
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
		html += '<img alt="" src="../../images/course/y_e_star.png">';
	}
	html += '<span class="d_score">'+avgScore+'分</span>';
	$("#thCorsScore").html(html);
}

function getOtherCourses() {
	var url = getRootPath() + "/course/getTeacherOtherCourse";
	var courseId = $("#courseId").val();
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		async : false,
		data : {
			"courseid" : courseId
		},
		success : function(data) {
			if (data.success == true) {
				var result = data.result;
				var html = '';
				$.each(result, function(i, item) {
					html += '<div class="other_cor">';
					html += '<div class="other_img" onclick="goCourseUrl('+item.courseid+')"><img alt="" src='+ item.coverUrl+ ' width="100px" height="80px" class="o_img"></div>';
					html += '<div class="o_content">';
					if(item.courseName.length > 7){
						html += '<p>' + item.courseName.substring(0,7) + ' ···</p>';
					}else{
						html += '<p>' + item.courseName + '</p>';
					}
					if(item.priceTotal == null || item.priceTotal == '' || item.priceTotal == '0.0' || item.priceTotal == '0'){
						html += '<p class="cor_price">免费</p>';
					}else{
						html += '<p class="cor_price">￥' + item.priceTotal + '</p>';
					}
					if (item.courseStatus == 0) {
						html += '<p>未开始报名</p>';
					} else if (item.courseStatus == 5) {
						html += '<p>报名中</p>';
					} else if (item.courseStatus == 6) {
						html += '<p>待上课</p>';
					} else if (item.courseStatus == 7) {
						html += '<p>已取消</p>';
					} else if(item.courseStatus == 10){
						html += '<p>进行中</p>';
					}else if(item.courseStatus == 30){
						html += '<p>已完成</p>';
					}else if(item.courseStatus == 40){
						html += '<p>已完成</p>';
					}else if(item.courseStatus == 41){
						html += '<p>已取消</p>';
					}else if (item.courseStatus == 100) {
						html += '<p>已冻结</p>';
					} else if (item.courseStatus == 200) {
						html += '<p>已停售</p>';
					} else {
						html += '<p>未知状态</p>';
					}
					html += '</div>';
					html += '</div>';
					html += '';
				})
				$("#otherCourses").append(html);
			}
		}
	})
}

function isVerifyNull(data) {
	if (data == null || data == "") {
		data = "无";
	}
	return data;
}
