var imgSrc;
var op1 = "请选择", op2 = "请选择", op3 = "请选择"
var imgaa = "";
var nLevel = 1;
var answer1, answer2, answer3, answer4, answer5, answer6 = "";
var door = true;
var timeout;
var beforeMobile;
var verifySerialid = 0;
var quest1;
var quest2;
var quest3;
var ans1;
var ans2;
var ans3;

var oldUserName;
var oldNickName;
var oldSex;
var oldBirth;
var oldTech;
var oldOccupation;
var oldCompany;
var oldSignature;
var oldMore;

var selectVal1;
var selectVal2;
var selectVal3;

var pianoSelfImage;
var pianoPhotoUrl;


var phoneReg = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/);

var myTinyDialog;
$(function() {
	var countdown = 10;
	var disabledBtn = false;
	function settime(verifyCode) {
		if (countdown == 0) {
			disabledBtn = false;
			$("#" + verifyCode).val("获取验证码");
			clearTimeout(timeout);
			return;
		} else {
			disabledBtn = true;
			$("#" + verifyCode).val(countdown + "s后可获取");

			countdown--;
		}
		timeout = setTimeout(function() {
			settime(verifyCode);
		}, 1000)
	}

	$("#menu1_data").show();
	$(".m_person").css("font-size", "19px").css("font-weight", "bold");

	/*$(".data_chk").on("mouseover", function() {
		$(this).css({
			"background-color" : "#eeeeee",
			"cursor" : "pointer",
			"color" : "#89bdf8",
			"font-size" : "16px"
		});
	}).on("mouseout", function() {
		$(this).css({
			"background-color" : "white",
			"color" : "#cacaca",
			"font-size" : "14px"
		});
	});*/

	// 编辑资料
	$("#edit")
			.on(
					"click",
					function() {
						$("#submit").css("display", "block");
						$("#cancel").css("display", "block");
						$("#edit").css("display", "none");
						$(".bottom_content th").css("width", "475px");
						// var userId = $("tr").eq(0).find("td").eq(0).html();
						var userName = $("#userNameData").html();
						var nickName = $("#nickNameData").html();
						if(userName == '无'){
							userName = '';
						}
						var sex = $("#sexData").html();
						var birth = $("#birthDayData").html();
						var eduAge = $("#techYearsData").html();
//						var ty = eduAge.substr(0, eduAge.length - 1); // 教龄
//						var occupation = $("#occupationData").html();
//						var company = $("#companyData").html();
						var signature = $("#signatureData").html();
						var more = $("#moreData").html();

						oldUserName = userName;
						oldNickName = nickName;
						oldSex = sex;
						oldBirth = birth;
//						oldTech = ty;
//						oldOccupation = occupation;
//						oldCompany = company;
						oldSignature = signature;
						oldMore = more;

						var year = birth.substring(0, 4);
						var month = birth.substring(5, 7);
						if (month < 10) {
							month = "0" + month;
						}
						var day = birth.substring(8, 10);
						if (day < 10) {
							day = "0" + day;
						}
						if (sex == '男') {
							sex = 1;
						} else {
							sex = 2;
						}

						// $("tr").eq(0).find("td").eq(0).html("<input
						// type='text' id='userId' class='r_v_table'
						// value='"+userId+"'>");
						$("#userNameData")
								.html(
										"<input type='text' id='userName' name='userName' class='r_v_table' placeholder='请填写真实姓名，方便学习与沟通~' value='"
												+ userName
												+ "' maxlength='20'/><span class='info'></span>");
						$("#nickNameData")
								.html(
										"<input type='text' id='nickName' name='nickName' class='r_v_table' value='"
												+ nickName
												+ "' maxlength='10' placeholder='请填写昵称~~'><span class='basic_info'></span>");
						if (sex == 1) {
							$("#sexData")
							.html(
								"<input type='radio' value='男' id='sex' name='sex' checked	>男&nbsp;&nbsp; <input type='radio' value='女' id='sex' name='sex'>女");
							
						} else {
							$("#sexData")
							.html(
								"<input type='radio' value='男' id='sex' name='sex'	>男&nbsp;&nbsp; <input type='radio' value='女' id='sex' name='sex' checked>女");
						}
						$("#birthDayData")
								.html(
										"<input type='text' id='birth' name='birth' onFocus=\"WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true})\" class='r_v_table' value='"
												+ birth + "'><span class='basic_info'>");
						// $("tr").eq(4).find("td").eq(0).html("<input
						// type='text' id='startDate' name='startDate'
						// class='q_r_tech'
						// onFocus=\"WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\\'endDate\\')}'})\">
						// &nbsp;&nbsp;至&nbsp;&nbsp;<input type='text'
						// id='endDate' name='endDate' class='q_r_tech'
						// onFocus=\"WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\\'startDate\\')}'})\">");
//						$("#techYearsData")
//								.html(
//										"<input type='number' id='techYears' name='techYears' maxlength='5' style='width:150px;height:25px' value='"
//												+ ty
//												+ "' min='0' max='60'>&nbsp;&nbsp;年<span class='basic_info'></span>");
						// $("tr").eq(4).find("td").eq(1).html("<select
						// name='field1' class='r_v_sel'><option
						// value='0'>分类</option><option
						// value='1'>艺术</option><option
						// value='2'>音乐</option><option
						// value='3'>高校</option></select>&nbsp;&nbsp; <select
						// name='field2' class='r_v_sel'><option
						// value='0'>专业</option><option
						// value='1'>乐器</option><option
						// value='2'>唱歌</option><option
						// value='3'>指挥</option><option
						// value='4'>作曲</option></select>&nbsp;&nbsp; <select
						// name='field3' class='r_v_sel'><option
						// value='0'>科目</option><option
						// value='1'>吉他</option><option
						// value='2'>钢琴</option><option
						// value='3'>小提琴</option><option
						// value='4'>二胡</option></select>");
//						if (occupationData == '在职教师') {
//							$("#occupationData")
//									.html(
//											"<select name='professional' id='professional' class='r_v_pro'></option><option value='1' selected>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//						} else if (occupationData == '在校学生') {
//							$("#occupationData")
//									.html(
//											"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2' selected>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//						} else if (occupationData == '社会人士') {
//							$("#occupationData")
//									.html(
//											"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3' selected>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//						} else if (occupationData == '培训老师') {
//							$("#occupationData")
//									.html(
//											"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4' selected>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//						} else if (occupationData == '坐班白领') {
//							$("#occupationData")
//									.html(
//											"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5' selected>坐班白领</option><option value='6'>门卫大叔</option></select>");
//						} else if (occupationData == '门卫大叔') {
//							$("#occupationData")
//									.html(
//											"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6' selected>门卫大叔</option></select>");
//						} else {
//							$("#occupationData")
//									.html(
//											"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//						}
//						$("#companyData")
//								.html(
//										"<input type='text' id='workPlace' name='workPlace' class='r_v_table' placeholder='你目前的学校/机构/单位是？' maxlength='20' value='"
//												+ company + "'>");
						$("#signatureData")
								.html(
										"<input type='text' id='signature' name='signature'	placeholder='一句话介绍自己~' cols='4' style='width: 492px; height: 25px;' maxlength='50' value='"
												+ signature + "'>");
						$("#moreData")
								.html(
										"<textarea rows='7' cols='3' class='t_more' id='description' name='description' maxlength='500' placeholder='留下有关你的更多信息，让大家更了解你吧~'>"
												+ more + "</textarea>");
					})
	$("#cancel").on("click", function() {
		$("#submit").css("display", "none");
		$("#cancel").css("display", "none");
		$("#edit").css("display", "block");
		$(".bottom_content th").css("width", "150px");
		getBasicDatas();
	})

	$("#submit").on("mouseover", function() {
		$(this).css("background-color", "#419bf5");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});

	$("#chgPwd").on("mouseover", function() {
		$(this).css("background-color", "#4c4c4c");
	}).on("mouseout", function() {
		$(this).css("background-color", "#5c6166");
	});
	$(".chg_btn").on("mouseover", function() {
		$(this).css("background-color", "#4ACD5C");
	}).on("mouseout", function() {
		$(this).css("background-color", "#61dc72");
	});

	$("#cancel").on("mouseover", function() {
		$(this).css("background-color", "#d3d3d3");
	}).on("mouseout", function() {
		$(this).css("background-color", "#c3c3c3");
	});
	$("#edit").on("mouseover", function() {
		$(this).css("background-color", "#419bf5");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});

	$("#chg_img").on("mouseover", function() {
		$(this).css("background-color", "#4ACD5C");
	}).on("mouseout", function() {
		$(this).css("background-color", "#61dc72");
	});

	$("#upload_img").on("mouseover", function() {
		$(this).css("background-color", "#4c4c4c");
	}).on("mouseout", function() {
		$(this).css("background-color", "#5c6166");
	});

	$(".m_sure").on("mouseover", function() {
		$(this).css("background-color", "#f9a200");
	}).on("mouseout", function() {
		$(this).css("background-color", "#ffa800");
	});
	$(".m_cancel").on("mouseover", function() {
		$(this).css("background-color", "#419bf5");
	}).on("mouseout", function() {
		$(this).css("background-color", "#51a4f6");
	});
	
	$("#chooseImage").on("mouseover", function() {
		$(this).css("background-color", "#5CCB6B");
	}).on("mouseout", function() {
		$(this).css("background-color", "#61dc72");
	});
	
	$("#basic_info").addClass("pn_menu_set");
	$("#basic_info").on("click", function() {
		$(this).siblings().removeClass("common_link");
		$(this).addClass("common_link");
		$(this).addClass("pn_menu_set");
		$(this).siblings().removeClass("pn_menu_set");
//		$(this).css({"background-color" : "#eeeeee","color" : "#89bdf8","font-size" : "16px"});
//		$(this).siblings().css({"background-color" : "white","color" : "#cacaca","font-size" : "14px"});
//		$("#menu1_data").show();
//		$("#menu2_data").hide();
//		$("#menu3_data").hide();
//		$("#menu4_data").hide();
//		$("#menu5_data").hide();
//		$("#menu6_data").hide(); 
//		$("#menu7_data").hide();
//		$(".u_myDataWrap #changeEncryptedTab").remove();
		location.href = getRootPath() + "/persondata/toAccount";
	})
	$("#student_info").on("click", function() {
		$(this).siblings().removeClass("common_link");
		$(this).addClass("common_link");
		$(this).addClass("pn_menu_set");
		$(this).siblings().removeClass("pn_menu_set");
//		$(this).css({"background-color" : "#eeeeee","color" : "#89bdf8","font-size" : "16px"});
//		$(this).siblings().css({"background-color" : "white","color" : "#cacaca","font-size" : "14px"});
		$("#menu2_data").show();
		$("#menu1_data").hide();
		$("#menu3_data").hide();
		$("#menu4_data").hide();
		$("#menu5_data").hide();
		$("#menu6_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").hide();
		$("#menu9_data").hide();
		$(".u_myDataWrap #changeEncryptedTab").remove();
		getStudentInfos();
	})
	$("#account_info").on("click", function() {
		$(this).siblings().removeClass("common_link");
		$(this).addClass("common_link");
		$(this).addClass("pn_menu_set");
		$(this).siblings().removeClass("pn_menu_set");
		$("#menu3_data").show();
		$("#menu2_data").hide();
		$("#menu1_data").hide();
		$("#menu4_data").hide();
		$("#menu5_data").hide();
		$("#menu6_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").hide();
		$("#menu9_data").hide();
		$(".u_myDataWrap #changeEncryptedTab").remove();
		getSafetyInfos();
	});
	
	$("#personalPortrait").on("click", function() {
		$(this).siblings().removeClass("common_link");
		$(this).addClass("pn_menu_set");
		$(this).siblings().removeClass("pn_menu_set");
		$("#menu1_data").hide();
		$("#menu2_data").hide();
		$("#menu3_data").hide();
		$("#menu4_data").hide();
		$("#menu5_data").hide();
		$("#menu6_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").show();
		$("#menu9_data").hide();
		$(".u_myDataWrap #changeEncryptedTab").remove();
//		getSafetyInfos();
		getBasicDatas();
		if(pianoPhotoUrl != '' && pianoPhotoUrl != null){
			$(".piano-image").css("background","#fff");
			$("#pianoPhotoUrls").attr("src",pianoPhotoUrl);
		}
	})
	
	$("#identityAuth").on("click", function() {
		$(this).siblings().removeClass("common_link");
		$(this).addClass("pn_menu_set");
		$(this).siblings().removeClass("pn_menu_set");
		
		$("#menu1_data").hide();
		$("#menu2_data").hide();
		$("#menu3_data").hide();
		$("#menu4_data").hide();
		$("#menu5_data").hide();
		$("#menu6_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").hide();
		$("#menu9_data").show();
		
		$(".u_myDataWrap #changeEncryptedTab").remove();

//		getSafetyInfos();
		
		getBasicDatas();
	})
	
	$("#chgPwd").on("click", function() {
		$("#menu1_data").hide();
		$("#menu2_data").hide();
		$("#menu3_data").hide();
		$("#menu4_data").show();
		$("#menu5_data").hide();
		$("#menu6_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").hide();
		$("#menu9_data").hide();
		$(".u_myDataWrap #changeEncryptedTab").remove();
	})

	$("#set_imme").on("click", function() {
		$("#menu6_data").show();
		$("#menu1_data").hide();
		$("#menu2_data").hide();
		$("#menu3_data").hide();
		$("#menu4_data").hide();
		$("#menu5_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").hide();
		$("#menu9_data").hide();
		$(".u_myDataWrap #changeEncryptedTab").remove();
		selectChange2();
	})
	/*$("#question1").change(function() { 
		selectChange("question1"); 
    })
    $("#question2").change(function() { 
		selectChange("question2"); 
    })
    $("#question3").change(function() { 
		selectChange("question3"); 
    })*/
	$("#cancelChgPwd").on("click",function(){
		goPersonalAccount();
	})
	$("#cancelChgMobile").on("click",function(){
		goPersonalAccount();
	})
	
	$("#cancelEncrypted").on("click",function(){
		goPersonalAccount();
	})
	$("#backEncrypted").on("click",function(){
		$("#menu6_data").show();
		$("#menu1_data").hide();
		$("#menu2_data").hide();
		$("#menu3_data").hide();
		$("#menu4_data").hide();
		$("#menu5_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").hide();
		$("#menu9_data").hide();
		$(".u_myDataWrap #changeEncryptedTab").remove();
	})
	
	$("#cancelSetEncrypted").on("click",function(){
		goPersonalAccount();
	})
	
	$(".piano-file").change(function(evt) {

		var files = evt.target.files;

		for (var i = 0, f; f = files[i]; i++) {

			if (!f.type.match('image.*')) {
				continue;
			}

			var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$("#chooseImage").attr("src", e.target.result); //预览图片的位置                  
				};
			})(f);

			reader.readAsDataURL(f);
		}
	});
	
	$("#m_next").on(
			"click",
			function() {
				var question1 = $("#question1").val();
				var question2 = $("#question2").val();
				var question3 = $("#question3").val();
				var answer1 = $.trim($("#answer1").val());
				var answer2 = $.trim($("#answer2").val());
				var answer3 = $.trim($("#answer3").val());

				if (checkQuestionInfo(question1, question2, question3, answer1,
						answer2, answer3)) {
					$("#menu7_data").show();
					$("#menu1_data").hide();
					$("#menu2_data").hide();
					$("#menu3_data").hide();
					$("#menu4_data").hide();
					$("#menu5_data").hide();
					$("#menu6_data").hide();
					$("#menu8_data").hide();
					$("#menu9_data").hide();
					$(".u_myDataWrap #changeEncryptedTab").remove();
					quest1 = question1;
					quest2 = question2;
					quest3 = question3;
					ans1 = answer1;
					ans2 = answer2;
					ans3 = answer3;
					$("#answerEncrypted").find("tr").eq(0).find("td").eq(0)
							.html(question1);
					$("#answerEncrypted").find("tr").eq(2).find("td").eq(0)
							.html(question2);
					$("#answerEncrypted").find("tr").eq(4).find("td").eq(0)
							.html(question3);
				}

			})

	$("#change_mobile").on("click", function() {
		$("#menu5_data").show();
		$("#menu1_data").hide();
		$("#menu2_data").hide();
		$("#menu3_data").hide();
		$("#menu4_data").hide();
		$("#menu6_data").hide();
		$("#menu7_data").hide();
		$("#menu8_data").hide();
		$(".u_myDataWrap #changeEncryptedTab").remove();
	})
	$("#apply_school").dialog({
		autoOpen : false,
		position : "middle",// 弹出位置
		width : 900, // 窗口宽度
		height : 620,
		resizable : false
	});
	$("#imageUpload").dialog({
		autoOpen : false,
		position : "middle",// 弹出位置
		width : 900, // 窗口宽度
		height : 620,
		resizable : false
	});
	/*$("#apply_school").dialog({
		autoOpen : false,
		position : "middle",// 弹出位置
		width : 500, // 窗口宽度
		height : 480,
//		resizable : false
	});*/
	// $("#chg_img").on("click",function(){
	// $("#apply_school").dialog("open");
	// })
	//    
	getBasicDatas();

	$("#submit").on(
			"click",
			function() {
				var url = getRootPath() + "/persondata/updatepersonaldata";
				var userName = $.trim($("#userName").val()); // 姓名
				var nickName = $.trim($("#nickName").val()); // 昵称
				var sex = $("input[name='sex']:checked").val(); // 性别
//				var techYears = $.trim($("#techYears").val());
				// var ty = techYears.substr(0,techYears.length-1); //教龄
//				var professional = $("#professional").find("option:selected").text(); // 职业
				var workPlace = $.trim($("#workPlace").val()); // 就职于
				var signature = $.trim($("#signature").val()); // 个性签名
				var birth = $("#birth").val(); // 生日 如1989-11-12
				var description = $.trim($("#description").val()); // 更多

				if (oldUserName == userName && oldNickName == nickName
						&& oldSex == sex && oldBirth == birth
//						&& oldTech == techYears
//						&& oldOccupation == professional
//						&& oldCompany == workPlace 
						&& oldSignature == signature
						&& oldMore == description) {
					getDialog("warn", "您没有修改任何信息");
					return false;
				}
				if(birth != null && birth != ''){
					var birthDay = birth.split("-");
					var year = birthDay[0];
					var month = birthDay[1];
					var day = birthDay[2];
				}
				if (sex == '男') {
					sex = 1;
				} else {
					sex = 2;
				}
				if (checkForm()) {

//					if (confirm("确定要修改数据吗？")) {
						$.ajax({
							url : url,
							type : 'post',
							data : {
								"realname" : userName,
								"year" : year,
								"month" : month,
								"day" : day,
								"nickname" : nickName,
								"usersex" : sex,
//								"teachyears" : techYears,
//								"occupation" : professional,
//								"company" : workPlace,
								"sign" : signature,
								"desc" : description
							},
							dataType : 'json',
							success : function(data) {
								if (data.status >= 0) {
									getDialogCue("success", "修改资料成功");
									setTimeout('location.reload()',3000) ;
//									location.href = getRootPath() + "/persondata/toAccount";
								} else if (data.status == -1) {
									getDialog("warn", "请先登录");
									setTimeout('location.href = getRootPath() + "/index"',3000) ;
								} else {
									getDialog("fail", "修改资料失败，请重试");
									setTimeout('location.reload()',3000) ;
								}
							}
						});
//					}
				}
			})
	$("#nickName").blur(function() {
		var nickName = $.trim($("#nickName").val());
		isValidNickName(nickName);
	});
	
	$("#techYears").blur(function() {
		var techYears = $.trim($("#techYears").val());
		isValidTechYears(techYears);
	});
	
	$("#chgPwdSure").on(
			"click",
			function() {
				var oldPwd = $("#oldPwd").val();
				var newPwd = $("#newPwd").val();
				var newAgainPwd = $("#newAgainPwd").val();
				var pwdlevel = calculatePasswordLevel(newPwd);
				var url = getRootPath() + "/persondata/changepasswordbyold";
				if (checkPwd(oldPwd, newPwd, newAgainPwd)) {
					$.ajax({
						url : url,
						type : 'post',
						data : {
							"oldPassword" : oldPwd,
							"newPassword" : newPwd,
							"nLevel" : pwdlevel
						},
						dataType : 'json',
						success : function(data) {
							if (data.status >= 0) {
								getDialogCue("success", "修改密码成功");
								setTimeout('location.href = getRootPath() + "/index"',3000) ;
							} else if (data.status == -1) {
								getDialog("warn", "请先登录");
								setTimeout('location.href = getRootPath() + "/index"',3000) ;
							}else if (data.status == -2) {
								$("#changePwdTab").find(".info").eq(0).show();
								$("#changePwdTab").find(".info").eq(0).html("*新密码不能与旧密码一致！");
							} else if (data.status == -3) {
								$("#changePwdTab").find(".info").eq(0).show();
								$("#changePwdTab").find(".info").eq(0).html("*输入旧密码错误！");
							} else {
								getDialog("fail", "修改密码失败");
								setTimeout('location.href = getRootPath() + "/persondata/toAccount"',3000) ;
							}
						}
					});

				}
			})

	$("#bind_mobile_imme")
			.on(
					"click",
					function() {
						$("#menu5_data").show();
						$("#menu1_data").hide();
						$("#menu2_data").hide();
						$("#menu3_data").hide();
						$("#menu4_data").hide();
						$("#menu6_data").hide();
						$("#menu7_data").hide();
						$("#menu8_data").hide();
						$("#menu9_data").hide();
						$(".u_myDataWrap #changeEncryptedTab").remove();
						var sessionId = "";
						$("#changeOrBindMobile #changeMobile").remove();
						$(".tips_img").html("绑定手机");
						$(".set_mobile").html("为了您的账号安全，请赶快绑定手机吧~");
						var html = '';
						html += '<table class="m_table" id="changeMobile">';
						html += '<tr>';
						html += '<th>手机号码：</th>';
						html += '<td><input type="text" name="mobileNum" id="mobileNum" class="class8" maxlength="11"><span class="firstMobileInfo"></span></td>';
						html += '</tr>';
						html += '<tr>';
						html += '<th>短信验证码：</th>';
						html += '<td><input type="text" name="firstVerifyCode" id="firstVerifyCode" class="class8 ver_code" maxlength="8"><input type="button" id="getVerifyCode" name="getVerifyCode" class="verifyCode" value="获取验证码"><span class="firstMobileInfo"></span></td>';
						html += '</tr>';
						html += '<tr>';
						html += '<td colspan="2">';
						html += '<input type="button" id="firstBindMobile" class="m_sure" value="确  定">';
						html += '<input type="button" id="cancelFirstBind" class="m_cancel" value="取  消">';
						html += '</td>';
						html += '</tr>';
						html += '</table>';
						$("#changeOrBindMobile").html(html);

						$("#getVerifyCode")
								.on(
										"click",
										function() {
											var mobileNum = $("#mobileNum")
													.val();
											var url = getRootPath()
													+ "/persondata/sendMobileCode";
											if (disabledBtn == false) {
												if (!phoneReg.test(mobileNum)) {
													$(".firstMobileInfo").eq(0)
															.show();
													$(".firstMobileInfo")
															.eq(0)
															.html(
																	"*输入手机号或手机号非法");
													return;
												}
												$
														.ajax({
															url : url,
															type : 'post',
															data : {
																"mobile" : mobileNum,
																"type" : 2
															},
															dataType : 'text',
															success : function(
																	data) {
																verifySerialid = data;
																sessionId = data;
																console.log(data);
																if (verifySerialid > 0) {
																	getDialogCue("success", "发送验证码成功");
																	console.log("发送验证码成功");
																} else {
																	if (verifySerialid == -1) {
																		getDialog("warn", "请先登录");
																		setTimeout('location.href = getRootPath() + "/index"',3000) ;
																	} else if (verifySerialid == -20) {
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.show();
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.html(
																						"已经绑定过手机号，只能更改");
																	} else if (verifySerialid == -21) {
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.show();
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.html(
																						"该手机号码已经被绑定，请更换手机号码！");
																	} else if (verifySerialid == -22) {
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.show();
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.html(
																						"没有设置过手机号码");
																	} else if (verifySerialid == -100) {
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.show();
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.html(
																						"发送验证码失败");
																	} else {
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.show();
																		$(
																				".firstMobileInfo")
																				.eq(
																						0)
																				.html(
																						"处理失败，请重试");
																	}
																}
															}
														});
												countdown = 60;
												settime('getVerifyCode');
											}
										})
						$("#firstBindMobile")
								.on(
										"click",
										function() {
											var verifyCode = $(
													"#firstVerifyCode").val();
											var mobileNum = $("#mobileNum")
													.val();
											if (mobileNum == ""
													|| mobileNum == null) {
												$(".firstMobileInfo").eq(0)
														.show();
												$(".firstMobileInfo").eq(0)
														.html("*请输入手机号码！");
												return false;
											} else {
												if (!phoneReg.test(mobileNum)) {
													$(".firstMobileInfo").eq(0)
															.show();
													$(".firstMobileInfo")
															.eq(0)
															.html(
																	"*输入手机号或手机号非法");
													return false;
												} else {
													$(".firstMobileInfo").eq(0)
															.hide();
													$(".firstMobileInfo").eq(0)
															.html("");
												}
											}
											if (verifySerialid <= 0) {
												$(".firstMobileInfo").eq(1)
														.show();
												$(".firstMobileInfo").eq(1)
														.html("*请发送验证码！");
												return false;
											} else {
												$(".firstMobileInfo").eq(1)
														.hide();
												$(".firstMobileInfo").eq(1)
														.html("");
											}
											if (verifyCode == ""
													|| verifyCode == null) {
												$(".firstMobileInfo").eq(1)
														.show();
												$(".firstMobileInfo").eq(1)
														.html("*请输入验证码！");
												return false;
											} else {
												$(".firstMobileInfo").eq(1)
														.hide();
												$(".firstMobileInfo").eq(1)
														.html("");
											}
											var url = getRootPath()
													+ "/persondata/updateBindMobile";
											$
													.ajax({
														url : url,
														type : 'post',
														data : {
															"mobileVerifySerialid" : sessionId,
															"oldmobile" : "",
															"verifycode" : verifyCode
														},
														dataType : 'json',
														success : function(data) {
															if (data.status >= 0) {
																getDialogCue("success", "绑定手机成功");
																setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
															} else if (data.status == -2) {
																getDialog("fail", "手机号码有误");
																setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
															} else if (data.status == -1) {
																getDialog("warn", "请先登录");
																setTimeout('location.href = getRootPath() + "/index"',3000) ;
															} else {
																getDialog("fail", "请重试");
																setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
															}
														}
													});
										})
										$("#cancelFirstBind").on("click",function(){
											goPersonalAccount();
										})
					})

	var serialId;
	$("#getChangeVerifyCode").on("click", function() {
		var newMobile = $.trim($("#newMobile").val());
		var oldMobile = $.trim($("#oldMobile").val());
		
		var url = getRootPath() + "/persondata/sendMobileCode";
		if (disabledBtn == false) {
			if (oldMobile == "" || oldMobile == null) {
				$(".mobileInfo").eq(0).show();
				$(".mobileInfo").eq(0).html("*请输入原手机号码");
				return false;
			} else {
				if (!phoneReg.test(oldMobile)) {
					$(".mobileInfo").eq(0).show();
					$(".mobileInfo").eq(0).html("*输入手机号或手机号非法");
					return false;
				} else {
					$(".mobileInfo").eq(0).hide();
					$(".mobileInfo").eq(0).html("");
				}
			}
			if (newMobile == "" || newMobile == null) {
				$(".mobileInfo").eq(1).show();
				$(".mobileInfo").eq(1).html("*请输入新手机号码！");
				return false;
			} else {
				if (!phoneReg.test(newMobile)) {
					$(".mobileInfo").eq(1).show();
					$(".mobileInfo").eq(1).html("*输入手机号或手机号非法");
					return false;
				} else {
					$(".mobileInfo").eq(1).hide();
					$(".mobileInfo").eq(1).html("");
				}
			}
			if(newMobile == oldMobile){
				$(".mobileInfo").eq(1).show();
				$(".mobileInfo").eq(1).html("*更换手机号码不能与原绑定手机号码一致");
				return false;
			}else{
				$(".mobileInfo").eq(1).hide();
				$(".mobileInfo").eq(1).html("");
			}
			if (!phoneReg.test(newMobile)) {
				$(".mobileInfo").eq(0).show();
				$(".mobileInfo").eq(0).html("*输入手机号或手机号非法");
				return;
			}
			$.ajax({
				url : url,
				type : 'post',
				data : {
					"mobile" : newMobile,
					"type" : 12
				},
				dataType : 'text',
				success : function(data) {
					verifySerialid = data;
					serialId = data;
					if (verifySerialid > 0) {
						getDialogCue("success", "已发送验证码");
						console.log("发送验证码成功");
					} else {
						if (verifySerialid == -1) {
							getDialog("warn", "请先登录");
							setTimeout('location.href = getRootPath() + "/index"',3000) ;
						} else if (verifySerialid == -20) {
							$(".mobileInfo").eq(0).show();
							$(".mobileInfo").eq(0).html("已经绑定过手机号，只能更改");
						} else if (verifySerialid == -21) {
							$(".mobileInfo").eq(0).show();
							$(".mobileInfo").eq(0).html("该手机号码已经被绑定，请更换手机号码！");
						} else if (verifySerialid == -22) {
							$(".mobileInfo").eq(0).show();
							$(".mobileInfo").eq(0).html("没有设置过手机号码");
						} else if (verifySerialid == -100) {
							$(".mobileInfo").eq(0).show();
							$(".mobileInfo").eq(0).html("发送验证码失败");
						} else if (verifySerialid == -3) {
							$(".mobileInfo").eq(0).show();
							$(".mobileInfo").eq(0).html("当日发送验证码次数过多");
						} else {
							$(".mobileInfo").eq(0).show();
							$(".mobileInfo").eq(0).html("处理失败，请重试");
						}
					}
				}
			});
			countdown = 60;
			settime('getChangeVerifyCode');
		}
	})
	$("#bind_mobile").on("click", function() {
		var verifyCode = $("#verifyChangeCode").val();
		var newMobile = $.trim($("#newMobile").val());
		var oldMobile = $.trim($("#oldMobile").val());
		if (oldMobile == "" || oldMobile == null) {
			$(".mobileInfo").eq(0).show();
			$(".mobileInfo").eq(0).html("*请输入原手机号码");
			return false;
		} else {
			if (!phoneReg.test(oldMobile)) {
				$(".mobileInfo").eq(0).show();
				$(".mobileInfo").eq(0).html("*输入手机号或手机号非法");
				return false;
			} else {
				$(".mobileInfo").eq(0).hide();
				$(".mobileInfo").eq(0).html("");
			}
		}
		if (newMobile == "" || newMobile == null) {
			$(".mobileInfo").eq(1).show();
			$(".mobileInfo").eq(1).html("*请输入新手机号码！");
			return false;
		} else {
			if (!phoneReg.test(newMobile)) {
				$(".mobileInfo").eq(1).show();
				$(".mobileInfo").eq(1).html("*输入手机号或手机号非法");
				return false;
			} else {
				$(".mobileInfo").eq(1).hide();
				$(".mobileInfo").eq(1).html("");
			}
		}
		if(newMobile == oldMobile){
			$(".mobileInfo").eq(1).show();
			$(".mobileInfo").eq(1).html("*更换手机号码不能与原绑定手机号码一致");
			return false;
		}else{
			$(".mobileInfo").eq(1).hide();
			$(".mobileInfo").eq(1).html("");
		}
		if (verifySerialid <= 0) {
			$(".mobileInfo").eq(2).show();
			$(".mobileInfo").eq(2).html("*请发送验证码！");
			return false;
		} else {
			$(".mobileInfo").eq(2).hide();
			$(".mobileInfo").eq(2).html("");
		}
		if (verifyCode == "" || verifyCode == null) {
			$(".mobileInfo").eq(2).show();
			$(".mobileInfo").eq(2).html("*请输入验证码！");
			return false;
		} else {
			$(".mobileInfo").eq(2).hide();
			$(".mobileInfo").eq(2).html("");
		}
		var url = getRootPath() + "/persondata/updateBindMobile";
		$.ajax({
			url : url,
			type : 'post',
			data : {
				"mobileVerifySerialid" : serialId,
				"oldmobile" : oldMobile,
				"verifycode" : verifyCode
			},
			dataType : 'json',
			success : function(data) {
				if (data.status >= 0) {
					getDialogCue("success", "绑定手机成功");
					setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
				} else if (data.status == -2) {
					getDialog("fail", "绑定手机号码有误");
					setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
				} else if (data.status == -1) {
					getDialog("fail", "请先登录");
					setTimeout('location.href = getRootPath() + "/index"',3000) ;
				} else {
					getDialog("fail", "绑定失败");
					setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
				}
			}
		});
	})

	$("#oldPwd").blur(function() {
		var oldPwd = $("#oldPwd").val();
		isValidOldPwd(oldPwd);
	});
	$("#newPwd").blur(function() {
		var newPwd = $("#newPwd").val();
		isValidNewPwd(newPwd);
	});
	$("#verifyCode").blur(function() {
		var verifyCode = $("#verifyCode").val();
		isValidVerifyCode(verifyCode);
	});
	$("#newAgainPwd").blur(function() {
		var newPwd = $("#newPwd").val();
		var newAgainPwd = $("#newAgainPwd").val();
		isValidNewAgainPwd(newAgainPwd);
		isValidRePwd(newPwd, newAgainPwd);
	});
	$("#oldMobile").on("blur", function() {
		var telnum = $.trim($("#oldMobile").val());
		if (telnum == "" || telnum == null) {
			$(".mobileInfo").eq(0).show();
			$(".mobileInfo").eq(0).html("*请输入原手机号码");
		} else {
			if (phoneReg.test(telnum)) {
				$(".mobileInfo").eq(0).hide();
				$(".mobileInfo").eq(0).html("");
			} else {
				$(".mobileInfo").eq(0).show();
				$(".mobileInfo").eq(0).html("*输入的手机号格式不正确");
			}
		}
	});
	$("#newMobile").on("blur", function() {
		var telnum = $.trim($("#newMobile").val());
		var oldTelNum = $.trim($("#oldMobile").val());
		if (telnum == "" || telnum == null) {
			$(".mobileInfo").eq(1).show();
			$(".mobileInfo").eq(1).html("*请输入新手机号码");
		} else {
			if (!phoneReg.test(telnum)) {
				$(".mobileInfo").eq(1).show();
				$(".mobileInfo").eq(1).html("*输入的手机号格式不正确");
				
			} else if(telnum == oldTelNum){
				$(".mobileInfo").eq(1).show();
				$(".mobileInfo").eq(1).html("*更换手机号码不能与原绑定手机号码一致");
				return false;
			}else {
				$(".mobileInfo").eq(1).hide();
				$(".mobileInfo").eq(1).html("");
			}
		}
	});

	$("#mobileNum").on("blur", function() {
		var telnum = $.trim($("#mobileNum").val());
		if (telnum == "" || telnum == null) {
			$(".firstMobileInfo").eq(0).show();
			$(".firstMobileInfo").eq(0).html("*请输入手机号码");
		} else {
			if (phoneReg.test(telnum)) {
				$(".firstMobileInfo").eq(0).hide();
				$(".firstMobileInfo").eq(0).html("");
			} else {
				$(".firstMobileInfo").eq(0).show();
				$(".firstMobileInfo").eq(0).html("*输入的手机号格式不正确");
			}
		}
	});

	/* 设置密保问题 begin */

	$("#goSetEncrypted").on("click", function() {
		var againAnswer1 = $("#againAnswer1").val();
		var againAnswer2 = $("#againAnswer2").val();
		var againAnswer3 = $("#againAnswer3").val();
		if (ans1 != againAnswer1) {
			$(".againAnswerInfo").eq(0).show();
			$(".againAnswerInfo").eq(0).html("*问题一的答案不正确！");
			return false;
		} else {
			$(".againAnswerInfo").eq(0).hide();
			$(".againAnswerInfo").eq(0).html("");
		}
		if (ans2 != againAnswer2) {
			$(".againAnswerInfo").eq(1).show();
			$(".againAnswerInfo").eq(1).html("*问题二的答案不正确！");
			return false;
		} else {
			$(".againAnswerInfo").eq(1).hide();
			$(".againAnswerInfo").eq(1).html("");
		}
		if (ans3 != againAnswer3) {
			$(".againAnswerInfo").eq(2).show();
			$(".againAnswerInfo").eq(2).html("*问题三的答案不正确！");
			return false;
		} else {
			$(".againAnswerInfo").eq(2).hide();
			$(".againAnswerInfo").eq(2).html("");
		}
		var url = getRootPath() + "/persondata/setUserSafeQuetions";
		$.ajax({
			url : url,
			type : 'post',
			data : {
				"strQuestion1" : quest1,
				"strQuestion2" : quest2,
				"strQuestion3" : quest3,
				"strAsk1" : ans1,
				"strAsk2" : ans2,
				"strAsk3" : ans3
			},
			dataType : 'json',
			success : function(data) {
				if (data.status >= 0) {
					getDialogCue("success", "设置密保问题成功");
					setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
				} else if (data.status == -1) {
					getDialog("warn", "请先登录");
					setTimeout('location.href = getRootPath() + "/index"',3000) ;
				} else {
					getDialog("fail", "设置密保问题失败");
					setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
				}
			}
		});

	})

	$("#changeEncrypted")
			.on(
					"click",
					function() {
						$("#menu1_data").hide();
						$("#menu2_data").hide();
						$("#menu3_data").hide();
						$("#menu4_data").hide();
						$("#menu5_data").hide();
						$("#menu6_data").hide();
						$("#menu7_data").hide();
						$("#menu8_data").hide();
						$("#menu9_data").hide();
						$(".u_myDataWrap #changeEncryptedTab").remove();
						var url = getRootPath()
								+ "/persondata/listpersonaldata";
						$
								.ajax({
									url : url,
									type : 'post',
									dataType : 'json',
									success : function(data) {
										var qus = data.safequestion;
										var uid = qus.uid;
										if ((qus.strQuestion1 != null && qus.strQuestion1 != "")
												&& (qus.strQuestion2 != null && qus.strQuestion2 != "")
												&& (qus.strQuestion3 != null && qus.strQuestion3 != "")) {
											// $(".u_myDataWrap
											// .u_myData").remove();
											$("#menu6_data").hide();
											$("#menu1_data").hide();
											$("#menu2_data").hide();
											$("#menu3_data").hide();
											$("#menu4_data").hide();
											$("#menu5_data").hide();
											$("#menu7_data").hide();
											$("#menu8_data").hide();
											$("#menu9_data").hide();
											showChangeEncrypted(uid,
													qus.strQuestion1,
													qus.strQuestion2,
													qus.strQuestion3);
										} else {
											$("#menu6_data").show();
											$("#menu1_data").hide();
											$("#menu2_data").hide();
											$("#menu3_data").hide();
											$("#menu4_data").hide();
											$("#menu5_data").hide();
											$("#menu7_data").hide();
											$("#menu8_data").hide();
											$("#menu9_data").hide();
										}
									}
								});

					})

	/* 设置密保问题 over */
	/* set image */
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
/* 									更改头像											*/
	$("#chg_img").on("click", function() {
		$("#apply_school").dialog("open");
		var $image = $(".cropper");
		  $image.cropper({
			  aspectRatio:1,
			  done: function(data) {
			    // Output the result data for cropping image.
			  },
			    preview: ".preview1,.preview2,.preview3",
			  
		});
		$("#getDataURL").click(function() {
		    var dataURL = $image.cropper("getDataURL");
		    ajaxSelfUpLoad(dataURL);
		});
		
		var $inputImage = $("#inputImage");

		  if (window.FileReader) {
		    $inputImage.change(function() {
		      var fileReader = new FileReader(),
		          files = this.files,
		          file;

		      if (!files.length) {
		        return;
		      }

		      file = files[0];

		      if (/^image\/\w+$/.test(file.type)) {
		        fileReader.readAsDataURL(file);
		        fileReader.onload = function () {
		          $image.cropper("reset", true).cropper("replace", this.result);
		          $inputImage.val("");
		        };
		      } else {
		        showMessage("Please choose an image file.");
		      }
		    });
		  } else {
		    $inputImage.addClass("hide");
		  }
	})
	function ajaxSelfUpLoad(dataURL) {
		$.ajax({
					url : getRootPath() + "/persondata/upuserimage",// 后端需要给的接口
					type : "post",
					dataType : "json",
					data : {
						"filepath" : dataURL
					},
					success : function(data) {
						switch (data.status) {
						case 0:
							getDialogCue("success", "上传图片成功");
							setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000);
							break;
						case 1:
							getDialog("warn", "请先登录");
							setTimeout('location.href = getRootPath() + "/index"',3000);
							break;
						default:
							getDialog("fail", "请重试");
							setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000);
							break;
						setTimeout(function() {
							history.go(0);
						}, 1000)
					}
				}
				})
	}

	$('#upload-file').on('change', function() {
		var options = {
			thumbBox : '.thumbBox',
			spinner : '.spinner',
			imgSrc : ''
		}
		$(".container .position_p").remove();
		$(".new-contentarea").css("display", "none");
		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			cropper = $('.imageBox').cropbox(options);
			// $('#btnCrop').trigger("click");
			setTimeout(function() {
				$('#btnCrop').trigger("click");
			}, 500);
		}
		reader.readAsDataURL(this.files[0]);
		this.files = [];
		/*
		 * var img = this.files[0].name; img = img.split(".");
		 * if(img[(img.length-1)] == "jpg" || img[(img.length-1)] == "png" ||
		 * img[(img.length-1)] == "jpeg" || img[(img.length-1)] == "JPG" ||
		 * img[(img.length-1)] == "PNG" || img[(img.length-1)] == "JPEG"){
		 * reader.onload = function(e) { options.imgSrc = e.target.result;
		 * cropper = $('.imageBox').cropbox(options);
		 * //$('#btnCrop').trigger("click"); setTimeout(function(){
		 * $('#btnCrop').trigger("click"); },500); } }else{
		 * 
		 * setTimeout(function(){ $('#btnAgain').trigger("click");
		 * $(".container").append('<p class="position_p" style="position:absolute;left:60px;bottom:35px;color:#d00;">请选择正确的图片格式</p>');
		 * },100); }
		 */

	})
	$('#btnCrop')
			.on(
					'click',
					function() {

						var img = cropper.getDataURL();
						$('.cropped').html('');
						$('.cropped')
								.append(
										'<img src="'
												+ img
												+ '" align="absmiddle" style="position:absolute;width:40px;top:10px;left:54px;border-radius:40px;box-shadow:0px 0px 12px #7E7E7E;" >');
						$('.cropped')
								.append(
										'<img src="'
												+ img
												+ '" align="absmiddle" style="position:absolute;top:60px;left:47px;width:60px;margin:15px auto 0;border-radius:60px;box-shadow:0px 0px 12px #7E7E7E;">');
						$('.cropped')
								.append(
										'<img src="'
												+ img
												+ '" align="absmiddle" style="position:absolute;top:147px;left:40px;width:80px;margin:15px auto 0;border-radius:80px;box-shadow:0px 0px 12px #7E7E7E;">');
						$('.cropped').append('<img src="' + img + '"');
					})
	$("#btnSave").on(
			"click",
			function() {
				if ($(".imageBox").css("background-image") == "url("
						+ window.location.href + ")"
						|| $(".imageBox").css("background-image") == "none") {
					getDialogCue("success", "请选择图片");
					setTimeout(function() {
						// showUserData();
						// myTinyDialog.remove();
					}, 1000)
				} else {
					var $imgPath = $(".cropped").eq(0).find("img").attr("src");
					$.ajax({
						url : getRootPath() + "/persondata/upuserimage",// 后端需要给的接口
						type : "post",
						dataType : "json",
						data : {
							"filepath" : $imgPath
						},
						success : function(data) {
							switch (data.status) {
							case 0:
								getDialogCue("success", "上传图片成功");
								setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
								break;
							case 1:
								getDialog("warn", "请先登录");
								setTimeout('location.href = getRootPath() + "/index"',3000) ;
								break;
							default:
								getDialog("fail", "请重试");
								setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
								break;
							setTimeout(function() {
								history.go(0);
							}, 1000)
						}
					}
					})
				}

			})
	/** ***********重新上传************** */
	$("#btnAgain").on("click", function() {
		$(".imageBox").css("background-image", "none");

		$('.u_userIconMask').trigger("click");

		$("#upload-file").trigger("click");
	})
	$('#btnZoomIn').on(
			'click',
			function() {
				if ($(".imageBox").css("background-image") == "url("
						+ window.location.href + ")"
						|| $(".imageBox").css("background-image") == "none") {
					getDialogCue("success", "请选择图片");
					setTimeout(function() {
						// showUserData();
						// myTinyDialog.remove();
					}, 1000)
				} else {
					cropper.zoomIn();
				}
			})
	$('#btnZoomOut').on(
			'click',
			function() {
				if ($(".imageBox").css("background-image") == "url("
						+ window.location.href + ")"
						|| $(".imageBox").css("background-image") == "none") {
					getDialogCue("success", "请选择图片");
					setTimeout(function() {
						// showUserData();
						// myTinyDialog.remove();
					}, 1000)
				} else {
					cropper.zoomOut();
				}

			})
/*													更改头像																	*/
/*													上传形象照	    														*/
	$("#chooseImage").on("click", function() {
		$("#imageUpload").dialog("open");
		var $image = $(".croppers");
		  $image.cropper({
			  aspectRatio:1.29444444444444,
			  done: function(data) {
			    // Output the result data for cropping image.
			  },
			    preview: ".image1,.image2,.image3",
			  
		});
		
		var $inputImage = $("#inputImages");

		  if (window.FileReader) {
		    $inputImage.change(function() {
		    	var fileSize = 0;          
			      if (isIE && !this.files) {      
			        var filePath = this.value;      
			        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");         
			        var file = fileSystem.GetFile (filePath);      
			        fileSize = file.Size;     
			      } else {     
			       fileSize = this.files[0].size;      
			       }    
			       var size = fileSize / 1024 /1024;     
			       if(size>1){   
			      	 alert("附件不能大于1M");   
			      	 return false;
			       }   	
		    	
		    	
		      var fileReader = new FileReader(),
		          files = this.files,
		          file;

		      if (!files.length) {
		        return;
		      }

		      file = files[0];

		      if (/^image\/\w+$/.test(file.type)) {
		        fileReader.readAsDataURL(file);
		        fileReader.onload = function () {
		          $image.cropper("reset", true).cropper("replace", this.result);
		          $inputImage.val("");
		        };
		      } else {
		        showMessage("Please choose an image file.");
		      }
		    });
		  } else {
		    $inputImage.addClass("hide");
		  }
		 $("#uploadImage").click(function() {
			var dataURL = $image.cropper("getDataURL");
			ajaxSelfImageUpLoad(dataURL);
		});
		$("#getDataURLs").click(function() {
			var dataURL = $image.cropper("getDataURL");
			ajaxSelfImageUpLoad(dataURL);
		});  
	})
	function ajaxSelfImageUpLoad(dataURL) {
		$.ajax({
					url : getRootPath() + "/persondata/uploadPhoto",// 后端需要给的接口
					type : "post",
					dataType : "json",
					data : {
						"filepath" : dataURL
					},
					success : function(data) {
						if(data.success == true){
							pianoSelfImage = data.url;
							getDialogCue("success", "上传形象照成功");
							getBasicDatas();
							if(pianoPhotoUrl != '' && pianoPhotoUrl != null){
								$(".piano-image").css("background","#fff");
								$("#pianoPhotoUrls").attr("src",pianoPhotoUrl);
							}
//							$("#pianoSelfImage").css("background-image",data.url);
//							setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000);
						}else{
							getDialog("fail", "形象照上传失败，请重试");
							setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000);
						}setTimeout(function() {
							history.go(0);
						}, 1000)
					
				}
				})
	}

/*													上传形象照	    														*/
			
	$(".u_modifyPas")
			.on(
					"click",
					function() {
						if ($("#tel").html() != "未绑定") {
							$(".u_bangding").hide();
							$(".mbPhoneWrap").show();
						}

						if ($(".u_tijiao").html() != null) {
							$(".u_tijiao").html("下一步");
							$(".u_tijiao").addClass("u_boundBtnmibao");
							$(".u_tijiao").removeClass("u_tijiao");
							$(".u_question .u_select .sel select").removeAttr(
									"disabled");
						}

						$(".u_question .u_answer input").val("");
						$(".u_question .u_answer input").attr("placeholder",
								"您的答案是：");
						$(".u_question .u_answer .n_phoneWrapInfo").remove();

						$(".u_next").remove();
						$(".u_boundBtnmibao").css("margin-left", "108px");
						$(".u_cancel3").css("margin-left", "108px");

						$(".u_bangding .p").remove();
						var pwdScore = 0;
						// console.log("更换密码功能模块");
						$(".u_pas").show();
						$(".u_passwordSafe").hide();
						$(".u_phoneWrap").hide();
						$(".u_verificationWrap").hide();
						$(".u_hideBound").hide();
						$(".u_hideBoundCan").hide();
						$(".u_hideBoundmb").hide();
						$(".u_phoneWrap .p").remove();
						$(".u_pasInfor").show();
						$(".u_mibaoWrap").hide();
						$(".u_boundBtnmibao").hide();
						showUserData();
						$(".u_sureBtn")
								.on(
										"click",
										function() {
											$(".u_twoBtns p").html("");
											var $u_password1 = $(".u_password1")
													.val();
											var $u_password2 = $(".u_password2")
													.val();
											var $u_password3 = $(".u_password3")
													.val();
											// console.log($u_password2.length);
											// console.log($u_password3.length);

											if ($u_password1 == ""
													|| $u_password2 == ""
													|| $u_password3 == "") {
												if ($u_password1 == "") {
													$(
															".u_changeWrap .u_passwordWrap")
															.eq(0)
															.append(
																	'<p class="n_phoneWrapInfo red" style="left:260px">请输入旧密码！</p>');
												} else {
													$(
															".u_changeWrap .u_passwordWrap")
															.eq(0).find("p")
															.remove();
												}
												if ($u_password2 == "") {
													$(
															".u_changeWrap .u_passwordWrap")
															.eq(1)
															.append(
																	'<p class="n_phoneWrapInfo red" style="left:260px">请输入新密码！</p>');
												} else {
													$(
															".u_changeWrap .u_passwordWrap")
															.eq(1).find("p")
															.remove();
												}
												if ($u_password3 == "") {
													$(
															".u_changeWrap .u_passwordWrap")
															.eq(2)
															.append(
																	'<p class="n_phoneWrapInfo red" style="left:260px">请再次输入新密码！</p>');
												} else {
													$(
															".u_changeWrap .u_passwordWrap")
															.eq(2).find("p")
															.remove();
												}

											} else if ($u_password2.length < 6
													|| $u_password2.length > 12) {
												$(".u_changeInfo").html(
														"*您输入的密码不规范");
												$(".u_changeInfo").addClass(
														"red");

											} else if ($u_password2 != $u_password3) {
												$(
														".u_changeWrap .u_passwordWrap:eq(2)")
														.find("p").remove();
												$(
														".u_changeWrap .u_passwordWrap:eq(2)")
														.append(
																'<p class="n_phoneWrapInfo red" style="left:260px">两次密码不一致！</p>');
											} else if ($u_password1 == $u_password2) {
												$(
														".u_changeWrap .u_passwordWrap:eq(1)")
														.find("p").remove();
												$(
														".u_changeWrap .u_passwordWrap:eq(1)")
														.append(
																'<p class="n_phoneWrapInfo red" style="left:260px">新密码不能与旧密码相同！</p>');
											} else if ($u_password2.length > 5
													&& $u_password2.length < 13) {
												if ($u_password2.length == 6) {
													pwdScore = 5;
												} else if ($u_password2.length < 10) {
													pwdScore = 10;
												} else {
													pwdScore = 25;
												}

												// 字母
												if (/^(([0-9A-Z_]*[A-Z][0-9A-Z_]*)|([0-9a-z_]*[a-z][0-9a-z_]*))$/
														.test($u_password2)) // 字母全为大写或者小写
												{
													pwdScore += 10;
												} else if (/^(([0-9A-Za-z_]*[A-Z][0-9A-Za-z_]*[a-z][0-9A-Za-z_]*))|([0-9A-Za-z_]*[a-z][0-9A-Za-z_]*[A-Z][0-9A-Za-z_]*)$/
														.test($u_password2)) // 包含大小写混合字母
												{
													pwdScore += 20;
												}

												// 数字
												var isNum = '0';
												var isNumAllSame = 1;
												var numbertimes = 0;
												for (var i = 0; i < $u_password2.length; i++) {
													var c = $u_password2[i];
													if (c >= '0' && c <= '9') {
														if (numbertimes > 0
																&& isNum != c)
															isNumAllSame = 0;
														numbertimes++;
														isNum = c;
													}
												}
												if (isNumAllSame == 1) // 数字全相同
												{
													pwdScore += 10;
												} else if (numbertimes >= 5) // 包含五个数字，
												{
													pwdScore += 20
												}
												;

												// 下划线
												if (/^(_[0-9a-zA-Z]+)$/
														.test($u_password2)) // 下划线出现在首位
												{
													pwdScore += 10;
												} else if (/^([0-9a-zA-Z]+_)$/
														.test($u_password2)) // 下划线出现在未尾
												{
													pwdScore += 10;
												} else if (/^([0-9a-zA-Z]+_[0-9a-zA-Z]+)$/
														.test($u_password2)) // 下划线出现在中间
												{
													pwdScore += 20;
												}
												// 奖励
												if (/^([0-9a-zA-Z_]*[0-9]+[0-9a-zA-Z_]*)$/
														.test($u_password2)) // 如果有数字
												{
													if (/^([0-9a-zA-Z]*_+[0-9a-zA-Z_]*)$/
															.test($u_password2)) // 有下划线
													{
														if (/^([0-9A-Za-z_]*(([A-Z][0-9A-Za-z_]*[a-z])|([a-z][0-9A-Za-z_]*[A-Z]))[0-9A-Za-z_]*)$/
																.test($u_password2)) // 包含大小写字母
														{
															pwdScore += 15;
														} else if (/^(([0-9A-Z_]*[A-Z][0-9A-Z_]*)|([0-9a-z_]*[a-z][0-9a-z_]*))$/
																.test($u_password2)) // 大写字母或者小写字母
														{
															pwdScore += 10;
														}

													} else if (/^([0-9a-zA-Z_]*[a-zA-Z][0-9a-zA-Z_]*)$/
															.test($u_password2)) // 有字母
													{
														pwdScore += 5;
													}
												}

												if (pwdScore >= 80) { // 强
													// console.log($u_password2);
													// console.log("强");
													$(".u_passwordSafe span")
															.eq(1)
															.css("background",
																	"url(images/password1.png) no-repeat 0 0");
													$(".u_passwordSafe em")
															.html("强");
													nLevel = 3;
												} else if (pwdScore >= 60) { // 中
													// console.log($u_password2);
													// console.log("中");
													$(".u_passwordSafe span")
															.eq(1)
															.css("background",
																	"url(images/password1.png) no-repeat 0 -17px");
													$(".u_passwordSafe em")
															.html("中");
													nLevel = 2;
												} else { // 弱
													// console.log($u_password2);
													// console.log("弱");
													$(".u_passwordSafe span")
															.eq(1)
															.css("background",
																	"url(images/password1.png) no-repeat 0 -32px");
													$(".u_passwordSafe em")
															.html("弱");
													nLevel = 1;

												}

												myData.changePassword();
											} else {
												$(".u_changeInfo").html(
														"您输入的密码不规范");
												$(".u_changeInfo").css("color",
														"#d00");
											}

										})
					})

	/** ***********************新增修改用户头像*********************************** */
	// $(".u_userIconMask").on("click",function(){
	//
	// var options =
	// {
	// thumbBox: '.thumbBox',
	// spinner: '.spinner',
	// imgSrc: ''
	// }
	// $('#upload-file').on('change', function(){
	// $(".container .position_p").remove();
	// //console.log(filename)
	// $(".new-contentarea").css("display","none");
	// var reader = new FileReader();
	// reader.onload = function(e) {
	// options.imgSrc = e.target.result;
	// cropper = $('.imageBox').cropbox(options);
	// //$('#btnCrop').trigger("click");
	// setTimeout(function(){
	// $('#btnCrop').trigger("click");
	// },500);
	// }
	// reader.readAsDataURL(this.files[0]);
	// this.files = [];
	// var img = this.files[0].name;
	// img = img.split(".");
	// //console.log(img[(img.length-1)]);
	// if(img[(img.length-1)] == "jpg" || img[(img.length-1)] == "png" ||
	// img[(img.length-1)] == "jpeg" || img[(img.length-1)] == "JPG" ||
	// img[(img.length-1)] == "PNG" || img[(img.length-1)] == "JPEG"){
	// reader.onload = function(e) {
	// options.imgSrc = e.target.result;
	// cropper = $('.imageBox').cropbox(options);
	// //$('#btnCrop').trigger("click");
	// setTimeout(function(){
	// $('#btnCrop').trigger("click");
	// },500);
	// }
	// }else{
	//            
	// setTimeout(function(){
	// $('#btnAgain').trigger("click");
	// $(".container").append('<p class="position_p"
	// style="position:absolute;left:60px;bottom:35px;color:#d00;">请选择正确的图片格式</p>');
	// },100);
	// }
	//             
	// })
	// // $('#btnCrop').on('click', function(){
	// //
	// // var img = cropper.getDataURL();
	// // $('.cropped').html('');
	// // $('.cropped').append('<img src="'+img+'" align="absmiddle"
	// style="width:40px;margin:15px auto 0;border-radius:40px;box-shadow:0px
	// 0px 12px #7E7E7E;" >');
	// // $('.cropped').append('<img src="'+img+'" align="absmiddle"
	// style="width:60px;margin:15px auto 0;border-radius:60px;box-shadow:0px
	// 0px 12px #7E7E7E;">');
	// // $('.cropped').append('<img src="'+img+'" align="absmiddle"
	// style="width:80px;margin:15px auto 0;border-radius:80px;box-shadow:0px
	// 0px 12px #7E7E7E;">');
	// // })
	// $("#btnSave").on("click",function(){
	// if($(".imageBox").css("background-image")=="url("+window.location.href+")"
	// || $(".imageBox").css("background-image")=="none"){
	// // getDialog('<div class="dialogCon u_haveBorder">'
	// // +'<h3 class="u_schoolTitle">更改头像</h3>'
	// // +'<div class="u_mbSucc">请先选择图片!</div>'
	// // +'</div>');
	// setTimeout(function(){
	// // showUserData();
	// myTinyDialog.remove();
	// },1000)
	// }else{
	// myData.upuserimage();
	// }
	//        
	// })
	// *//*************重新上传***************//*
	// $("#btnAgain").on("click",function(){
	// $(".imageBox").css("background-image","none");
	//        
	// $('.u_userIconMask').trigger("click");
	//
	// $("#upload-file").trigger("click");
	// })
	// $('#btnZoomIn').on('click', function(){
	// //console.log($(".imageBox").css("background-image"))
	// if($(".imageBox").css("background-image")=="url("+window.location.href+")"
	// || $(".imageBox").css("background-image")=="none"){
	// // getDialog('<div class="dialogCon u_haveBorder">'
	// // +'<h3 class="u_schoolTitle">更改头像</h3>'
	// // +'<div class="u_mbSucc">请先选择图片!</div>'
	// // +'</div>');
	// setTimeout(function(){
	// showUserData();
	// myTinyDialog.remove();
	// },1000)
	// }else{
	// cropper.zoomIn();
	// }
	// })
	// $('#btnZoomOut').on('click', function(){
	// if($(".imageBox").css("background-image")=="url("+window.location.href+")"
	// || $(".imageBox").css("background-image")=="none"){
	// // getDialog('<div class="dialogCon u_haveBorder">'
	// // +'<h3 class="u_schoolTitle">更改头像</h3>'
	// // +'<div class="u_mbSucc">请先选择图片!</div>'
	// // +'</div>');
	// setTimeout(function(){
	// showUserData();
	// myTinyDialog.remove();
	// },1000)
	// }else{
	// cropper.zoomOut();
	// }
	//        
	// })
	//
	// $(".u_touxiangCancel").on("click",function(){
	// myTinyDialog.remove();
	// })
	// $(".u_touxiangSub").on("click",function(){
	// var oCutImg = new CutImg();
	// oCutImg.saveImg();
	//
	// })
	//        
	//        
	//        
	//        
	// })
	$(".mbChangePhone").on('click', function() {
		showUserData();
		setTimeout(function() {
			if ($(".u_tijiao").html() != null) {
				$(".u_tijiao").html("下一步");
				$(".u_tijiao").addClass("u_boundBtnmibao");
				$(".u_tijiao").removeClass("u_tijiao");
				$(".u_question .u_select .sel select").removeAttr("disabled");
			}

			$(".u_question .u_answer input").val("");
			$(".u_question .u_answer input").attr("placeholder", "您的答案是：");
			$(".u_question .u_answer .n_phoneWrapInfo").remove();

			$(".u_next").remove();
			$(".u_boundBtnmibao").css("margin-left", "108px");
			$(".u_cancel3").css("margin-left", "108px");

			$(".u_bangding").show();
			$(".mbPhoneWrap").hide();

			$(".u_bangding .p").remove();
			$(".u_phoneWrap").show();
			$(".u_phoneWrap").css("margin-top", "0");
			$(".u_cancel2").css("top", "192px");
			$(".u_phoneWrap_old").show();
			$(".u_verificationWrap").show();
			$(".u_hideBound").show();
			$(".u_hideBoundCan").show();
			$(".u_hideBoundmb").hide();
			$(".u_mibaoTitle").show();
			$(".u_passwordSafe").show();
			$(".u_mibaoWrap").hide();
			$(".u_boundBtnmibao").hide();
			$(".u_bangding .u_pasInfor").hide();
			$(".u_pas").hide();
			$(".u_on1").show();
		}, 200);

	})
	/** *********************************到此为止******************* */
})
// 展示该用户的信息
function showUserData() {
	$
			.ajax({
				url : getRootPath() + "/ listpersonaldata",// 后端需要给的接口
				type : "post",
				dataType : "json",
				success : function(data) {
					// alert(data.safequestion.strQuestion2);
					switch (data.status) {
					case 0:
						var stuT;
						$(".u_userIconWrap .u_userIcon")
								.html(
										'<img src="'
												+ data.personaldata.avatarUrl
												+ '" alt="" width="132" height="132"/>');
						$(".u_userIconWrap .u_nameSex .u_name").html(
								data.personaldata.realName + '<span>('
										+ data.personaldata.nickName
										+ ')</span>');
						$(".u_userIconWrap .u_sexID .u_sex").addClass("change");

						// console.log($(".u_userCenterCon
						// li").eq(0).find(".u_writeData").html());
						if (data.personaldata.userType == 30) {

							stuT = "学生";
							var stuInfo = "学&nbsp;&nbsp;&nbsp;号：";
						} else if (data.personaldata.userType == 40) {
							stuT = "老师";
							var stuInfo = "工&nbsp;&nbsp;&nbsp;号：";
						}
						$(".u_userIconWrap .u_sexID .u_ID").html(stuT);

						// if($(".u_userData").hasClass("click")){
						// 判断教育信息是否存在, by ljs 9-28 15:57
						if (!data.personeduinfo) {
							console.log("ddd");
							$(".u_userCenterCon li")
									.eq(0)
									.find(".u_writeData")
									.html(
											'<p class="u_on"><span class="u_infor" id="u_infor">用户ID：</span><span class="u_uid">'
													+ data.personaldata.uid
													+ '</span></p>'
													+ '<p><span class="u_infor u_infor1">'
													+ stuInfo
													+ '</span><span>'
													+ data.personaldata.uname
													+ '</span></p>'
													+ '<p><span class="u_infor">昵&nbsp;&nbsp;&nbsp;称：</span><span class="u_petname"><input type="text" value="'
													+ data.personaldata.nickName
													+ '" readOnly="true"></span></p>'
													+ '<p><span class="u_infor">身&nbsp;&nbsp;&nbsp;份：</span><span>'
													+ stuT
													+ '</span></p>'
													+ '<p><span class="u_infor u_boygirl">性&nbsp;&nbsp;&nbsp;别：</span><span class="u_boy"><em class="click"></em>男</span><span class="u_girl"><em></em>女</span></p>'
													+ '<p><span class="u_infor">手机号：</span><span id="tel">'
													+ data.personaldata.mobile
													+ '</span></p>'
													+ '<p class="u_Introduction" style="line-height:20px;"><span class="u_infor">简&nbsp;&nbsp;&nbsp;介：</span><span class="u_textarea"><textarea name="" id="" readOnly="true">'
													+ data.personaldata.description
													+ '</textarea></span></p>'
													+ '<div class="u_saveCancel"><span class="u_save"></span><span class="u_cancel"></span></div>'
													+ '<div style="font-weight:bold; font-size:16px;height:80px;line-height:100px;">学籍信息</div>'
													+ '<p><span class="u_infor">学&nbsp;&nbsp;&nbsp;校：</span><span> </span></p>'
													+ '<p><span class="u_infor">院&nbsp;&nbsp;&nbsp;系：</span><span> </span></p>'
													+ '<p><span class="u_infor">专&nbsp;&nbsp;&nbsp;业：</span><span> </span></p>'
													+ '<p class=" u_infor1"><span class="u_infor">班&nbsp;&nbsp;&nbsp;级：</span><span> </span></p>');
						} else {
							if (data.personeduinfo.collegeClassName = "") {
								data.personeduinfo.collegeClassName = 0;
							}
							$(".u_userCenterCon li")
									.eq(0)
									.find(".u_writeData")
									.html(
											'<p class="u_on"><span class="u_infor" id="u_infor">用户ID：</span><span class="u_uid">'
													+ data.personaldata.uid
													+ '</span></p>'
													+ '<p><span class="u_infor u_infor1">'
													+ stuInfo
													+ '</span><span>'
													+ data.personaldata.uname
													+ '</span></p>'
													+ '<p><span class="u_infor">昵&nbsp;&nbsp;&nbsp;称：</span><span class="u_petname"><input type="text" value="'
													+ data.personaldata.nickName
													+ '" readOnly="true"></span></p>'
													+ '<p><span class="u_infor">身&nbsp;&nbsp;&nbsp;份：</span><span>'
													+ stuT
													+ '</span></p>'
													+ '<p><span class="u_infor u_boygirl">性&nbsp;&nbsp;&nbsp;别：</span><span class="u_boy"><em class="click"></em>男</span><span class="u_girl"><em></em>女</span></p>'
													+ '<p><span class="u_infor">手机号：</span><span id="tel">'
													+ data.personaldata.mobile
													+ '</span></p>'
													+ '<p class="u_Introduction" style="line-height:20px;"><span class="u_infor">简&nbsp;&nbsp;&nbsp;介：</span><span class="u_textarea"><textarea name="" id="" readOnly="true">'
													+ data.personaldata.description
													+ '</textarea></span></p>'
													+ '<div class="u_saveCancel"><span class="u_save"></span><span class="u_cancel"></span></div>'
													+ '<div style="font-weight:bold; font-size:16px;height:80px;line-height:100px;">学籍信息</div>'
													+ '<p><span class="u_infor">学&nbsp;&nbsp;&nbsp;校：</span><span>'
													+ data.personeduinfo.university
													+ '</span></p>'
													+ '<p><span class="u_infor">院&nbsp;&nbsp;&nbsp;系：</span><span>'
													+ data.personeduinfo.college
													+ '</span></p>'
													+ '<p><span class="u_infor">专&nbsp;&nbsp;&nbsp;业：</span><span>'
													+ data.personeduinfo.major
													+ '</span></p>'
													+ '<p class=" u_infor1"><span class="u_infor">班&nbsp;&nbsp;&nbsp;级：</span><span>'
													+ data.personeduinfo.collegeClassName
													+ '</span></p>');

						}
						if (data.personaldata.sex == 2) {
							// modify by ljs 9-18
							$(".u_girl").find("em").addClass("click");
							$(".u_boy").find("em").removeClass("click")
							$(".u_girl em").hide();
							$(".u_boy").hide();
						} else {
							// modify by ljs 9-18
							$(".u_boy").find("em").addClass("click");
							$(".u_girl").find("em").removeClass("click");

							$(".u_girl").hide();
							$(".u_boy em").hide();
						}
						if (data.personaldata.userType == 40) {
							$("u_infor1").hide();
						}
						if (data.personaldata.mobile == "") {
							$("#tel").html("未绑定");
							console.log(data.personaldata.mobile);
						} else {
							// 后台数据手机号已做处理，前端不再处理，直接显示，by ljs 9-28 15:15
							// $("#tel").html($("#tel").html().substring(0,2)+'*****'+$("#tel").html().substring(9,11));
							$(".u_phoneWrap").hide();
							$(".u_verificationWrap").hide();
							$(".u_hideBound").hide();
							$(".u_hideBoundCan").hide();
							$(".u_hideBoundmb").hide();
							$(".u_on1").hide();
							// add by ljs 9-28 14:41
							$(".u_bangding").hide();
							$(".mbPhoneWrap").show();
							$(".mbPhoneWrap .mbPhoneNum span").html(
									$("#tel").html());
						}

						if (data.safeLevel == "弱") {
							$(".u_passwordSafe span")
									.eq(1)
									.css("background",
											"url(images/password1.png) no-repeat 0 -32px");

						} else if (data.safeLevel == "中") {
							$(".u_passwordSafe span")
									.eq(1)
									.css("background",
											"url(images/password1.png) no-repeat 0  -17px");
						} else if (data.safeLevel == "强") {
							$(".u_passwordSafe span").eq(1).css("background",
									"url(images/password1.png) no-repeat 0  0");
						}
						$(".u_passwordSafe em").html(data.safeLevel);

						if (data.safequestion) {

							// $(".u_mibaoTitle").show();
							$(".u_mibaoTitle")
									.html(
											'您已设置密保问题，为了保证账户安全，<br />请勿随意泄露密保问题，您也可以再次<span class="u_bound u_bound2 hasMb">修改密保</span>问题~');

							$(".u_boundBtnmibao").hide();

							$(".sel").eq(0).find("span").html(
									data.safequestion.strQuestion1);
							$(".sel").eq(1).find("span").html(
									data.safequestion.strQuestion2);
							$(".sel").eq(2).find("span").html(
									data.safequestion.strQuestion3);

							$(".u_mibaoWrap .u_pasInfor").html(
									"请填写你原设置的密保问题答案：");
							$(".u_question .u_select .sel select").attr(
									"disabled", "disabled");
							$(".u_question .u_select .sel").css("border",
									"1px solid rgb(222, 222, 222)");
							$(".u_question .u_answer input").val("");
							$(".u_question .u_answer input").attr(
									"placeholder", "您的答案是：");
						}
						break;
					default:
						$(".u_userCenterCon")
								.html(
										'<div class="defaultWrap" style="width:500px;height:500px;margin:100px auto;text-align:center"><h2 style="font-size:30px;line-height:100px;">哎呀，出错了</h2><p style="height:30px;font-size:14px;">遇见「我」纯属巧合，可能原因：</p><p style="height:30px;font-size:14px;">1、您的网络不稳定</p><p style="height:30px;font-size:14px;">2、您刚刚操作过猛</p><div class="defaultBtnWrap" style="width:319px;height:36px;margin:20px auto 0"><div style="width:136px;height:33px;background:url(images/errorBtn.png) no-repeat 0 0;float:left;cursor:pointer;"></div><div style="width:136px;height:33px;background:url(images/errorBtn.png) no-repeat -183px 0;float:right;cursor:pointer;"></div></div></div>');
						$(".defaultBtnWrap div:eq(0)")
								.hover(
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat 0 -46px");
										},
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat 0 0");
										})
						$(".defaultBtnWrap div:eq(1)")
								.hover(
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat -183px -47px");
										},
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat -183px 0");
										})
						$(".defaultBtnWrap div:eq(0)").on("click", function() {
							location.href = getRootPath();
						})
						$(".defaultBtnWrap div:eq(1)").on("click", function() {
							history.go(0);
						})
						break;

					}
				}
			})
}

// 保存所更改后的信息
function saveUserData() {
	var uid = $(".u_uid").html();
	// console.log(uid)
	var usernickname = $(".u_petname").find("input").val();
	var usersex = "";
	$(".u_textarea textarea").attr("readOnly", "true");
	var userdesc = $(".u_textarea textarea").val();
	// console.log(userdesc)
	if ($(".u_boy em").hasClass("click")) {
		usersex = 1;
	} else {
		usersex = 2;
	}
	var userData = {
		"userid" : uid,
		"usernickname" : usernickname,
		"usersex" : usersex,
		"userdesc" : userdesc
	}
	$
			.ajax({
				url : getRootPath() + "/updatepersonaldata",// 后端需要给的接口
				type : "post",
				dataType : "json",
				data : userData,
				success : function(data) {
					switch (data.status) {
					case 0:
						$(".u_petname").find("input").css("border", "none");
						$(".u_textarea textarea").css("border", "none");
						$(".u_userCenterCon").find(".u_writeData input").attr(
								"readOnly", true);
						$(".u_userCenterCon").find("textarea").attr("readOnly",
								true);

						// getDialog('<div class="dialogCon u_haveBorder">'
						// +'<div class="u_mbSucc">恭喜您，已经修改成功！</div>'
						// +'</div>');
						setTimeout(function() {
							showUserData();
							myTinyDialog.remove();
						}, 1000)
						// location.href = getRootPath()+"/loginOut" //退出网站
						break;
					case -2:
						$(".u_Introduction p").remove();
						$(".u_writeData p:eq(2)")
								.append(
										'<p style="padding-left:20px;font-size:14px;color:#d00;float:left">该昵称不能多于8个字</p>');
						break;
					default:
						// getDialog('<div class="dialogCon u_haveBorder">'
						// +'<div class="defaultWrap"
						// style="height:300px;margin:10px
						// auto;text-align:center"><h2
						// style="font-size:30px;line-height:100px;">哎呀，出错了</h2><p
						// style="height:30px;font-size:14px;">遇见「我」纯属巧合，可能原因：</p><p
						// style="height:30px;font-size:14px;">1、您的网络不稳定</p><p
						// style="height:30px;font-size:14px;">2、您刚刚操作过猛</p><div
						// class="defaultBtnWrap"
						// style="width:319px;height:36px;margin:20px auto
						// 0"><div
						// style="width:136px;height:33px;background:url(images/errorBtn.png)
						// no-repeat 0 0;float:left;cursor:pointer;"></div><div
						// style="width:136px;height:33px;background:url(images/errorBtn.png)
						// no-repeat -183px
						// 0;float:right;cursor:pointer;"></div></div></div>'
						// +'</div>');
						// console.log(data.status+"-----data.status--------------------||||");

						$(".defaultBtnWrap div:eq(0)")
								.hover(
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat 0 -46px");
										},
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat 0 0");
										})
						$(".defaultBtnWrap div:eq(1)")
								.hover(
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat -183px -47px");
										},
										function() {
											$(this)
													.css("background",
															"url(images/errorBtn.png) no-repeat -183px 0");
										})
						$(".defaultBtnWrap div:eq(0)").on("click", function() {
							location.href = getRootPath();
						})
						$(".defaultBtnWrap div:eq(1)").on("click", function() {
							history.go(0);
						})
						break;
					// console.log("数据失败");
					}

				}
			})
}

function getStudentInfos() {
	$(".st_card .st_img").remove();
	var url = getRootPath() + "/persondata/listpersonaldata";
	$
			.ajax({
				url : url,
				type : 'post',
				data : {},
				dataType : 'json',
				success : function(data) {
					if (data.status == -1) {
						getDialog("warn", "请先登录");
						setTimeout('location.href = getRootPath() + "/index"',3000) ;
					} else if (data.status == 0) {
						var html = '';
						var personal = data.personaldata;
						var personeduinfo = data.personeduinfo;
						$(".infost").eq(0).html(
								isVerifyNull(personeduinfo.university));
						$(".infost").eq(1)
								.html(isVerifyNull(personal.realName));
						$(".infost").eq(2).html(isVerifyNull(personal.uname));
						$(".infost").eq(3).html(
								isVerifyNull(personeduinfo.college));
						$(".infost").eq(4).html(
								isVerifyNull(personeduinfo.major));
						$(".infost").eq(5).html(
								isVerifyNull(personeduinfo.collegeClassName));
						html += '<div class="st_img">';
						html += '<img alt="" src='
								+ personal.avatarUrl
								+ ' class="st_poi" width="140px" height="140px">';
						if (personal.userType == 40) {
							html += '<p>教师身份</p>';
							$(".st_info").html("教师卡");
						} else {
							html += '<p>学生身份</p>';
						}
						html += '</div>';

						$(".st_card").append(html);
					} else {
						getDialog("fail", "请重试");
						setTimeout('location.href = getRootPath() + "/persondata/toAccount"',3000) ;
					}
				}
			});

}

function getSafetyInfos() {
	var url = getRootPath() + "/persondata/listpersonaldata";
	$.ajax({
		url : url,
		type : 'post',
		data : {},
		dataType : 'json',
		success : function(data) {
			if (data.status == -1) {
				getDialog("warn", "请先登录");
				setTimeout('location.href = getRootPath() + "/index"',3000) ;
			} else if (data.status == 0) {
				var personal = data.personaldata;
				var safeLevel = data.safeLevel;
				var safequestion = data.safequestion;
				if (personal.mobile == null || personal.mobile == "") {
					$("#unbind").show();
				} else {
					$("#unbind").hide();
					$("#alreadyBind").show();
					$("#change_mobile").show();
					$("#bind_mobile_imme").hide();
					// $("#safe_level").show();
					$("#b_mobile").show();
					$("#b_mobile").css({
						"color" : "#51a4f6",
						"font-size" : "16px"
					});
					// $("#safe_level").html(isVerifyNull(safeLevel));
					if (safeLevel == '强') {
						$("#safeWeak").hide();
						$("#safeStrong").show();
					} else if (safeLevel == '中') {
						$("#safeWeak").hide();
						$("#safeMiddle").show();
					} else {
						$("#safeWeak").show();
					}
					$("#b_mobile").html(isVerifyNull(personal.mobile));
					beforeMobile = personal.mobile;
				}
				if (safequestion != undefined) {
					if (safequestion.strQuestion1 != null
							&& safequestion.strQuestion1 != "") {
						$("#set_imme").hide();
						$("#changeEncrypted").show();
						$("#setOrChgEncry .m_chg_cot").find("p").eq(0).html(
								"为了您的账号安全，降低风险，");
						$("#setOrChgEncry .m_chg_cot").find("p").eq(1).html(
								"请选择不定期更换密保问题吧~");
					} else {
						$("#set_imme").show();
						$("#changeEncrypted").hide();
					}
				} else {
					$("#setOrChgEncry .m_chg_cot").find("p").css("color",
							"#58cb72");
				}
			} else {
				getDialog("fail", "请重试");
				setTimeout('location.href = getRootPath() + "/persondata/toAccount"',3000) ;
			}
		}
	});

}

function getBasicDatas() {
	var url = getRootPath() + "/persondata/listpersonaldata";
	$.ajax({
				url : url,
				type : 'post',
				data : {},
				dataType : 'json',
				success : function(data) {
					if (data.status == -1) {
						getDialog("warn", "请先登录");
						setTimeout('location.href = getRootPath() + "/index"',3000) ;
					} else if (data.status == 0) {
						$(".bottom_content th").css("width", "150px");
						var personal = data.personaldata;
						$("#userIdData").html(
								isVerifyNull(personal.uid));
						$("#userNameData").html(
								isVerifyNull(personal.realName));
						$("#nickNameData").html(
								isVerifyNull(personal.nickName));
						if (personal.sex == 1) {
							$("#sexData").html("男");
						} else {
							$("#sexData").html("女");
						}
						if (personal.birthMonth < 10) {
							personal.birthMonth = "0" + personal.birthMonth;
						}
						if (personal.birthDay < 10) {
							personal.birthDay = "0" + personal.birthDay;
						}
						$("#birthDayData").html(
								personal.birthYear + "-" + personal.birthMonth
										+ "-" + personal.birthDay);
						$("#phoneData").html(
								isVerifyNull(personal.mobile));
						// if(personal.email == null || personal.email == ""){
						// $("tr").eq(3).find("td").eq(1).html("<span
						// class='r_v_sel'>尚未绑定邮箱，是否<a href=''style='color:
						// blue;'>立即绑定</a></span>？");
						// }else{
						// $("tr").eq(3).find("td").eq(1).html(personal.email);
						// }
//						$("#techYearsData").html(
//								personal.teachYears + "年");
						if (personal.avatarUrl != null
								&& personal.avatarUrl != "") {
							$(".u_userIconMask").find("img").attr("src",
									personal.avatarUrl);
						}
						// if(data.showteacherinfo == 0){
//						$("#occupationData")
//								.html(personal.occupation);
//						// }else{
						// $("tr").eq(4).hide();
						// }
//						$("#companyData").html(personal.company);
						$("#signatureData").html(
								isVerifyNull(personal.signature));
						$("#moreData").html(
								isVerifyNull(personal.description));
						resetAccountData();
						pianoPhotoUrl = personal.photoUrl;
					} else {
						getDialog("fail", "请重试");
						setTimeout('location.href = getRootPath() + "/persondata/toAccount"',3000) ;
					}
				}
			});
}

function resetAccountData(){
	var userName = $("#userNameData").html();
	var nickName = $("#nickNameData").html();
	if(userName == '无'){
		userName = '';
	}
	var sex = $("#sexData").html();
	var birth = $("#birthDayData").html();
	var eduAge = $("#techYearsData").html();
//	var ty = eduAge.substr(0, eduAge.length - 1); // 教龄
//	var occupation = $("#occupationData").html();
//	var company = $("#companyData").html();
	var signature = $("#signatureData").html();
	var more = $("#moreData").html();

	oldUserName = userName;
	oldNickName = nickName;
	oldSex = sex;
	oldBirth = birth;
//	oldTech = ty;
//	oldOccupation = occupation;
//	oldCompany = company;
	oldSignature = signature;
	oldMore = more;

	var year = birth.substring(0, 4);
	var month = birth.substring(5, 7);
	if (month < 10) {
		month = "0" + month;
	}
	var day = birth.substring(8, 10);
	if (day < 10) {
		day = "0" + day;
	}
	if (sex == '男') {
		sex = 1;
	} else {
		sex = 2;
	}

	// $("tr").eq(0).find("td").eq(0).html("<input
	// type='text' id='userId' class='r_v_table'
	// value='"+userId+"'>");
	$("#userNameData")
			.html(
					"<input type='text' id='userName' name='userName' class='r_v_table' placeholder='请填写真实姓名，方便学习与沟通~' value='"
							+ userName
							+ "' maxlength='20'/><span class='info'></span>");
	$("#nickNameData")
			.html(
					"<input type='text' id='nickName' name='nickName' class='r_v_table' value='"
							+ nickName
							+ "' maxlength='10' placeholder='请填写昵称~~'><span class='basic_info'></span>");
	if (sex == 1) {
		$("#sexData")
		.html(
			"<input type='radio' value='男' id='sex' name='sex' checked	>男&nbsp;&nbsp; <input type='radio' value='女' id='sex' name='sex'>女");
		
	} else {
		$("#sexData")
		.html(
			"<input type='radio' value='男' id='sex' name='sex'	>男&nbsp;&nbsp; <input type='radio' value='女' id='sex' name='sex' checked>女");
	}
	$("#birthDayData")
			.html(
					"<input type='text' id='birth' name='birth' onFocus=\"WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true})\" class='r_v_table' value='"
							+ birth + "'><span class='basic_info'>");
	// $("tr").eq(4).find("td").eq(0).html("<input
	// type='text' id='startDate' name='startDate'
	// class='q_r_tech'
	// onFocus=\"WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\\'endDate\\')}'})\">
	// &nbsp;&nbsp;至&nbsp;&nbsp;<input type='text'
	// id='endDate' name='endDate' class='q_r_tech'
	// onFocus=\"WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\\'startDate\\')}'})\">");
//	$("#techYearsData")
//			.html(
//					"<input type='number' id='techYears' name='techYears' maxlength='5' style='width:150px;height:25px' value='"
//							+ ty
//							+ "' min='0' max='60'>&nbsp;&nbsp;年<span class='basic_info'></span>");
	// $("tr").eq(4).find("td").eq(1).html("<select
	// name='field1' class='r_v_sel'><option
	// value='0'>分类</option><option
	// value='1'>艺术</option><option
	// value='2'>音乐</option><option
	// value='3'>高校</option></select>&nbsp;&nbsp; <select
	// name='field2' class='r_v_sel'><option
	// value='0'>专业</option><option
	// value='1'>乐器</option><option
	// value='2'>唱歌</option><option
	// value='3'>指挥</option><option
	// value='4'>作曲</option></select>&nbsp;&nbsp; <select
	// name='field3' class='r_v_sel'><option
	// value='0'>科目</option><option
	// value='1'>吉他</option><option
	// value='2'>钢琴</option><option
	// value='3'>小提琴</option><option
	// value='4'>二胡</option></select>");
//	if (occupationData == '在职教师') {
//		$("#occupationData")
//				.html(
//						"<select name='professional' id='professional' class='r_v_pro'></option><option value='1' selected>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//	} else if (occupationData == '在校学生') {
//		$("#occupationData")
//				.html(
//						"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2' selected>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//	} else if (occupationData == '社会人士') {
//		$("#occupationData")
//				.html(
//						"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3' selected>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//	} else if (occupationData == '培训老师') {
//		$("#occupationData")
//				.html(
//						"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4' selected>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//	} else if (occupationData == '坐班白领') {
//		$("#occupationData")
//				.html(
//						"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5' selected>坐班白领</option><option value='6'>门卫大叔</option></select>");
//	} else if (occupationData == '门卫大叔') {
//		$("#occupationData")
//				.html(
//						"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6' selected>门卫大叔</option></select>");
//	} else {
//		$("#occupationData")
//				.html(
//						"<select name='professional' id='professional' class='r_v_pro'></option><option value='1'>在职教师</option><option value='2'>在校学生</option><option value='3'>社会人士</option><option value='4'>培训老师</option><option value='5'>坐班白领</option><option value='6'>门卫大叔</option></select>");
//	}
//	$("#companyData")
//			.html(
//					"<input type='text' id='workPlace' name='workPlace' class='r_v_table' placeholder='你目前的学校/机构/单位是？' maxlength='20' value='"
//							+ company + "'>");
	$("#signatureData")
			.html(
					"<textarea rows='7' cols='3' id='signature' name='signature'	placeholder='一句话介绍自己~' cols='4' style='width: 595px; height: 60px;resize: none;border:1px solid #e5e5e5;text-indent: 5px;' maxlength='100'>"
							+ signature + "</textarea>");
	$("#moreData")
			.html(
					"<textarea rows='7' cols='3' class='t_more' id='description' name='description' placeholder='留下有关你的更多信息，让大家更了解你吧~'>"
							+ more + "</textarea>");
}

function checkPwd(oldPwd, newPwd, newAgainPwd) {
	if (isValidOldPwd(oldPwd) && isValidNewPwd(newPwd)
			&& isValidNewAgainPwd(newAgainPwd)
			&& isValidRePwd(newPwd, newAgainPwd)) {
		return true;
	} else {
		return false;
	}
}
function checkForm() {
	var nickName = $.trim($("#nickName").val());
//	var techYears = $.trim($("#techYears").val());
	var birth = $("#birth").val();
	if (isValidNickName(nickName) && isValidBirth(birth) 
//			&& isValidTechYears(techYears)
			) {
		return true;
	} else {
		return false;
	}
}
function selectChange2() {
	var qObj = {
		elmt : 'select',
		tip : '请选择你的密保问题',
		tVal : '',
		cur : [],
		arr : {
			'你闺蜜叫什么名字？' : '你闺蜜叫什么名字？',
			'你大学班主任叫什么名字？' : '你大学班主任叫什么名字？',
			'你的父亲叫什么名字？' : '你的父亲叫什么名字？',
			'你的母亲叫什么名字？' : '你的母亲叫什么名字？',
			'你就读的小学叫什么名字？' : '你就读的小学叫什么名字？',
			'你就读的初中叫什么名字？' : '你就读的初中叫什么名字？',
			'你就读的高中叫什么名字？' : '你就读的高中叫什么名字？',
			'你父亲的生日是哪天 （如19720802）？' : '你父亲的生日是哪天 （如19720802）？',
			'你母亲的生日是哪天 （如19720802）？' : '你母亲的生日是哪天 （如19720802）？',
			'你最感兴趣的一门课程是？' : '你最感兴趣的一门课程是？',
			'你最喜欢的一本书是？' : '你最喜欢的一本书是？',
			'你最擅长的一种运动是？' : '你最擅长的一种运动是？',
			'你最喜欢的车是？' : '你最喜欢的车是？'
		}
	}
	$(function() {
		// 获取所有的select选框
		var elements = $(qObj.elmt);
		// 这一步只是初始化操作，将所有问题写入select选框
		elements.each(function(i) {
			var html = '<option value="' + qObj.tVal + '">' + qObj.tip
					+ '</option>';
			for ( var q in qObj.arr) {
				html += '<option value="' + q + '">' + qObj.arr[q]
						+ '</option>';
			}
			$(this).html(html);
		});
		// select选框添加监听事件
		elements.change(function() {
			var cValue = {}, // 用于记录当前被选中的问题
			elmts = elements, cIndex = elmts.index($(this)); // 当前select选框索引值
			// 遍历所有select选框，记录当前每个选框的选择
			elmts.each(function(i) {
				qObj.cur[i] = $(this).val();
			});
			// 记录当前已被选中的问题，实现互斥锁
			for ( var i in qObj.cur) {
				cValue[qObj.cur[i]] = 1;
			}
			// 遍历所有select选框，重置所有问题
			elmts.each(function(i) {
				// 跳过当前的select选框，因为该内容无需校正
				if (cIndex == i)
					return;
				var html = '<option value="' + qObj.tVal + '">' + qObj.tip
						+ '</option>';
				for ( var q in qObj.arr) {
					// 如果是互斥内容，且不属于这个选框则跳过（重点）
					if (cValue[q] && q != qObj.cur[i])
						continue;
					html += '<option value="' + q + '"'
							+ (q == qObj.cur[i] ? ' selected="selected"' : '')
							+ '>' + qObj.arr[q] + '</option>';
				}
				$(this).html(html);
			});
		});
	})
}
function selectChange(selectID){
	//获取下拉框选中项的text属性值
    var selectText = $("#"+selectID).val();
    var selectVal4 = '';
    var selectVal5 = '';
    var selectVal6 = '';
    if(selectID == 'question1'){
    	if((selectVal2 != null && selectVal2 != '') && (selectVal3 != null && selectVal3 != '')){
    		$("#question2").append("<option value='"+selectVal2+"'>"+selectVal2+"</option>");
    		$("#question3").append("<option value='"+selectVal3+"'>"+selectVal3+"</option>");
    	}
    	if(selectText != 0){
    		$("#question2 option[value="+selectText+"]").remove();
        	$("#question3 option[value="+selectText+"]").remove();
    		selectVal2 = selectText;
        	selectVal3 = selectText;
    	}else{
    		selectVal2 = '';
        	selectVal3 = '';
    	}
    	
    }
    if(selectID == 'question2'){
    	if((selectVal1 != null && selectVal1 != '') && (selectVal3 != null && selectVal3 != '')){
    		$("#question1").append("<option value='"+selectVal1+"'>"+selectVal1+"</option>");
    		$("#question3").append("<option value='"+selectVal3+"'>"+selectVal3+"</option>");
    	}
    	if(selectText != 0){
    		$("#question1 option[value="+selectText+"]").remove();
        	$("#question3 option[value="+selectText+"]").remove();
    		selectVal1 = selectText;
        	selectVal3 = selectText;
    	}else{
    		selectVal1 = '';
        	selectVal3 = ''; 
    	}
    }
    if(selectID == 'question3'){
    	$("#question1 option[value="+selectText+"]").remove();
    	$("#question2 option[value="+selectText+"]").remove();
    	if((selectVal1 != null && selectVal1 != '') && (selectVal2 != null && selectVal2 != '')){
    		$("#question1").append("<option value='"+selectVal1+"'>"+selectVal1+"</option>");
    		$("#question2").append("<option value='"+selectVal2+"'>"+selectVal2+"</option>");
    	}
    	if(selectText != 0){
    		selectVal1 = selectText;
        	selectVal2 = selectText;
    	}else{
    		selectVal1 = '';
        	selectVal2 = '';
    	}
    }
}

function showChangeEncrypted(uid, strQuestion1, strQuestion2, strQuestion3) {
	var html = '';
	html += '<div class="u_myData" id="changeEncryptedTab">';
	html += '<div class="m_r_content">';
	html += '<p class="m_r_fs">账号安全</p>';
	html += '<span class="u_h2">安全第一，切记「防人」之心不可无~~</span>';
	html += '</div>';
	// html += '<p class="u_h2 m_title">';
	// html += '更换密保问题';
	// html += '</p>';
	html += '<h3>';
	html += '<img alt="" src="../images/account/tips.png" width="15px" height="15px"><span class="tips_img">更换密保问题</span>';
	html += '</h3>';
	html += '<p class="m_warn set_mobile">为了账号安全，请先填写以前设置过的问题答案！</p>';
	html += '<div class="m_r_tab tab_content">';
	html += '<table class="m_encry" id="changeEncrypted">';
	html += '<tr>';
	html += '<th>问题一：</th>';
	html += '<td>' + strQuestion1 + '</td>';
	html += '</tr>';
	html += '<tr>';
	html += '<th>答案一：</th>';
	html += '<td><input type="text" name="changeAnswer1" id="changeAnswer1" class="m_answer" placeholder="2-20个中文或4-40个英文/数字"><span class="againAnswerInfo"></span></td>';
	html += '</tr>';
	html += '<tr>';
	html += '<th>问题二：</th>';
	html += '<td>' + strQuestion2 + '</td>';
	html += '</tr>';
	html += '<tr>';
	html += '<th>答案二：</th>';
	html += '<td><input type="text" name="changeAnswer2" id="changeAnswer2" class="m_answer" placeholder="2-20个中文或4-40个英文/数字"><span class="againAnswerInfo"></span></td>';
	html += '</tr>';
	html += '<tr>';
	html += '<th>问题三：</th>';
	html += '<td>' + strQuestion3 + '</td>';
	html += '</tr>';
	html += '<tr>';
	html += '<th>答案三：</th>';
	html += '<td><input type="text" name="changeAnswer3" id="changeAnswer3" class="m_answer" placeholder="2-20个中文或4-40个英文/数字"><span class="againAnswerInfo"></span></td>';
	html += '</tr>';
	html += '<tr>';
	html += '<td colspan="2" >';
	html += '<input type="button" id="goChangeEncrypted" name="" class="m_sure" value="下一步">';
	html += '<input type="button" id="cancelChangeEncrypted" name="" class="m_cancel" value="取  消">';
	html += '</td>';
	html += '</tr>';
	html += '</table>';
	html += '</div>';
	html += '</div>';
	$(".u_myDataWrap").append(html);

	$("#changeAnswer1").blur(function() {
		var changeAnswer1 = $.trim($("#changeAnswer1").val());
		isValidChangeAnswer1(changeAnswer1);
	});

	$("#changeAnswer2").blur(function() {
		var changeAnswer2 = $.trim($("#changeAnswer2").val());
		isValidChangeAnswer2(changeAnswer2);
	});

	$("#changeAnswer3").blur(function() {
		var changeAnswer3 = $.trim($("#changeAnswer3").val());
		isValidChangeAnswer3(changeAnswer3);
	});

	$("#cancelChangeEncrypted").on("click",function(){
		goPersonalAccount();
	})
	$("#goChangeEncrypted").on(
			"click",
			function() {
				var changeAnswer1 = $.trim($("#changeAnswer1").val());
				var changeAnswer2 = $.trim($("#changeAnswer2").val());
				var changeAnswer3 = $.trim($("#changeAnswer3").val());

				if (checkChangeAnswers(changeAnswer1, changeAnswer2,
						changeAnswer3)) {
					var url = getRootPath() + "/verifyQuestions";
					$
							.ajax({
								url : url,
								type : 'post',
								data : {
									"uid" : uid,
									"answer1" : changeAnswer1,
									"answer2" : changeAnswer2,
									"answer3" : changeAnswer3
								},
								dataType : 'json',
								success : function(data) {
									if (data.status == -1) {
										getDialog("warn", "请先登录");
										setTimeout('location.href = getRootPath() + "/index"',3000) ;
									} else if (data.status == -2) {
										getDialog("fail", "获取密保问题有误");
										setTimeout('location.href = getRootPath()+ "/persondata/toAccount"',3000) ;
									} else if (data.question1 == 1
											|| data.question2 == 1
											|| data.question3 == 1) {
										getDialog("fail", "输入密保问题有误，请检查");
									} else if (data.status == 0) {
										$(".u_myDataWrap #changeEncryptedTab")
												.remove();
										$("#menu6_data").show();
										$("#menu1_data").hide();
										$("#menu2_data").hide();
										$("#menu3_data").hide();
										$("#menu4_data").hide();
										$("#menu5_data").hide();
										$("#menu7_data").hide();
										$("#menu8_data").hide();
										$("#menu9_data").hide();
										selectChange2();
										// $(".tips_img").html("更换密保问题");
									} else {
										getDialog("fail", "密保问题有误");
									}
								}
							});
				}
			})

}

function goPersonalAccount(){
	location.href = getRootPath() + "/persondata/toAccount";
}

var isValidOldPwd = function(oldPwd) {
	var reg = RegExp(/^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/);// 正则
	if ($.trim(oldPwd) == "" || $.trim(oldPwd) == null) {
		$("#changePwdTab").find(".info").eq(0).show();
		$("#changePwdTab").find(".info").eq(0).html("*请输入旧密码！");
		return false;
	} else {
		if (reg.test(oldPwd)) {
			$("#changePwdTab").find(".info").eq(0).hide();
			$("#changePwdTab").find(".info").eq(0).html("");
			return true;
		} else {
			$("#changePwdTab").find(".info").eq(0).show();
			$("#changePwdTab").find(".info").eq(0).html("*输入旧密码的格式不对！");
			return false;
		}
	}
}

var isValidVerifyCode = function(verifyCode) {
	if ($.trim(verifyCode) == "" || $.trim(verifyCode) == null) {
		$("#changePwdTab").find(".info").eq(1).show();
		$("#changePwdTab").find(".info").eq(1).html("*请输入验证码！");
		return false;
	} else {
		$("#changePwdTab").find(".info").eq(1).hide();
		$("#changePwdTab").find(".info").eq(1).html("");
		return true;
	}
}

var isValidNewPwd = function(newPwd) {
	var reg = RegExp(/^[a-zA-Z\d]\w{4,11}[a-zA-Z\d]$/);// 正则
	if ($.trim(newPwd) == "" || $.trim(newPwd) == null) {
		$("#changePwdTab").find(".info").eq(1).show();
		$("#changePwdTab").find(".info").eq(1).html("*请输入新密码！");
		return false;
	} else {
		if (reg.test(newPwd)) {
			$("#changePwdTab").find(".info").eq(1).hide();
			$("#changePwdTab").find(".info").eq(1).html("");
			return true;
		} else {
			$("#changePwdTab").find(".info").eq(1).show();
			$("#changePwdTab").find(".info").eq(1).html("*输入新密码的格式不对！");
			return false;
		}
	}
}

var isValidRePwd = function(newPwd, newAgainPwd) {
	if ($.trim(newAgainPwd) == "" || $.trim(newAgainPwd) == null) {
		$("#changePwdTab").find(".info").eq(2).show();
		$("#changePwdTab").find(".info").eq(2).html("*请再次输入密码！");
		return false;
	} else {
		if ($.trim(newPwd) != $.trim(newAgainPwd)) {
			$("#changePwdTab").find(".info").eq(2).show();
			$("#changePwdTab").find(".info").eq(2).html("*两次输入的密码不一致！");
			return false;
		} else {
			$("#changePwdTab").find(".info").eq(2).hide();
			$("#changePwdTab").find(".info").eq(2).html("");
			return true;
		}
	}
}

var isValidNewAgainPwd = function(newAgainPwd) {
	if ($.trim(newAgainPwd) == "" || $.trim(newAgainPwd) == null) {
		$("#changePwdTab").find(".info").eq(2).show();
		$("#changePwdTab").find(".info").eq(2).html("*请再次输入密码！");
		return false;
	} else {
		$("#changePwdTab").find(".info").eq(2).hide();
		$("#changePwdTab").find(".info").eq(2).html("");
		return true;
	}
}

var isValidBirth = function(birth) {
	if ($.trim(birth) == "" || $.trim(birth) == null) {
		$(".basic_info").eq(1).show();
		$(".basic_info").eq(1).html("*请选择出生日期！");
		return false;
	} else {
		$(".basic_info").eq(1).hide();
		$(".basic_info").eq(1).html("");
		return true;
	}
}
var isValidNickName = function(nickName) {
	if ($.trim(nickName) == "" || $.trim(nickName) == null) {
		$(".basic_info").eq(0).show();
		$(".basic_info").eq(0).html("*请输入昵称！");
		return false;
	} else {
		$(".basic_info").eq(0).hide();
		$(".basic_info").eq(0).html("");
		return true;
	}
}
var isValidTechYears = function(techYears) {
	if ($.trim(techYears) == "" || $.trim(techYears) == null) {
		$(".basic_info").eq(2).show();
		$(".basic_info").eq(2).html("*请输入教龄！");
		return false;
	} else {
		if (isNaN(techYears)) {
			$(".basic_info").eq(2).show();
			$(".basic_info").eq(2).html("*教龄必须是数字");
			return false;
		} else {
			if (techYears < 1 || techYears > 60) {
				$(".basic_info").eq(2).show();
				$(".basic_info").eq(2).html("*教龄范围应该在1到60之间");
				return false;
			} else {
				$(".basic_info").eq(2).hide();
				$(".basic_info").eq(2).html("");
				return true;
			}
		}

	}
}
var isValidQuestion1 = function(question1) {
	if (question1 == 0) {
		$(".question_info").eq(0).show();
		$(".question_info").eq(0).html("*请选择问题一");
		return false;
	} else {
		$(".question_info").eq(0).hide();
		$(".question_info").eq(0).html("");
		return true;
	}
}
var isValidQuestion2 = function(question2) {
	if (question2 == 0) {
		$(".question_info").eq(2).show();
		$(".question_info").eq(2).html("*请选择问题二");
		return false;
	} else {
		$(".question_info").eq(2).hide();
		$(".question_info").eq(2).html("");
		return true;
	}
}
var isValidQuestion3 = function(question3) {
	if (question3 == 0) {
		$(".question_info").eq(4).show();
		$(".question_info").eq(4).html("*请选择问题三");
		return false;
	} else {
		$(".question_info").eq(4).hide();
		$(".question_info").eq(4).html("");
		return true;
	}
}
var isValidAnswer1 = function(answer1) {
	if (answer1 == null || answer1 == "") {
		$(".question_info").eq(1).show();
		$(".question_info").eq(1).html("*答案一不能为空");
		return false;
	} else {
		$(".question_info").eq(1).hide();
		$(".question_info").eq(1).html("");
		return true;
	}
}
var isValidAnswer2 = function(answer2) {
	if (answer2 == null || answer2 == "") {
		$(".question_info").eq(3).show();
		$(".question_info").eq(3).html("*答案二不能为空");
		return false;
	} else {
		$(".question_info").eq(3).hide();
		$(".question_info").eq(3).html("");
		return true;
	}
}
var isValidAnswer3 = function(answer3) {
	if (answer3 == null || answer3 == "") {
		$(".question_info").eq(5).show();
		$(".question_info").eq(5).html("*答案三不能为空");
		return false;
	} else {
		$(".question_info").eq(5).hide();
		$(".question_info").eq(5).html("");
		return true;
	}
}
var isValidQuestions = function(question1, question2, question3) {
	if (question1 == question2 || question1 == question3
			|| question2 == question3) {
		getDialog("warn", "问题不能相同");
		return false;
	} else {
		return true;
	}
}
var isValidChangeAnswer1 = function(changeAnswer1) {
	if (changeAnswer1 == null || changeAnswer1 == "") {
		$(".againAnswerInfo").eq(3).show();
		$(".againAnswerInfo").eq(3).html("*问题一的答案不能为空！");
		return false;
	} else {
		$(".againAnswerInfo").eq(3).hide();
		$(".againAnswerInfo").eq(3).html("");
		return true;
	}
}

var isValidChangeAnswer2 = function(changeAnswer2) {
	if (changeAnswer2 == null || changeAnswer2 == "") {
		$(".againAnswerInfo").eq(4).show();
		$(".againAnswerInfo").eq(4).html("*问题二的答案不能为空！");
		return false;
	} else {
		$(".againAnswerInfo").eq(4).hide();
		$(".againAnswerInfo").eq(4).html("");
		return true;
	}
}

var isValidChangeAnswer3 = function(changeAnswer3) {
	if (changeAnswer3 == null || changeAnswer3 == "") {
		$(".againAnswerInfo").eq(5).show();
		$(".againAnswerInfo").eq(5).html("*问题三的答案不能为空！");
		return false;
	} else {
		$(".againAnswerInfo").eq(5).hide();
		$(".againAnswerInfo").eq(5).html("");
		return true;
	}
}

function checkChangeAnswers(changeAnswer1, changeAnswer2, changeAnswer3) {
	if (isValidChangeAnswer1(changeAnswer1)
			&& isValidChangeAnswer2(changeAnswer2)
			&& isValidChangeAnswer3(changeAnswer3)) {
		return true;
	} else {
		return false;
	}
}

function checkQuestionInfo(question1, question2, question3, answer1, answer2,
		answer3) {
	if (isValidQuestion1(question1) && isValidAnswer1(answer1)
			&& isValidQuestion2(question2) && isValidAnswer2(answer2)
			&& isValidQuestion3(question3) && isValidAnswer3(answer3)
			&& isValidQuestions(question1, question2, question3)) {
		return true;
	} else {
		return false;
	}
}
function isVerifyNull(data) {
	if (data == null || data == "") {
		return "无";
	} else {
		return data;
	}
}
function calculatePasswordLevel(password) {
	var pwdlevel;
	var pwdScore = 0;
	if (password.length == 6) {
		pwdScore = 5;
	} else if (password.length < 10) {
		pwdScore = 10;
	} else {
		pwdScore = 25;
	}
	// 字母
	if (/^(([0-9A-Z_]*[A-Z][0-9A-Z_]*)|([0-9a-z_]*[a-z][0-9a-z_]*))$/
			.test(password)) // 字母全为大写或者小写
	{
		pwdScore += 10;
	} else if (/^(([0-9A-Za-z_]*[A-Z][0-9A-Za-z_]*[a-z][0-9A-Za-z_]*))|([0-9A-Za-z_]*[a-z][0-9A-Za-z_]*[A-Z][0-9A-Za-z_]*)$/
			.test(password)) // 包含大小写混合字母
	{
		pwdScore += 20;
	}

	// 数字
	var isNum = '0';
	var isNumAllSame = 1;
	var numbertimes = 0;
	for (var i = 0; i < password.length; i++) {
		var c = password[i];
		if (c >= '0' && c <= '9') {
			if (numbertimes > 0 && isNum != c) {
				isNumAllSame = 0;
				numbertimes++;
				isNum = c;
			}
		}
	}
	if (isNumAllSame == 1) // 数字全相同
	{
		pwdScore += 10;
	} else if (numbertimes >= 5) // 包含五个数字，
	{
		pwdScore += 20;
	}

	// 下划线
	if (/^(_[0-9a-zA-Z]+)$/.test(password)) // 下划线出现在首位
	{
		pwdScore += 10;
	} else if (/^([0-9a-zA-Z]+_)$/.test(password)) // 下划线出现在未尾
	{
		pwdScore += 10;
	} else if (/^([0-9a-zA-Z]+_[0-9a-zA-Z]+)$/.test(password)) // 下划线出现在中间
	{
		pwdScore += 20;
	}

	// 奖励
	if (/^([0-9a-zA-Z_]*[0-9]+[0-9a-zA-Z_]*)$/.test(password)) // 如果有数字
	{
		if (/^([0-9a-zA-Z]*_+[0-9a-zA-Z_]*)$/.test(password)) // 有下划线
		{
			if (/^([0-9A-Za-z_]*(([A-Z][0-9A-Za-z_]*[a-z])|([a-z][0-9A-Za-z_]*[A-Z]))[0-9A-Za-z_]*)$/
					.test(password)) // 包含大小写字母
			{
				pwdScore += 15;
			} else if (/^(([0-9A-Z_]*[A-Z][0-9A-Z_]*)|([0-9a-z_]*[a-z][0-9a-z_]*))$/
					.test(password)) // 大写字母或者小写字母
			{
				pwdScore += 10;
			}

		} else if (/^([0-9a-zA-Z_]*[a-zA-Z][0-9a-zA-Z_]*)$/.test(password)) // 有字母
		{
			pwdScore += 5;
		}
	}

	if (pwdScore >= 80) { // 强
		pwdlevel = 3;

	} else if (pwdScore >= 60) { // 中

		pwdlevel = 2;
	} else { // 弱

		pwdlevel = 1;

	}
	return pwdlevel;
}
