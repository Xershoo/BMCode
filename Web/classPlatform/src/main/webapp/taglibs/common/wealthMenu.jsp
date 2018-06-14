<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
	<div id="pay_left_menu">
		<div id="my_wealth_title">
			<div id="my_wealth_logo"><img id="wealth_img" src="<%=request.getContextPath()%>/images/teacher/wealth.png"></div>
			<div id="my_wealth_word">我的财富</div>
		</div>
		<c:if test="${param.module == 'my_account'}">
			<div class="menu_info common_link">
				<div class="menu_info_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/myAccount'">我的账户</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'my_account'}">
			<div class="menu_info">
				<div class="menu_info_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/myAccount'">我的账户</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'show_trade'}">
			<div class="menu_info common_link">
				<div class="menu_info_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/order/toShowTradeRecord'">交易记录</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'show_trade'}">
			<div class="menu_info">
				<div class="menu_info_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/order/toShowTradeRecord'">交易记录</a></div>
			</div>
		</c:if>
		<c:if test="${param.module == 'pay_set'}">
			<div class="menu_info common_link">
				<div class="menu_info_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/toSetPaySafety'">支付安全设置</a></div>
			</div>
		</c:if>
		<c:if test="${param.module != 'pay_set'}">
			<div class="menu_info">
				<div class="menu_info_word"><a href="javascript:void(0);" onclick="location.href='<%=request.getContextPath()%>/persondata/toSetPaySafety'">支付安全设置</a></div>
			</div>
		</c:if>
	</div>
