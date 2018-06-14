var myeditor;
var url='/images/course/creatcourse.png';
//window.onload = function() {
//	myeditor = CKEDITOR.replace('editor01', {
//		height : '200px',
//		width : '562px'
//	});
//};
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
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
	queryCategory();
//	compute();
	$('#f').val(0);
	$('#studentId').val('');
	$('#coursePrice').val('0.00');
	$("#dialog2").dialog({
		autoOpen : false,
		position : "top",// 弹出位置
		width : 1000, // 窗口宽度
		height : 650,
	});
	$("#u247_img").click(function() {
		$("#dialog2").dialog("open");
	});

	var val_payPlatform = $(' #val_payPlatform ').val();
	if (val_payPlatform == 3) {
		$(".jiage").css("display", "block");
		$('.jihua').css("display", "block");
		changeType3();
	}
	$("#save").on("click", function() {
		var val_payPlatform = $(' #val_payPlatform ').val();
		var courseName = $("#courseName").val();
		var courseCat = $("#courseCat").val();
		var courseCat1 = $("#courseCat1").val();
		var courseCat2 = $("#courseCat2").val();
		var teacher = $("#shoukelaoshi").val();
//		var courseDescription = myeditor.document.getBody().getText();
		var courseDescription =  $("#courseDescription").val();
//		var courseTarget = $("#courseTarget").val();
//		var people = $("#people").val();
		var courseTime = $("#courseTime").val();
		var chooseFile3 = $("#photo").val();
		var leixing = $(' #val_payPlatform ').val();
		var coursePrice = $("#coursePrice").val();
		var studentId=$('#studentId').val();
		var minStudents=0;
		var maxStudents=100;
		$("input[type='checkbox']").is(':checked');
		if (courseName == "") {
			$('#cn').text("课程名称不能为空");
			return false;
		} else {
			$('#cn').text("");
		}
		
		if (courseCat2 == 0) {
			$('#fenlei').text("请选择课程分类");
			return false;
		} else {
			$('#fenlei').text("");
		}
		
		var f=$("#f").val();
//		if (f == 0) {
//			$('#sfile').text("请选择上传的文件");
//			return false;
//		} else {
//			$('#sfile').text("");
//		}
//		if (courseDescription == "") {
//			$('#jjy').text("课程简介不能为空");
//			return false;
//		} else {
//			$('#jjy').text("");
//		}
//		if (courseTarget == "") {
//			$('#mb').text("教学目标不能为空");
//			return false;
//		} else {
//			$('#mb').text("");
//		}
//		if (people == "") {
//			$('#rq').text("适合人群不能为空");
//			return false;
//		} else {
//			$('#rq').text("");
//		}

		var classArrangement = $("#courseName").val();
		var beginTime = $("#start").val();
		var endTime = $("#end").val();
//		var beginTimeb = $("#startb").val();
//		var endTimeb = $("#endb").val();
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
//		if(val_payPlatform!=1){
//			if (maxStudents == "") {
//				alert("请填写最大报名人数");
//				return false;
//			}
//			if (minStudents == "") {
//				alert("请填写最小报名人数");
//				return false;
//			}
//			if(parseInt(minStudents)>parseInt(maxStudents)){
//				alert("最小报名人数不能超过最大报名人数");
//				return false;
//			}
//			var number = RegExp( /^([0-9]+)$/);
//			if(!number.test(minStudents)){
//				alert("最小报名人数只能填数字");
//				return false;
//			}
//			if(!number.test(maxStudents)){
//				alert("最大报名人数只能填数字");
//				return false;
//			}
//		}
		if(flag){
			
			
			
			if(val_payPlatform!=1){
//				if (beginTimeb == "") {
//					alert("请选择报名开始时间");
//					return false;
//				}
//				if (endTimeb == "") {
//					alert("请选择报名结束时间");
//					return false;
//				}
//				var reg1 = RegExp( /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/);
//				if(!reg1.test(beginTimeb)){
//					alert("报名开始时间格式不正确");
//					return false;
//				}
//				if(!reg1.test(endTimeb)){
//					alert("报名开始时间格式不正确");
//					return false;
//				}
				}else{
					if($("#gk").attr("checked")=="checked"){
//						if (beginTimeb == "") {
//							alert("请选择报名开始时间");
//							return false;
//						}
//						if (endTimeb == "") {
//							alert("请选择报名结束时间");
//							return false;
//						}
//						var reg1 = RegExp( /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/);
//						if(!reg1.test(beginTimeb)){
//							alert("报名开始时间格式不正确");
//							return false;
//						}
//						if(!reg1.test(endTimeb)){
//							alert("报名开始时间格式不正确");
//							return false;
//						}
//						if (maxStudents == "") {
//							alert("请填写最大报名人数");
//							return false;
//						}
//						if (minStudents == "") {
//							alert("请填写最小报名人数");
//							return false;
//						}
//						if(parseInt(minStudents)>parseInt(maxStudents)){
//							alert("最小报名人数不能超过最大报名人数");
//							return false;
//						}
//						var number = RegExp( /^([0-9]+)$/);
//						if(!number.test(minStudents)){
//							alert("最小报名人数只能填数字");
//							return false;
//						}
//						if(!number.test(maxStudents)){
//							alert("最大报名人数只能填数字");
//							return false;
//						}
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
					
				}else{
					var income=$('#incomecount').text();
//					if(income=='-'){
//						$('.jiage4').css("display", "block");
//						return false;
//					}else if(income=='+'){
						$.ajax({
							url : getRootPath() + '/teacher/course/create',
							type : 'POST',
							data : {
								'courseType' : leixing,
								'courseName' : courseName,
								"classifyId" : courseCat2,
//								"target" : courseTarget,
//								"people" : people,
								"price" : coursePrice,
								"coverUrl" : url,
//								"signupStartTime" : beginTimeb,
//								"signupEndTime" : endTimeb,
								"minStudents":minStudents,
								"maxStudents":maxStudents,
								"description" : courseDescription,
								'classs' : jsonArrayToString(classs)
								
							},
							dataType : 'json',
							success : function(data) {
								if(data.success==true){
//									alert("创建成功");
									getDialogCue('success', '创建成功！')
									setTimeout('window.location.href=getRootPath()+"/teacher/course/manage"',3000) ;
								}else{
									getDialogCue('success', '创建失败！')
								}
									
								console.info(data);
							},
						});
//					}else{
//						$('.jiage4').css("display", "block");
//						return false;
//					}
					
				}
				
			
		}
		
		

	});
})
function compute(){
	$('input[name=price]').change(function() { 
		var price=$("#coursePrice").val();
//		var maxStudents=$("#maxStudents").val();
		var maxStudents=4;
		
		var num=$(".xkj").length+1;
		var income;
		if(maxStudents!=''&&price!=''){
			if(parseFloat(price)!=0){
				
			
			 income=parseFloat(price)*parseFloat(maxStudents)-(parseFloat(maxStudents)+1)*5*parseFloat(num);
		
			}else{
				income=0;
			}
			if(income>0){
				$("#income").html("<span id='incomecount'>+</span>￥"+income);
				$('.jg2 li').css('color','#ff0000');
				
			}else if(income<0){
				$("#income").html("<span id='incomecount'>-</span>￥"+Math.abs(income));
				$('.jg2 li').css('color','#0C0');
			}else{
				$("#income").html("<span id='incomecount'></span>￥"+income);
				$('.jg2 li').css('color','#ff0000');
			}
			
		}
		
	});
	$('#maxStudents').change(function() { 
//		alert(111); 
		var price=$("#coursePrice").val();
		var maxStudents=$("#maxStudents").val();
		
		var num=$(".xkj").length+1;
		var income;
		if(maxStudents!=''&&price!=''){
			if(parseFloat(price)!=0){
				
			
			 income=parseFloat(price)*parseFloat(maxStudents)-(parseFloat(maxStudents)+1)*5*parseFloat(num);
		
			}else{
				income=0;
			}
			if(income>0){
				$("#income").html("<span id='incomecount'>+</span>￥"+income);
				$('.jg2 li').css('color','#ff0000');
				
			}else if(income<0){
				$("#income").html("<span id='incomecount'>-</span>￥"+Math.abs(income));
				$('.jg2 li').css('color','#0C0');
			}else{
				$("#income").html("<span id='incomecount'></span>￥"+income);
				$('.jg2 li').css('color','#ff0000');
			}
			
		}
		
	});
}
function changeType3() {
	$('.laoshi1').css("display", "none");
	$(".xuesheng").css("display", "none");
	$(".jiage").css("display", "block");
	$('.jihua').css("display", "block");
	    $('#photo').val('');
	    $('#u247_img').attr("src","/images/course/creatcourseadd_03.png");
	    $('#lxa_xn').css("background-color", "#f5f8fa");
		 $('#lxa_gk').css("background-color", "#f5f8fa");
		 $('#lxa_ge').css("background-color", "#ffffff");
		 $(' #val_payPlatform ').val('3');
}
function add() {
	var n = $(".xkj").length + 1;
	var map = {1 : "二",2 : "三",3 : "四",4 : "五",5 : "六",6 : "七",7 : "八",8 : "九",9 : "十",10 : "十一",11 : "十二",12 : "十三",13 : "十四",14 : "十五",15 : "十六",16 : "十七",17 : "十八"
		,18 : "十九",19 : "二十",20 : "二十一",21 : "二十二",22 : "二十三",23: "二十四",24 : "二十五",25 : "二十六",26 : "二十七",27 : "二十八",28 : "二十九",29 : "三十",30 : "三十一",31 : "三十二"
			,32 : "三十三",33 : "三十四",34 : "三十五",35 : "三十六",36 : "三十七",37 : "三十八",38 : "三十九",39 : "四十",40 : "四十一",41 : "四十二",42 : "四十三",43 : "四十四",44 : "四十五",45 : "四十六"
				,46 : "四十七",47 : "四十八",48 : "四十九",49 : "五十"};
	if(n<50){
		var height = $(".jiaoxuejihua0").outerHeight(true);
		var newheight = height + 100;
		$('.jiaoxuejihua0').css("height", newheight);
		var h = $(".zhanghu").outerHeight(true) + 100;
		$('.zhanghu').css("height", h);
	$('#xinkejie').append(
			"<div id='xkj"
			+ n
			+ "' class='xkj'><div class='kj1' id='kj"
			+ n
			+ "'>第"
			+ map[n]
			+ "节： <input placeholder='最多50个字' id='classArrangement"
			+ n
			+ "' class='classArrangement' maxlength='50'/><span id='ca"
			+ n
			+ "' class='yanzheng'></div><div class='ks'><div class='del_a1'>"
			+ "课节时间  : <input id='courseTime"
			+ n
			+ "'   onClick=\"WdatePicker({minDate:'%y-%M-%d'})\" type='text' class='kjaaa'></input><input class='laydate-icon'  id='start"
			+ n
			+ "'   type='text' onfocus=\"WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',onpicked:function(dp){check("+n+",dp)}})\"></input>"
			+ "<input class='laydate-icon' id='end"
			+ n
			+ "'  type='text' onfocus=\"WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\\'start"+n+"\\')}',onpicked:function(dp){check("+n+",dp)}} )\"></input></div><div class='del_a'><img  src='/images/course/dd_03.png' id='dd'><a  id='a"
			+ n + "'>删除该课节</a></div></div></div>");
	$("#a" + n).bind("click", function() {
		del(n);
	});
	
	}else{
		alert("最多只能添加50个课节");
	}
}
function del(n) {
	var l = $(".xkj").length;
	var map = {1 : "二",2 : "三",3 : "四",4 : "五",5 : "六",6 : "七",7 : "八",8 : "九",9 : "十",10 : "十一",11 : "十二",12 : "十三",13 : "十四",14 : "十五",15 : "十六",16 : "十七",17 : "十八"
		,18 : "十九",19 : "二十",20 : "二十一",21 : "二十二",22 : "二十三",23: "二十四",24 : "二十五",25 : "二十六",26 : "二十七",27 : "二十八",28 : "二十九",29 : "三十",30 : "三十一",31 : "三十二"
			,32 : "三十三",33 : "三十四",34 : "三十五",35 : "三十六",36 : "三十七",37 : "三十八",38 : "三十九",39 : "四十",40 : "四十一",41 : "四十二",42 : "四十三",43 : "四十四",44 : "四十五",45 : "四十六"
				,46 : "四十七",47 : "四十八",48 : "四十九",49 : "五十"};

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
	if(majort==null||majort==0){
		alert("请选择所在专业");
		return false;
	}else{
		
		$.ajax({
			url : getRootPath() + '/school/getteacherlist',
			type : 'POST',
			dataType : 'json',
			data:{
				'majorid':majort
			},
			success : function(data) {
				var teachers=data.teachers;
				var table="<tr class='td1'><td>姓名</td><td>工号</td><td>院系</td><td>专业</td></tr>";
				 for(var i=0; i<teachers.length; i++){
					 table=table+"<tr class='td2'><td><input type='radio'  name='teacher' value='"+teachers[i].uid+"'/>"+teachers[i].realName+"</td><td>"+teachers[i].nickName+"</td><td>"+collegetName+"</td><td>"+majortName+"</td></tr>";
	             }    
				$("#tabTeacher").html(table);
			},
		});
	}
	
	
	
}

function confirmTeacher(){
	var t=$('input[name="teacher"]:checked ').val(); 
	$("#shoukelaoshi").val(t);
	$("#dialog").dialog("close");
}
function queryStudent(){
	
	var classs=$("#classs").val();
	var major=$("#major").val();
	var college=$("#college").find("option:selected").text();
	var major1=$("#major").find("option:selected").text();
	var classs=$("#classs").find("option:selected").text();
	var classss=$("#classs").find("option:selected").val();
	if(classss==null||classss==0){
		alert("请选择班级");
		return false;
	}else{
		
		$.ajax({
			url : getRootPath() + '/school/getstudentlist',
			type : 'POST',
			dataType : 'json',
			data:{
				'majorid':major,
                'strClass':classs
	
			},
			success : function(data) {
				var students=data.students;
				var table="<tr class='td1'><td>姓名</td><td>学号</td><td>院系</td><td>专业</td><td>班级</td></tr>";
				 for(var i=0; i<students.length; i++){
					 table=table+"<tr class='td2'><td><input type='checkbox' name='student' value='"+students[i].uid+"'/>"+students[i].realName+"</td><td>"+students[i].nickName+"</td><td>"+college+"</td><td>"+major1+"</td><td>"+classs+"</td></tr>";
	             }    
				$("#tabStudent").html(table);
			},
		});
	}
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
function queryCategory(){
	var option;
	 
		$.ajax({
			url : getRootPath() + '/category/list',
			type : 'post',
			dataType : 'json',
			success : function(data) {
				myObj=data;
				option="<option  value=''>请选择</option>";
				for(var i=0; i<data.length; i++){
					option=option+"<option value='"+i+"'>"+data[i].name+"</option>";
//					alert(data[i].id);
					
	             }  
				$("#courseCat").html(option);
			},
		});
	
}
//function queryCourseCat1(){
//	var id=$("#courseCat").val();
////	alert(myObj[id]);
//	var option;
//	data=myObj[id].sub;
//	eid=id;
//	option="<option  value=''>请选择</option>";
//	for(var i=0; i<data.length; i++){
//		option=option+"<option value='"+i+"'>"+data[i].name+"</option>";
//		
//     }  
//	$("#courseCat1").html(option);
//	
//}
function queryCourseCat2(){
	var id=$("#courseCat1").val();
//	alert(myObj[id]);
	var option;
	data=myObj[eid].sub[id].sub;
	option="<option  value=''>请选择</option>";
	for(var i=0; i<data.length; i++){
		option=option+"<option value='"+data[i].id+"'>"+data[i].name+"</option>";
		
	}  
	$("#courseCat2").html(option);
	
}
function check(n,dp){
	var num=$('.del_a1').length-1;
	var time=$('.del_a1').eq(n);
	time1=time.children().val()+" "+dp.cal.getNewDateStr();
	time1=new Date(time1.replace(/\-/g, "\/"));
	$('.del_a1').each(function(i){
        
		if(i!=n){
		var t=$(this).children().val();
		var t1=$(this).children().next().val();
		var t2=$(this).children().next().next().val();
		var d=t+" "+t1;
		var d1=t+" "+t2;
		d=new Date(d.replace(/\-/g, "\/"));
		d1=new Date(d1.replace(/\-/g, "\/"));
		if(d<time1&&d1>time1){
			alert("有重叠的课节时间，请重新选择");
			time.children().next().val("")
		}
		}
        });
	
}