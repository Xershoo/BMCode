//日历控件

function Calendar() {
    this.$containerDIV_ = null;             //日历容器DIV的jquery封装对象
    this.anchorDate_ = null;                //日历锚定日期
    //this.containerDIVWidth_ = null;       //日历容器DIV宽
    //this.containerDIVHeight_ = null;      //日历容器DIV高
    this.firstDateOfCalendar_ = null;       //日历第一个日期格的日期
    this.lastDateOfSelfCalendar_ = null;    //日历最后一个日期格的日期
}

/**
 * 初始化日历控件
 * @param {$Element} $containerDIV 日历容器DIV的jquery封装对象
 * @param {Date} anchorDate //日历锚定日期
 */
Calendar.prototype.init = function($containerDIV,anchorDate){
    this.$containerDIV_ = $containerDIV;
    this.anchorDate_ = anchorDate;  //记录日历锚定日期
    this.setAnchorDate(anchorDate); //绘制日历格

    //this.containerDIVWidth_ = $containerDIV.width();
    //this.containerDIVHeight_ = $containerDIV.height();
}

/**
 * 根据日历锚定日期绘制日历
 * @param {Date} anchorDate 日历锚定日期
 */
Calendar.prototype.setAnchorDate = function(anchorDate){
    this.anchorDate_ = anchorDate;  //记录日期锚定日期

    var dayLength = 24*60*60*1000;  //一天的毫秒数
    var firstDateOfSelfMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),1);  //date所在月1号日期
    //console.log(firstDateOfSelfMonth)
    //计算日历第一个方格的日期
    var firstDateOfCalendar = null;     //日历第一个格子日期
    //月初为周日时
    if(firstDateOfSelfMonth.getDay() === 0){
        firstDateOfCalendar = new Date(firstDateOfSelfMonth.valueOf() - 6 * dayLength);
    }
    //月初为非周日时
    else{
        firstDateOfCalendar = new Date(firstDateOfSelfMonth.valueOf() - (firstDateOfSelfMonth.getDay()-1) * dayLength);
    }

    //计算日历最后一个方格的日期
    var lastDateOfSelfMonth = new Date(firstDateOfSelfMonth.getFullYear(),firstDateOfSelfMonth.getMonth()+1,1-1);   //date所在月最后一天的日期
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
    this.firstDateOfCalendar_ = firstDateOfCalendar;        //记录日历第一个日期格的日期
    this.lastDateOfSelfCalendar_ = lastDateOfSelfCalendar;  //记录日历最后一个日期格的日期
    /*    console.log(this.firstDateOfCalendar_ );
     console.log(this.lastDateOfSelfCalendar_);*/

    //绘制日历表格
    var rowsCount = ((lastDateOfSelfCalendar.valueOf() - firstDateOfCalendar.valueOf() + 1 * dayLength) /dayLength) / 7;
    var tableHTMLStr = "<table cellpadding = '0' cellspacing='0'>";
    //表头
    tableHTMLStr += "<thead><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr></thead>";
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
            tableHTMLStr += "<td data-index='date_"+times+"'><span>" + time.getDate() + "</span><ul class='currentCourse'></ul></td>";
            /*************************进行增加内容*****************************/
            if(row == 0 && i==0){
                firstDateOfCalendarInfor = times;
                       
                //console.log(firstDateOfCalendarInfor);
            }else if(row == (rowsCount -1) && i==6) {
                lastDateOfSelfCalendarInfor = times;
                //console.log(lastDateOfSelfCalendarInfor);
            }
            count++;
        }
        tableHTMLStr += "</tr>";
    }
    tableHTMLStr += "</tbody></table>";

    this.$containerDIV_.empty() //清除旧日历
    this.$containerDIV_.html(tableHTMLStr); //绘制新日历
    //firstDateOfCalendarInfor = "" + time.getFullYear() +"_" + (time.getMonth()) + "_"+ time.getDate() + "";
    //lastDateOfSelfCalendarInfor = "" + time.getFullYear() +"_" + (time.getMonth()) + "_"+ time.getDate() + "";
    //getCourseInfor(firstDateOfCalendarInfor,lastDateOfSelfCalendarInfor);
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
    var zeroTime = new Date(time.getFullYear(),time.getMonth(),time.getDate()); //获得time所属当天的00:00:00时间
    var days = (zeroTime.valueOf() - this.firstDateOfCalendar_.valueOf() ) /(24*60*60*1000);    //距离日历第一格日期的天数
    var $cell = this.$containerDIV_.find('tbody td').eq(days);
    return  $cell;
}

/**
 * 根据日历方格获得对应的日期
 * @param {$Element} $cell 日历中的方格(<td>的jquery封装对象)
 * @return {Date} time 日历方格所对应的日期的00:00:00时间
 */
Calendar.prototype.getTimeByCell = function($cell){
    var days = this.$containerDIV_.find('tbody td').index($cell);   //距离日历第一格日期的天数

    var time = new Date(this.firstDateOfCalendar_.valueOf() + days * (24*60*60*1000));
    return time;
}

/**
 * 为周末日期添加周末样式
 * @param {String} className 样式名称
 */
Calendar.prototype.addWeekendClass = function (className){
    var firstDateOfCalendar = this.firstDateOfCalendar_;        //获得日历第一个日期格的日期
    var lastDateOfSelfCalendar = this.lastDateOfSelfCalendar_;  //获得日历最后一个日期格的日期
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
    var anchorDate = this.anchorDate_;                          //日历锚定日期
    var firstDateOfCalendar = this.firstDateOfCalendar_;        //获得日历第一个日期格的日期
    var lastDateOfSelfCalendar = this.lastDateOfSelfCalendar_;  //获得日历最后一个日期格的日期
    var firstDateOfSelfMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),1);  //date所在月1号日期
    var lastDateOfSelfMonth = new Date(firstDateOfSelfMonth.getFullYear(),firstDateOfSelfMonth.getMonth()+1,1-1);   //date所在月最后一天的日期
    var dayLength = 24*60*60*1000;
    var time = firstDateOfCalendar;
    var $surplusCell = null;

    for(var i=0; lastDateOfSelfCalendar.valueOf() > time.valueOf(); i++){
        time = new Date(firstDateOfCalendar.valueOf() + i * dayLength);
        //console.log(firstDateOfSelfMonth.valueOf())
        //如果为非本月日期则添加多余（非当前月）样式
        if(time.valueOf() < firstDateOfSelfMonth.valueOf() || time.valueOf() > lastDateOfSelfMonth.valueOf()){
            $surplusCell = this.getCellByTime(time);
            $surplusCell.addClass(className);

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
        firstDayOfWeek = new Date(time.getFullYear(), time.getMonth(),time.getDate() - 6);
        //console.log(firstDayOfWeek)
        //lastDayOfWeek = new Date(time.getFullYear(), time.getMonth(),time.getDate());
    }
    else{
        firstDayOfWeek = new Date(time.getFullYear(), time.getMonth(), time.getDate() - (time.getDay()-1));
        //onsole.log(firstDayOfWeek)
        //lastDayOfWeek = new Date(time.getFullYear(), time.getMonth(),time.getDate() + (7-time.getDay()));
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
    var anchorDate = this.anchorDate_;                          //获得日历原锚定日期
    weekNumber = anchorDate.getDay();

    //console.log(weekNumber)
    var weekOfNextDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+1,anchorDate.getDate());   //当前的日期
    var nextWeekAnchorDate = null;

        firstDayOfWeek = new Date(anchorDate.getFullYear(), anchorDate.getMonth(),anchorDate.getDate() + 6);
        //console.log(firstDayOfWeek)
        //lastDayOfWeek = new Date(time.getFullYear(), time.getMonth(),time.getDate() + (7-time.getDay()));
    
    //日历翻至下月，并锚定至合适的日期
    this.setAnchorDate(firstDayOfWeek);
    //console.log(firstDayOfWeek)   
}
/**
* 把日历翻到上个周
*/
Calendar.prototype.turnToPreviousWeek = function (){
    var anchorDate = this.anchorDate_;                          //获得日历原锚定日期
    var weekNumber = anchorDate.getDay();
    var weekOfNextDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+1,anchorDate.getDate());   //当前的日期
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
    var anchorDate = this.anchorDate_;                          //获得日历原锚定日期
    var lastDateOfNextMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+2,1-1);   //date所在月下个月最后一天的日期
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
    var anchorDate = this.anchorDate_;                          //获得日历原锚定日期
    var lastDateOfPreviousMonth = new Date(anchorDate.getFullYear(),anchorDate.getMonth(),1-1); //date所在月上个月最后一天的日期
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
    var anchorDate = this.anchorDate_;                          //获得日历原锚定日期
    var dateOfNextDate = new Date(anchorDate.getFullYear(),anchorDate.getMonth()+1,anchorDate.getDate());   //当前的日期
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




function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
   var localhostPaht=curWwwPath.substring(0,pos);
  //  var localhostPaht="http://10.5.33.64:8080";
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
















