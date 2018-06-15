<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div>
    <div class="topMenu">
        <ul>
            <li id="tclick"><font>我的订购</font></li>
            <li><font>我的创建</font></li>
        </ul>
    </div>

    <%--订单内容--%>
    <div id="order_content">
        <div class="midMenu">
            <ul>
                <li>
                    <div class="xiaxian" onclick="tabChange(this)" id="all_course">全部课程</div>
                </li>
                <li>
                    <div onclick="tabChange(this)" id="new_course">最新课程</div>
                </li>
                <li>
                    <div onclick="tabChange(this)" id="finish_course">已完成课程</div>
                </li>
                <li>
                    <div onclick="tabChange(this)" id="cancel_course">已经取消课程</div>
                </li>
            </ul>
        </div>

        <script>

            //全部课程
            $(document).ready(function () {

                $.getJSON("<%=path%>/student/course/list?page=1&start=1&on=true&rows=10", function (data, status) {


                    if (status === "success" && data.success && data.result.list.length > 0) {
                        alert("data.list:" + data.result.list.length + ",status:" + status);

                    }else {
                        //TODO：数据家在失败或者没有数据
                    }


                });
            });

            function queryCourseList(type) {


            }


            var lastTab = $(".xiaxian");
            function tabChange(obj) {
                if (lastTab.is($(obj))){
                    return;
                }
                $(obj).addClass("xiaxian");
                lastTab.removeClass("xiaxian");
                lastTab = $(obj);
                //查询条件
                var condition = "";
                switch ($(obj).id){
                    case "all_course":
                        break;
                    case "new_course":
                        break;
                    case "finish_course":
                        break;
                    case "cancel_course":
                        break;
                }

                //TODO: 根据条件查询数据

            }
        </script>

        <div class="thOrder">
            <font class="thOrder1">订单信息</font>
            <font class="thOrder2">状态</font>
            <font class="thOrder3">操作</font>
        </div>

        <!--一条订单 -->
        <div class="OrderMsg">
            <div class="zhanwei25"></div>
            <div class="OrderMsgIn">
                <div class="OrderMsgIn1">
                    <!--图片-->
                    <img src=""/>
                </div>
                <div class="OrderMsgIn2">
                    <div class="Otitle"><font>ABC 5.30</font></div>
                    <div class="Oschedule"><font>课程进度：&nbsp;&nbsp;0/1</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font>报名学生：&nbsp;&nbsp;0/100</font>
                    </div>
                    <div class="Oschedule"><font>课程时间：2018-05-30 10：10</font></div>
                    <div class="Oprice"><font>免费</font></div>
                </div>
                <div class="OrderMsgIn3">
                    <div class="Ostate"><font>报名中</font></div>
                </div>
                <div class="OrderMsgIn4">
                    <div class="Ooperate"><font>查看详情</font></div>
                </div>
            </div>
        </div>

        <div class="noOrder" style="display: none"><font>用户无相关订单！！！</font></div>
        <div class="zhanwei400"></div>
    </div>


    <%--我创建的--%>
    <div>


    </div>



</div>
