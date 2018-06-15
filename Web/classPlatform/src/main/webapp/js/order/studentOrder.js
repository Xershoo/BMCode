var orderInCount = 0;
$(function() {
	
	queryOrder();
})
function queryOrder(){
	
	$.ajax({
		url : getRootPath() + '/student/getsordercount',
		type : 'POST',
		dataType : 'json',
		async:false,
		success : function(data) {
			if(data.status==-1){
				window.location.href= getRootPath() + '/index';
			}else if(data.status==0){
				orderInCount=data.count;
			}
		},
	});	
	
	var pageNum = Math.ceil(orderInCount/10);
	var pageSize = 0;
	if(pageNum == 1){
		$.ajax({
			url :  getRootPath() + '/student/getsorderlist',
			type : 'POST',
			dataType : 'json',
			data:{
				'page':pageNum,
	            'nRows':10
			},
			success : function(data) {
				if(data.status==-1){
					window.location.href= getRootPath() + '/index';
				}else if(data.status==0){
				
				var order;
				order=data.orders;
				var table="";
				 for(var i=0; i<order.length; i++){
						
					 
					 table=table+"<div class='liebiao1'><div class='liebiao11'><div class='jibenxinxi1'><div class='time'></div><div class='img11'><div class='i2'>"
					 +"<div class='i21'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></div>" 
					 +"<div class='i22'><li>"+order[i].courseName+"</li>  <li>"+order[i].teachername;
					 if(order[i].schoolname!=''){
						 table=table+"|"+order[i].schoolname
					 }
					 
					 table=table+"</li>   <li>"+order[i].createtime+"上课</li></div></div></div></div><div class='jiage1'>"
					 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
					 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
					 if(order[i].status==0){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>";
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
						
					 }else if(order[i].status==1){
						 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>";
						 table=table+  "<div class='caozuo1'>";
						 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='cancelOrder(\""+order[i].orderId+"\")'>申请退课</div></li><li>订单详情</li><li>删除订单</li><li><div class='zhifu' onclick='pay(\""+order[i].orderId+"\","+order[i].realprice+",\""+order[i].courseName+"\",\""+order[i].teachername+"\",\""+order[i].schoolname+"\")'>立即支付</div></li></div></div></div>";
					 }else if(order[i].status==2){
						 table=table+"<div class='zhuangtai1'>已付款</div>";
						 table=table+  "<div class='caozuo1'>"
						 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='refundorder(\""+order[i].orderId+"\")'>申请退款</div></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>"
					 }else if(order[i].status==3){
						 table=table+"<div class='zhuangtai1'>已结束</div>";
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
						 
					 }else if(order[i].status==4){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
					 }else if(order[i].status==10){
					 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>";
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
				 }else if(order[i].status==11){
					 table=table+"<div class='zhuangtai1'>已退款</div>"
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
				 }
					 table=table+"<div class='liebiao12'><div class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</div><div class='i3'>提交时间："+order[i].createtime+"</div></div></div>";
				 
				 }    
				$("#xnTable1").html(table);
				$("#page").html('');
				}
			},
		});	
		
	}else if(pageNum == 0){
		$("#xnTable1").html('');
		$("#page").html('');
	}else{
		
		if(pageNum > 1 && pageNum < 10){
			pageSize = pageNum;
		}else{
			pageSize = 10;
		}
		
				$("#page").myPagination({
			    	currPage:1,
			    	pageCount:pageNum,
			    	pageSize:pageSize,
			    	ajax:{
			    		on: true,
			    		callback: 'callBackMenu1Data',
			    		url:getRootPath() + '/student/getsorderlist',
			    		dataType: "json",
			    		cache:false,
			    		param:{on:true, page:1, start:1,'nRows':10}
			    	}
			    });
			
		
		 
		
	}
}
function query(){
	var orderNum =$('#orderNum').val();
	var courseName =$('#courseName').val();
	var buyer =$('#buyer').val();
	var submitTime =$('#submitTime').val();

	
//	$.ajax({
//		url : getRootPath() + '/order/searchorders',
//		type : 'POST',
//		dataType : 'json',
//		data:{'usertype':30,'order':orderNum,'coursename':courseName,'buyer':buyer,'date':submitTime},
//		async:false,
//		success : function(data) {
//			
//				orderInCount=data.orders.length;
//		},
//	});	
//	
//	
//	var pageNum = Math.ceil(orderInCount/10);
//	var pageSize = 0;
//	if(pageNum == 1){
		$.ajax({
			url :  getRootPath() + '/order/searchorders',
			type : 'POST',
			dataType : 'json',
			data:{
//				'page':pageNum,
//	            'nRows':10,
	            'order':orderNum,
	            'coursename':courseName,
	            'buyer':buyer,
	            'date':submitTime,
	            'usertype':30
			},
			success : function(data) {
				
				
				var order;
				order=data.orders;
				var table="";
				 for(var i=0; i<order.length; i++){
						
					 
					 table=table+"<div class='liebiao1'><div class='liebiao11'><div class='jibenxinxi1'><div class='time'></div><div class='img11'><div class='i2'>"
					 +"<div class='i21'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></div>" 
					 +"<div class='i22'><li>"+order[i].courseName+"</li>  <li>"+order[i].teachername;
					 if(order[i].schoolname!=''){
						 table=table+"|"+order[i].schoolname
					 }
					 
					 table=table+"</li>   <li>"+order[i].createtime+"上课</li></div></div></div></div><div class='jiage1'>"
					 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
					 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
					 if(order[i].status==0){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>";
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
						
					 }else if(order[i].status==1){
						 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>";
						 table=table+  "<div class='caozuo1'>";
						 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='cancelOrder(\""+order[i].orderId+"\")'>申请退课</div></li><li>订单详情</li><li>删除订单</li><li><div class='zhifu' onclick='pay(\""+order[i].orderId+"\","+order[i].realprice+",\""+order[i].courseName+"\",\""+order[i].teachername+"\",\""+order[i].schoolname+"\")'>立即支付</div></li></div></div></div>";
					 }else if(order[i].status==2){
						 table=table+"<div class='zhuangtai1'>已付款</div>";
						 table=table+  "<div class='caozuo1'>"
						 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='refundorder(\""+order[i].orderId+"\")'>申请退款</div></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>"
					 }else if(order[i].status==3){
						 table=table+"<div class='zhuangtai1'>已结束</div>";
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
						 
					 }else if(order[i].status==4){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
					 }else if(order[i].status==10){
					 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>";
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
				 }else if(order[i].status==11){
					 table=table+"<div class='zhuangtai1'>已退款</div>"
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
				 }
					 table=table+"<div class='liebiao12'><div class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</div><div class='i3'>提交时间："+order[i].createtime+"</div></div></div>";
				 
				 }    
				$("#xnTable1").html(table);
				$("#page").html('');
				
			},
		});	
		
//	}else if(pageNum == 0){
//		$("#xnTable1").html('');
//		$("#page").html('');
//	}else{
//		
//		if(pageNum > 1 && pageNum < 10){
//			pageSize = pageNum;
//		}else{
//			pageSize = 10;
//		}
//		
//				$("#page").myPagination({
//			    	currPage:1,
//			    	pageCount:pageNum,
//			    	pageSize:pageSize,
//			    	ajax:{
//			    		on: true,
//			    		callback: 'callBackMenu1Data',
//			    		url:getRootPath() + '/student/getsorderlist',
//			    		dataType: "json",
//			    		cache:false,
//			    		param:{on:true, page:1, start:1,'nRows':10}
//			    	}
//			    });
//			
//		
//		 
//		
//	}

	
	
	
	
}
function callBackMenu1Data(data){
	var result = eval("("+data+")");
	var order=result.orders;
	var table="";
	 for(var i=0; i<order.length; i++){
		
		 
		 table=table+"<div class='liebiao1'><div class='liebiao11'><div class='jibenxinxi1'><div class='time'></div><div class='img11'><div class='i2'>"
		 +"<div class='i21'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></div>" 
		 +"<div class='i22'><li>"+order[i].courseName+"</li>  <li>"+order[i].teachername;
		 if(order[i].schoolname!=''){
			 table=table+"|"+order[i].schoolname
		 }
		 
		 table=table+"</li>   <li>"+order[i].createtime+"上课</li></div></div></div></div><div class='jiage1'>"
		 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
		 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
		 if(order[i].status==0){
			 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>";
			 table=table+  "<div class='caozuo1'>"
			 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
			
		 }else if(order[i].status==1){
			 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>";
			 table=table+  "<div class='caozuo1'>";
			 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='cancelOrder(\""+order[i].orderId+"\")'>申请退课</div></li><li>订单详情</li><li>删除订单</li><li><div class='zhifu' onclick='pay(\""+order[i].orderId+"\","+order[i].realprice+",\""+order[i].courseName+"\",\""+order[i].teachername+"\",\""+order[i].schoolname+"\")'>立即支付</div></li></div></div></div>";
		 }else if(order[i].status==2){
			 table=table+"<div class='zhuangtai1'>已付款</div>";
			 table=table+  "<div class='caozuo1'>"
			 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='refundorder(\""+order[i].orderId+"\")'>申请退款</div></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>"
		 }else if(order[i].status==3){
			 table=table+"<div class='zhuangtai1'>已结束</div>";
			 table=table+  "<div class='caozuo1'>"
			 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
			 
		 }else if(order[i].status==4){
			 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
			 table=table+  "<div class='caozuo1'>"
			 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
		 }else if(order[i].status==10){
		 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>";
		 table=table+  "<div class='caozuo1'>"
		 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
	 }else if(order[i].status==11){
		 table=table+"<div class='zhuangtai1'>已退款</div>"
		 table=table+  "<div class='caozuo1'>"
		 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
	 }
		 table=table+"<div class='liebiao12'><div class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</div><div class='i3'>提交时间："+order[i].createtime+"</div></div></div>";
	 
	 }    
	$("#xnTable1").html(table);
}
function changeType(status){
	
	$.ajax({
		url : getRootPath() + '/student/getsorderstatuscount',
		type : 'POST',
		dataType : 'json',
		async:false,
		data:{
			'status':status
		},
		success : function(data) {
			if(data.status==-1){
				window.location.href= getRootPath() + '/index';
			}else if(data.status==0){
				orderInCount=data.count;
			}
		},
	});	
	
	var pageNum = Math.ceil(orderInCount/10);
	var pageSize = 0;
	
	if(pageNum == 1){
		
		$.ajax({
			url :  getRootPath() + '/student/getsorderstatuslist',
			type : 'POST',
			dataType : 'json',
			data:{
				'page':pageNum,
	            'nRows':10,
	            'status':status
			},
			success : function(data) {
				if(data.status==-1){
					window.location.href= getRootPath() + '/index';
				}else if(data.status==0){
				
				var order;
				order=data.orders;
				var table="";
				 for(var i=0; i<order.length; i++){
						
					 
					 table=table+"<div class='liebiao1'><div class='liebiao11'><div class='jibenxinxi1'><div class='time'></div><div class='img11'><div class='i2'>"
					 +"<div class='i21'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></div>" 
					 +"<div class='i22'><li>"+order[i].courseName+"</li>  <li>"+order[i].teachername;
					 if(order[i].schoolname!=''){
						 table=table+"|"+order[i].schoolname
					 }
					 
					 table=table+"</li>   <li>"+order[i].createtime+"上课</li></div></div></div></div><div class='jiage1'>"
					 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
					 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
					 if(order[i].status==0){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>";
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
						
					 }else if(order[i].status==1){
						 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>";
						 table=table+  "<div class='caozuo1'>";
						 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='cancelOrder(\""+order[i].orderId+"\")'>申请退课</div></li><li>订单详情</li><li>删除订单</li><li><div class='zhifu' onclick='pay(\""+order[i].orderId+"\","+order[i].realprice+",\""+order[i].courseName+"\",\""+order[i].teachername+"\",\""+order[i].schoolname+"\")'>立即支付</div></li></div></div></div>";
					 }else if(order[i].status==2){
						 table=table+"<div class='zhuangtai1'>已付款</div>";
						 table=table+  "<div class='caozuo1'>"
						 table=table+"<div class='caozuo2'><li><div class='tuike' onclick='refundorder(\""+order[i].orderId+"\")'>申请退款</div></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>"
					 }else if(order[i].status==3){
						 table=table+"<div class='zhuangtai1'>已结束</div>";
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
						 
					 }else if(order[i].status==4){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
						 table=table+  "<div class='caozuo1'>"
						 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
					 }else if(order[i].status==10){
					 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>";
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
				 }else if(order[i].status==11){
					 table=table+"<div class='zhuangtai1'>已退款</div>"
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li></li><li>订单详情</li><li>删除订单</li><li></li></div></div></div>";
				 }
					 table=table+"<div class='liebiao12'><div class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</div><div class='i3'>提交时间："+order[i].createtime+"</div></div></div>";
				 
				 }    
				$("#xnTable1").html(table);
				$("#page").html('');
				}
			},
		});	
		
	}else if(pageNum == 0){
		$("#xnTable1").html('');
		$("#page").html('');
	}else{
		if(pageNum > 1 && pageNum < 10){
			pageSize = pageNum;
		}else{
			pageSize = 10;
		}
		
				$("#page").myPagination({
			    	currPage:1,
			    	pageCount:pageNum,
			    	pageSize:pageSize,
			    	ajax:{
			    		on: true,
			    		callback: 'callBackMenu1Data',
			    		url:getRootPath() + '/student/getsorderstatuslist',
			    		dataType: "json",
			    		cache:false,
			    		param:{on:true, page:1, start:1,'nRows':10, 'status':status}
			    	}
			    });
			
		
		 
		
	}

}
function change(){
	queryOrder();
}
function pay(orderId,price,courseName,teacherName,schoolname){
	   window.location.href=getRootPath() + "/order/payStudentOrder?orderId="+orderId+"&price="+price+"&courseName="+encodeURI(encodeURI(courseName))+"&teacherName="+encodeURI(encodeURI(teacherName))+"&schoolname="+encodeURI(encodeURI(schoolname)); 
	
	
}
function cancel(orderId){
	$.ajax({
		url :  getRootPath() + '/order/cancelorder',
		type : 'POST',
		dataType : 'json',
		data:{
			'orderid':orderId
		},
		success : function(data) {
			if(data.status==-1){
				window.location.href= getRootPath() + '/index';
			}else if(data.status==0){
				alert("取消订单成功");
				location.reload();
			}
			
			
			
		},
	});	
}
function changeIdentity1(){
	var identity= $('#identity').val();
//	queryCourse(identity);
	if(identity==1){
		window.location.href= getRootPath() + '/order/manageOrder';
	}else if(identity==2){
		window.location.href= getRootPath() + '/order/studentOrder';
	}
 
 
 }
function refundorder(orderId){
	if(confirm("是否确认退款"))
		refund(orderId);
		else
		return false;
	 
}
function cancelOrder(orderId){
	if(confirm("是否确认退课"))
		cancel(orderId);
	else
		return false;
	
}
function refund(orderId){
	$.ajax({
		url :  getRootPath() + '/student/refundorder',
		type : 'POST',
		dataType : 'json',
		data:{
			'orderid':orderId
		},
		success : function(data) {
			if(data.status==-1){
				window.location.href= getRootPath() + '/index';
			}else if(data.status==-4){
				alert("报名已结束，不能退款");
//				location.reload();
			}else if(data.status==0){
				alert("退款成功");
			}
			
			
			
		},
	});	
	
}