/**
 * courses manage javascript source file
 */

var orderId;
var price;
var courseName;
var teacherName; 
var schoolname;

$(function() {

	/* 提交订单 */

	$("#stCourseOrder").on("mouseover", function() {
		$(this).css("background-color", "#3997f4");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});

	getPayCourseDetails();

	$("#stCourseOrder").on(
			"click",
			function() {
				var courseId = $("#courseId").val();
				var url = getRootPath() + "/student/submitOrder";
				var courseId = $("#courseId").val();
				$.ajax({
					url : url,
					type : 'post',
					dataType : 'json',
					data : {
						"courseid" : courseId,
						"classid" : 0,
						"couponid" : 0
					},
					success : function(data) {
						if (data.status == -1) {
							alert("请登录后重试！");
							location.href = getRootPath() + "/index";
						} else if (data.status == -2) {
							alert("学校已经把学生加入课程，不需要再报名");
							location.href = getRootPath() + "/order/studentOrder";
						} else if (data.status == -3) {
							alert("学生已经报名了，不用重复报，或者已经付款了");
							location.href = getRootPath() + "/order/studentOrder";
						} else if (data.status == -6) {
							alert("报名已满！");
							location.href = getRootPath() + "/order/studentOrder";
						} else if (data.status == 0) {
							var orderId = data.orderid;
							goPayOrder(orderId, price, courseName, teacherName,schoolname);
						} else {
							alert("出现错误，请重试！");
							location.href = getRootPath() + "/order/studentOrder";
						}
					}
				});

			})

	/* 提交订单 */
});

function getPayCourseDetails() {
	var courseId = $("#courseId").val();
	var url = getRootPath() + "/student/tosignupcourse";
	$.ajax({
				url : url,
				type : 'post',
				async:false,
				dataType : 'json',
				data : {
					"courseid" : courseId,
					"classid" : 0
				},
				success : function(data) {
					if (data.status == -1) {
						getDialog("fail", "请登录后重试");
						setTimeout('location.href = getRootPath() + "/order/studentOrder"',3000) ;
					} else if (data.status == -2) {
						getDialog("fail", "学校已经把学生加入课程，不需要再报名");
						setTimeout('location.href = getRootPath() + "/order/studentOrder"',3000) ;
					} else if (data.status == -3) {
						getDialog("fail", "不能重复报名，或者已经付款");
						setTimeout('location.href = getRootPath() + "/order/studentOrder"',3000) ;
					} else if (data.status == -5) {
						getDialog("fail", "报名已满");
						setTimeout('location.href = getRootPath() + "/order/studentOrder"',3000) ;
					} else if (data.status == 0) {
						$("#submitOrdCont .data_info").remove();
						var html = '';
						html += '<div class="data_info">';
						html += '<div class="c_content">';
						html += '<div class="course_logo">';
						html += '<img src=' + data.courseimg
								+ ' width="150px" height="100px">';
						html += '</div>';
						html += '<div class="c_name">';
						html += '<input type="hidden" name="couseName" id="couseName"> '
								+ isVerifyNull(data.cousename) + '';
						html += '</div>';
						html += '<div class="teacher_name_word2">';
						html += '<p>老师名称：' + isVerifyNull(data.teachername)+'</p>';
						html += '<p>'+data.startTimePlan+' 至 '+data.endTimePlan+'</p>';
						html += '</div>';
						html += '</div>';
						html += '<div class="p_original">￥'+data.topay+'元</div>';
						html += '<div class="p_coupon">';
						html += '<select class="s_coupon add_sel">';
//						html += '<option>满30元立减20元</option>';
						html += '<option>不使用优惠券</option>';
						html += '</select>';
						html += '</div>';
						html += '<div class="p_coupon p_total">￥ ' + data.topay
								+ '</div>';
						html += '</div>';
						$("#submitOrdCont").append(html);

						$(".p_order .sd_content").remove();
						var content = '';
						content += '<div class="sd_content" id="payOrdCont">';
						content += '<p>';
						content += '应付金额：';
						content += '</p>';
						content += '<span class="sd_peice">￥' + data.price +'</span>';
//						content += '<p>(已优惠：￥20元)</p>';
						content += '<input type="button" id="stCourseOrder" name="stCourseOrder" class="so_btn" value="提交订单">';
						content += '</div>';
						$(".p_order").append(content);
						price = data.topay;
					    courseName = data.cousename;
						teacherName = data.teachername; 
						schoolname = data.schoolname;
					} else if (data.status == -6) {
						alert("不能报名自己的课程！");
						history.go(-1);
					}else {
						alert("出现错误，请重试！");
						history.go(-1);
					}
				}
			});
	$("#stCourseOrder").on("mouseover", function() {
		$(this).css("background-color", "#3997f4");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});
}

function goPayOrder(orderId, price, courseName, teacherName, schoolname) {
	window.location.href = getRootPath() + "/order/payStudentOrder?orderId="
			+ orderId + "&price=" + price + "&courseName="
			+ encodeURI(encodeURI(courseName)) + "&teacherName="
			+ encodeURI(encodeURI(teacherName)) + "&schoolname="
			+ encodeURI(encodeURI(schoolname));
}

function isVerifyNull(data) {
	if (data == null || data == "") {
		data = "无";
	}
	return data;
}

