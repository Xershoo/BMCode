<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="p_order">
<input type="hidden" value="<%=request.getAttribute("courseId") %>" id="courseId" name="courseId">
	<div class="p_stor">提交订单</div>
	<div class="o_content" id="submitOrdCont">
		<div class="data_table_head p_bg">
			<div id="bc_info" class="head_word">基本信息</div>
			<div id="or_price" class="head_word">原价</div>
			<div id="cp_way" class="head_word">优惠方式</div>
			<div id="p_total" class="head_word">小计</div>
		</div>

	</div>

</div>

