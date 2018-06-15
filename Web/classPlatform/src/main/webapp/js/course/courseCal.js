var mydate;/*=new Date();*/
var mydate1=new Date();
var door =true;
var calType = 0; //0 月，1 周  2 日
$(function(){
	getCourceById()
    $(".exit").on("click",function(){
    	$(this).css("background","url(images/exit.png) no-repeat -40px 7px");
    })

	$(".topNav li").on("click",function(){
		$(this).addClass("current").siblings().removeClass("current");
	})
    getDate();
	setTimeout(function(){
	    cal("#container","#focusDate","second");
	    cal("#littleContainer","#littleFocusDate","first");
	    var count = $("#myCourseList li").length;
	    var ulHeight = (count)*30;
	     $(".iconList").css("height", ulHeight);
	},200)
	$(".weekImg").on("click",function(){
		calType = 1;
		$(this).addClass("current").siblings().removeClass("current");
		$(".threeImgList .threeImgListLi").eq($(this).index()).addClass("current1").siblings().removeClass("current1");
		weekCal("#container","#focusDate","second");
	})
	$(".monthImg").on("click",function(){
		calType = 0;
		$(this).addClass("current").siblings().removeClass("current");
		$(".threeImgList .threeImgListLi").eq($(this).index()).addClass("current1").siblings().removeClass("current1");
		month("#container","#focusDate","second");
		
	})
	$(".dayImg").on("click",function(){
		calType = 2;
		$(this).addClass("current").siblings().removeClass("current");
		$(".threeImgList .threeImgListLi").eq($(this).index()).addClass("current1").siblings().removeClass("current1");
		dayCal("#container","#focusDate","second");

	})
	$(".liDiv").last().css("border-bottom","0");
	$(".courseCalWrap .weekDays .weekEvery li").last().css("border-bottom","0"); 
	//$(".myCourseList").html('<li class="on">在线课堂</li><li class="off">非在线课程</li><p class="courseNameTitle">课程名称</p><div class="iconList"></div>');
	$(".myCourseList .all").live("click",function(){
		showAllCourse();
	});
	$(".myCourseList .on").live("click",function(){
		if(calType == 0){			
			var ary=[];
			for(var i = 0;i<$("#container td").length;i++){
		 		ary.push($("#container td").eq(i).find(".idCourseName").html());
        	}        	
        	$(this).css("background-color","#daecf8").siblings("li").css("background-color","#fff");
        	$("#container td").find(".currentCourse li").css("display","block");
        	//$("#container td").find(".currentCourse p").remove();
            for(var j=0;j<ary.length;j++){
                var $thisLi = $("#container td").eq(j).find(".currentCourse li");
                var thisLen=0;
                for(var i=0;i<$thisLi.length;i++){
                	var sp = $thisLi.eq(i).find("span").eq(1);
                    if(sp.attr("onlinetype")==1){
                        $thisLi.eq(i).css("display","block");
                        thisLen++;
                    }else{
                        $thisLi.eq(i).css("display","none");
                    }   
                }
                if(thisLen>3){
                    $("#container td").eq(j).find(".currentCourse li:gt(2)").css("display","none");
                    //console.log($("#container td").eq(j).find(".currentCourse p").html())
                    if(!$("#container td").eq(j).find(".currentCourse p").hasClass("pInfor")){
                        $("#container td").eq(j).find(".currentCourse").append('<p class="pInfor" style="text-align:left;padding-left:20px;">......<p>');
                    }
                    else{
                    	$("#container td").eq(j).find(".currentCourse .pInfor").show();
                    }
                    $("#container td").eq(j).find(".xiasanjiao").show();
                }else{      
                	$("#container td").eq(j).find(".currentCourse .pInfor").hide();
                	$("#container td").eq(j).find(".xiasanjiao").hide();
                }  
            }
		}else if(calType == 1){
			$(".courseCalWrap .weekDays  li").css("display","block");
            setTimeout(function(){
                for(var i=0;i<7;i++){
                	var thday = $(".weekEveryCon").eq(i);
                	var theli = thday.find("li");
                    for(var j=0;j<theli.length;j++){
                        if(theli.attr("onlinetype")!=1){
                            theli.eq(j).find("p").hide();  
                        	//console.log(theli.eq(j).find("p").text());
                        }
                        else{
                        	theli.eq(j).find("p").show();  
                        }
                        	
                    }    
                }
            },100)
		}else if(calType == 2){
			$(".liDiv").find(".olRight .dingwei").css("display","block");
            setTimeout(function(){
                for(var i=0;i<$(".liDiv").length;i++){
                	var thelidiv = $(".liDiv").eq(i).find(".dingwei");
                    if(thelidiv.attr("onlinetype")==2){
                        $(".liDiv").eq(i).find(".olRight p").hide();                      	
                    }else{
                    	$(".liDiv").eq(i).find(".olRight p").show();    
                    }    
                    
                }
            },100);
		}
		
    })
    $(".myCourseList .off").live("click",function(){
    	if(calType == 0){
    		var ary=[];
    		for(var i = 0;i<$("#container td").length;i++){
    			ary.push($("#container td").eq(i).find(".idCourseName").html());
    		}
    		$(this).css("background-color","#daecf8").siblings("li").css("background-color","#fff");
    		$("#container td").find(".currentCourse li").css("display","block");
    		//$("#container td").find(".currentCourse p").remove();
        
    		for(var j=0;j<ary.length;j++){
    			var $thisLi = $("#container td").eq(j).find(".currentCourse li");
    			var thisLen=0;
    			for(var i=0;i<$thisLi.length;i++){
    				var sp = $thisLi.eq(i).find("span").eq(1);
                if(sp.attr("onlinetype")==2){
                    $thisLi.eq(i).css("display","block");
                    thisLen++;   
                }else{
                    $thisLi.eq(i).css("display","none");
                }
    			}
            
    			if(thisLen>3){
                //alert("ff")
    				$("#container td").eq(j).find(".currentCourse li:gt(2)").css("display","none");
                //console.log($("#container td").eq(j).find(".currentCourse p").html())
    				if(!$("#container td").eq(j).find(".currentCourse p").hasClass("pInfor")){
    					$("#container td").eq(j).find(".currentCourse").append('<p class="pInfor" style="text-align:left;padding-left:20px;">......<p>');
    				}else{
                    	$("#container td").eq(j).find(".currentCourse .pInfor").show();
    				}
    				$("#container td").eq(j).find(".xiasanjiao").show();
    			}else{      
                	$("#container td").eq(j).find(".currentCourse  .pInfor").hide();
                	$("#container td").eq(j).find(".xiasanjiao").hide();
                }    
    		}   
    	}else if(calType == 1){
			$(".courseCalWrap .weekDays  li").css("display","block");
            setTimeout(function(){
                for(var i=0;i<7;i++){
                	var thday = $(".weekEveryCon").eq(i);
                	var theli = thday.find("li");
                    for(var j=0;j<theli.length;j++){
                        if(theli.attr("onlinetype")!=2){
                            theli.eq(j).find("p").hide();
                        	//console.log(theli.eq(j).find("p").text());
                        }
                        else{
                        	theli.eq(j).find("p").show();  
                        }
                    }    
                }
            },100)
		}else if(calType == 2){
			$(".liDiv").find(".olRight .dingwei").css("display","block");
            setTimeout(function(){
                for(var i=0;i<$(".liDiv").length;i++){
                	var thelidiv = $(".liDiv").eq(i).find(".dingwei");
                    if(thelidiv.attr("onlinetype")==1){
                        $(".liDiv").eq(i).find(".olRight p").hide();      
                    }else{
                    	$(".liDiv").eq(i).find(".olRight p").show();    
                    }      
                }
            },100);
		}
    });
	/*课程表列里 的 “全部” 被点击*/
	$(".myCourseList li:eq(0)").live("click",function(){
		$(this).css("background-color","#daecf8").siblings("li").css("background-color","#fff");
		showAllCourse();		
	});
	$(".myCourseList li:gt(0)").live("click",function(){
		$(this).css("background-color","#daecf8").siblings("li").css("background-color","#fff");
		if(calType == 0){								
    		
	    	$("#container td").find(".currentCourse li").css("display","block");
	    	//$("#container td").find(".currentCourse p").remove();
			
        
            for(var j=0;j<$("#container td").length;j++){
                var $thisLi = $("#container td").eq(j).find(".currentCourse li");
                var nShowCount = 0;
                for(var i=0;i<$thisLi.length;i++){
                   // console.log($(this).html())
                   // console.log($thisLi.eq(i).find(".of").siblings('span').html())
                    if($(this).html() != $thisLi.eq(i).find(".of").siblings('span').html()){
                        $thisLi.eq(i).hide();
                    }else{
                        $thisLi.eq(i).show();
                        nShowCount++;
                    }
                }   
                if(nShowCount>2){
                	$("#container td").find(".currentCourse li:gt(2)").css("display","none");
                	//console.log($("#container td").eq(j).find(".currentCourse p").html())
                	if(!$("#container td").eq(j).find(".currentCourse p").hasClass("pInfor")){
                		$("#container td").eq(j).find(".currentCourse").append('<p  class="pInfor" style="text-align:left;padding-left:20px;">......<p>');
                	}else{
                		$("#container td").eq(j).find(".currentCourse .pInfor").show();
                	}
                	$("#container td").eq(j).find(".xiasanjiao").show();
                }else{      
                	$("#container td").eq(j).find(".currentCourse  .pInfor").hide();
                	$("#container td").eq(j).find(".xiasanjiao").hide();
                }    
            }
            //$("#container td").find(".currentCourse li:gt(2)").css("display","none");
           
		}else if(calType == 1){
			$(".courseCalWrap .weekDays .weekEveryCon").find("li").find("p").css("display","block");
    		for(var j=0;j<$(".weekEveryCon li").length;j++){
    			for(var i=0;i<$(".weekEveryCon").length;i++){
    				if($(this).html() != $(".weekEveryCon").eq(i).find("li").eq(j).find(".courseName").html()){
                        $(".courseCalWrap .weekDays .weekEveryCon").eq(i).find("li").eq(j).find("p").hide();	
	    			}
    			}	
    		}	
		}else if(calType == 2){
			$(".liDiv").find(".olRight p").css("display","block");
    			for(var i=0;i<$(".liDiv").length;i++){
    				console.log($(".liDiv").eq(i).find(".courses").html());
    				if($(this).html() != $(".liDiv").eq(i).find(".courses").html()){
                        $(".liDiv").eq(i).find(".olRight p").hide();
	    			}
    			}	
    		}	
		
    			
    });
	
	 $(".currentCourse li").live("mouseover",function(){
         //$(this).parents(".currentCourse").css("overflow","visible");
          $(this).find(".liInfor").show();
          $(this).find(".liInfor").css("z-index",999);
          
          $(this).css({"border":"1px solid #1976d2","left":"0","top":"0"});
      })
      $(".currentCourse li").live("mouseout",function(){
          //$(this).parents(".currentCourse").css("overflow","hidden");
          $(this).find(".liInfor").hide();
          $(this).find(".liInfor").css("z-index",0);
          
          $(this).css({"border":"none","left":"1px","top":"1px"});
      });
	 
	 /**********************周的鼠标滑过********************/
	 $(".weekEveryCon li").live("mouseover",function(){
         //if($(this).find(".courseName").html() !=""){
             $(this).find(".liInfor").show(); 
        // }   
     });
     $(".weekEveryCon li").live("mouseout",function(){

         $(this).find(".liInfor").hide();
     });
})


/*************************************调取日历**************************/
function cal(container,containerTitle,type){
	$(container).html("");

   //初始化日历，包括年，月，日
    var now = mydate;
    //console.log(now)					//获得服务器时间
	var $containerDIV = $(container);	    //日历容器DIV
	var calendar = new Calendar();			//创建日历对象
	calendar.init($containerDIV,now);		//初始化日历对象
	var timestring = "" + now.getFullYear() +"年" + (now.getMonth()+1) + "月<em style='display:none'>"+ now.getDate() + "日</em>";
	$(containerTitle).html(timestring);
	$("#focusDate").css("width","120px");
	$("#container").find("thead").html('<tr><th class="firstTr">星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></tr>');
	var anchorDate = calendar.getAnchorDate();
	var $anchorCell = calendar.getCellByTime(anchorDate);
	$anchorCell.addClass("anchor");
	$("#container .anchor").addClass("focus");
		
    function gethanshu(){
    	$(".currentCourse").html("");
            $("#container table td .xiasanjiao").css("display","none");
            var firstDate = firstDateOfCalendarInfor.split(/_|_|_/);
            //console.log(firstDateOfCalendarInfor)
            var lastDate = lastDateOfSelfCalendarInfor.split(/_|_|_/);
            //console.log(lastDateOfSelfCalendarInfor)
            var firstDate11 = new Date(firstDate[0], parseInt(firstDate[1])-1, parseInt(firstDate[2]));
            lastDate = new Date(lastDate[0], parseInt(lastDate[1])-1, parseInt(lastDate[2]));
            //console.log(firstDate11)
			    firstDate11 = "" + firstDate11.getFullYear() +"_" + (firstDate11.getMonth()+1) + "_"+ (firstDate11.getDate());
		    var firstDate1 = new Date(firstDate[0], parseInt(firstDate[1])-1, parseInt(firstDate[2])+6);
		    
			    firstDate1 = "" + firstDate1.getFullYear() +"_" + (firstDate1.getMonth()+1) + "_"+ (firstDate1.getDate());
			    //console.log(firstDate1)
			    /***********************第二排***************/
			var firstDate22 = firstDate1.split(/_|_|_/);
			    firstDate12 = new Date(firstDate22[0], parseInt(firstDate22[1])-1, parseInt(firstDate22[2])+1);     
            var firstDate2 = new Date(firstDate22[0], parseInt(firstDate22[1])-1, parseInt(firstDate22[2])+7);
                firstDate12 = "" + firstDate12.getFullYear() +"_" + (firstDate12.getMonth()+1) + "_"+ (firstDate12.getDate());
			    firstDate2 = "" + firstDate2.getFullYear() +"_" + (firstDate2.getMonth()+1) + "_"+ (firstDate2.getDate()); 
            	/***********************第三排***************/
			var firstDate23 = firstDate2.split(/_|_|_/);
			var firstDate13 = new Date(firstDate23[0], parseInt(firstDate23[1])-1, parseInt(firstDate23[2])+1);     
            var firstDate3 = new Date(firstDate23[0], parseInt(firstDate23[1])-1, parseInt(firstDate23[2])+7);
                firstDate13 = "" + firstDate13.getFullYear() +"_" + (firstDate13.getMonth()+1) + "_"+ (firstDate13.getDate());
			    firstDate3 = "" + firstDate3.getFullYear() +"_" + (firstDate3.getMonth()+1) + "_"+ (firstDate3.getDate()); 
            	/***********************第四排*******************/
            var firstDate34 = firstDate3.split(/_|_|_/);
			var firstDate14 = new Date(firstDate34[0], parseInt(firstDate34[1])-1, parseInt(firstDate34[2])+1);     
            var firstDate4 = new Date(firstDate34[0], parseInt(firstDate34[1])-1, parseInt(firstDate34[2])+7);
                firstDate14 = "" + firstDate14.getFullYear() +"_" + (firstDate14.getMonth()+1) + "_"+ (firstDate14.getDate());
			    firstDate4 = "" + firstDate4.getFullYear() +"_" + (firstDate4.getMonth()+1) + "_"+ (firstDate4.getDate()); 
            	/***********************第六排*******************/
            var firstDate45 = firstDate4.split(/_|_|_/);
			var firstDate15 = new Date(firstDate45[0], parseInt(firstDate45[1])-1, parseInt(firstDate45[2])+1);     
            var firstDate5 = new Date(firstDate45[0], parseInt(firstDate45[1])-1, parseInt(firstDate45[2])+7);
                firstDate15 = "" + firstDate15.getFullYear() +"_" + (firstDate15.getMonth()+1) + "_"+ (firstDate15.getDate());
			    firstDate5 = "" + firstDate5.getFullYear() +"_" + (firstDate5.getMonth()+1) + "_"+ (firstDate5.getDate());

			    /*****************第六排****************/
			var firstDate56 = firstDate5.split(/_|_|_/);
			var firstDate16 = new Date(firstDate56[0], parseInt(firstDate56[1])-1, parseInt(firstDate56[2])+1);     
            var firstDate6 = new Date(firstDate56[0], parseInt(firstDate56[1])-1, parseInt(firstDate56[2])+7);
                firstDate16 = "" + firstDate16.getFullYear() +"_" + (firstDate16.getMonth()+1) + "_"+ (firstDate16.getDate());
			    firstDate6 = "" + lastDate.getFullYear() +"_" + (lastDate.getMonth()+1) + "_"+ (lastDate.getDate());     
            setTimeout(function(){
            	/***********************第一排***************/
            	getCourseInfor(firstDate11,firstDate1,0);
            	getCourseInfor(firstDate12,firstDate2,1);
            	getCourseInfor(firstDate13,firstDate3,2);
            	getCourseInfor(firstDate14,firstDate4,3);
            	getCourseInfor(firstDate15,firstDate5,4);
            	//console.log(firstDate5)
            	//console.log(firstDate6)
            	if(firstDate5<firstDate6){
            		getCourseInfor(firstDate16,firstDate6,5);
            	}
            	
            	var tdHeight = $(".courseCalWrap .courseCalLeft tbody tr").eq(0).height();
            	//console.log(tdHeight)
            	$(".courseCalWrap .courseCalLeft tbody td").css("padding","4px 4px 0 0")
            	tdHeight = tdHeight -30;
            	$(".courseCalWrap .courseCalLeft td .tdDiv").css({"height":tdHeight,"padding-bottom":"25px"});	
            },50)
            //calendar.$containerDIV_.find('tbody td').css({"border-width":"1px 1px 0px 0px","border-color":"#d8dee4"});
		    //calendar.$containerDIV_.find('tbody td').css("background","none");
		    $("#container .anchor").css("background","#e5feea");
		    $("#container .anchor").css({"border-width":"1px 1px 0px 0px","border-color":"#28c445"});
            var $index1 = $("#container .anchor").parent("tr").index();
			$index1 =$index1 - 1;
			//console.log($index1)
			var index = $("#container .anchor").index();
			//console.log(index)
			//$("#container .anchor").siblings("td").eq($(".anchor").index()-1).css("border-right","1px solid #28c445");
			//index = index-1;
			//console.log(index)

			$("#container .anchor").parents("tr:last").find(".anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
			//$(".anchor").siblings("td").css("border","1px solid #d8dee4")
			//$("#container .anchor").parent("tr").siblings("tr").eq($index1+1).find("td").eq($("#container .anchor").index()).css("border-top","1px solid #28c445");
			//$("#container .anchor").siblings("td").eq(index-1).css("border-right","1px solid #28c445");
			if(index == 0){
				$("#container .anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
				//$("#container .anchor").parents("tr:last").find(".anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
				$("#container .anchor").siblings("td").eq($(".anchor").index()-1).css("border-right","1px solid #d8dee4");
			}

    }
	if(container == "#container"){
		var now1 = mydate;
    	setTimeout(function(){   
            gethanshu();
        },20);		
	    /*$("#container tbody tr td").css("color","#4f566b");
		var anchorIndex = $(".anchor").index();
	    var currentDay = now.getHours()+':'+now.getMinutes(); 
		for(var i = 0;i<$(".anchor").parents("tr").index()+1;i++){
			if(i<$(".anchor").parents("tr").index()){
				$("#container tbody tr").eq(i).find("td").css("color","#a1aac2");
				$("#container tbody tr").eq(i).find("td").find("b").css("color","#4f566b");
			    $("#container tbody tr").eq(i).find("td").find(".currentCourse li").css("color","#a1aac2");
			}else{
				for(var j=0;j<7;j++){
					if($("#container tbody tr").eq(i).find("td").eq(j).index()<anchorIndex){
					    $("#container tbody tr").eq(i).find("td").eq(j).css("color","#a1aac2");
					    $("#container tbody tr").eq(i).find("td").eq(j).find("b").css("color","#4f566b");
						$("#container tbody tr").eq(i).find("td").eq(j).find(".currentCourse li").css("color","#a1aac2");
					}
				}
			}
		}*/
    }
	 //calendar.addSurplusClass("everyDay");   
	/****************鼠标滑过**************/
	$("#container").find('tbody td').mouseover(function(){
    	$(this).css("background","#e5feea");			    
    })
    $("#container").find('tbody td').mouseout(function(){
    	if($(this).hasClass("focus")){	
    		$(this).css("background","#e5feea");
    	}else{
    		
    		$(this).css("background","none");
    	}		 
    })
    /***********点击方格********************/
    calendar.$containerDIV_.find('tbody td').on("click",function(){
        if($(this).width()<40){
        	$(".liDiv .olRight").html("");
			$(".dayCourseTitle").html("该天无课");
			$(".liDiv").find(".olRight p").show();
        	$("#focusDate").css("width","160px");
			$(this).addClass("anchor").siblings().removeClass("anchor");
            $(this).addClass("anchor").parent("tr").siblings("tr").find("td").removeClass("anchor");
            $(".dayCourse").addClass("current1").siblings().removeClass("current1");
            /*$(".monthCourse").hide();
			$(".dayCourse").show();*/
			$(".dayImg").addClass("current").siblings().removeClass("current");
			var focusDate = calendar.getTimeByCell($(this));
			var focusDateSring = "" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月<em style='display:none'>"+ focusDate.getDate() + "日</em>";
			
		    $(containerTitle).html(focusDateSring);
			$("#focusDate").html("" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月"+ focusDate.getDate() + "日");
			var dayFous = "" + focusDate.getFullYear() +"_" + (focusDate.getMonth()+1) + "_"+ focusDate.getDate();
			var dayFous1 = "" + focusDate.getFullYear() +"_" + (focusDate.getMonth()+1) + "_"+ (focusDate.getDate()+1);
			//console.log(dayFous)
			getCourseInfor(dayFous,dayFous1);
			//$anchorCell.addClass("anchor");
		}else{
			calendar.$containerDIV_.find('tbody td').css({"border-width":"1px 1px 0px 0px","border-color":"#d8dee4"});
		    calendar.$containerDIV_.find('tbody td').css("background","none");
		    $(this).css("background","#e5feea");
		    $(this).css({"border-width":"1px 1px 0px 0px","border-color":"#28c445"});
			var $index = $(this).parent("tr").index();
			$index =$index - 1;
			//console.log($index)
			//$(this).parents("tr").siblings("tr").eq($index+1).find("td").eq($(this).index()).css("border-top","1px solid #28c445");
			$(this).siblings("td").eq($(this).index()-1).css("border-right","1px solid #28c445");
			var thisIndex = $(this).index();
			$(this).parents("tr:last").find(this).css({"border-width":"1px 1px 1px 0px","border-color":"#28c445"});
			
			if(thisIndex == 0){
				$(this).css({"border-width":"1px 1px 0px 1px","border-color":"#28c445"});
				$(this).parents("tr:last").find(this).css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
				$(this).siblings("td").eq($(this).index()-1).css("border-right","1px solid #d8dee4");
			}
			var focusDate = calendar.getTimeByCell($(this));
			var focusDateSring = "" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月<em style='display:none'>"+ focusDate.getDate() + "日</em>";
			$(this).addClass("focus").siblings().removeClass("focus");
			$(this).addClass("focus").parent("tr").siblings().find("td").removeClass("focus");
			//$anchorCell.removeClass("anchor");
			$(containerTitle).html(focusDateSring);
		}
	});

	/**************点击按钮**************/
	$(".scrollRight").on("click",function(){
		if($(".dayCourse").css("display")=="block"){
			$("#focusDate").css("width","160px");
			$(".liDiv .olRight").html("");
			$(".liDiv").find(".olRight p").show();
			$(".dayCourseTitle").html("该天无课");
			if($(this).width() == "30"||$(this).width()=="31"){
				calendar.turnToNextMonth();
			}else{
				if(type=="first"){   //主要是让日的日期衔接起来
					var timeString = $("#focusDate").html();
                    var arr = timeString.split(/年|月|日/);
					var times= new Date(arr[0], parseInt(arr[1])-1, parseInt(arr[2]));
					calendar.anchorDate_ = times;
					$("#focusDate").html("" + times.getFullYear() +"年" + (times.getMonth()+1) + "月"+ times.getDate() + "日");
					//console.log($("#focusDate").html())
				}else{
					return false;
				}
				calendar.turnToNextDate();	
			}
        }else if($(".monthCourse").css("display") == "block"){
        	$("#focusDate").css("width","120px");
        	calendar.turnToNextMonth();
        	if(type=="first"){
        	setTimeout(function(){   
	            $(".currentCourse").html("");
	            $("#container table td .xiasanjiao").css("display","none");
	            gethanshu();

	        },20)
            }
            
        	
			if(container == "#container"){
				$(container).find("thead").html('<tr><th class="firstTr">星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></tr>');
			}
			//处理过去的课程和现在课程和将来课程的显示样式问题
			var times = calendar.anchorDate_;
			//console.log(times.getMonth())
			//console.log(now.getMonth())
			/*if(times.getMonth()<now.getMonth()){
				$("#container tbody tr").find("td").css("color","#a1aac2");
			}else if(times.getMonth()==now.getMonth()){
				for(var i = 0;i<$(".anchor").parents("tr").index()+1;i++){
					if(i<$(".anchor").parents("tr").index()){
						$("#container tbody tr").eq(i).find("td").css("color","#a1aac2");
						$("#container tbody tr").eq(i).find("td").find("b").css("color","#4f566b");
					    $("#container tbody tr").eq(i).find("td").find(".currentCourse li").css("color","#a1aac2");
					}else{
						for(var j=0;j<7;j++){
							if($("#container tbody tr").eq(i).find("td").eq(j).index()<anchorIndex){
							    $("#container tbody tr").eq(i).find("td").eq(j).css("color","#a1aac2");
							    $("#container tbody tr").eq(i).find("td").eq(j).find("b").css("color","#4f566b");
								$("#container tbody tr").eq(i).find("td").eq(j).find(".currentCourse li").css("color","#a1aac2");
							}
						}
					}
				}
			}*/
        }else if($(".weekCourse").css("display")=="block"){
        	$("#focusDate").css("width","340px");
        	$(".weekEveryCon .courseName").html("");
        	$(".weekEveryCon .courseTime").html("");
        	$(".courseCalWrap .weekDays .weekEveryCon").find("li").find("p").show();
        	if($(this).width() == "30"){
        		calendar.turnToNextMonth();
        	}else{
        		calendar.turnToNextWeek();
        		var time = calendar.getAnchorDate();
        		time = new Date(time.getFullYear(),time.getMonth(),time.getDate()+1);
        		calendar.anchorDate_ = time;
        	}
        }
		//获得新的锚定日期
		var time = calendar.getAnchorDate();
		//为锚定日期添加锚定样式
		var $anchorCell = calendar.getCellByTime(time);
		$anchorCell.addClass("anchor");
		//calendar.addSurplusClass("everyDay");
		var $index1 = $("#container .anchor").parent("tr").index();
			$index1 =$index1 - 1;
			//console.log($index1);
			var index = $("#container .anchor").index();
			//console.log(index)
			//$("#container .anchor").siblings("td").eq($("#container .anchor").index()-1).css("border-right","1px solid #28c445");
			index = index-1;
			console.log(index)

			$("#container .anchor").parents("tr:last").find(".anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#d00"});
			//$(".anchor").siblings("td").css("border","1px solid #d8dee4")
			//$("#container .anchor").parent("tr").siblings("tr").eq($index1+1).find("td").eq($("#container .anchor").index()).css("border-top","1px solid #28c445");
			//$("#container .anchor").siblings("td").eq(index).css("border-right","1px solid #28c445");

			if(index == 0){
				$("#container .anchor").css({"border-width":"1px 1px 0px 1px","border-color":"#28c445"});
				//$("#container .anchor").parents("tr:last").find(".anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
				
				$("#container .anchor").siblings("td").eq($(".anchor").index()-1).css("border-right","1px solid #d8dee4");

			}

		//将锚定时间更新至焦点日期标签中
		var timestring = "" + time.getFullYear() +"年" + (time.getMonth()+1) + "月<em style='display:none' >" + time.getDate() + "日</em>";
		$(containerTitle).html(timestring);
		if($(".dayCourse").css("display")=="block"){
			//calendar.turnToNextDate();
			 $("#focusDate").html("" + time.getFullYear() +"年" + (time.getMonth()+1) + "月"+ time.getDate() + "日");
			 var dayFous = "" + time.getFullYear() +"_" + (time.getMonth()+1) + "_"+ time.getDate();
			var dayFous1 = "" + time.getFullYear() +"_" + (time.getMonth()+1) + "_"+ (time.getDate()+1);
			getCourseInfor(dayFous,dayFous1);
        }else if($(".weekCourse").css("display")=="block"){
			var weekArray = calendar.getWeekByTime(time);
			var weekStr="";
				weekStr ='<em>'+weekArray[0].getFullYear() + "年" + (weekArray[0].getMonth()+1) + "月" + weekArray[0].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[1].getFullYear() + "年" + (weekArray[1].getMonth()+1) + "月" + weekArray[1].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[2].getFullYear() + "年" + (weekArray[2].getMonth()+1) + "月" + weekArray[2].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[3].getFullYear() + "年" + (weekArray[3].getMonth()+1) + "月" + weekArray[3].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[4].getFullYear() + "年" + (weekArray[4].getMonth()+1) + "月" + weekArray[4].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[5].getFullYear() + "年" + (weekArray[5].getMonth()+1) + "月" + weekArray[5].getDate() + "日~"+'</em>'
                +'<em>'+weekArray[6].getFullYear() + "年" + (weekArray[6].getMonth()+1) + "月" + weekArray[6].getDate() + "日"+'</em>'
    	    $("#focusDate").html(weekStr);
    	    var weekFous = ""+weekArray[0].getFullYear() + "_" + (weekArray[0].getMonth()+1) + "_" + weekArray[0].getDate();
	    	var weekFous1 = ""+weekArray[6].getFullYear() + "_" + (weekArray[6].getMonth()+1) + "_" + (weekArray[6].getDate()+1);
	    	getCourseInfor(weekFous,weekFous1);
			$("#focusDate li").css({"float":"left","font-size":"20px"});
			//处理周里面的课程样式
			var times = calendar.anchorDate_;
			var day = now.getDay();
			times = new Date(times.getFullYear(),times.getMonth(),times.getDate());
			now = new Date(now.getFullYear(),now.getMonth(),now.getDate());
    	if(times<now){
    		$(".weekCourseTittle span").eq(day).css("background","url("+getRootPath()+"/images/line1.png) no-repeat");
    		$(".weekDays .weekEveryCon").find(".courseName").css("color","#a1aac2");
    	}else if(times>now){
    		$(".weekCourseTittle span").eq(day).css("background","url("+getRootPath()+"/images/line1.png) no-repeat");
			$(".weekDays .weekEveryCon").find(".courseName").css("color","#4f566b");
		}else{
			$(".weekDays .weekEveryCon").find(".courseName").css("color","#4f566b");
			$(".weekCourseTittle span").eq(day).css("background","#3c8bda");
		    $(".weekDays .weekEveryCon").eq(day-1).find(".courseName").css("color","#28c445");
			for(var i = 0;i<(day-1);i++){
        		$(".weekDays .weekEveryCon").eq(i).find(".courseName").css("color","rgb(161, 170, 194)");
        	}
		}
        }   
		calendar.$containerDIV_.find('tbody td').find(".xiasanjiao").on("click",function(){
			$(".dayCourse").addClass("current1").siblings().removeClass("current1");
			$(".dayImg").addClass("current").siblings().removeClass("current");
		})
		$("#container").find('tbody td').mouseover(function(){
        	$(this).css("background","#e5feea")			    
        })
        $("#container").find('tbody td').mouseout(function(){
        	if($(this).css("border")!="1px solid rgb(40, 196, 69)"){	
        		$(this).css("background","none")
        	}else{
        		$(this).css("background","#e5feea");
        	}		 
        })
    /***********点击方格********************/
    calendar.$containerDIV_.find('tbody td').on("click",function(){
        if($(this).width()<40){
        	$(".liDiv .olRight").html("");
			$(".dayCourseTitle").html("该天无课");
			$(".liDiv").find(".olRight p").show();
        	$("#focusDate").css("width","160px");
			$(this).addClass("anchor").siblings().removeClass("anchor");
            $(this).addClass("anchor").parent("tr").siblings("tr").find("td").removeClass("anchor");
            $(".dayCourse").addClass("current1").siblings().removeClass("current1");
            /*$(".monthCourse").hide();
			$(".dayCourse").show();*/
			$(".dayImg").addClass("current").siblings().removeClass("current");
			var focusDate = calendar.getTimeByCell($(this));
			var focusDateSring = "" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月<em style='display:none'>"+ focusDate.getDate() + "日</em>";
		    $(containerTitle).html(focusDateSring);
			$("#focusDate").html("" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月"+ focusDate.getDate() + "日");
			var dayFous = "" + focusDate.getFullYear() +"_" + (focusDate.getMonth()+1) + "_"+ focusDate.getDate();
			var dayFous1 = "" + focusDate.getFullYear() +"_" + (focusDate.getMonth()+1) + "_"+ (focusDate.getDate()+1);
			//console.log(dayFous)
			getCourseInfor(dayFous,dayFous);
			//$anchorCell.addClass("anchor");
		}else{
			calendar.$containerDIV_.find('tbody td').css({"border-width":"1px 1px 0px 0px","border-color":"#d8dee4"});
		    calendar.$containerDIV_.find('tbody td').css("background","none");
		    $(this).css("background","#e5feea");
		    $(this).css({"border-width":"1px 1px 0px 0px","border-color":"#28c445"});
			var $index = $(this).parent("tr").index();
			$index =$index - 1;
			//console.log($index)
			//$(this).parents("tr").siblings("tr").eq($index+1).find("td").eq($(this).index()).css("border-top","1px solid #28c445");
			$(this).siblings("td").eq($(this).index()-1).css("border-right","1px solid #28c445");
			var thisIndex = $(this).index();
			$(this).parents("tr:last").find(this).css({"border-width":"1px 1px 1px 0px","border-color":"#28c445"});
			
			if(thisIndex == 0){
				$(this).css({"border-width":"1px 1px 0px 1px","border-color":"#28c445"});
				$(this).parents("tr:last").find(this).css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
				$(this).siblings("td").eq($(this).index()-1).css("border-right","1px solid #d8dee4");

			}
			/*if($(this).index()!=6){
				$(this).parent("tr").find("td").eq(6).css("border-right","1px solid #d8dee4");
			}
			if($index2 <0){
				$(this).parent("tr").siblings("tr").eq($index2).find("td").eq($(this).index()).css("border-bottom","1px solid #d8dee4");
			}*/
			var focusDate = calendar.getTimeByCell($(this));
			var focusDateSring = "" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月<em style='display:none'>"+ focusDate.getDate() + "日</em>";
			$(this).addClass("focus").siblings().removeClass("focus");
			$(this).addClass("focus").parent("tr").siblings().find("td").removeClass("focus");
			//$anchorCell.removeClass("anchor");
			$(containerTitle).html(focusDateSring);
		}
	});
	})
/******************************点击左边吧************************/
$(".scrollLeft").on("click",function(){
		if(container == "#container"){
			$(container).find("thead").html('<tr><th class="firstTr">星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></tr>');
		}
		if($(".dayCourse").css("display")=="block"){
			$("#focusDate").css("width","160px");
			$(".liDiv .olRight").html("");
			$(".dayCourseTitle").html("该天无课");
			$(".liDiv").find(".olRight p").show();
			
			if($(this).width() == "30"||$(this).width() == "31"){
                $("#focusDate").css("width","160px");
				calendar.turnToPreviousMonth();
			}else{
				if(type=="first"){
					// /alert("first");
				var timeString = $("#focusDate").html();
				//alert(timeString);
                var arr = timeString.split(/年|月|日/);
	            //console.log(arr)
				var times= new Date(arr[0], parseInt(arr[1])-1, parseInt(arr[2]));
				calendar.anchorDate_ = times;
				//console.log(times);
				$("#focusDate").html("" + times.getFullYear() +"年" + (times.getMonth()+1) + "月"+ times.getDate() + "日")
				}else{
					return false;
				}
				calendar.turnToPreviousDate();
			}
        }else if($(".monthCourse").css("display")=="block"){
        	$("#focusDate").css("width","120px");
        	calendar.turnToPreviousMonth();
        	if(type == "first"){
        		setTimeout(function(){   
                    gethanshu();
                },20)
        	}
        	
        	
			if(container == "#container"){
				$(container).find("thead").html('<tr><th class="firstTr">星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></tr>');
			}
			//对过去的课程颜色进行处理
			var times = calendar.anchorDate_;
			var anchorIndex = $(".anchor").index();
			/*if(times.getMonth()<now.getMonth()){
				$("#container tbody tr").find("td").css("color","#a1aac2");
			}else if(times.getMonth()==now.getMonth()){
				for(var i = 0;i<$(".anchor").parents("tr").index()+1;i++){
					if(i<$(".anchor").parents("tr").index()){
						$("#container tbody tr").eq(i).find("td").css("color","#a1aac2");
						$("#container tbody tr").eq(i).find("td b").css("color","#4f566b");
					    $("#container tbody tr").eq(i).find("td").find(".currentCourse li").css("color","#a1aac2");
					}else{
						for(var j=0;j<7;j++){
							if($("#container tbody tr").eq(i).find("td").eq(j).index()<anchorIndex){
							    $("#container tbody tr").eq(i).find("td").eq(j).css("color","#a1aac2");
							    $("#container tbody tr").eq(i).find("td").eq(j).find("b").css("color","#4f566b");
								$("#container tbody tr").eq(i).find("td").eq(j).find(".currentCourse li").css("color","#a1aac2");
							}
						}
					}
				}
			}*/
        }else if($(".weekCourse").css("display")=="block"){
        	$("#focusDate").css("width","340px");
        	$(".weekEveryCon .courseName").html("");
        	
        	$(".weekEveryCon .courseTime").html("");
            $(".courseCalWrap .weekDays .weekEveryCon").find("li").find("p").show();

        	
        	if($(this).width() == "30"||$(this).width() == "31"){
        		$("#focusDate").css("width","340px");
        		calendar.turnToPreviousMonth();
        	}else{
        		calendar.turnToPreviousWeek();
        		var time = calendar.getAnchorDate();
        		time = new Date(time.getFullYear(),time.getMonth(),time.getDate()-1);
        		calendar.anchorDate_ = time;
        	}
        }
		
		//获得新的锚定日期
		var time = calendar.getAnchorDate();
		//为锚定日期添加锚定样式
		var $anchorCell = calendar.getCellByTime(time);
		$anchorCell.addClass("anchor");
		//calendar.addSurplusClass("everyDay");
		var $index1 = $("#container .anchor").parent("tr").index();
			$index1 =$index1 - 1;
			//console.log($index1)
			var index = $("#container .anchor").index();
			//console.log(index)
			//$("#container .anchor").siblings("td").eq($("#container .anchor").index()-1).css("border-right","1px solid #28c445");
			index = index-1;
			//console.log(index)

			$("#container .anchor").parents("tr:last").find(".anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
			//$(".anchor").siblings("td").css("border","1px solid #d8dee4")
			//$("#container .anchor").parent("tr").siblings("tr").eq($index1+1).find("td").eq($("#container .anchor").index()).css("border-top","1px solid #28c445");
			//$("#container .anchor").siblings("td").eq(index).css("border-right","1px solid #28c445");
			if(index == 0){
				$("#container .anchor").css({"border-width":"1px 1px 0px 1px","border-color":"#28c445"});
				//$("#container .anchor").parents("tr:last").find("#container .anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
				$("#container .anchor").siblings("td").eq($("#container .anchor").index()-1).css("border-right","1px solid #d8dee4");
			}
		//将锚定时间更新至焦点日期标签中
		var timestring = "" + time.getFullYear() +"年" + (time.getMonth()+1) + "月<em style='display:none'>" + time.getDate() + "日</em>";
		$(containerTitle).html(timestring);
		if($(".dayCourse").css("display")=="block"){
			$("#focusDate").html("" + time.getFullYear() +"年" + (time.getMonth()+1) + "月"+ time.getDate() + "日");
			var dayFous = "" + time.getFullYear() +"_" + (time.getMonth()+1) + "_"+ time.getDate();
	        var dayFous1 = "" + time.getFullYear() +"_" + (time.getMonth()+1) + "_"+ (time.getDate()+1);
	        getCourseInfor(dayFous,dayFous1);
        }else if($(".weekCourse").css("display")=="block"){
			var weekArray = calendar.getWeekByTime(time);
			var weekStr="";
			for(var i=0;i<7;i++){
				weekStr ='<em>'+weekArray[0].getFullYear() + "年" + (weekArray[0].getMonth()+1) + "月" + weekArray[0].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[1].getFullYear() + "年" + (weekArray[1].getMonth()+1) + "月" + weekArray[1].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[2].getFullYear() + "年" + (weekArray[2].getMonth()+1) + "月" + weekArray[2].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[3].getFullYear() + "年" + (weekArray[3].getMonth()+1) + "月" + weekArray[3].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[4].getFullYear() + "年" + (weekArray[4].getMonth()+1) + "月" + weekArray[4].getDate() + "日~"+'</em>'
                +'<em style="display:none">'+weekArray[5].getFullYear() + "年" + (weekArray[5].getMonth()+1) + "月" + weekArray[5].getDate() + "日~"+'</em>'
                +'<em>'+weekArray[6].getFullYear() + "年" + (weekArray[6].getMonth()+1) + "月" + weekArray[6].getDate() + "日"+'</em>'
			}
			//console.log(weekStr)
	    	$("#focusDate").html(weekStr);
	    	var weekFous = ""+weekArray[0].getFullYear() + "_" + (weekArray[0].getMonth()+1) + "_" + weekArray[0].getDate();
	    	var weekFous1 = ""+weekArray[6].getFullYear() + "_" + (weekArray[6].getMonth()+1) + "_" + (weekArray[6].getDate()+1);
	    	getCourseInfor(weekFous,weekFous1);
			$("#focusDate li").css({"float":"left","font-size":"20px"});
			//处理周里面的课程样式
			var times = calendar.anchorDate_;
			var day = now.getDay();
			times = new Date(times.getFullYear(),times.getMonth(),times.getDate());
			now = new Date(now.getFullYear(),now.getMonth(),now.getDate());
			//console.log(now)
			//console.log(times)
    	if(times<now){
    		$(".weekDays .weekEveryCon").find(".courseName").css("color","#a1aac2");
    		$(".weekCourseTittle span").eq(day).css("background","url("+getRootPath()+"/images/line1.png) no-repeat");
    	}else if(times>now){
    		$(".weekDays .weekEveryCon").find(".courseName").css("color","#4f566b");
    		$(".weekCourseTittle span").eq(day).css("background","url("+getRootPath()+"/images/line1.png) no-repeat");
		}else{
			$(".weekDays .weekEveryCon").find(".courseName").css("color","#4f566b");
			$(".weekCourseTittle span").eq(day).css("background","#3c8bda");
		    $(".weekDays .weekEveryCon").eq(day-1).find(".courseName").css("color","#28c445");
			for(var i = 0;i<(day-1);i++){
        		$(".weekDays .weekEveryCon").eq(i).find(".courseName").css("color","rgb(161, 170, 194)");
        	}
		}
    }
		calendar.$containerDIV_.find('tbody td').find(".xiasanjiao").on("click",function(){
			$(".dayCourse").addClass("current1").siblings().removeClass("current1");
			$(".dayImg").addClass("current").siblings().removeClass("current");
		})
		$("#container").find('tbody td').mouseover(function(){
        	$(this).css("background","#e5feea")			    
        })
        $("#container").find('tbody td').mouseout(function(){
        	if($(this).css("border")!="1px solid rgb(40, 196, 69)"){	
        		$(this).css("background","none")
        	}else{
        		$(this).css("background","#e5feea")
        	}		 
        })
		/***********点击方格********************/
    calendar.$containerDIV_.find('tbody td').on("click",function(){
        if($(this).width()<40){
        	$(".liDiv .olRight").html("");
			$(".dayCourseTitle").html("该天无课");
			$(".liDiv").find(".olRight p").show();
        	$("#focusDate").css("width","160px");
			$(this).addClass("anchor").siblings().removeClass("anchor");
            $(this).addClass("anchor").parent("tr").siblings("tr").find("td").removeClass("anchor");
            $(".dayCourse").addClass("current1").siblings().removeClass("current1");
            /*$(".monthCourse").hide();
			$(".dayCourse").show();*/
			$(".dayImg").addClass("current").siblings().removeClass("current");
			var focusDate = calendar.getTimeByCell($(this));
			var focusDateSring = "" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月<em style='display:none'>"+ focusDate.getDate() + "日</em>";
			
		    $(containerTitle).html(focusDateSring);
			$("#focusDate").html("" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月"+ focusDate.getDate() + "日");
			var dayFous = "" + focusDate.getFullYear() +"_" + (focusDate.getMonth()+1) + "_"+ focusDate.getDate();
			var dayFous1 = "" + focusDate.getFullYear() +"_" + (focusDate.getMonth()+1) + "_"+ (focusDate.getDate()+1);
			//console.log(dayFous)
			getCourseInfor(dayFous,dayFous);
			//$anchorCell.addClass("anchor");
		}else{
			calendar.$containerDIV_.find('tbody td').css({"border-width":"1px 1px 0px 0px","border-color":"#d8dee4"});
		    calendar.$containerDIV_.find('tbody td').css("background","none");
		    $(this).css("background","#e5feea");
		    $(this).css({"border-width":"1px 1px 0px 0px","border-color":"#28c445"});
			var $index = $(this).parent("tr").index();
			$index =$index - 1;
			//console.log($index)
			//$(this).parents("tr").siblings("tr").eq($index+1).find("td").eq($(this).index()).css("border-top","1px solid #28c445");
			$(this).siblings("td").eq($(this).index()-1).css("border-right","1px solid #28c445");
			var thisIndex = $(this).index();
			$(this).parents("tr:last").find(this).css({"border-width":"1px 1px 1px 0px","border-color":"#28c445"});
			
			if(thisIndex == 0){
				$(this).css({"border-width":"1px 1px 0px 1px","border-color":"#28c445"});
				$(this).parents("tr:last").find(this).css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
			}
			var focusDate = calendar.getTimeByCell($(this));
			var focusDateSring = "" + focusDate.getFullYear() +"年" + (focusDate.getMonth()+1) + "月<em style='display:none'>"+ focusDate.getDate() + "日</em>";
			$(this).addClass("focus").siblings().removeClass("focus");
			$(this).addClass("focus").parent("tr").siblings().find("td").removeClass("focus");
			//$anchorCell.removeClass("anchor");
			$(containerTitle).html(focusDateSring);
		}
	}); 
	});
	
       
}
/************************周日历********************/
function weekCal(container,containerTitle,type){
	var now = mydate;					//获得服务器时间
	var $containerDIV = $(container);	    //日历容器DIV
	var calendar = new Calendar();			//创建日历对象
	if(container == "#container"){
	    calendar.init($containerDIV,now,"second");		//初始化日历对象	
    }else{
	    calendar.init($containerDIV,now,"type");		//初始化日历对象
    }
        $(".weekEveryCon .courseName").html("");
        $(".weekEveryCon .courseTime").html("");
        $("#focusDate").css("width","340px");
        $(".courseCalWrap .weekDays .weekEveryCon").find("li").find("p").show();
			var weekArray = calendar.getWeekByTime(now);
			var weekStr="";
			weekStr ='<em>'+weekArray[0].getFullYear() + "年" + (weekArray[0].getMonth()+1) + "月" + weekArray[0].getDate() + "日~"+'</em>'
            +'<em style="display:none">'+weekArray[1].getFullYear() + "年" + (weekArray[1].getMonth()+1) + "月" + weekArray[1].getDate() + "日~"+'</em>'
            +'<em style="display:none">'+weekArray[2].getFullYear() + "年" + (weekArray[2].getMonth()+1) + "月" + weekArray[2].getDate() + "日~"+'</em>'
            +'<em style="display:none">'+weekArray[3].getFullYear() + "年" + (weekArray[3].getMonth()+1) + "月" + weekArray[3].getDate() + "日~"+'</em>'
            +'<em style="display:none">'+weekArray[4].getFullYear() + "年" + (weekArray[4].getMonth()+1) + "月" + weekArray[4].getDate() + "日~"+'</em>'
            +'<em style="display:none">'+weekArray[5].getFullYear() + "年" + (weekArray[5].getMonth()+1) + "月" + weekArray[5].getDate() + "日~"+'</em>'
            +'<em>'+weekArray[6].getFullYear() + "年" + (weekArray[6].getMonth()+1) + "月" + weekArray[6].getDate() + "日"+'</em>'
    	$("#focusDate").html(weekStr);
    	var weekFous = ""+weekArray[0].getFullYear() + "_" + (weekArray[0].getMonth()+1) + "_" + weekArray[0].getDate();
    	var weekFous1 = ""+weekArray[6].getFullYear() + "_" + (weekArray[6].getMonth()+1) + "_" + (weekArray[6].getDate()+1);
    	getCourseInfor(weekFous,weekFous1);
    	$("#focusDate li").css({"float":"left","font-size":"20px"});
    	var anchorDate = calendar.getAnchorDate();
		var $anchorCell = calendar.getCellByTime(anchorDate);
		$anchorCell.addClass("anchor");
    	var day = now.getDay();
    	if(day != 0){
	    	$(".weekCourseTittle span").eq(day).css("background","#3c8bda");
	    	$(".weekDays .weekEveryCon").eq(day-1).find(".courseName").css("color","#28c445");
	    	for(var i = 0;i<(day-1);i++){
	    		$(".weekDays .weekEveryCon").eq(i).find(".courseName").css("color","rgb(161, 170, 194)");
	    	}
    	}else{
    		$(".weekCourseTittle span").eq(6).css("background","#3c8bda");
    		for(var i = 0;i<7;i++){
	    		$(".weekDays .weekEveryCon").eq(i).find(".courseName").css("color","rgb(161, 170, 194)");
	    	}

    	}

}
/**********************日日历*******************************/
function dayCal(container,containerTitle,type){
	var now = mydate;					//获得服务器时间
	var $containerDIV = $(container);	    //日历容器DIV
	var calendar = new Calendar();			//创建日历对象
	if(container == "#container"){
	    calendar.init($containerDIV,now,"second");		//初始化日历对象	
    }else{
	    calendar.init($containerDIV,now,"type");		//初始化日历对象
    }
    $("#focusDate").css("width","160px"); 
	$(".liDiv .olRight").html("");
	$(".liDiv").find(".olRight p").show();
	$(".dayCourseTitle").html("该天无课");
	$("#focusDate").html("" + now.getFullYear() +"年" + (now.getMonth()+1) + "月"+ now.getDate() + "日");
	var dayFous = "" + now.getFullYear() +"_" + (now.getMonth()+1) + "_"+ now.getDate();
	var dayFous1 = "" + now.getFullYear() +"_" + (now.getMonth()+1) + "_"+ (now.getDate()+1);
	getCourseInfor(dayFous,dayFous1);
	//为锚定日期添加锚定样式
	var anchorDate = calendar.getAnchorDate();
	var $anchorCell = calendar.getCellByTime(anchorDate);
	$anchorCell.addClass("anchor");

}
/*************************************调取日历**************************/
function month(container,containerTitle,type){
	$(container).html("");

   //初始化日历，包括年，月，日
    var now = mydate;					//获得服务器时间
	var $containerDIV = $(container);	    //日历容器DIV
	var calendar = new Calendar();			//创建日历对象
	calendar.init($containerDIV,now);		//初始化日历对象
	var timestring = "" + now.getFullYear() +"年" + (now.getMonth()+1) + "月<em style='display:none'>"+ now.getDate() + "日</em>";
	$(containerTitle).html(timestring);
	$("#focusDate").css("width","120px");
	$("#container").find("thead").html('<tr><th class="firstTr">星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></tr>');
	var anchorDate = calendar.getAnchorDate();
	var $anchorCell = calendar.getCellByTime(anchorDate);	
    
	$("#container .anchor").addClass("focus");
    
	if(container == "#container"){
		var now1 = mydate;
    	setTimeout(function(){   
            gethanshu();
        },20);
        function gethanshu(){
    	$(".currentCourse").html("");
            $("#container table td .xiasanjiao").css("display","none");
            var firstDate = firstDateOfCalendarInfor.split(/_|_|_/);
            //console.log(firstDateOfCalendarInfor)
            var lastDate = lastDateOfSelfCalendarInfor.split(/_|_|_/);
            //console.log(lastDateOfSelfCalendarInfor)
            var firstDate11 = new Date(firstDate[0], parseInt(firstDate[1])-1, parseInt(firstDate[2]));
            lastDate = new Date(lastDate[0], parseInt(lastDate[1])-1, parseInt(lastDate[2]));
            //console.log(firstDate11)
			    firstDate11 = "" + firstDate11.getFullYear() +"_" + (firstDate11.getMonth()+1) + "_"+ (firstDate11.getDate());
		    var firstDate1 = new Date(firstDate[0], parseInt(firstDate[1])-1, parseInt(firstDate[2])+6);
		    
			    firstDate1 = "" + firstDate1.getFullYear() +"_" + (firstDate1.getMonth()+1) + "_"+ (firstDate1.getDate());
			    //console.log(firstDate1)
			    /***********************第二排***************/
			var firstDate22 = firstDate1.split(/_|_|_/);
			    firstDate12 = new Date(firstDate22[0], parseInt(firstDate22[1])-1, parseInt(firstDate22[2])+1);     
            var firstDate2 = new Date(firstDate22[0], parseInt(firstDate22[1])-1, parseInt(firstDate22[2])+7);
                firstDate12 = "" + firstDate12.getFullYear() +"_" + (firstDate12.getMonth()+1) + "_"+ (firstDate12.getDate());
			    firstDate2 = "" + firstDate2.getFullYear() +"_" + (firstDate2.getMonth()+1) + "_"+ (firstDate2.getDate()); 
            	/***********************第三排***************/
			var firstDate23 = firstDate2.split(/_|_|_/);
			var firstDate13 = new Date(firstDate23[0], parseInt(firstDate23[1])-1, parseInt(firstDate23[2])+1);     
            var firstDate3 = new Date(firstDate23[0], parseInt(firstDate23[1])-1, parseInt(firstDate23[2])+7);
                firstDate13 = "" + firstDate13.getFullYear() +"_" + (firstDate13.getMonth()+1) + "_"+ (firstDate13.getDate());
			    firstDate3 = "" + firstDate3.getFullYear() +"_" + (firstDate3.getMonth()+1) + "_"+ (firstDate3.getDate()); 
            	/***********************第四排*******************/
            var firstDate34 = firstDate3.split(/_|_|_/);
			var firstDate14 = new Date(firstDate34[0], parseInt(firstDate34[1])-1, parseInt(firstDate34[2])+1);     
            var firstDate4 = new Date(firstDate34[0], parseInt(firstDate34[1])-1, parseInt(firstDate34[2])+7);
                firstDate14 = "" + firstDate14.getFullYear() +"_" + (firstDate14.getMonth()+1) + "_"+ (firstDate14.getDate());
			    firstDate4 = "" + firstDate4.getFullYear() +"_" + (firstDate4.getMonth()+1) + "_"+ (firstDate4.getDate()); 
            	/***********************第六排*******************/
            var firstDate45 = firstDate4.split(/_|_|_/);
			var firstDate15 = new Date(firstDate45[0], parseInt(firstDate45[1])-1, parseInt(firstDate45[2])+1);     
            var firstDate5 = new Date(firstDate45[0], parseInt(firstDate45[1])-1, parseInt(firstDate45[2])+7);
                firstDate15 = "" + firstDate15.getFullYear() +"_" + (firstDate15.getMonth()+1) + "_"+ (firstDate15.getDate());
			    firstDate5 = "" + firstDate5.getFullYear() +"_" + (firstDate5.getMonth()+1) + "_"+ (firstDate5.getDate());

			    /*****************第六排****************/
			var firstDate56 = firstDate5.split(/_|_|_/);
			var firstDate16 = new Date(firstDate56[0], parseInt(firstDate56[1])-1, parseInt(firstDate56[2])+1);     
            var firstDate6 = new Date(firstDate56[0], parseInt(firstDate56[1])-1, parseInt(firstDate56[2])+7);
                firstDate16 = "" + firstDate16.getFullYear() +"_" + (firstDate16.getMonth()+1) + "_"+ (firstDate16.getDate());
			    firstDate6 = "" + lastDate.getFullYear() +"_" + (lastDate.getMonth()+1) + "_"+ (lastDate.getDate());     
            setTimeout(function(){
            	/***********************第一排***************/
            	getCourseInfor(firstDate11,firstDate1,0);
            	getCourseInfor(firstDate12,firstDate2,1);
            	getCourseInfor(firstDate13,firstDate3,2);
            	getCourseInfor(firstDate14,firstDate4,3);
            	getCourseInfor(firstDate15,firstDate5,4);
            	//console.log(firstDate5)
            	//console.log(firstDate6)
            	if(firstDate5<firstDate6){
            		getCourseInfor(firstDate16,firstDate6,5);
            	}
            	
            	var tdHeight = $(".courseCalWrap .courseCalLeft tbody tr").eq(0).height();
            	//console.log(tdHeight)
            	$(".courseCalWrap .courseCalLeft tbody td").css("padding","4px 4px 0 0")
            	tdHeight = tdHeight -30;
            	$(".courseCalWrap .courseCalLeft td .tdDiv").css({"height":tdHeight,"padding-bottom":"25px"});	
            },50)
            //calendar.$containerDIV_.find('tbody td').css({"border-width":"1px 1px 0px 0px","border-color":"#d8dee4"});
		    //calendar.$containerDIV_.find('tbody td').css("background","none");
		    $("#container .anchor").css("background","#e5feea");
		    $("#container .anchor").css({"border-width":"1px 1px 0px 0px","border-color":"#28c445"});
            var $index1 = $("#container .anchor").parent("tr").index();
			$index1 =$index1 - 1;
			//console.log($index1)
			var index = $("#container .anchor").index();
			//console.log(index)
			$("#container .anchor").siblings("td").eq($("#container .anchor").index()-1).css("border-right","1px solid #28c445");
			//index = index-1;
			//console.log(index)

			$("#container .anchor").parents("tr:last").find("#container .anchor").css({"border-width":"1px 1px 1px 0px","border-color":"#28c445"});
			//$(".anchor").siblings("td").css("border","1px solid #d8dee4")
			$("#container .anchor").parent("tr").siblings("tr").eq($index1+1).find("td").eq($("#container .anchor").index()).css("border-top","1px solid #28c445");
			//$("#container .anchor").siblings("td").eq(index-1).css("border-right","1px solid #28c445");
			if(index == 0){
				$("#container .anchor").css({"border-width":"1px 1px 0px 1px","border-color":"#28c445"});
				$("#container .anchor").parents("tr:last").find("#container .anchor").css({"border-width":"1px 1px 1px 1px","border-color":"#28c445"});
				$("#container .anchor").siblings("td").eq($("#container .anchor").index()-1).css("border-right","1px solid #d8dee4");
			}
					
    }		
	    /*$("#container tbody tr td").css("color","#4f566b");
		var anchorIndex = $(".anchor").index();
	    var currentDay = now.getHours()+':'+now.getMinutes(); 
		for(var i = 0;i<$(".anchor").parents("tr").index()+1;i++){
			if(i<$(".anchor").parents("tr").index()){
				$("#container tbody tr").eq(i).find("td").css("color","#a1aac2");
			    $("#container tbody tr").eq(i).find("td").find("b").css("color","#4f566b");
			}else if(i==$(".anchor").parents("tr").index()){
				for(var j=0;j<7;j++){
					if($("#container tbody tr").eq(i).find("td").eq(j).index()<anchorIndex){
					    $("#container tbody tr").eq(i).find("td").eq(j).css("color","#a1aac2");
						$("#container tbody tr").eq(i).find("td").eq(j).find("b").css("color","#4f566b");
					}
				}
			}
		}*/
		$anchorCell.addClass("anchor");
		//calendar.addSurplusClass("everyDay");
    }
}
//获取服务器时间
function getDate(){
    $.ajax({
        url: getRootPath()+"/getCurTime",//后端需要给的接口
        type: "post",
        dataType: "text",
        success: function(data) {
        	//console.log(data)
            mydate = data;
            mydate=new Date(mydate);
            mydate1 = new Date(mydate);
            //console.log(mydate)
            return mydate;
        }
    })
}

function showAllCourse(){
	if(calType == 0){
		$(this).css("background-color","#daecf8").siblings("li").css("background-color","#fff");
    	$("#container td").find(".currentCourse li").css("display","block");
		for(var j = 0;j<$("#container td").length;j++){
			var $thisLi = $("#container td").eq(j).find(".currentCourse li");                
            if($thisLi.length>3){
                $("#container td").eq(j).find(".currentCourse li:gt(2)").css("display","none");
                //console.log($("#container td").eq(j).find(".currentCourse p").html())
                if(!$("#container td").eq(j).find(".currentCourse p").hasClass("pInfor")){
                    $("#container td").eq(j).find(".currentCourse").append('<p class="pInfor" style="text-align:left;padding-left:20px;">......<p>');
                }
                else{
                	$("#container td").eq(j).find(".currentCourse .pInfor").show();
                }
                $("#container td").eq(j).find(".xiasanjiao").show();
            }else{      
            	$("#container td").eq(j).find(".currentCourse .pInfor").hide();
            	$("#container td").eq(j).find(".xiasanjiao").hide();
            }  
		}
	}else if(calType == 1){
		$(".courseCalWrap .weekDays  li").css("display","block");
        setTimeout(function(){
            for(var i=0;i<7;i++){
            	var thday = $(".weekEveryCon").eq(i);
            	var theli = thday.find("li");
                for(var j=0;j<theli.length;j++){                        
                    	theli.eq(j).find("p").show();  
                }    
            }
        },100)
	}else if(calType == 2){
		$(".liDiv").find(".olRight .dingwei").css("display","block");
        setTimeout(function(){
            for(var i=0;i<$(".liDiv").length;i++){
            	var thelidiv = $(".liDiv").eq(i).find(".dingwei");                    
                	$(".liDiv").eq(i).find(".olRight p").show(); 
            }
        },100);
	}
}

