<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>支付安全设置</title>
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/pay/payStudentOrder.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/pay/payStudentOrder.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>

</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div class="pay_content">
<!--  
<div class="pay_order">支付订单</div>
-->

<div class="content" id="pay_content" >
<div class="order_detail">
<div class="order_detail_title2"></div>
<div class="order_detail_title"><img id="duihao_img" class="img " src="<%=request.getContextPath()%>/images/manageCourse/duihao_03.png">订单详情<span >（再仔细核对下购买的信息吧~）</span></div>
<div class="order_detail_title1"></div>
<div class="order_detail_content">
<li class='order_detail_li'>订单号：<span class="order_detail_li_span1" id="orderId">${orderId}</span>         <span class="order_detail_li_span"><img id="u144_img" class="img " src="<%=request.getContextPath()%>/images/manageCourse/gantanhao_03.png" style="position:absolute;margin-left:-20px;"><span>30</span>分钟内未付款的订单会自动取消</span></li>
<li class='order_detail_li1'>支付金额：<span class="odl">￥</span><span class="odl1">${price}</span></li>
<c:if test="${schoolName != ''&&schoolName != 'undefined'}">
<li class='order_detail_li2'>课程的名称:${courseName}<br>${teacherName} | ${schoolName}</li>
</c:if>
<c:if test="${schoolName ==''||schoolName == 'undefined'}">
<li class='order_detail_li2'>课程的名称:${courseName}<br>${teacherName}</li>
</c:if>
</div>
</div>
<div class="order_detail_title2"></div>
<div class='pay_method'><img id="duihao_img1" class="img " src="<%=request.getContextPath()%>/images/manageCourse/duihao_03.png">支付方式<span>（安全支付，放心使用!）</span></div>
<div class="order_detail_title1"></div>
<div class='pay'>
<div class='pay_div1'><div class="pay_div1_div1" onclick="accountPay()">账户余额</div>  <div class="pay_div1_div2" onclick="weixin()"> 微信钱包</div>  <div class="pay_div1_div3" onclick="zhifubao()">支付宝</div>
<!--  <div class="pay_div1_div4">银行卡</div>  -->
 </div>
<div id="pay_account">
<div class='pay_div2' >账户余额：￥<span id="dangqianyue">0.00</span> <img id="u167_img" class="img " src="<%=request.getContextPath()%>/images/u167.png"> <span id="red" style="display:none;">还没有设置支付密码，请先设置支付密码！</span> </div>
<div class='pay_div3'> <div class='pay_div31'>支付密码：<input id="password" type="password"></input> </div><div class="confirm_pay" onclick="confirmPay()"></div></div>
<div class='pay_div4'>  <span>忘记支付密码？</span></div>
<!-- <div class='pay_div5'> <div class="confirm_pay" onclick="confirmPay()">确认支付</div></div> -->
</div>
<div id="pay_zhifubao" style="display:none">
<div class='pay_div5'> <div class="confirm_pay" onclick="confirmPayZhifubao()"></div></div>
</div>
<div id="pay_weixin" style="display:none">
<div class='pay_div5'> <div class="confirm_pay" onclick="confirmPayweixin()"></div></div>
</div>
</div>
</div>

<div class="statement">
免责声明<br>
1、请事先熟悉哆来音乐网 听课流程，建议直播前十分钟进入课堂，等待课程直播。<br>
2、建议优选网络，部分小运营商或者校园网络不稳定，会造成直播卡顿，无法进入直播等情况。<br>
3、使用电脑观看直播效果最为流畅，建议及时更新最新版哆来音乐客户端。<br>
4、课堂纪律及禁止事项：报班学员请严格准守课堂秩序，保证老师正常直播授课，如对老师直播授课，学生听课造成影响，哆来音乐网有权禁止发言或取消听课资格，不予退费。<br>
5、版权申明： 哆来音乐网直播课程视频仅供注册学员学习使用，未经哆来音乐网许可以拷贝、录屏、反向工程、技术下载等手段获取直播课程视频的行为构成侵权，哆来音乐网立即封号处理，并保留追究注册学员法律责任，包括但不限于刑事责任、民事责任以及行政责任。<br>
6、哆来音乐网课程均为直播课程，请合理安排时间学习，本课程一经购买，不予退换。
</div>
<input type="hidden" id='confirm_password' value='0'/>
<div class="content" id="success_content" style="display: none">
恭喜支付成功
</div>
</div>
<%@ include file="/taglibs/common/footer.jsp"%>
</body>
</html>