var count = 0;

$(function() {
	var type=$("#messageType").val();
//	queryCourseAllMessage(type);
	if(type=''){
		
		queryCourseAllMessage(1);
	}else{
		type=$("#messageType").val();
		changeType(type);
	}
	
//	message();
	$("#coureseId").on("keyup",function(){
        sendnewmassage();
    })
    
    $(".m_receiverInfo p").live("click",function(){

    var    courseName = $(this).html();
    var   courseid = $(this).attr("classid");
        //console. log(message.courseName);
        $("#coureseId").val(courseName);
        $("#courseIdHidden").val(courseid);
        $(".m_receiverInfo").css("display","none");
    })
}
)
function tocouresemessage(){
	location.href = getRootPath() + "/message/message?type=1";
}
function toprivatemessage(){
	location.href = getRootPath() + "/message/message?type=3";
}
function tosystemmessage(){
	location.href = getRootPath() + "/message/message?type=4";
}
function sendnewmassage(){
	 $.ajax({
         url: getRootPath()+"/course/dataList",//用于进行模糊搜索
         type: "post",
         dataType: "json",
         cache: false,
         success: function(data) { 
        	 var courseName;
             switch (data.status) {
                 case 0:
                     var m_receiverInputVal = $("#coureseId").val();
                     var str1 = m_receiverInputVal;
                     var newAry=null;
                     var str="";
                     var strClassid="";
                     $(".m_receiverInfo").html("");
                     $(".m_receiverInfo").show();
                     for(var i = 0;i<data.courseidlist.length;i++){
                         str = data.courseidlist[i].courseName;
                         strClassid = data.courseidlist[i].classid;
                         if(str.indexOf(str1)>-1){
                             $(".m_receiverInfo").append('<p style="cursor:pointer;line-height:15px;" classid = '+strClassid+'>'+str+'</p>');
//                             $("#coureseId").on("blur",function(){
//                                 courseName = $("#coureseId").val();
//                                 for(var i = 0;i<$(".m_receiverInfo p").length;i++){
//                                     if($(".m_receiverInfo p").eq(i).html() == courseName){
//                                         message.courseid = $(".m_receiverInfo p").eq(i).attr("classid");
//                                     }    
//                                 }  
//                             })
                         }                 
                     } 

                     break;
                 default:
                	 
                     break;
             }
         }

     })
}
function message(){
	var url;
	 url=getRootPath() + '/message/sendnewmassage/100';
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		async:false,
		data:{
			'receiverUid':37604,
			'courseid':10258,
			'courseName':"请输入课程名称，最多60个字",
			'title':"教练机费德勒急啊可搭街坊经典科科夫你",
			'content':"搭街坊空档接龙看见反复卡机可vnkljaknvkndknvdkjvajljdvlkdjaklv"
		},
		success : function(data) {
			
			
		},
	});
}
function queryCourseAllMessage(type){
	var type1;
 if(type==1){
	 type1=50;
 }else if(type==2){
	 
 }else if(type==3){
	 type1=0;
 }else if(type==4){
	 type1=100;
 }
	var url;
		 url=getRootPath() + '/message/messageTypeCount';
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		async:false,
		data:{
			'notread':2,
			'type':type1,
		},
		success : function(data) {
			if(data.status==-1){
				window.location.href= getRootPath() + '/index';
			}else if(data.status==0){
				count=data.count;
			}
		},
	});	
	
	var pageNum = Math.ceil(count/5);
	var pageSize = 0;
	if(pageNum == 1){
		$.ajax({
			url : getRootPath() + '/message/messageAll',
			type : 'POST',
			dataType : 'json',
			data:{
				'notread':2,
	            'page':pageNum,
	            'count':5,
	            'type':type1
	            
			},
			success : function(data) {
				var courseMessage;
				courseMessage=data.list;
				var table="";
				if(type==1){
					 for(var i=0; i<courseMessage.length; i++){
						 table=table+"<div class='courseMessage_list'><div class='courseMessage_list1'>"
						 +"<div class='icon'><li class='icon1'><input type='checkbox' name='courseMessage'></li><li class='icon2'><img tabindex='0' id='u145_img' class='img ' src='"+courseMessage[i].userImg+"'></li></div>"
						 +"<div class='detail'><li class='detail1'><span class='d1'>"+courseMessage[i].msgName+"</span> <span class='d2'>"+courseMessage[i].strPublicName+"</span> "
						 if(courseMessage[i].readFlag==0){
							 table=table+"<img src='../images/u99.png' class='newflag'>";
						 }
						 table=table+"</li><li class='detail2' ><span onclick='queryCourseMessage(\""+courseMessage[i].msgId+"\")'>"+courseMessage[i].title+"</span></li></div>"
						 +"<div class='time'>"+courseMessage[i].createTime+"</div><div class='delete_icon'><div class='delete_icon1'><img tabindex='0' id='u143_img' class='img ' src='/images/manageCourse/del_03.png' onclick='deleteCourseMessage(\""+courseMessage[i].msgId+"\")'></div></div></div> <div class='xiahuxian'></div></div>";
					 }    
					$("#courseMessageList").html(table);
					$("#page").css('display','none');
				}else if(type==3){
					for(var i=0; i<courseMessage.length; i++){
						 table=table+"<div class='courseMessage_list'><div class='courseMessage_list1'><div class='icon'><li class='icon1'><input type='checkbox' name='courseMessage'></li><li class='icon2'><img tabindex='0' id='u145_img' class='imgu' src='"+courseMessage[i].userImg+"' onclick='toIndex("+courseMessage[i].userType+","+courseMessage[i].senderid+")'></li></div>"
						 +"<div class='detail'><li class='detail1'><span class='d1' onclick='toIndex("+courseMessage[i].userType+","+courseMessage[i].senderid+")'>"+courseMessage[i].strPublicName+"</span>";
						 if(courseMessage[i].readFlag==0){
							 table=table+"<img src='../images/u99.png' class='newflag'>";
						 }
						 table=table+" </li><li class='detail2' onclick='privateMessage(\""+courseMessage[i].msgId+"\",\""+courseMessage[i].senderid+"\",\""+courseMessage[i].title+"\",\""+courseMessage[i].strPublicName+"\")'>"+courseMessage[i].title+"</li></div>"
						 +"<div class='time'>"+courseMessage[i].createTime+"</div><div class='delete_icon'><div class='delete_icon1'><img tabindex='0' id='u143_img' class='img ' src='/images/manageCourse/del_03.png' onclick='deleteCourseMessage(\""+courseMessage[i].msgId+"\")'></div></div></div> <div class='xiahuxian'></div></div>";
					 }    
					$("#privateMessageList").html(table);
					$("#page").css('display','none');
				}else if(type==4){
					for(var i=0; i<courseMessage.length; i++){
						 table=table+"<div class='courseMessage_list'><div class='courseMessage_list1'>"
						 +"<div class='icon'><li class='icon1'><input type='checkbox' name='courseMessage'></li><li class='icon2'><img tabindex='0' id='u145_img' class='img ' src='"+courseMessage[i].userImg+"'></li></div>"
						 +"<div class='detail'><li class='detail1'><span class='d1'>《"+courseMessage[i].msgName+"》</span> <span class='d2'>"+courseMessage[i].strPublicName+"</span> <span class='d3'>老师</span>"
						 if(courseMessage[i].readFlag==0){
							 table=table+"<img src='../images/u99.png' class='newflag'>";
						 }
						 table=table+"</li><li class='detail2' ><span onclick='systemMessage(\""+courseMessage[i].msgId+"\")'>"+courseMessage[i].title+"</span></li></div>"
						 +"<div class='time'>"+courseMessage[i].createTime+"</div><div class='delete_icon'><div class='delete_icon1'><img tabindex='0' id='u143_img' class='img ' src='/images/manageCourse/del_03.png' onclick='deleteCourseMessage(\""+courseMessage[i].msgId+"\")'></div></div></div> <div class='xiahuxian'></div></div>";
					 }    
					$("#systemMessageList").html(table);
					$("#page").css('display','none');
				}
				
			},
		});	
		
	}else if(pageNum == 0){
		$("#page").css('display','none');
		$("#courseMessageList").html("<span id='wuxiaoxi'>暂无相关消息~</span>");
		$("#privateMessageList").html("<span id='wuxiaoxi'>暂无相关消息~</span>");
		$("#systemMessageList").html("<span id='wuxiaoxi'>暂无相关消息~</span>");
		
	}else{
		if(pageNum > 1 && pageNum < 5){
			pageSize = pageNum;
		}else{
			pageSize = 5;
		}
		if(type==1){
			$("#page").myPagination({
		    	currPage:1,
		    	pageCount:pageNum,
		    	pageSize:pageSize,
		    	ajax:{
		    		on: true,
		    		callback: 'callBackMenu1Data',
		    		url:getRootPath() + '/message/messageAll',
		    		dataType: "json",
		    		cache:false,
		    		param:{on:true, page:1, start:1,rows:5,'notread':2,'count':5,'type':type1}
		    	}
		    });
		 }else if(type==2){
			 
		 }else if(type==3){
			 $("#page").myPagination({
			    	currPage:1,
			    	pageCount:pageNum,
			    	pageSize:pageSize,
			    	ajax:{
			    		on: true,
			    		callback: 'callBackMenu3Data',
			    		url:getRootPath() + '/message/messageAll',
			    		dataType: "json",
			    		cache:false,
			    		param:{on:true, page:1, start:1,rows:5,'notread':2,'count':5,'type':type1}
			    	}
			    });
		 }else if(type==4){
			 $("#page").myPagination({
			    	currPage:1,
			    	pageCount:pageNum,
			    	pageSize:pageSize,
			    	ajax:{
			    		on: true,
			    		callback: 'callBackMenu4Data',
			    		url:getRootPath() + '/message/messageAll',
			    		dataType: "json",
			    		cache:false,
			    		param:{on:true, page:1, start:1,rows:5,'notread':2,'count':5,'type':type1}
			    	}
			    });
		 }
				
			
				
		 
		
	}

	
	
}
function callBackMenu1Data(data){
	var result = eval("("+data+")");
	var courseMessage=result.list;
	var table="";
	for(var i=0; i<courseMessage.length; i++){
		 table=table+"<div class='courseMessage_list'><div class='courseMessage_list1'>"
		 +"<div class='icon'><li class='icon1'><input type='checkbox' name='courseMessage'></li><li class='icon2'><img tabindex='0' id='u145_img' class='img ' src='"+courseMessage[i].userImg+"'></li></div>"
		 +"<div class='detail'><li class='detail1'><span class='d1'>"+courseMessage[i].msgName+"</span> <span class='d2'>"+courseMessage[i].strPublicName+"</span> "
		 if(courseMessage[i].readFlag==0){
			 table=table+"<img src='../images/u99.png' class='newflag'>";
		 }
		 table=table+"</li><li class='detail2' ><span onclick='queryCourseMessage(\""+courseMessage[i].msgId+"\")'>"+courseMessage[i].title+"</span></li></div>"
		 +"<div class='time'>"+courseMessage[i].createTime+"</div><div class='delete_icon'><div class='delete_icon1'><img tabindex='0' id='u143_img' class='img ' src='/images/manageCourse/del_03.png' onclick='deleteCourseMessage(\""+courseMessage[i].msgId+"\")'></div></div></div> <div class='xiahuxian'></div></div>";
	 }    
	$("#courseMessageList").html(table);
	$("#page").css('display','block');
}
function callBackMenu3Data(data){
	var result = eval("("+data+")");
	var courseMessage=result.list;
	var table="";
	for(var i=0; i<courseMessage.length; i++){
		 table=table+"<div class='courseMessage_list'><div class='courseMessage_list1'><div class='icon'><li class='icon1'><input type='checkbox' name='courseMessage'></li><li class='icon2'><img tabindex='0' id='u145_img' class='imgu' src='"+courseMessage[i].userImg+"' onclick='toIndex("+courseMessage[i].userType+","+courseMessage[i].senderid+")'></li></div>"
		 +"<div class='detail'><li class='detail1'><span class='d1' onclick='toIndex("+courseMessage[i].userType+","+courseMessage[i].senderid+")'>"+courseMessage[i].strPublicName+"</span>";
		 if(courseMessage[i].readFlag==0){
			 table=table+"<img src='../images/u99.png' class='newflag'>";
		 }
		 table=table+" </li><li class='detail2' onclick='privateMessage(\""+courseMessage[i].msgId+"\",\""+courseMessage[i].senderid+"\",\""+courseMessage[i].title+"\",\""+courseMessage[i].strPublicName+"\")'>"+courseMessage[i].title+"</li></div>"
		 +"<div class='time'>"+courseMessage[i].createTime+"</div><div class='delete_icon'><div class='delete_icon1'><img tabindex='0' id='u143_img' class='img ' src='/images/manageCourse/del_03.png' onclick='deleteCourseMessage(\""+courseMessage[i].msgId+"\")'></div></div></div> <div class='xiahuxian'></div></div>";
	 }    
	$("#privateMessageList").html(table);
	$("#page").css('display','block');
}
function callBackMenu4Data(data){
	var result = eval("("+data+")");
	var courseMessage=result.list;
	var table="";
	for(var i=0; i<courseMessage.length; i++){
		 table=table+"<div class='courseMessage_list'><div class='courseMessage_list1'>"
		 +"<div class='icon'><li class='icon1'><input type='checkbox' name='courseMessage'></li><li class='icon2'><img tabindex='0' id='u145_img' class='img ' src='"+courseMessage[i].userImg+"'></li></div>"
		 +"<div class='detail'><li class='detail1'><span class='d1'>《"+courseMessage[i].msgName+"》</span> <span class='d2'>"+courseMessage[i].strPublicName+"</span> <span class='d3'>老师</span>"
		 if(courseMessage[i].readFlag==0){
			 table=table+"<img src='../images/u99.png' class='newflag'>";
		 }
		 table=table+"</li><li class='detail2' ><span onclick='systemMessage(\""+courseMessage[i].msgId+"\")'>"+courseMessage[i].title+"</span></li></div>"
		 +"<div class='time'>"+courseMessage[i].createTime+"</div><div class='delete_icon'><div class='delete_icon1'><img tabindex='0' id='u143_img' class='img ' src='/images/manageCourse/del_03.png' onclick='deleteCourseMessage(\""+courseMessage[i].msgId+"\")'></div></div></div> <div class='xiahuxian'></div></div>";
	 }    
	$("#systemMessageList").html(table);
	$("#page").css('display','block');
}
function changeType(type){
	if(type==1){
		$('.courseMessage').css('display','block');
		$('.courseRemark').css('display','none');
		$('.privateMessage').css('display','none');
		$('.systemMessage').css('display','none');
		$('#courseMessage_detail').css('display','none');
		$('#private_detail').css('display','none');
		$('#system_detail').css('display','none');
		$('#messageFlag').val(1);
		$('#cm').css('color','#89bdf8');
		$('#cr').css('color','#8b8b8b');
		$('#pm').css('color','#8b8b8b');
		$('#sm').css('color','#8b8b8b');
		$('.sendMessage').css('display','none');
		$('#send_private_detail').css('display','none');
		$('#send_private_message').css('display','none');
		queryCourseAllMessage(1);
		
	}else if(type==2){
		$('.courseMessage').css('display','none');
		$('.courseRemark').css('display','block');
		$('.privateMessage').css('display','none');
		$('.systemMessage').css('display','none');
		$('#courseMessage_detail').css('display','none');
		$('#private_detail').css('display','none');
		$('#system_detail').css('display','none');
		$('#messageFlag').val(2);
		$('#cm').css('color','#8b8b8b');
		$('#cr').css('color','#89bdf8');
		$('#pm').css('color','#8b8b8b');
		$('#sm').css('color','#8b8b8b');
		$('.sendMessage').css('display','none');
		$('#send_private_detail').css('display','none');
		$('#send_private_message').css('display','none');
	}else if(type==3){
		$('.courseMessage').css('display','none');
		$('.courseRemark').css('display','none');
		$('.privateMessage').css('display','block');
		$('.systemMessage').css('display','none');
		$('#courseMessage_detail').css('display','none');
		$('#private_detail').css('display','none');
		$('#system_detail').css('display','none');
		$('#messageFlag').val(3);
		$('#cm').css('color','#8b8b8b');
		$('#cr').css('color','#8b8b8b');
		$('#pm').css('color','#89bdf8');
		$('#sm').css('color','#8b8b8b');
		$('.sendMessage').css('display','none');
		$('#send_private_detail').css('display','none');
		$('#send_private_message').css('display','none');
		queryCourseAllMessage(3);
	}else if(type==4){
		$('.courseMessage').css('display','none');
		$('.courseRemark').css('display','none');
		$('.privateMessage').css('display','none');
		$('.systemMessage').css('display','block');
		$('#courseMessage_detail').css('display','none');
		$('#private_detail').css('display','none');
		$('#system_detail').css('display','none');
		$('#messageFlag').val(4);
		$('#cm').css('color','#8b8b8b');
		$('#cr').css('color','#8b8b8b');
		$('#pm').css('color','#8b8b8b');
		$('#sm').css('color','#89bdf8');
		$('.sendMessage').css('display','none');
		$('#send_private_detail').css('display','none');
		$('#send_private_message').css('display','none');
		queryCourseAllMessage(4);
	}else if(type==5){
		//发送私信
		$('.courseMessage').css('display','none');
		$('.courseRemark').css('display','none');
		$('.privateMessage').css('display','block');
		$('.systemMessage').css('display','none');
		$('#courseMessage_detail').css('display','none');
		$('#private_detail').css('display','none');
		$('#system_detail').css('display','none');
		$('#messageFlag').val(3);
		$('#cm').css('color','#8b8b8b');
		$('#cr').css('color','#8b8b8b');
		$('#pm').css('color','#89bdf8');
		$('#sm').css('color','#8b8b8b');
		$('.sendMessage').css('display','none');
		$('#send_private_detail').css('display','none');
		$('#privateMessage').css('display','none');
		$('#send_private_message').css('display','block');
		
		//发送私信
		
		
	}
}
function toIndex(type,id){
	if(type==40){
		//老师infocenter/student/37604
		location.href = getRootPath() + "/infocenter/teacher/"+id;
	}else if(type==30){
		//学生
		location.href = getRootPath() + "/infocenter/student/"+id;
	}
}
function enter(type){
	if(type==1){
		$('#cm').css('color','#89bdf8');
		
	}else if(type==2){
		$('#cr').css('color','#89bdf8');
		
	}else if(type==3){
		$('#pm').css('color','#89bdf8');
		
	}else if(type==4){
		$('#sm').css('color','#89bdf8');
		
	}
}
function leave(type){
	var flag=$('#messageFlag').val();
	if(type==1){
		if(flag!=1){
			$('#cm').css('color','#8b8b8b');
		}
		
		
		
	}else if(type==2){
		if(flag!=2){
		$('#cr').css('color','#8b8b8b');
		}
		
	}else if(type==3){
		if(flag!=3){
		$('#pm').css('color','#8b8b8b');
		}
		
	}else if(type==4){
		if(flag!=4){
		$('#sm').css('color','#8b8b8b');
		}
		
	}
}
function queryCourseMessage(msgId){
	$('.courseMessage').css('display','none');
	$('#courseMessage_detail').css('display','block');
	$.ajax({
		url : getRootPath() + '/message/messageByid',
		type : 'POST',
		dataType : 'json',
		data:{
			'msgid':msgId
		},
		success : function(data) {
			if(data.status==-1){
//				alert("网络连接错误");
				getDialog("fail", "网络连接错误");
			}else if(data.status==0){
				var courseMessage;
				courseMessage=data.message;
//				var table="";
//					 table=table+"";
//				$("#courseMessage_detail").html(table);
				$('#cd_u148_img').attr('src',courseMessage.userImg);
				$('#cd_name').text(courseMessage.msgName);
				$('#cd_teacher').text(courseMessage.strPublicName);
				$('#cd_time').text(courseMessage.createTime);
				$('#cd_title').text(courseMessage.title);
				$('#cd_content').text(courseMessage.content);
				if(courseMessage.readFlag==0){
					
					if(parseInt($('#course_message_head').text())!=0){
				
				var count=parseInt($('#course_message_head').text())-1;
				$('#course_message_head').text(count);
				var count1=parseInt($('#count_head').text())-1;
				$('#count_head').text(count1);
					}
				}
			}
			
			
		},
	});	
	$('#page').css('display','none');
}
function backMessage(){
	$('.courseMessage').css('display','block');
	$('#courseMessage_detail').css('display','none');
	$('#page').css('display','block');
}
function systemMessage(msgId){
	$('#system_detail').css('display','block');
	$('#systemMessage').css('display','none');
	$.ajax({
		url : getRootPath() + '/message/messageByid',
		type : 'POST',
		dataType : 'json',
		data:{
			'msgid':msgId
		},
		success : function(data) {
			if(data.status==-1){
//				alert("网络连接错误");
				getDialog("fail", "网络连接错误");
			}else if(data.status==0){
				var courseMessage;
				courseMessage=data.message;
//				var table="";
//					 table=table+"";
//				$("#courseMessage_detail").html(table);
				$('#smd_u148_img').attr('src',courseMessage.userImg);
				$('#smd_time').text(courseMessage.createTime);
				$('#smd_title').text(courseMessage.title);
				$('#smd_content').text(courseMessage.content);
				if(courseMessage.readFlag==0){
				if(parseInt($('#system_message_head').text())!=0){
				var count=parseInt($('#system_message_head').text())-1;
				$('#system_message_head').text(count);
				var count1=parseInt($('#count_head').text())-1;
				$('#count_head').text(count1);
				}
				}
				
			}
			
			
		},
	});	
	$('#page').css('display','none');
	
	
	
	
}
function backSystemMessage(){
	$('#system_detail').css('display','none');
	$('#systemMessage').css('display','block');
	$('#page').css('display','block');
}
function privateMessage(msgId,sendId,title,name){
	$('#privateMessage').css('display','none');
	$('#private_detail').css('display','block');
	$('.user_name').text(name);
	$.ajax({
		url : getRootPath() + '/message/messageByid',
		type : 'POST',
		dataType : 'json',
		data:{
			'msgid':msgId
		},
		success : function(data) {
			if(data.status==-1){
//				alert("网络连接错误");
				getDialog("fail", "网络连接错误");
			}else if(data.status==0){
				var courseMessage;
				courseMessage=data.message;
//				var table="";
//					 table=table+"";
//				$("#courseMessage_detail").html(table);
				$('#cmd_u148_img').attr('src',courseMessage.userImg);
				$('#cmdTeacher').text(courseMessage.strPublicName);
				$('#cmdTime').text(courseMessage.createTime);
				$('#cmdContent').html("<pre>"+courseMessage.content+"</pre>");
				$('#privateMessageId').val(msgId);
				$('#privateMessageSenderId').val(sendId);
				$('#privateMessagetitle').val(title);
				
				if(courseMessage.readFlag==0){
					
				if(parseInt($('#private_message_head').text())!=0){
					var count=parseInt($('#private_message_head').text())-1;
					$('#private_message_head').text(count);
					var count1=parseInt($('#count_head').text())-1;
					$('#count_head').text(count1);
					
					
				}
				}
			}
			
			
		},
	});	
	$('#page').css('display','none');
	
	
}
function replay(){
	var name=$('#puname').text();
//	var name=	$('.user_name').text();
	$('#private_detail').css('display','none');
	$('#send_private_detail').css('display','block');
	var time=$('#cmdTime').text();
	
	var cmdContent=$('#cmdContent').text();
	var html="\n\n\n\n\n\n----------------------------------------------------\n"+name+"\n发起于"+time+"\n"+cmdContent
	$('#send_private_cmdContent').val(html);
	
}
function sendPrivteMessage(){
var privateMessagetitle=	$('#privateMessagetitle').val();	
var	privateMessageId=	$('#privateMessageId').val();
var privateMessageSenderId=	$('#privateMessageSenderId').val();
var t=$('#privateMessagetitle').val();
var title;
if(t.substring(0,3)=="回复："){
	title=t;
}else{
	title="回复："+t;
}
//var title="回复："+t;
var content=$('#send_private_cmdContent').val();
	var url;
	 url=getRootPath() + '/message/sendnewmassage/0';
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		async:false,
		data:{
			'receiverUid':privateMessageSenderId,
			'courseid':0,
			'courseName':0,
			'title':title,
			'content':content
		},
		success : function(data) {
			if(data.status==0){
				 
//				alert("发送成功！");
				getDialogCue("success", "发送成功！");
				changeType(3);
			}else{
//				alert("发送失败！");
				getDialog("fail", "发送失败！");
			}
			
		},
	});
}
function sendPrivteMessagesend(){
	var privatemessagecontent=	$('#privatemessagecontent').val();	
	var	send_private_Content= $('#send_private_Content').val();
	if(send_private_Content==''){
		$('#send_private_Content_tip').text('请填写发信的内容！');
		return false;
	}
	if(privatemessagecontent==''){
		$('#privatemessagecontent_tip').text('请填写发信的标题！');
		return false;
	}
	
	
	var	receiverUid= $('#receiverUid').val();
		var url;
		 url=getRootPath() + '/message/sendnewmassage/0';
		$.ajax({
			url : url,
			type : 'POST',
			dataType : 'json',
			async:false,
			data:{
				'receiverUid':receiverUid,
				'courseid':0,
				'courseName':0,
				'title':privatemessagecontent,
				'content':send_private_Content
			},
			success : function(data) {
				if(data.status==0){
//					 $("#cname").text('');
//					 $("#ctitle").text('');
//					 $("#ccontent").text('');
					 
//					alert("发送成功！");
					getDialogCue("success", "发送成功！");
					location.href = getRootPath() + "/message/message?type=3";
				}else{
//					alert("发送失败！");
					getDialog("fail", "发送失败！");
				}
				
			},
		});
	}
function backPrivateMessage(){
	$('#privateMessage').css('display','block');
	$('#private_detail').css('display','none');
	$('#send_private_detail').css('display','none');
	$('#page').css('display','block');
}
function deleteCourseMessage(msgId){
	getDialog("confirm", "确认要删除消息吗");
	
	$("#dialog_cancel_btn").click(function() {
		 myTinyDialog.remove();
	});
	$("#dialog_queding_btn").click(function() {
		$.ajax({
		url : getRootPath() + '/message/deleMessById',
		type : 'POST',
		dataType : 'json',
		data:{
			'messageid':msgId
		},
		success : function(data) {
			if(data.status==-1){
//				alert("网络连接错误");
				getDialog("fail", "网络连接错误");
			}else if(data.status==0){
//				alert("删除成功");
				getDialogCue("success", "删除成功！");
				location.reload();
			}
			
			
		},
	});	
	});

}
function newCourse(){
	$('.courseMessage').css('display','none');
	$('.sendMessage').css('display','block');
	$('#page').css('display','none');
}
function back(){
	$('.courseMessage').css('display','block');
	$('.sendMessage').css('display','none');
	$('#page').css('display','block');
	 $("#coureseId").val("");
	 $("#message_title").val("");
	 $("#message_content").val("");
	 $("#courseIdHidden").val("");
	 $("#cname").text('');
	 $("#cname").text('');
	 $("#ctitle").text('');
}
function send(){
	var courseId= $("#courseIdHidden").val();
	var title= $("#message_title").val();
	var content= $("#message_content").val();
	var courseName= $("#coureseId").val();
	var name= $(".m_receiverInfo").text();
	if(name==''){
		 $("#cname").text('此课程不存在！');
		return false;
	}
	if(courseId==''||courseName==''){
		 $("#cname").text('请填写课程名称！');
		return false;
	}
	if(title==''){
		$("#ctitle").text('请填写标题！');
		return false;
	}
	if(content==''){
		$("#ccontent").text('请填写内容！');
		return false;
	}
	
	var url;
	 url=getRootPath() + '/message/sendnewmassage/50';
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'json',
		async:false,
		data:{
			'receiverUid':37604,
			'courseid':courseId,
			'courseName':courseName,
			'title':title,
			'content':content
		},
		success : function(data) {
			//alert(data.status);
			if(data.status==0){
				 $("#cname").text('');
				 $("#ctitle").text('');
				 $("#ccontent").text('');
				 
//				alert("发送成功！");
				 getDialogCue("success", "发送成功！");
				changeType(1);
			}else if(data.status==-2){
//				alert("该科没用学生列表，发送无效！");
				getDialog("fail", "该科没用学生列表，发送无效！");
			}else if(data.status==-3){
//				alert("发送者不是这堂课的老师，不能群发消息！");
				getDialog("fail", "发送者不是这堂课的老师，不能群发消息！");
			}else {
//				alert("发送者不是这堂课的老师，不能群发消息！");
				getDialog("fail", "发送者不是这堂课的老师，不能群发消息！");
			}
			 $("#coureseId").val("");
			 $("#message_title").val("");
			 $("#message_content").val("");
			 $("#courseIdHidden").val("");
		},
	});
	
	
	
	
}