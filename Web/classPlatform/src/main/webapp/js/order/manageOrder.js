var orderInCount = 0;
$(function() {
	
	queryOrder();
})
function queryOrder(){
	
	$.ajax({
		url : getRootPath() + '/teacher/gettordercount',
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
			url :  getRootPath() + '/teacher/gettorderlist',
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
					 table=table+"<div class='liebiao1'><div class='liebiao11' ><div class='jibenxinxi1'><div class='time'></div>"
					 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></li>"
					 +"<li class='i4'>"+order[i].courseName+"</li></div></div><div class='chuangkeren1'>"+order[i].teachername+"</div><div class='jiage1'>"
					 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
					 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
					 if(order[i].status==0){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
					 }else if(order[i].status==1){
						 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>"
					 }else if(order[i].status==2){
						 table=table+"<div class='zhuangtai1'>已付款</div>"
					 }else if(order[i].status==3){
						 table=table+"<div class='zhuangtai1'>已结束</div>"
					 }else if(order[i].status==4){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
					 }else if(order[i].status==10){
					 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>"
				 }else if(order[i].status==11){
					 table=table+"<div class='zhuangtai1'>已退款</div>"
				 }
					 
					 
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li><div class='tuike'>同意退课</div></li><li>查看原因</li><li>删除订单</li></div></div></div>"
					 +"<div class='liebiao12'><li class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</li><li class='i3'>创建于："+order[i].createtime+"</li></div></div>";
				 }    
				$("#xnTable1").html(table);
				$("#page").css('display','none');
				
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
			    		url:getRootPath() + '/teacher/gettorderlist',
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
//		data:{'usertype':40,'order':orderNum,'coursename':courseName,'buyer':buyer,'date':submitTime},
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
	            'usertype':40
			},
			success : function(data) {
				
				
				var order;
				order=data.orders;
				var table="";
				 for(var i=0; i<order.length; i++){
					 table=table+"<div class='liebiao1'><div class='liebiao11' ><div class='jibenxinxi1'><div class='time'></div>"
					 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></li>"
					 +"<li class='i4'>"+order[i].courseName+"</li></div></div><div class='chuangkeren1'>"+order[i].teachername+"</div><div class='jiage1'>"
					 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
					 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
					 if(order[i].status==0){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
					 }else if(order[i].status==1){
						 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>"
					 }else if(order[i].status==2){
						 table=table+"<div class='zhuangtai1'>已付款</div>"
					 }else if(order[i].status==3){
						 table=table+"<div class='zhuangtai1'>已结束</div>"
					 }else if(order[i].status==4){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
					 }else if(order[i].status==10){
					 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>"
				 }else if(order[i].status==11){
					 table=table+"<div class='zhuangtai1'>已退款</div>"
				 }
					 
					 
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li><div class='tuike'>同意退课</div></li><li>查看原因</li><li>删除订单</li></div></div></div>"
					 +"<div class='liebiao12'><li class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</li><li class='i3'>创建于："+order[i].createtime+"</li></div></div>";
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
//			    		param:{on:true, page:1, start:1,'nRows':10,'order':orderNum,'coursename':courseName,'buyer':buyer,'date':submitTime,'usertype':40}
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
		 table=table+"<div class='liebiao1'><div class='liebiao11' ><div class='jibenxinxi1'><div class='time'></div>"
		 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></li>"
		 +"<li class='i4'>"+order[i].courseName+"</li></div></div><div class='chuangkeren1'>"+order[i].teachername+"</div><div class='jiage1'>"
		 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
		 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
		 if(order[i].status==0){
			 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
		 }else if(order[i].status==1){
			 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>"
		 }else if(order[i].status==2){
			 table=table+"<div class='zhuangtai1'>已付款</div>"
		 }else if(order[i].status==3){
			 table=table+"<div class='zhuangtai1'>已结束</div>"
		 }else if(order[i].status==4){
			 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
		 }else if(order[i].status==10){
		 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>"
	 }else if(order[i].status==11){
		 table=table+"<div class='zhuangtai1'>已退款</div>"
	 }
		 
		 
		 table=table+  "<div class='caozuo1'>"
		 +"<div class='caozuo2'><li><div class='tuike'>同意退课</div></li><li>查看原因</li><li>删除订单</li></div></div></div>"
		 +"<div class='liebiao12'><li class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</li><li class='i3'>创建于："+order[i].createtime+"</li></div></div>";
	 }    
	$("#xnTable1").html(table);
}
function changeType(status){
	
	$.ajax({
		url : getRootPath() + '/teacher/gettorderstatuscount',
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
			url :  getRootPath() + '/teacher/gettorderstatuslist',
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
					 table=table+"<div class='liebiao1'><div class='liebiao11' ><div class='jibenxinxi1'><div class='time'></div>"
					 +"<div class='img11'><li class='i2'><img id='u202_img' class='img' src='"+order[i].coursebgimgUrl+"'></li>"
					 +"<li class='i4'>"+order[i].courseName+"</li></div></div><div class='chuangkeren1'>"+order[i].teachername+"</div><div class='jiage1'>"
					 +"<li style='line-height: 140px;' class='jg1'>￥"+order[i].courseprice+"</li><li class='jg2' style='line-height: 0px;'>(折扣)</li></div>"
					 +"<div class='renshu1'>满30元减20元</div><div class='jiage1'>￥"+order[i].realprice+"</div>"
					 if(order[i].status==0){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
					 }else if(order[i].status==1){
						 table=table+"<div class='zhuangtai1'><span id='jinse'>待支付</span></div>"
					 }else if(order[i].status==2){
						 table=table+"<div class='zhuangtai1'>已付款</div>"
					 }else if(order[i].status==3){
						 table=table+"<div class='zhuangtai1'>已结束</div>"
					 }else if(order[i].status==4){
						 table=table+"<div class='zhuangtai1'><span id='lanse'>已取消</span></div>"
					 }else if(order[i].status==10){
					 table=table+"<div class='zhuangtai1'><span id='lvse'>待退款</span></div>"
				 }else if(order[i].status==11){
					 table=table+"<div class='zhuangtai1'>已退款</div>"
				 }
					 
					 
					 table=table+  "<div class='caozuo1'>"
					 +"<div class='caozuo2'><li><div class='tuike'>同意退课</div></li><li>查看原因</li><li>删除订单</li></div></div></div>"
					 +"<div class='liebiao12'><li class='i1'><input type='checkbox' name='order'>订单号："+order[i].orderId+"</li><li class='i3'>创建于："+order[i].createtime+"</li></div></div>";
				 }    
				$("#xnTable1").html(table);
				$("#page").css('display','none');
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
			    		url:getRootPath() + '/teacher/gettorderstatuslist',
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
function changeIdentity1(){
	var identity= $('#identity').val();
//	queryCourse(identity);
	if(identity==1){
		window.location.href= getRootPath() + '/order/manageOrder';
	}else if(identity==2){
		window.location.href= getRootPath() + '/order/studentOrder';
	}
 
 
 }