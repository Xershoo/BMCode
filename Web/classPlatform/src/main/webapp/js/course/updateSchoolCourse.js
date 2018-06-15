var myeditor;
var url;
var myObj;
var eid;
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
var map = {1 : "二",2 : "三",3 : "四",4 : "五",5 : "六",6 : "七",7 : "八",8 : "九",9 : "十",10 : "十一",11 : "十二",12 : "十三",13 : "十四",14 : "十五",15 : "十六",16 : "十七",17 : "十八"
	,18 : "十九",19 : "二十",20 : "二十一",21 : "二十二",22 : "二十三",23: "二十四",24 : "二十五",25 : "二十六",26 : "二十七",27 : "二十八",28 : "二十九",29 : "三十",30 : "三十一",31 : "三十二"
		,32 : "三十三",33 : "三十四",34 : "三十五",35 : "三十六",36 : "三十七",37 : "三十八",38 : "三十九",39 : "四十",40 : "四十一",41 : "四十二",42 : "四十三",43 : "四十四",44 : "四十五",45 : "四十六"
			,46 : "四十七",47 : "四十八",48 : "四十九",49 : "五十"};
window.onload = function() {
	myeditor = CKEDITOR.replace('editor01', {
		height : '200px',
		width : '552px'
	});
};

$(function() {
	var $image = $(".cropper");
	  $image.cropper({
		  data: {
		     
		      width: 500,
		      height: 300
		    },
		  aspectRatio: 1.5666666,
		  done: function(data) {
		    // Output the result data for cropping image.
		  },
		    preview: ".preview",
	
	
	});
	$("#getDataURL").click(function() {
	    var dataURL = $image.cropper("getDataURL");
//alert(dataURL);
	    ajaxUpload(dataURL);
	  });
	$("#cancelImage").click(function() {
		$("#dialog2").dialog("close");
	});
	var $inputImage = $("#inputImage");

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
	          $image.cropper("reset").cropper("replace", this.result);
	          $inputImage.val("");
	        };
	      } else {
	        showMessage("Please choose an image file.");
	      }
	    });
	  } else {
	    $inputImage.addClass("hide");
	  }
//	countstudentnum();
	queryCategory();
	getcollegelist();
	changeCheckBox();
	selectAll();
	queryClassNum();
	$('#f').val(0);
	$("#dialog").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 500, // 窗口宽度
		height : 600,
	});
	$("#dialog_link").click(function() {
		$("#dialog").dialog("open");
	});

	$("#dialog1").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 770, // 窗口宽度
		height : 760,
	});
	$("#dialog_link1").click(function() {
		$("#dialog1").dialog("open");
	});
	$("#dialog2").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 1000, // 窗口宽度
		height : 650,
	});
	$("#sago").click(function() {
		$("#dialog2").dialog("open");
	});
	var val_payPlatform = $(' #val_payPlatform ').val();
	if (val_payPlatform == 2) {
//		$("#shoukelaoshi").attr('disabled', "true");
		$(".xuesheng").css("display", "none");
		$('.laoshi1').css("display", "block");
		$('.jihua').css("display", "block");
		changeType2();
	}
	if (val_payPlatform == 1) {
//		$('#shoukelaoshi').removeAttr("disabled");
		$(".xuesheng").css("display", "block");
		$('.laoshi1').css("display", "block");
		if($("#gk").attr("checked")=="checked"){
			$('.jihua').css("display", "block");
	    	$('.jiage').css("display", "block");
		}else{
			$('.jihua').css("display", "none");
	    	$('.jiage').css("display", "none");
		}
		changeType1();
	}
	if (val_payPlatform == 3) {
		$(".xuesheng").css("display", "none");
		$(".jiage").css("display", "block");
		$('.laoshi1').css("display", "none");
		$('.jihua').css("display", "block");
		changeType3();
	}
	$("#save").on("click", function() {
		if(url==undefined){
			url=$("#u247_img").attr('src');
		}
		
		var val_payPlatform = $(' #val_payPlatform ').val();
		var courseid = $("#courseid").val();
		var courseName = $("#courseName").val();
		var courseCat = $("#courseCat").val();
		var courseCat1 = $("#courseCat1").val();
//		var courseCat2 = $("#courseCat2").val();
		var teacher = $("#teacherId").val();
//		var sUserAgent = navigator.userAgent.toLowerCase();   
//	    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";     
//	    if(bIsIpad){   
//	    	var courseDescription =$("#courseDescription").val();
//	    }else{
	    	if(myeditor!=undefined){
	    		var courseDescription = myeditor.document.getBody().getText();
	    	}else{
	    		var courseDescription =$("#courseDescription").val();
	    	}
	    	
//	    }
		var courseTarget = $("#courseTarget").val();
		var people = $("#people").val();
		var courseTime = $("#courseTime").val();
		var chooseFile3 = $("#photo").val();
		var leixing = $(' #val_payPlatform ').val();
		var coursePrice = $("#coursePrice").val();
		var studentId=$('#studentId').val();
		var minStudents=$('#minStudents').val();
		var maxStudents=$('#maxStudents').val();
		$("input[type='checkbox']").is(':checked');
		if (courseName == "") {
			$('#cn').text("课程名称不能为空");
			return false;
		} else {
			$('#cn').text("");
		}
		
//		if (courseCat2 == 0) {
//			$('#fenlei').text("请选择课程分类");
//			return false;
//		} else {
//			$('#fenlei').text("");
//		}
		
			if (teacher == "") {
				$('#skls').text("授课老师不能为空");
				return false;
			} else {
				$('skls').text("");
			}
//		var f=$("#f").val();
//		if (f == 0) {
//			$('#sfile').text("请选择上传的文件");
//			return false;
//		} else {
//			$('#sfile').text("");
//		}
		if (courseDescription == "") {
			$('#jjy').text("课程简介不能为空");
			return false;
		} else {
			$('#jjy').text("");
		}
		if (courseTarget == "") {
			$('#mb').text("教学目标不能为空");
			return false;
		} else {
			$('#mb').text("");
		}
		if (people == "") {
			$('#rq').text("适合人群不能为空");
			return false;
		} else {
			$('#rq').text("");
		}

		var classArrangement = $("#classArrangement").val();
		var beginTime = $("#start").val();
		var endTime = $("#end").val();
		var beginTimeb = $("#startb").val();
		var endTimeb = $("#endb").val();
		if (classArrangement == "") {
			$('#ca').text("课节安排不能为空");
			return false;
		} else {
			$('#ca').text("");
		}
		
		if (beginTime == "") {
			alert("请选择开始时间");
			return false;
		}
		if (endTime == "") {
			alert("请选择结束时间");
			return false;
		}
		var flag=true;
		$(".classArrangement").each(function(i, dom) {
			var a = i + 1;
			var ca = $('#classArrangement' + a).val();
			var start = $('#start' + a).val();
			var end = $('#end' + a).val();
			var courseTime = $('#courseTime' + a).val();
			if (ca == "") {
				$('#ca' + a).text("课节安排不能为空");
				flag=false;
				return false;
			} else {
				$('#ca' + a).text("");
			}
			
			if (courseTime == "") {
				alert("请填写课程日期");
				flag=false;
				return false;
			}
			if (start == "") {
				alert("请填写开始时间");
				flag=false;
				return false;
			}
			if (end == "") {
				alert("请填写结束时间");
				flag=false;
				return false;
			}
		})
		if(val_payPlatform!=1){
			if (maxStudents == "") {
				alert("请填写最大报名人数");
				return false;
			}
			if (minStudents == "") {
				alert("请填写最小报名人数");
				return false;
			}
			if(parseInt(minStudents)>parseInt(maxStudents)){
				alert("最小报名人数不能超过最大报名人数");
				return false;
			}
			var number = RegExp( /^([0-9]+)$/);
			if(!number.test(minStudents)){
				alert("最小报名人数只能填数字");
				return false;
			}
			if(!number.test(maxStudents)){
				alert("最大报名人数只能填数字");
				return false;
			}
		}
		if(flag){
			
			
			
			if(val_payPlatform!=1){
				if (beginTimeb == "") {
					alert("请选择报名开始时间");
					return false;
				}
				if (endTimeb == "") {
					alert("请选择报名结束时间");
					return false;
				}
				var reg1 = RegExp( /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/);
				if(!reg1.test(beginTimeb)){
					alert("报名开始时间格式不正确");
					return false;
				}
				if(!reg1.test(endTimeb)){
					alert("报名开始时间格式不正确");
					return false;
				}
				}else{
					if($("#gk").attr("checked")=="checked"){
						if (beginTimeb == "") {
							alert("请选择报名开始时间");
							return false;
						}
						if (endTimeb == "") {
							alert("请选择报名结束时间");
							return false;
						}
						var reg1 = RegExp( /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/);
						if(!reg1.test(beginTimeb)){
							alert("报名开始时间格式不正确");
							return false;
						}
						if(!reg1.test(endTimeb)){
							alert("报名开始时间格式不正确");
							return false;
						}
						if (maxStudents == "") {
							alert("请填写最大报名人数");
							return false;
						}
						if (minStudents == "") {
							alert("请填写最小报名人数");
							return false;
						}
						if(parseInt(minStudents)>parseInt(maxStudents)){
							alert("最小报名人数不能超过最大报名人数");
							return false;
						}
						var number = RegExp( /^([0-9]+)$/);
						if(!number.test(minStudents)){
							alert("最小报名人数只能填数字");
							return false;
						}
						if(!number.test(maxStudents)){
							alert("最大报名人数只能填数字");
							return false;
						}
					}
					
				}
			
				
				var b = courseTime + " " + beginTime;
				var e = courseTime + " " + endTime;

				var reg = RegExp( /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/);
				if(!reg.test(b)){
					alert("请输入正确格式的时间");
					return false;
				}
				if(!reg.test(e)){
					alert("请输入正确格式的时间");
					return false;
				}
				var classs = new Array();
				classs.push({
					'className' : classArrangement,
					'startTimePlan' : b,
					'endTimePlan' : e
				})
				$(".classArrangement").each(function(i, dom) {
					var a = i + 1;
					var ca = $('#classArrangement' + a).val();
					var start = $('#start' + a).val();
					var end = $('#end' + a).val();
					var courseTime = $('#courseTime' + a).val();
					var b1 = courseTime + " " + start;
					var e1 = courseTime + " " + end;
					classs.push({
						'className' : ca,
						'startTimePlan' : b1,
						'endTimePlan' : e1
					})
				})

				var s = jsonArrayToString(classs);
				
				if(val_payPlatform==1){
					if(studentId==''){
						alert('请选择学生');
						return false;
					}else{
						if($("#gk").attr("checked")=="checked"){
							$.ajax({
								url : getRootPath() + '/school/course/update',
								type : 'POST',
								data : {
									'courseType' : leixing,
									'courseid':courseid,
									'courseName' : courseName,
//									"classifyId" : courseCat2,
									"teacherId" : teacher,
									"target" : courseTarget,
									"people" : people,
									"price" : coursePrice,
									"coverUrl" : url,
									"signupStartTime" : beginTimeb,
									"signupEndTime" : endTimeb,
									"minStudents":minStudents,
									"maxStudents":maxStudents,
									"description" : courseDescription,
									'classs' : jsonArrayToString(classs),
									'stuIds' : [ studentId ]
								},
								dataType : 'json',
								success : function(data) {
									if(data.success==true){
//										alert("修改成功");
										getDialogCue("success", "修改成功");
//										window.location.href= getRootPath() + '/school/course';
										setTimeout('window.location.href=getRootPath()+"/school/course"',3000) ;
									}else{
//										alert("修改失败");
										getDialog("fail", "修改失败");
									}
										
									console.info(data);
								},
							});
						}else{
							$.ajax({
								url : getRootPath() + '/school/course/update',
								type : 'POST',
								data : {
									'courseType' : leixing,
									'courseid':courseid,
									'courseName' : courseName,
//									"classifyId" : courseCat2,
									"teacherId" : teacher,
									"target" : courseTarget,
									"people" : people,
//									"price" : coursePrice,
									"coverUrl" : url,
//									"signupStartTime" : beginTimeb,
//									"signupEndTime" : endTimeb,
//									"minStudents":minStudents,
//									"maxStudents":maxStudents,
									"description" : courseDescription,
									'classs' : jsonArrayToString(classs),
									'stuIds' : [ studentId ]
								},
								dataType : 'json',
								success : function(data) {
									if(data.success==true){
//										alert("修改成功");
										getDialogCue("success", "修改成功");
//										window.location.href= getRootPath() + '/school/course';
										setTimeout('window.location.href=getRootPath()+"/school/course"',3000) ;
									}else{
//										alert("修改失败");
										getDialog("fail", "修改失败");
									}
										
									console.info(data);
								},
							});
						}
						
						
						
						
					}
					
					
				}else{
					$.ajax({
						url : getRootPath() + '/school/course/update',
						type : 'POST',
						data : {
							'courseType' : leixing,
							'courseid':courseid,
							'courseName' : courseName,
//							"classifyId" : courseCat2,
							"teacherId" : teacher,
							"target" : courseTarget,
							"people" : people,
							"price" : coursePrice,
							"coverUrl" : url,
							"signupStartTime" : beginTimeb,
							"signupEndTime" : endTimeb,
							"minStudents":minStudents,
							"maxStudents":maxStudents,
							"description" : courseDescription,
							'classs' : jsonArrayToString(classs)
							
						},
						dataType : 'json',
						success : function(data) {
							if(data.success==true){
//								alert("修改成功");
								getDialogCue("success", "修改成功");
//								window.location.href= getRootPath() + '/school/course';
								setTimeout('window.location.href=getRootPath()+"/school/course"',3000) ;
							}else{
//								alert("修改失败");
								getDialog("fail", "修改失败");
							}
								
							console.info(data);
						},
					});
				}
				
			
		}
		
		

	});
//	countstudentnum();
})
function changeType2() {
//	$("#shoukelaoshi").attr('disabled', "true");
	$(".xuesheng").css("display", "none");
	$(".jiage").css("display", "block");
	$('.laoshi1').css("display", "block");
	$('.jihua').css("display", "block");
	$('#photo').val('');
	 $('#lxa_xn').css("background-color", "#f5f8fa");
	 $('#lxa_gk').css("background-color", "#ffffff");
	 $('#lxa_ge').css("background-color", "#f5f8fa");
	 $(' #val_payPlatform ').val('2');
}
function changeType1() {
//	$('#shoukelaoshi').removeAttr("disabled");
	$(".xuesheng").css("display", "block");
	$('.laoshi1').css("display", "block");
	$('#photo').val('');
	 $('#lxa_xn').css("background-color", "#ffffff");
	 $('#lxa_gk').css("background-color", "#f5f8fa");
	 $('#lxa_ge').css("background-color", "#f5f8fa");
	 $(' #val_payPlatform ').val('1');
}
function changeType3() {
	$('.laoshi1').css("display", "none");
	$(".xuesheng").css("display", "none");
	$(".jiage").css("display", "block");
	$('.jihua').css("display", "block");
	    $('#photo').val('');
	    $('#lxa_xn').css("background-color", "#f5f8fa");
		 $('#lxa_gk').css("background-color", "#f5f8fa");
		 $('#lxa_ge').css("background-color", "#ffffff");
		 $(' #val_payPlatform ').val('3');
}
function queryClassNum(){
	$(".xkj").each(function(i, dom) {
			var a = i + 1;
			$('#classNum' + a).text("第" + map[a] + "节:");
			

	})
}
function add() {
	var n = $(".xkj").length + 1;
	
	if(n<50){
	$('#xinkejie').append(
					"<div id='xkj"
							+ n
							+ "' class='xkj'><div class='kj1' id='kj"
							+ n
							+ "'>第"
							+ map[n]
							+ "节： <input value='最多50个字' id='classArrangement"
							+ n
							+ "' class='classArrangement'/><span id='ca"
							+ n
							+ "' class='yanzheng'></div><div class='ks'>"
							+ "课程时间 <input id='courseTime"
							+ n
							+ "'   onClick='WdatePicker()' type='text'></input> <input class='laydate-icon'  id='start"
							+ n
							+ "'   type='text' onfocus=\"WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})\"></input>"
							+ "<input class='laydate-icon' id='end"
							+ n
							+ "'  type='text' onfocus=\"WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'} )\"></input><div class='del_a'><a  id='a"
							+ n + "'>删除该课节</a></div></div></div>");
	$("#a" + n).bind("click", function() {
		del(n);
	});
	var height = $(".jiaoxuejihua0").outerHeight(true);
	var newheight = height + 100;
	$('.jiaoxuejihua0').css("height", newheight);
	var h = $(".zhanghu").outerHeight(true) + 100;
	$('.zhanghu').css("height", h);
	}else{
		alert("最多只能添加50个课节");
	}
}
function del(n) {
	var l = $(".xkj").length;

	var height = $(".jiaoxuejihua0").outerHeight(true);
	var newheight = height - 100;
	$('.jiaoxuejihua0').css("height", newheight);
	$(".xkj").each(function(i, dom) {
		if (i + 1 > n) {
			var a = i + 1;
			$('#kj' + a).text("第" + map[i] + "节");
			$('#kj' + a).attr('id', 'kj' + i);
			$('#xkj' + a).attr('id', 'xkj' + i);
			$('#start' + a).attr('id', 'start' + i);
			$('#end' + a).attr('id', 'end' + i);
			$('#courseTime' + a).attr('id', 'courseTime' + i);
			$('#classArrangement' + a).attr('id', 'start' + i);
			$('#ca' + a).attr('id', 'start' + i);
			$('#a' + a).unbind();
			$("#a" + a).bind("click", function() {
				del(i);
			});
			$('#a' + a).attr('id', 'a' + i);

		}
	})
	$("#xkj" + n).remove();
}
function ajaxFileUpload() {
	$.ajaxFileUpload({
		url : getRootPath() + '/course/uploadCoverImg', // 用于文件上传的服务器端请求地址
		secureuri : false, // 是否需要安全协议，一般设置为false
		fileElementId : 'photo', // 文件上传域的ID
		dataType : 'json', // 返回值类型 一般设置为json
		success : function(data, status) // 服务器成功响应处理函数
		{
			$("#u247_img").attr("src", data.url);
			$("#f").val(1);
			url=data.url;
			$("#sfile").text("");
			if (typeof (data.error) != 'undefined') {
				if (data.error != '') {
					alert(data.error);
				} else {
					alert(data.message);

				}
			}
		},
		error : function(data, status, e)// 服务器响应失败处理函数
		{
			alert(e);
		}
	})
	return false;
}
function ajaxUpload(dataURL){
//	var img=$(".preview img").attr("src");
	
//	$("#u247_img").attr("src",img);
	$("#dialog2").dialog("close");
	$.ajax({
		url : getRootPath() + "/course/uploadCoverImg",// 后端需要给的接口
		type : "post",
		dataType : "json",
		data : {
			"filepath" : dataURL
		},
		success : function(data) {

			if(data.success==true){
			
			$("#u247_img").attr("src", data.url);
			$("#f").val(1);
			url=data.url;
			$("#sfile").text("");
			if (typeof (data.error) != 'undefined') {
				if (data.error != '') {
					alert("fail", data.error);
					$("#f").val(0);
					$("#u247_img").attr("src",'/images/c1-1index/u362.png');	
				} else {
					alert("fail", data.error);
					$("#f").val(0);
					$("#u247_img").attr("src",'/images/c1-1index/u362.png');	
				}
			}
			
			}else{
				alert(data.message);
				$("#f").val(0);
				$("#u247_img").attr("src",'/images/c1-1index/u362.png');	
			}
		
		}
	})
}
function jsonArrayToString(jsonArray) {
	var jsonArrayString = "";
	if (jsonArray != null && jsonArray.length > 0) {
		jsonArrayString += "[";
		for (var i = 0; i < jsonArray.length; i++) {
			jsonArrayString += JSON.stringify(jsonArray[i]) + ",";
		}
		jsonArrayString = jsonArrayString.substring(0,
				jsonArrayString.length - 1)
				+ "]";
	}
	return jsonArrayString;
}
function getcollegelist(){
	$.ajax({
		url : getRootPath() + '/school/getcollegelist',
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			
			if(data.status==-1){
				window.location.href= getRootPath() + '/index';
			}else{
				var college=data.college;
				var option="";
				 for(var i=0; i<college.length; i++){
					 option=option+"<option value='"+college[i].collegeId+"'>"+college[i].collegeName+"</option>";
	             }    
				$("#college").append(option);
				$("#colleget").append(option);
			}
			
		},
	});
}
function getmajorlist(f){
	
	var collegeid=$("#college").val();
	var collegetid=$("#colleget").val();
	if(collegeid!=0||collegetid!=0){
		var id;
		if(collegeid!=0){
			id=collegeid;
		}else{
			id=collegetid;
		}
		
		$.ajax({
			url : getRootPath() + '/school/getmajorlist',
			type : 'POST',
			dataType : 'json',
			data:{
				'collegeid':id
			},
			success : function(data) {
				var major=data.major;
				var option="<option value='0'>请选择专业</option>";
				 for(var i=0; i<major.length; i++){
					 option=option+"<option value='"+major[i].majorId+"'>"+major[i].majorName+"</option>";
	             }  
				 if(f==2){
					 $("#major").html(option);
				 }
				if(f==1){
					$("#majort").html(option);
				}
			},
		});
	}
	
}
function getclasslist(){
	var majorid=$("#major").val();
	if(majorid!=0){
		$.ajax({
			url : getRootPath() + '/school/getclasslist',
			type : 'POST',
			dataType : 'json',
			data:{
				'majorid':majorid
			},
			success : function(data) {
				var classs=data.classs;
				var option="<option value='0'>请选择班级</option>";
				 for(var i=0; i<classs.length; i++){
					 option=option+"<option value='"+classs[i]+"'>"+classs[i]+"</option>";
	             }    
				$("#classs").html(option);
			},
		});
	}
	
}
function queryTeacher(){
	var majort=$("#majort").val();
	var majortName=$("#majort").find("option:selected").text();
	var collegetName=$("#colleget").find("option:selected").text();
	var teacherName=$("#teacher_tname").val();
	var teacherNum=$("#teacher_tnum").val();
	if(majort==null||majort==0){
		alert("请选择所在专业");
		return false;
	}else{
		
		$.ajax({
			url : getRootPath() + '/searchschooluserlist',
			type : 'POST',
			dataType : 'json',
			data:{
				'majorid':majort,
				'from':1,
				'usertype':40,
				'collegeid':0,
				'username':teacherName,
				'sid':teacherNum
			},
			success : function(data) {
				var teachers=data.userlist;
				var table="<tr class='td1'><td>姓名</td><td>工号</td><td>院系</td><td>专业</td></tr>";
				 for(var i=0; i<teachers.length; i++){
					 table=table+"<tr class='td2'><td><input type='radio'  name='teacher' value='"+teachers[i].userid+"'><span id='"+teachers[i].userid+"'>"+teachers[i].realName+"</span></input></td><td>"+teachers[i].studentId+"</td><td>"+teachers[i].college+"</td><td>"+teachers[i].major+"</td></tr>";
		             }    
				$("#tabTeacher").html(table);
			},
		});
	}
	
	
	
}

function confirmTeacher(){
	var t=$('input[name="teacher"]:checked ').val(); 
	$("#teacherId").val(t);
	var teachername=$("#"+t).text();
	$("#shoukelaoshi").val(teachername);
	$("#dialog").dialog("close");
}
function queryStudent(){
	
	var classs=$("#classs").val();
	var major=$("#major").val();
	var college=$("#college").find("option:selected").text();
	var major1=$("#major").find("option:selected").text();
	var classs=$("#classs").find("option:selected").text();
	var classss=$("#classs").find("option:selected").val();
	var studentName=$("#student_sname").val();
	var studentNum=$("#student_snum").val();
	if(classss==null||classss==0){
		alert("请选择班级");
		return false;
	}else{
		
		$.ajax({
			url : getRootPath() + '/searchschooluserlist',
			type : 'POST',
			dataType : 'json',
			data:{
				'majorid':major,
				'strclass':classs,
				'from':1,
				'usertype':30,
				'collegeid':0,
				'username':studentName,
				'sid':studentNum
	
			},
			success : function(data) {
				var students=data.userlist;
				var table="<tr class='td1'><td>姓名</td><td>学号</td><td>院系</td><td>专业</td><td>班级</td></tr>";
				 for(var i=0; i<students.length; i++){
					 table=table+"<tr class='td2'><td><input type='checkbox' name='student' onclick='studentCount()' value='"+students[i].userid+"'/>"+students[i].realName+"</td><td>"+students[i].studentId+"</td><td>"+college+"</td><td>"+major+"</td><td>"+classs+"</td></tr>";
	             }    
				$("#tabStudent").html(table);
			},
		});
	}
}
function queryCategory(){
	var option;
	var category=$("#category").val();
	var category1=$("#category1").val();
	var category2=$("#category2").val();
	var id2;
	var id3;
		$.ajax({
			url : getRootPath() + '/category/list',
			type : 'post',
			dataType : 'json',
			success : function(data) {
				//一级分类
				myObj=data;
				option="<option  value=''>请选择</option>";
				for(var i=0; i<data.length; i++){
					if(data[i].id==category){
						option=option+"<option value='"+i+"' selected='selected'>"+data[i].name+"</option>";
						id2=i;
					}else{
						option=option+"<option value='"+i+"'>"+data[i].name+"</option>";
					}
					
					
	             }  
				$("#courseCat").html(option);
				//二级分类
				var option2;
				data2=myObj[id2].sub;
				option2="<option  value=''>请选择</option>";
				for(var i=0; i<data2.length; i++){
					if(data2[i].id==category1){
						option2=option2+"<option value='"+i+"' selected='selected'>"+data2[i].name+"</option>";
						id3=i;
					}else{
						option2=option2+"<option value='"+i+"'>"+data2[i].name+"</option>";
					}
					
					
			     }  
				$("#courseCat1").html(option2);
				
				//三级分类
				var option3;
				data3=myObj[id2].sub[id3].sub;
				option3="<option  value=''>请选择</option>";
				for(var i=0; i<data3.length; i++){
					
					if(data3[i].id==category2){
						option3=option3+"<option value='"+data3[i].id+"' selected='selected'>"+data3[i].name+"</option>";
					}else{
						option3=option3+"<option value='"+data3[i].id+"'>"+data3[i].name+"</option>";
					}
					
					
					
				}  
				$("#courseCat2").html(option3);
				
				
			
				
			},
		});
	
}
function queryCourseCat1(){
	var id=$("#courseCat").val();
//	alert(myObj[id]);
	var option;
	data=myObj[id].sub;
	eid=id;
	option="<option  value=''>请选择</option>";
	for(var i=0; i<data.length; i++){
		option=option+"<option value='"+i+"'>"+data[i].name+"</option>";
		
     }  
	$("#courseCat1").html(option);
	
}
function queryCourseCat2(){
	var id=$("#courseCat1").val();
	var eid=$("#courseCat").val();
//	alert(myObj[id]);
	var option;
	data=myObj[eid].sub[id].sub;
	option="<option  value=''>请选择</option>";
	for(var i=0; i<data.length; i++){
		option=option+"<option value='"+data[i].id+"'>"+data[i].name+"</option>";
		
	}  
	$("#courseCat2").html(option);
	
}
function confirmStudent(){
	var studentId='';
	 $('input[name="student"]:checked').each(function(i){
         
         if(0==i){
        	 studentId = $(this).val();
            }else{
            	studentId += (","+$(this).val());
            }
         });
	 
	$('#studentId').val(studentId);
	$("#dialog1").dialog("close");
	
	
}
function changeCheckBox(){
	
	
	
    $('#gk').click(function(){  
        if($(this).attr('checked')){  
            //do someting  
        	$('.jihua').css("display", "block");
        	$('.jiage').css("display", "block");
        }else{  
            //do someting else  
        	$('.jihua').css("display", "none");
        	$('.jiage').css("display", "none");
        }  
    });  
}
function selectAll(){
	
	 $("#checkAll").click(function() {
        $('input[name="student"]').attr("checked",this.checked); 
        var count=	$('input[name="student"]:checked').length;
        $('#student_count').text(count);
    });
    var $subBox = $("input[name='student']");
    $subBox.click(function(){
   	 
        $("#checkAll").attr("checked",$subBox.length == $("input[name='student']:checked").length ? true : false);
        var count=	$('input[name="student"]:checked').length;
        $('#student_count').text(count);
    });
	  }
function studentCount(){
var count=	$('input[name="student"]:checked').length;
$('#student_count').text(count)

}
function countstudentnum(){
	 var count=studentidss.toString() ;
	 var strs= new Array();
	 var c;
	 if(count.indexOf(",")==0){
		 strs= count.split(",");
			 c= strs.length; 
	 }else{
		 c=1;
	 }
	 
	
	$('#lvse').text(c);
}