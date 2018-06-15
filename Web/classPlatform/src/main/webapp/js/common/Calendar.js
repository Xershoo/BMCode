//日历控件
function Calendar() {
    this.$containerDIV_ = null;				//日历容器DIV的jquery封装对象
    this.anchorDate_ = null;				//日历锚定日期
    //this.containerDIVWidth_ = null;		//日历容器DIV宽
    //this.containerDIVHeight_ = null;		//日历容器DIV高
    this.firstDateOfCalendar_ = null;		//日历第一个日期格的日期
    this.lastDateOfSelfCalendar_ = null;	//日历最后一个日期格的日期
}

/**
 * 初始化日历控件
 * @param {$Element} $containerDIV 日历容器DIV的jquery封装对象
 * @param {Date} anchorDate //日历锚定日期
 */
Calendar.prototype.init = function($containerDIV,anchorDate){
    this.$containerDIV_ = $containerDIV;
    this.anchorDate_ = anchorDate;	//记录日历锚定日期
    this.setAnchorDate(anchorDate);	//绘制日历格
}

/**
 * 根据日历锚定日期绘制日历
 * @param {Date} anchorDate 日历锚定日期
 */
Calendar.prototype.setAnchorDate = function(anchorDate){
    this.anchorDate_ = anchorDate;	//记录日期锚定日期

    var dayLength = 24*60*60*1000;	//一天的毫秒数
    var firstDateOfSelfMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),1);	//date所在月1号日期
    //计算日历第一个方格的日期
    var firstDateOfCalendar = null;		//日历第一个格子日期
    //月初为周日时
    if(firstDateOfSelfMonth.getDay() === 0){
        firstDateOfCalendar = new Date(firstDateOfSelfMonth.valueOf() - 6 * dayLength);
    }
    //月初为非周日时
    else{
        firstDateOfCalendar = new Date(firstDateOfSelfMonth.valueOf() - (firstDateOfSelfMonth.getDay()-1) * dayLength);
    }

    //计算日历最后一个方格的日期
    var lastDateOfSelfMonth = new Date(firstDateOfSelfMonth.getFullYear(),firstDateOfSelfMonth.getMonth()+1,1-1);	//date所在月最后一天的日期
    var lastDateOfSelfCalendar = null;
    //月末为周日时
    if(lastDateOfSelfMonth.getDay() === 0){
        lastDateOfSelfCalendar = lastDateOfSelfMonth;
    }
    //月末为非周日时
    else{
        lastDateOfSelfCalendar = new Date(lastDateOfSelfMonth.valueOf() + (7-lastDateOfSelfMonth.getDay()) * dayLength);
    }

    //记录日历日期起止日期
    this.firstDateOfCalendar_ = firstDateOfCalendar;		//记录日历第一个日期格的日期
    this.lastDateOfSelfCalendar_ = lastDateOfSelfCalendar;	//记录日历最后一个日期格的日期
    //绘制日历表格
    var rowsCount = ((lastDateOfSelfCalendar.valueOf() - firstDateOfCalendar.valueOf() + 1 * dayLength) /dayLength) / 7;
    var tableHTMLStr = "<table cellpadding = '0' cellspacing='0'>";
    //表头
    tableHTMLStr += '<thead><tr><th class="firstTr">一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr></thead>';
    //表体
    tableHTMLStr += "<tbody>";
    var time = null;
    var times =null;
    var count = 0;
    for(var row=0; row<rowsCount; row++){
        tableHTMLStr += "<tr>";
        for(var i=0; i<7; i++){
            time = new Date(firstDateOfCalendar.valueOf() + count * dayLength);
            times = "" + time.getFullYear() +"_" + (time.getMonth()+1) + "_"+ time.getDate() + "";
            tableHTMLStr += "<td data-index='date_"+times+"'><div class='tdDiv'><b>" + time.getDate() + "</b><ul class='currentCourse'></ul></div><span class='xiasanjiao'><em class='img'></em></span></td>";
            //$("#container table td").append("<span class='xiasanjiao' style='width:32px;height:32px;position:absolute;bottom:-4px;right:-4px;display:none;z-index:999'><img src='images/arrow.png'  /></span>");
            /*************************进行增加内容*****************************/
            /*if(count == 0){
				firstDateOfCalendarInfor = times;
		               
		        //console.log(firstDateOfCalendarInfor);
		    }else if(count == rowsCount-1){
		            lastDateOfSelfCalendarInfor = "" + time.getFullYear() +"_" + (time.getMonth()+2) + "_"+ time.getDate() + "";
		        //console.log(lastDateOfSelfCalendarInfor);
		    }*/
            if(row == 0 && i==0){
				firstDateOfCalendarInfor = times;
		    }else if(row == (rowsCount -1) && i==6) {
		        lastDateOfSelfCalendarInfor = times;
		    }
            count++;
        }
        tableHTMLStr += "</tr>";
    }
    tableHTMLStr += "</tbody></table>";

    this.$containerDIV_.empty()	//清除旧日历
    this.$containerDIV_.html(tableHTMLStr);	//绘制新日历
    /*****************获取到了最后一个格子和第一个格子的日期********************/


};

/**
 * 获得日历锚定日期
 * @return {Date} anchorDate 日历锚定日期
 */
Calendar.prototype.getAnchorDate = function(){
    return this.anchorDate_;
}

/**
 * 根据时间获得对应的格子(<td>的jquery封装对象)
 * @param {Date} time 时间
 * @return {$Element} $cell 时间所属的方格(<td>的jquery封装对象)
 */
Calendar.prototype.getCellByTime = function(time){
    var zeroTime = new Date(time.getFullYear(),time.getMonth(),time.getDate());	//获得time所属当天的00:00:00时间
    var days = (zeroTime.valueOf() - this.firstDateOfCalendar_.valueOf() ) /(24*60*60*1000);	//距离日历第一格日期的天数
    var $cell = this.$containerDIV_.find('tbody td').eq(days);
    return  $cell;
}

/**
 * 根据日历方格获得对应的日期
 * @param {$Element} $cell 日历中的方格(<td>的jquery封装对象)
 * @return {Date} time 日历方格所对应的日期的00:00:00时间
 */
Calendar.prototype.getTimeByCell = function($cell){
    var days = this.$containerDIV_.find('tbody td').index($cell);	//距离日历第一格日期的天数

    var time = new Date(this.firstDateOfCalendar_.valueOf() + days * (24*60*60*1000));
    return time;
}

/**
 * 为周末日期添加周末样式
 * @param {String} className 样式名称
 */
Calendar.prototype.addWeekendClass = function (className){
    var firstDateOfCalendar = this.firstDateOfCalendar_;		//获得日历第一个日期格的日期
    var lastDateOfSelfCalendar = this.lastDateOfSelfCalendar_;	//获得日历最后一个日期格的日期
    var dayLength = 24*60*60*1000;
    var time = firstDateOfCalendar;
    var $weekend = null;

    for(var i=0; lastDateOfSelfCalendar.valueOf()-time.valueOf() > 0; i++){
        time = new Date(firstDateOfCalendar.valueOf() + i * dayLength);
        //如果为周末添加周末样式
        if(time.getDay() ==0 || time.getDay() ==6){
            $weekend = this.getCellByTime(time);
            $weekend.addClass(className);
        }
        else{
            continue;
        }


    }
}
/**
 * 为上个月多余日期和下个月剩余日期格添加多余（非当前月）样式
 * @param {String} className 样式名称
 */
Calendar.prototype.addSurplusClass = function (className){
    var anchorDate = this.anchorDate_;							//日历锚定日期
    var firstDateOfCalendar = this.firstDateOfCalendar_;		//获得日历第一个日期格的日期
    var lastDateOfSelfCalendar = this.lastDateOfSelfCalendar_;	//获得日历最后一个日期格的日期
    var firstDateOfSelfMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),1);	//date所在月1号日期
    var lastDateOfSelfMonth = new Date(firstDateOfSelfMonth.getFullYear(),firstDateOfSelfMonth.getMonth()+1,1-1);	//date所在月最后一天的日期
    var dayLength = 24*60*60*1000;
    var time = firstDateOfCalendar;
    var $surplusCell = null;

    for(var i=0; lastDateOfSelfCalendar.valueOf() > time.valueOf(); i++){
        time = new Date(firstDateOfCalendar.valueOf() + i * dayLength);
        if(time.valueOf() < firstDateOfSelfMonth.valueOf() || time.valueOf() > lastDateOfSelfMonth.valueOf()){
            $surplusCell = this.getCellByTime(time);
            $surplusCell.find("b").addClass(className);

        }
        else{

            continue;

        }
    }
}
/**
* 获得指定日期所在的周的所有日子
* @param {Date} time JS时刻
* @return {Array} weekArray 返回周一至周日日期组
*/
Calendar.prototype.getWeekByTime = function (time){
	var weekNumber = time.getDay();
	var firstDayOfWeek = null;
	var lastDayOfWeek = null;
	
	if(weekNumber == 0){
		firstDayOfWeek = new Date(time.getFullYear(), time.getMonth(),time.getDate()-6);
	}
	else{

		firstDayOfWeek = new Date(time.getFullYear(), time.getMonth(), time.getDate() - (time.getDay()-1));
	}
	var weekArray = new Array();
	
	for(var i=0; i<7;i++){
		weekArray.push(new Date(firstDayOfWeek.valueOf() + 24*60*60*1000 * i));	
		
	}     
	return weekArray;
}
/**
* 把日历翻到下个周
*/
Calendar.prototype.turnToNextWeek = function (){
	var anchorDate = this.anchorDate_;							//获得日历原锚定日期
	weekNumber = anchorDate.getDay();

	//console.log(weekNumber)
	var weekOfNextDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+1,anchorDate.getDate());	//当前的日期
	var nextWeekAnchorDate = null;

		firstDayOfWeek = new Date(anchorDate.getFullYear(), anchorDate.getMonth(),anchorDate.getDate() + 6);
		//console.log(firstDayOfWeek)
		//lastDayOfWeek = new Date(time.getFullYear(), time.getMonth(),time.getDate() + (7-time.getDay()));
	
	//日历翻至下月，并锚定至合适的日期
	this.setAnchorDate(firstDayOfWeek);	
}
/**
* 把日历翻到上个周
*/
Calendar.prototype.turnToPreviousWeek = function(){
	var anchorDate = this.anchorDate_;							//获得日历原锚定日期
	var weekNumber = anchorDate.getDay();
	var weekOfNextDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+1,anchorDate.getDate());	//当前的日期
	var previousWeekAnchorDate = null;
	firstDayOfWeek = new Date(anchorDate.getFullYear(), anchorDate.getMonth(),anchorDate.getDate() - 6);
	//日历翻至下月，并锚定至合适的日期
	this.setAnchorDate(firstDayOfWeek);
	//console.log(firstDayOfWeek)	
}
/**
* 把日历翻到下个月
*/
Calendar.prototype.turnToNextMonth = function (){
	var anchorDate = this.anchorDate_;							//获得日历原锚定日期
	var lastDateOfNextMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+2,1-1);	//date所在月下个月最后一天的日期
	var nextMonthAnchorDate = null;
	//如果下个月天数少于当前锚定的日号，则日历锚定为下月最后一天
	if(lastDateOfNextMonth.getDate() < anchorDate.getDate()){
		nextMonthAnchorDate = lastDateOfNextMonth;
	}
	//如果下个月天数>=当前月天数，则日历锚定为下月同日
	else{
		nextMonthAnchorDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+1,anchorDate.getDate());
	}
	
	//日历翻至下月，并锚定至合适的日期
	this.setAnchorDate(nextMonthAnchorDate);	
}
/**
* 把日历翻到上个月
*/
Calendar.prototype.turnToPreviousMonth = function (){
	var anchorDate = this.anchorDate_;							//获得日历原锚定日期
	var lastDateOfPreviousMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),1-1);	//date所在月上个月最后一天的日期
	var previousMonthAnchorDate = null;
	//如果上个月天数少于当前锚定的日号，则日历锚定为上月最后一天
	if(lastDateOfPreviousMonth.getDate() < anchorDate.getDate()){
		previousMonthAnchorDate = lastDateOfPreviousMonth;
	}
	//如果下个月天数>=当前月天数，则日历锚定为下月同日
	else{
		previousMonthAnchorDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()-1,anchorDate.getDate());
	}
	
	//日历翻至下月，并锚定至合适的日期
	this.setAnchorDate(previousMonthAnchorDate);	
}
/**
* 把日历翻到下个天
*/
Calendar.prototype.turnToNextDate = function (){
	var anchorDate = this.anchorDate_;							//获得日历原锚定日期
	var dateOfNextDate = new Date(anchorDate.getFullYear(),1-1,anchorDate.getDate());	//当前的日期
	var nextMonthAnchorDate = null;
	//如果下个月天数少于当前锚定的日号，则日历锚定为下月最后一天
	/*if(lastDateOfNextDate.getDate() < anchorDate.getDate()){
		nextMonthAnchorDate = lastDateOfNextDate;
		alert("fff")
	}
	//如果下个月天数>=当前月天数，则日历锚定为下月同日
	else{
		nextMonthAnchorDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+1,anchorDate.getDate());
	}*/
	nextMonthAnchorDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),anchorDate.getDate()+1);
	//日历翻至下月，并锚定至合适的日期
	this.setAnchorDate(nextMonthAnchorDate);	
}
/**
* 把日历翻到上个天
*/
Calendar.prototype.turnToPreviousDate = function (){
    var anchorDate = this.anchorDate_;                          //获得日历原锚定日期
    //console.log(anchorDate)
    var lastDateOfPreviousMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),1-1); //date所在月上个月最后一天的日期
    var previousMonthAnchorDate = null;
    //如果上个月天数少于当前锚定的日号，则日历锚定为上月最后一天
    /*if(lastDateOfPreviousMonth.getDate() < anchorDate.getDate()){
        previousMonthAnchorDate = lastDateOfPreviousMonth;
    }
    //如果下个月天数>=当前月天数，则日历锚定为下月同日
    else{
        previousMonthAnchorDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()-1,anchorDate.getDate());
    }*/
    previousMonthAnchorDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),anchorDate.getDate()-1);
    //日历翻至下月，并锚定至合适的日期
    this.setAnchorDate(previousMonthAnchorDate);    
}


var onOffAry = [{
    indexs: 0,
    background:1,
    background0: "url(../../images/iconList.png) no-repeat -282px 0px",
    background1: "url(../../images/iconList.png) no-repeat -282px -600px"
}, {
    indexs: 1,
    background:2,
    background0: "url(../../images/iconList.png) no-repeat -282px -30px",
    background1: "url(../../images/iconList.png) no-repeat -282px -630px"
}, {
    indexs: 2,
    background:3,
    background0: "url(../../images/iconList.png) no-repeat -282px -60px",
    background1: "url(../../images/iconList.png) no-repeat -282px -660px"
}, {
    indexs: 3,
    background:4,
    background0: "url(../../images/iconList.png) no-repeat -282px -90px",
    background1: "url(../../images/iconList.png) no-repeat -282px -690px"
}, {
    indexs: 4,
    background:5,
    background0: "url(../../images/iconList.png) no-repeat -282px -120px",
    background1: "url(../../images/iconList.png) no-repeat -282px -720px"
}, {
    indexs: 5,
    background:6,
    background0: "url(../../images/iconList.png) no-repeat -282px -150px",
    background1: "url(../../images/iconList.png) no-repeat -282px -750px"
}, {
    indexs: 6,
    background:7,
    background0: "url(../../images/iconList.png) no-repeat -282px -180px",
    background1: "url(../../images/iconList.png) no-repeat -282px -780px"
}, {
    indexs: 7,
    background:8,
    background0: "url(../../images/iconList.png) no-repeat -282px -210px",
    background1: "url(../../images/iconList.png) no-repeat -282px -810px"
}, {
    indexs: 8,
    background:9,
    background0: "url(../../images/iconList.png) no-repeat -282px -240px",
    background1: "url(../../images/iconList.png) no-repeat -282px -840px"
}, {
    indexs: 9,
    background:10,
    background0: "url(../../images/iconList.png) no-repeat -282px -270px",
    background1: "url(../../images/iconList.png) no-repeat -282px -870px"
}, {
    indexs: 10,
    background:11,
    background0: "url(../../images/iconList.png) no-repeat -282px -300px",
    background1: "url(../../images/iconList.png) no-repeat -282px -900px"
}, {
    indexs: 11,
    background:12,
    background0: "url(../../images/iconList.png) no-repeat -282px -330px",
    background1: "url(../../images/iconList.png) no-repeat -282px -930px"
}, {
    indexs: 12,
    background:13,
    background0: "url(../../images/iconList.png) no-repeat -282px -360px",
    background1: "url(../../images/iconList.png) no-repeat -282px -960px"
}, {
    indexs: 13,
    background:14,
    background0: "url(../../images/iconList.png) no-repeat -282px -390px",
    background1: "url(../../images/iconList.png) no-repeat -282px -990px"
}, {
    indexs: 14,
    background:15,
    background0: "url(../../images/iconList.png) no-repeat -282px -420px",
    background1: "url(../../images/iconList.png) no-repeat -282px -1020px"
}, {
    indexs: 15,
    background:16,
    background0: "url(../../images/iconList.png) no-repeat -282px -450px",
    background1: "url(../../images/iconList.png) no-repeat -282px -1050px"
}, {
    indexs: 16,
    background:17,
    background0: "url(../../images/iconList.png) no-repeat -282px -480px",
    background1: "url(../../images/iconList.png) no-repeat -282px -1080px"
}, {
    indexs: 17,
    background:18,
    background0: "url(../../images/iconList.png) no-repeat -282px -510px",
    background1: "url(../../images/iconList.png) no-repeat -282px -1110px"
}, {
    indexs: 18,
    background:19,
    background0: "url(../../images/iconList.png) no-repeat -282px -540px",
    background1: "url(../../images/iconList.png) no-repeat -282px -1140px"
}, {
    indexs: 19,
    background:20,
    background0: "url(../../images/iconList.png) no-repeat -282px -570px",
    background1: "url(../../images/iconList.png) no-repeat -282px -1170px"
}]
var str1 ="";

function getCourseInfor(firstDateOfCalendarInfor,lastDateOfSelfCalendarInfor,line){
    var courseInforData = {
            "startDate": firstDateOfCalendarInfor,
            "endDate": lastDateOfSelfCalendarInfor
        }

        /*$.ajaxSetup({async:true});*/
        $.ajax({
            url: getRootPath()+"/student/schedule/listCourseClass",//后端需要给的接口
            type: "post",
            dataType: "json",
            data:courseInforData,
            success: function(data) {
                if(data.success){
                	var now1 = mydate1;
                    //console.log(mydate1)
                    var hours = now1.getHours();
                    var min = now1.getMinutes();
                    hours = String(hours);
                    min = String(min);
                    if(String(hours).length<2){
                        hours = "0" + hours;
                    }
                    if(String(min).length<2){
                        min = "0" + min;
                    }
                    var currentDay = hours+':'+min;
                    var ary=[];
                    /*************************对下三角进行操作******************************/
                    $(".xiasanjiao").on("click",function(){
                        $(".dayCourse").addClass("current1").siblings().removeClass("current1");
                        $(".dayImg").addClass("current").siblings().removeClass("current");
                    })
                    /***************************右边列表*************************/
                        
                    /*************月日历的展示**************/
                   
                    for(var j=0;j<7;j++){
                    	
                        var date = $("#container table tbody tr").eq(line).find("td").eq(j).attr("data-index");
                        $.each(data.result, function(key, value){
                            var str="";
                    	    if (key == date){
                    		    $.each(value, function(i, allData){ 
	                    		    	if(allData.classState == 17){
	                		    			str+='<li><span class="of" style="margin-top:2px; float:left;"></span><span class="idCourseName" id="'+allData.courseid+'_'+allData.seqNum+ '" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)" style="float:left;text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">'+allData.courseName+'</span><div class="liInfor" style="display:none;text-align:left;padding-left:39px;"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:33px;"><img src="'+getRootPath()+'/images/haveclass.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445; font-weight:bold;" class="startTime" >'+allData.startTimePlan+'</span>-<span style="color:#28c445;font-weight:bold" class="endTime">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
	                		    		}else if(allData.classState == 16){
	                		    			str+='<li><span class="of" style="margin-top:2px; float:left;"></span><span class="idCourseName" id="'+allData.courseid+'_'+allData.seqNum+ '" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)" style="float:left;text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">'+allData.courseName+'</span><div class="liInfor" style="display:none;text-align:left;padding-left:39px;"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:33px;"><img src="'+getRootPath()+'/images/classing.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445; font-weight:bold;" class="startTime" >'+allData.startTimePlan+'</span>-<span style="color:#28c445;font-weight:bold" class="endTime">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
	                		    		}else if(allData.classState == 20){
	                		    			str+='<li><span class="of" style="margin-top:2px; float:left;"></span><span class="idCourseName" id="'+allData.courseid+'_'+allData.seqNum+ '" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)" style="float:left;text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">'+allData.courseName+'</span><div class="liInfor" style="display:none;text-align:left;padding-left:39px;"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:33px;"><img src="'+getRootPath()+'/images/m_cancel.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445; font-weight:bold;" class="startTime" >'+allData.startTimePlan+'</span>-<span style="color:#28c445;font-weight:bold" class="endTime">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
	                		    		}else if(allData.classState == 15){
	                		    			str+='<li><span class="of" style="margin-top:2px; float:left;"></span><span class="idCourseName" id="'+allData.courseid+'_'+allData.seqNum+ '" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)" style="float:left;text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">'+allData.courseName+'</span><div class="liInfor" style="display:none;text-align:left;padding-left:39px;"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:33px;"><img src="'+getRootPath()+'/images/m_not_begin.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445; font-weight:bold;" class="startTime" >'+allData.startTimePlan+'</span>-<span style="color:#28c445;font-weight:bold" class="endTime">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
	                		    		}else{
	                		    			str+='<li><span class="of" style="margin-top:2px; float:left;"></span><span class="idCourseName" id="'+allData.courseid+'_'+allData.seqNum+ '" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)" style="float:left;text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">'+allData.courseName+'</span><div class="liInfor" style="display:none;text-align:left;padding-left:39px;"><p class="name"  style="padding:15px 0 16px 0;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</p><p class="time" style="padding-bottom:15px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><p style="color:#28c445; font-weight:bold;" class="startTime" >'+allData.startTimePlan+'-'+allData.endTimePlan+'</p></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
	                		    		}
                                        if(allData.onlineType==1)
                                        	str += '<span class="onOff" style="margin-left:20px;padding-left:20px;background:url(../../images/iconList.png) no-repeat 0 3px;fint-size:12px;">在线课堂</span>';
                                        else if(allData.onlineType==2)
                                        	str+= '<span class="offOn" style="font-size:12px;margin-left:20px;padding-left:16px;background:url(../../images/iconList.png) no-repeat 0px -25px;">非在线课堂</span>';
                                        str += '</p></div></li>';
                                        $("#container table tbody tr").eq(line).find("td").eq(j).find(".currentCourse").html(str);
                                       
                                        if(i<3){
                                            $("#container table tbody tr").eq(line).find("td").eq(j).find(".tdDiv").siblings(".xiasanjiao").css("display","none");
                                           
                                        }else{
                                            
                                            $("#container table tbody tr").eq(line).find("td").eq(j).find(".currentCourse").html(str + '<p class="pInfor" style="text-align:left;padding-left:40px;">......</p>');
                                            $("#container table tbody tr").eq(line).find("td").eq(j).find(".tdDiv").siblings(".xiasanjiao").css("display","block");
                                        } 
                                        var currentCourseLi = $("#container table tbody tr").eq(line).find("td").eq(j).find(".currentCourse li");
                                        if(allData.courseStatus == 0){//已经结束
                                        	currentCourseLi.css("color","rgb(161, 170, 194)");
                                        }else if(allData.courseStatus == 1){  //正在上课
                                        	currentCourseLi.css("color","#28c445");
                                        }else if(allData.courseStatus == 2){   //未开始
                                        	currentCourseLi.css("color","#4f566b");
                                        }else if(allData.courseStatus == 4){   //已取消
                                            
                                        	currentCourseLi.css("color","rgb(161, 170, 194)");
                                        }
                                    
                				    //console.log($("#container table td").eq(j).find(".currentCourse li").length)
                				    var $currentCourse = $("#container table tbody tr").eq(line).find("td").eq(j).find(".currentCourse");
                				    var $height = currentCourseLi.height();
                				    var $length = currentCourseLi.length;
                				   
                				  //var newJ = j;
                                  for(var m = 0;m< $length;m++){
                                        if(m>2){
                                        	currentCourseLi.eq(m).css("display","none")
                                        }
                                       
                                    }
                				  /*****************************判断是否是在线课堂******************************/
                                    var ary=[];
                                    for(var i = 0;i<$("#container td").length;i++){
                                  	    ary.push($("#container td").eq(i).find(".idCourseName").html());
                                    }
                                    for(var m=0;m<currentCourseLi.length;m++){
                				    	var sp = currentCourseLi.eq(m).find("span").eq(1);
                				    	var tocss = currentCourseLi.eq(m).find(".of");
                				    	var onlinetype = sp.attr("onlinetype");
                				    	var bg0 = sp.attr("classid") % 20;
                				    	if(onlinetype==1){                				    			
                                            tocss.css("background",onOffAry[bg0].background0);                                              	
                				    	}else if(onlinetype==2){                				    			
                                            tocss.css("background",onOffAry[bg0].background1);                                              	
                				    	}
                				    		
                                    }                                                           
                                     /********************对当天所有课程进行遍历，找出当前正在上课的课程**********************/                   			    
                                });
                                var anchorIndex = $(".anchor").index();
                                for(var m = 0;m<7;m++){ 
                                var liIndex =$("#container tbody tr").eq(line).find("td").eq(m).index();   //获取当前日期有课程的长度

                                if(liIndex == anchorIndex){
                                    var liLen = $(".anchor").find("ul li").length;
                                }

                                }
                                
                    	    }  
                        });   
                    }
                                       

                    /********************************日日历的显示*******************************/ 
                	var dateStr = $("#focusDate").text();
    				var dateStr2 = dateStr.replace("年","_");
    				dateStr2 = dateStr2.replace("月","_");
    				dateStr2 = dateStr2.replace("日","");
    				dateStr2 = 'date_'+dateStr2;
                    $.each(data.result, function(key, value){
                	    if(key == dateStr2){
                		    $.each(value, function(i, allData){
                			    $(".dayCourseTitle").html(allData.week);
            				  //if(i==allData.dailySeqNum){
                  			  	var str="";
                  			  	
                  			  if(allData.classState == 17){
                  				  str +='<div class="dingwei" style="width:270px;position:relative;padding-left:30px;"  id="'+allData.courseid+'_'+allData.seqNum+'" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)"><p class="courseName"><span></span><span class="courses" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span>'+allData.teacherName+'老师</span></p><p class="courseTime"><span>'+allData.startTimePlan+'</span><span>-'+allData.endTimePlan+'</span></p><div class="liInfor" style="display:none;text-align:left;padding-left:40px;cursor:pointer"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/haveclass.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                  			  }else if(allData.classState == 16){
                  				  str +='<div class="dingwei" style="width:270px;position:relative;padding-left:30px;"  id="'+allData.courseid+'_'+allData.seqNum+'" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)"><p class="courseName"><span></span><span class="courses" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span>'+allData.teacherName+'老师</span></p><p class="courseTime"><span>'+allData.startTimePlan+'</span><span>-'+allData.endTimePlan+'</span></p><div class="liInfor" style="display:none;text-align:left;padding-left:40px;cursor:pointer"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/classing.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                  			  }else if(allData.classState == 20){
                  				  str +='<div class="dingwei" style="width:270px;position:relative;padding-left:30px;"  id="'+allData.courseid+'_'+allData.seqNum+'" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)"><p class="courseName"><span></span><span class="courses" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span>'+allData.teacherName+'老师</span></p><p class="courseTime"><span>'+allData.startTimePlan+'</span><span>-'+allData.endTimePlan+'</span></p><div class="liInfor" style="display:none;text-align:left;padding-left:40px;cursor:pointer"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/m_cancel.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                  			  }else if(allData.classState == 15){
                  				  str +='<div class="dingwei" style="width:270px;position:relative;padding-left:30px;"  id="'+allData.courseid+'_'+allData.seqNum+'" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)"><p class="courseName"><span></span><span class="courses" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span>'+allData.teacherName+'老师</span></p><p class="courseTime"><span>'+allData.startTimePlan+'</span><span>-'+allData.endTimePlan+'</span></p><div class="liInfor" style="display:none;text-align:left;padding-left:40px;cursor:pointer"><p class="name"  style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/m_not_begin.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                  			  }else{
                  				  str +='<div class="dingwei" style="width:270px;position:relative;padding-left:30px;"  id="'+allData.courseid+'_'+allData.seqNum+'" onlinetype="'+allData.onlineType+'" classid="'+allData.classid+'" onclick="forwardCourseDetail(this)"><p class="courseName"><span></span><span class="courses" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span>'+allData.teacherName+'老师</span></p><p class="courseTime"><span>'+allData.startTimePlan+'</span><span>-'+allData.endTimePlan+'</span></p><div class="liInfor" style="display:none;text-align:left;padding-left:40px;cursor:pointer"><p class="name"  style="padding:15px 0 16px 0;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</p><p class="time" style="padding-bottom:15px;"><span>第'+(i+1)+'节</span><span> '+allData.week+'</span><p style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-'+allData.endTimePlan+'</p></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                  			  }
                  			  	
                  			    
                  			    if(allData.onlineType==1)
                  			    	str += '<span class="onOff" style="margin-left:20px;padding-left:16px;background:url(../../images/iconList.png) no-repeat 0 3px;fint-size:12px;">在线课堂</span>';
                  			    else if(allData.onlineType==2)
                  			    	str += '<span class="offOn" style="font-size:12px;margin-left:20px;padding-left:16px;background:url(../../images/iconList.png) no-repeat 0px -25px;">非在线课堂</span>';
                  			    str += '</p></div></div>';
                                $(".liDiv").on("mouseover",function(){
                                    $(this).find(".liInfor").show();
                                })
                                $(".liDiv").on("mouseout",function(){
                                    $(this).find(".liInfor").hide();
                                })
                  				$(".liDiv").eq(i).find(".olRight").html(str);

                                /**************************对日的课程是否上过进行判断*****************/
                                //var mydate = new Date();
                                mydate = new Date(mydate.getFullYear(),mydate.getMonth(),mydate.getDate());
                                var timeString = $("#focusDate").html();
                                var arr = timeString.split(/年|月|日/);
                                var times= new Date(arr[0], parseInt(arr[1])-1, parseInt(arr[2]));
                                var $liDiv = $(".courseCalWrap .dayCourse .dayCourseMain .liDiv");
                                
                                if(allData.courseStatus==0){//已经结束
                                    $liDiv.find(".olRight .courseName").css("color","rgb(161, 170, 194)");        
                                }else if(allData.courseStatus==1){//正在进行
                                    $liDiv.find(".olRight .courseName").css("color","#28c445");
                                }else if(allData.courseStatus==2){//未开始
                                    $liDiv.eq(i).find(".olRight .courseName").css("color","#4f566b");
                                   
                                }else if(allData.courseStatus==4){
                                    $liDiv.find(".olRight .courseName").css("color","rgb(161, 170, 194)"); 
                                }
                                var tocss = $(".liDiv").eq(i).find(".courses");
                                if(allData.onlineType == 1){
                                	tocss.css("background",onOffAry[allData.classid%20].background0);
                                }else if(allData.onlineType == 2){
                                	tocss.css("background",onOffAry[allData.classid%20].background1);
                                }
                                
                               /* $(".myCourseList li:gt(1)").on("click",function(){
    					    	    $(".liDiv").find(".olRight p").show();
    					    		for(var j=0;j<$(".currentCourse li").length;j++){
    					    			for(var i=0;i<$(".liDiv").length;i++){
    					    				if($(this).html() != $(".liDiv").eq(i).find(".courses").html()){
                                                $(".liDiv").eq(i).find(".olRight p").hide();
    						    			}
    					    			}	
    					    		}	
    						    })         */
                		  })
                	    }
                    });
                   
                   /********************************周日历的显示*******************************/
                    var weekStr = $("#focusDate").text();
                    weekStr = weekStr.split("~");
                    for(var i=0;i<weekStr.length;i++) {
                   	weekStr[i] = weekStr[i].replace("年","_");
    				weekStr[i] = weekStr[i].replace("月","_");
    				weekStr[i] = weekStr[i].replace("日","");
    				weekStr[i] = 'date_'+weekStr[i];
    					$.each(data.result, function(key, value){
    	                	if (key == weekStr[i]){
    	                		$.each(value, function(j, allData){
    		                        var ii=i;
                                    var $weekCourse = $(".weekDays .weekEveryCon").eq(i).find("li").eq(j);
                                    $weekCourse.attr("id",allData.courseid+'_'+allData.seqNum);
                                    $weekCourse.attr("onlinetype",allData.onlineType);
                                    $weekCourse.attr("classid",allData.classid);
                                    $weekCourse.on("click",function(){
                                        forwardCourseDetail(this);
                                    })
    	                        	$weekCourse.find(".courseName").html(checkCourseNameLength(allData.courseName));
    								$weekCourse.find(".courseTime").html('<span></span><span>'+allData.startTimePlan+'-</span><span>'+allData.endTimePlan+'</span>');
                                    if($weekCourse.find(".liInfor")){
                                        $weekCourse.find(".liInfor").remove();
                                    }
                                    var str='';
                                    
                                    if(allData.classState == 17){
                                    	str+='<div class="liInfor" style="display:block;text-align:left;padding-left:40px;display:none;cursor:pointer"><p class="name"   style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/haveclass.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(j+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                		    		}else if(allData.classState == 16){
                		    			str+='<div class="liInfor" style="display:block;text-align:left;padding-left:40px;display:none;cursor:pointer"><p class="name"   style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/classing.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(j+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                		    		}else if(allData.classState == 20){
                		    			str+='<div class="liInfor" style="display:block;text-align:left;padding-left:40px;display:none;cursor:pointer"><p class="name"   style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/m_cancel.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(j+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                		    		}else if(allData.classState == 15){
                		    			str+='<div class="liInfor" style="display:block;text-align:left;padding-left:40px;display:none;cursor:pointer"><p class="name"   style="padding:15px 0 16px 0;"><span style="height:22px;line-height:22px;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</span><span style="width:72px;height:22px;float:right;margin-right:35px;"><img src="'+getRootPath()+'/images/m_not_begin.png" alt="" /></span></p><p class="time" style="padding-bottom:20px;"><span>第'+(j+1)+'节</span><span> '+allData.week+'</span><br /><span style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-</span><span style="color:#28c445;font-weight:bold">'+allData.endTimePlan+'</span></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                		    		}else{
                		    			str+='<div class="liInfor" style="display:block;text-align:left;padding-left:40px;display:none;cursor:pointer"><p class="name"   style="padding:15px 0 16px 0;" title="'+allData.courseName+'">'+checkCourseNameLength(allData.courseName)+'</p><p class="time" style="padding-bottom:15px;"><span>第'+(j+1)+'节</span><span> '+allData.week+'</span><p style="color:#28c445;font-weight:bold"> '+allData.startTimePlan+'-'+allData.endTimePlan+'</p></p><p class="teacher" style="background:url('+getRootPath()+'/images/teacherBg.png) no-repeat 0 0px;padding-left:20px;font-size:12px;">'+allData.teacherName+'老师';
                		    		}
                                    
                                    if(allData.onlineType==1)
                                    	str += '<span class="onOff" style="margin-left:20px;padding-left:16px;background:url(../../images/iconList.png) no-repeat 0 3px;fint-size:12px;">在线课堂</span>';
                                    else if(allData.onlineType==2)
                                    	str += '<span class="offOn" style="font-size:12px;margin-left:20px;padding-left:16px;background:url(../../images/iconList.png) no-repeat 0px -25px;">非在线课堂</span>';
                                    str += '</p></div>'
                                    $(".weekDays .weekEveryCon").eq(i).find("li").eq(j).append(str);
                                    var nowDay = now1.getDay();
                                    var $weekLi = $(".weekDays .weekEveryCon").eq(nowDay-1).find("li");
                                    
                                                                        
    	                            var theli = $(".weekDays .weekEveryCon").eq(i).find("li").eq(j).find(".courseName");
    	                            if(allData.onlineType==1){
    	                            	theli.css("background",onOffAry[allData.classid%20].background0);
    	                            }else if(allData.onlineType==2){
    	                            	theli.css("background",onOffAry[allData.classid%20].background1);
    	                            }
    	                		})
    	                	}
    	                })
                   }
                }
            }

        })
}

function getCourceById(){
    $.ajax({
        url: getRootPath()+"/student/schedule/listCourseName",//后端需要给的接口
        type: "post",
        dataType: "json",
        success: function(data) {
        	if(data.success){
        		var str1="";
                str1 ='<li>全部</li>';
                if(data.result){
                	for(var i=0;i<data.result.length;i++){
                    	
                        if(data.result[i].courseName){
                        	if(data.result[i].courseName.length > 10){
                        		str1 += '<li title="'+data.result[i].courseName+'">'+data.result[i].courseName.substring(0, 10)+'...</li>'; 
                        	}else{
                        		str1 += '<li>'+data.result[i].courseName+'</li>';
                        	}    
                        }   
                    }
                }
                
                //$(".myCourseList").html('<li class="all">全部</li><li class="on">在线课堂
               // $(".myCourseList").html('<li class="on">在线课堂</li><li class="off">非在线课程</li><p class="courseNameTitle">课程名称</p>'+str1+'<div class="iconList"></div>');
                $(".myCourseList").html('<p class="courseNameTitle">课程名称</p>'+str1+'<div class="iconList"></div>');
        	}else{
        		console.log("server error");
        	}
        }
    })
}

function forwardCourseDetail(obj)
{
	var value=obj.id.split("_")[0];
	//console.log("进入方法"+value);
	location.href= getRootPath()+"/course/detail/"+value;
	
}
function checkCourseNameLength(courseName){
	if(courseName.length > 10){
		courseName = courseName.substring(0, 10) + "...";
	}
	return courseName;
}





















