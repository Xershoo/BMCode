var mydate = new Date();
var door = true;
var calIndex = 1;
var intervalId;
var $index;
var uid;
var m;
var userType;

$(function() {
	getDate();
	setTimeout(function() {
		cal();
		var uid = $("#overflow").html();
	}, 20);

})
/*
 * function tests(classid,curseId,isclick) { if(isclick==1) { alert("该节课还未开始"); }
 * else { window.external.DoEnterClassRoom(0,curseId); // }
 *  }
 */
$.ajaxSetup({
	async : true
});
function currentCourse() {
	$.ajax({
				url : getRootPath() + "/listCourseByDay",// 后端需要给的接口
				type : "post",
				dataType : "json",
				async : false,
				cache : false,
				data : {
					"day" : $index,
					"uid" : uid,
					"nUserType" : userType
				},
				success : function(data) {

					// console.log(data)
					// mydate=new Date();
					// console.log(mydate.getMinutes());
					var min = mydate.getMinutes();
					// console.log(mydate)
					if (String(min).length < 2) {
						min = "0" + min;

					}
					var hours = mydate.getHours();
					if (String(hours).length < 2) {
						hours = "0" + hours;

					}
					var currentTime = hours + ':' + min;

					switch (data.status) {
					case 0:
						$(".t_courseList").html("");

						var str = "";

						if (data.courselist != undefined) {
							if (data.courselist.length != 0) {
								// console.log(data.courselist)
								$("#t_courseListDiv").removeAttr("style");
								$(".t_courseList").html("");
								
								$(".calendarList li").eq(m).find("em").show();
								if (door == false) {
									for (var i = 0; i < data.courselist.length; i++) {
										// console.log(data.courselist.length)
										var courseid = data.courselist[i].courseid
												+ "";
										var classid = data.courselist[i].classid
												+ "";
										str = '<li>'
												+ '<a href="#" class="classLink" style="position:relative;left:-6px;top:-4px">'
												+ '<div class="coverImg" style="position:absolute;left:10px;top:9px;border:0px solid #e5e5e5;"><img class="lazy" src="images/mask.png" data-original="'
												+ data.courselist[i].coverUrl
												+ '" alt="" width="198" height="118"/></div>'
												+ '<div class="t_liCurrent">'
												+ '<h3 class="t_courseName t_liFont"  title="'
												+ data.courselist[i].courseName
												+ '">'
												+ checkCourseNameLength(data.courselist[i].courseName)
												+ '</h3>'
												+ '<div class="t_liOther">';
											if(isVerifyNull(data.courselist[i].schoolName).length > 10){
												str += 	'<div class="ct_info" title="'+data.courselist[i].schoolName+'">'
													+ isVerifyNull(data.courselist[i].realName)
													+ ' | '
													+ isVerifyNull(data.courselist[i].schoolName).substring(0, 10)+ '...';
											}else{
												str += '<div class="ct_info">'
													+ isVerifyNull(data.courselist[i].realName)
													+ ' | '
													+ isVerifyNull(data.courselist[i].schoolName);
											}
												/*+ '<div class="ct_info">'
												+ isVerifyNull(data.courselist[i].realName)
												+ ' | '
												+ isVerifyNull(data.courselist[i].schoolName)*/
											str += '</div>'
												+ '<div class="ct_process ct_info">已上<font color="#51a82a">'
												+ data.courselist[i].finishedclass
												+ '/'
												+ data.courselist[i].totalclass
												+ '节 </font>';
										if (data.courselist[i].classStatus == 15) {
											if (data.courselist[i].canEnterClass == 0) {
												str += '<input type="button" id="goIntoClass" class="deadBtn" value="等待上课"></div><div class="ct_status ct_info">'
														+ subStartClassTime(data.courselist[i].startTimePlan
																.split(" ")[1])
														+ ' 上课</div>';
											} else {
												str += '<input type="button" id="goIntoClass" class="activeBtn" value="进入课堂" onclick="tests('
														+ classid
														+ ','
														+ courseid
														+ ','
														+ data.isclick
														+ ')"></div><div class="ct_status ct_info">'
														+ subStartClassTime(data.courselist[i].startTimePlan
																.split(" ")[1])
														+ ' 上课</div>';
											}
										} else if (data.courselist[i].classStatus == 16) {
											str += '<input type="button" id="goIntoClass" class="activeBtn" value="进入课堂"  onclick="tests('
													+ classid
													+ ','
													+ courseid
													+ ','
													+ data.isclick
													+ ')"></div><div class="ct_status ct_info">正在上课</div>';
										} else if (data.courselist[i].classStatus == 17) {
											str += '<input type="button" id="goIntoClass" class="deadBtn" value="已下课"></div><div class="ct_status ct_info">'
													+ subStartClassTime(data.courselist[i].endTimeReal
															.split(" ")[1])
													+ ' 已结束</div>';
										} else if (data.courselist[i].classStatus == 20) {
											str += '<input type="button" id="goIntoClass" class="deadBtn" value="已取消"></div><div class="ct_status ct_info">'
													+ subStartClassTime(data.courselist[i].endTimePlan
															.split(" ")[1])
													+ ' 已结束</div>';
										} else {
											str += '<input type="button" id="goIntoClass" class="deadBtn" value="未知"></div><div class="ct_status ct_info">未知状态</div>';
										}

										str += '</div>' + '</div>'
										+ '</a>' + '</li>';
										if (data.courselist[i].coverUrl == "") {
											data.courselist[i].coverUrl = 'images/mask.png';
										}
										$(".t_courseList").append(str);
										$(".lazy").lazyload({
											container : $("#t_courseListDiv")
										});
										// 新增内容
										if (m > 0) {

										} else if (m == 0) {

											// 状态不根据时间对比，而是根据状态值直接显示， by
											// liujinshan 2015-9-17 15:50
											if (data.courselist[i].classStartTime > currentTime) {

											} else {
												if (data.courselist[i].courseStatus == 1) {
													$(".t_courseList li")
															.eq(i)
															.find(
																	".t_classTime")
															.html(
																	'<img class="lazy" src="images/classing.png" alt="" />');
												}

											}
										}
										if (data.courselist[i].onlineType == 2) { // 非在线课程
											$(".t_courseList li").eq(i).find(
													".t_liCurrent .t_onOff")
													.addClass("off");
											$(".t_courseList li").eq(i).find(
													".t_liHover .t_onOff")
													.html("非在线课程");
										}
										if (data.courselist[i].compulsoryType == 1) { // 非在线课程
											$(".t_courseList li").eq(i).find(
													".t_liHover .t_bixiu")
													.html("必修课");
										} else if (data.courselist[i].compulsoryType == 2) {
											$(".t_courseList li").eq(i).find(
													".t_liHover .t_bixiu")
													.html("选修课");
										}
									}
									if(data.courselist.length < 10){
										for(var i = 0; i < (10-data.courselist.length); i++){
											str = '<li>'
												+ '<a href="#" class="classLink" style="position:relative;left:-6px;top:-4px;cursor:default">'
												+ '<div class="defaultLogo">'
												+ '<img src="images/logo.png" style="border:0;width:144px;height:54px;">'
												+ '</div>'
												+ '</a>'
												+ '</li>';
											$(".t_courseList").append(str);
										}
									}
								}
							}

							else if (data.courselist.length == 0) {
								var html = '<div class="noClass">'
									 + '<img src="images/client_noClass.gif" />'
									 + '</div>';
								$("#t_courseListDiv").css("background","#fff");
								$(".t_courseList").html(html);
								/*for (var i = 0; i < 10; i++) {
									str = '<li>'
										+ '<a href="#" class="classLink" style="position:relative;left:-6px;top:-4px;cursor:default">'
										+ '<div class="defaultLogo">'
										+ '<img src="images/logo.png" style="border:0;width:144px;height:54px;">'
										+ '</div>'
										+ '</a>'
										+ '</li>';
									$(".t_courseList").append(str);
								}*/

							}
						}else{
							var html = '<div class="noClass">'
									 + '<img src="images/client_noClass.gif" />'
									 + '</div>';
							$("#t_courseListDiv").css("background","#fff");
							$(".t_courseList").html(html);
							/*for (var i = 0; i < 10; i++) {
								str = '<li>'
									+ '<a href="#" class="classLink" style="position:relative;left:-6px;top:-4px;cursor:default">'
									+ '<div class="defaultLogo">'
									+ '<img src="images/logo.png" style="border:0;width:144px;height:54px;">'
									+ '</div>'
									+ '</a>'
									+ '</li>';
								$(".t_courseList").append(str);
							}*/
						}
						break;
					default:
						alert("服务器有点慢，请稍后再试!");
						break;
					}

					$(".classLink").hover(function() {
						var te = $(this).find(".t_liCurrent");
						if(te.length > 0)
							$(this).css("border", "1px solid #1976d2");
					}, function() {
						$(this).css("border", "1px solid #dadada");
					});
					
					$(".activeBtn").on("click", function(){
						clearInterval(intervalId);
					});
				}
			})
}

function gettoHaveCourse($index, uid, userType) {
	$.ajax({
		url : getRootPath() + "/ishavecourseByday",// 后端需要给的接口
		type : "post",
		dataType : "json",
		async : false,
		cache : false,
		data : {
			"day" : $index,
			"nDayCount" : 14,
			"uid" : uid,
			"nUserType" : userType
		},
		success : function(data) {
			switch (data.status) {
			case 0:
				$(".t_courseList").html("");
				if (data.days != undefined) {
					if (data.days.length != 0) {
						// console.log(data.courselist)
						for (var i = 1; i < 15; i++)
							if (data.days[i - 1] > 0)
								$(".calendarList li").eq(i).find("em").show();
					}
				}
				break;
			default:
				break;
			}

		}
	})
}
/** ***********************************调取日历************************* */
function cal() {
	var weekArray = new Array('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');
	var now = mydate; // 获得本地系统时间
	var calendar = new Calendar(); // 创建日历对象
	var newArray = [];
	var calli = $(".calendarList li");
	calli.eq(0).html((now.getMonth() + 1) + "月");
	calli.eq(1).css("color", "#438ed9");
	// 将默认锚定时间更新至焦点日期标签中
	/*
	 * var timestring = "" + now.getFullYear() +"年" + (now.getMonth()+1) + "月"+
	 * now.getDate() + "日";
	 */
	for (var i = 1; i < 15; i++) {
		calendar.init(calli.eq(i), now); // 初始化日历对象
		calli.eq(i).html('<div class="calendarMain">'
								+ (now.getDate())
								+ '<span>'
								+ weekArray[now.getDay() - 1]
								+ '</span><em style="display:none"><img src="images/redDot.png" alt="" width="6"></em></div>');
		if (now.getDay() == 0) {
			calli.eq(i).html('<div class="calendarMain">'
									+ (now.getDate())
									+ '<span>'
									+ weekArray[6]
									+ '</span><em style="display:none"><img src="images/redDot.png" alt="" width="6"></em></div>');
			/*calli.eq(i).addClass("weekend");
			calli.eq(i - 1).addClass("weekend");*/
		}
		newArray.push("" + now.getFullYear() + "-" + (now.getMonth() + 1) + "-"
				+ now.getDate());
		if (i == 14) {
			var uId = $("#overflow").html();
			var usertype = $("#userType").html();
			gettoHaveCourse(newArray[0], uId, usertype);
			/*
			 * for(var j=0;j<newArray.length;j++){
			 * currentCourse(newArray[j],uid,j,userType); }
			 */
		}

		now.setDate(now.getDate() + 1);

	}
	calli.eq(1).find("span").css("color", "#438ed9");
	calli.eq(1).find(".calendarMain").css("border-left", "0px");
	calli.eq(1).next().find(".calendarMain").css("border-left", "0px");
	$(".t_courseList").html("");
	setTimeout(function() {
		door = false;
		var usertype = $("#userType").html();
		$index = newArray[0];
		uid = uId;
		m = 0;
		userType = usertype;
		currentCourse();
		intervalId = setInterval(currentCourse, 60000);
	}, 20);

	$(".calendarList li:gt(0)").on("click", function() {
		clearInterval(intervalId);
		$(".calendarList li").eq(calIndex).find(".calendarMain").css("border-left", "1px solid #dadada");
		$(".calendarList li").eq(calIndex).next().find(".calendarMain").css("border-left", "1px solid #dadada");
		$(this).find(".calendarMain").css("border-left", "0px");
		$(this).next().find(".calendarMain").css("border-left", "0px");
		calIndex = $(this).index();
		
		$(this).addClass("focus").siblings().removeClass("focus");
		$index = newArray[$(this).index() - 1];
		uid = $("#overflow").html();
		m = $(this).index();
		door = false;
		userType = $("#userType").html();
		currentCourse();
		intervalId = setInterval(currentCourse, 60000);
	})
}

function isVerifyNull(data) {
	if (data == null || data == "") {
		return "无";
	} else {
		return data;
	}
}

// 获取服务器时间
function getDate() {
	$.ajax({
		url : getRootPath() + "/getCurTime",// 后端需要给的接口
		type : "post",
		dataType : "text",
		success : function(data) {
			//console.log(data)
			mydate = data;
			mydate = new Date(mydate);
			mydate1 = new Date(mydate);
			//console.log(mydate)
			return mydate;
		}
	})
}

function checkCourseNameLength(courseName) {
	if (courseName.length > 14) {
		courseName = courseName.substring(0, 14) + "...";
	}
	return courseName;
}

function subStartClassTime(startTime) {
	if (startTime != null && startTime != "") {
		startTime = startTime.substring(0, 5);
	}
	return startTime;
}

function checkMinute(startTime) {
	var hour = startTime.substring(0, 2);
	var minute = startTime.substring(3, 5);

}
