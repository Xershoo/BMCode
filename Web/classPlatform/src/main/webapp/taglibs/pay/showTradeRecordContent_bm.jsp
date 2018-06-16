<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div id="show_main">
	<!-- 左侧菜单 -->
	<jsp:include page="/taglibs/common/wealthMenu_bm.jsp">
		<jsp:param value="show_trade" name="module"/>
	</jsp:include>
	<!-- over -->
	
	<!-- 右侧交易记录列表展示 -->
	<div id="right_data_show">
		<%--<div id="right_data_title">--%>
			<%--<div id="right_title_word">交易记录</div>--%>
			<%--<div id="right_title_desc">财富中心，方便管理你的小金库~</div>--%>
		<%--</div>--%>
			<div class="pn_menu">
				<div class="m_r_content">
					<div class="pn_fashion" id="basic_info" onclick="location.href='<%=request.getContextPath()%>/persondata/myAccount'">我的账户</div>
					<div style="color: #42b8f6; font-weight: 700;border-bottom: 3px solid #42b8f6;"  class="pn_fashion" id="account_info" onclick="location.href='<%=request.getContextPath()%>/order/toShowTradeRecord'">交易记录</div>
					<div class="pn_fashion" id="personalPortrait" onclick="location.href='<%=request.getContextPath()%>/persondata/toSetPaySafety'">支付安全</div>
					<div class="pn_fashion" onClick="location.href='<%=request.getContextPath()%>/order/studentOrder'" >我的订单</div>
				</div>
			</div>
		<div id="trade_menu">
			<div id="menuAll" class="menu_common">所有记录</div>
			<div class="line"><img src="../images/wealth/trade_line.png"></div>
			<div id="menu1" class="menu_common">收支记录</div>
			<div class="line"><img src="../images/wealth/trade_line.png"></div>
			<div id="menu2" class="menu_common">充值记录</div>
			<div class="line"><img src="../images/wealth/trade_line.png"></div>
			<div id="menu3" class="menu_common">提现记录</div>
		</div>	
		<!-- 交易记录数据 -->
		<div id="trade_data_list">
			<div id="search_condition_div">
				<div class="search_condition">
					<div class="condition_desc">交易日期:</div>
					<div id="trade_date">
						<input type="text" id="trade_start_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'trade_end_time\')}'})">&nbsp;至
						<input type="text" id="trade_end_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'trade_start_time\')}'})">
					</div>
					<div id="search_trade_btn">查询</div>
					<!-- <div id="select_date_range">
						<select id="date_range" class="sel_date_range">
							<option value="today">今天</option>
							<option value="week">最近1周</option>
							<option value="month">最近1个月</option>
							<option value="months">最近3个月</option>
							<option value="years">最近1年</option>
						</select>
					</div> -->
				</div>
				<div class="search_condition">
					<div class="condition_desc">交易分类:</div>
					<div class="condition_radio">
						<div class="select_bg"></div><div class="select_word" value="all">全部</div>
						<div class="select_bg"></div><div class="select_word" value="income">收入</div>
						<div class="select_bg"></div><div class="select_word" value="defray">支出</div>
						<div class="select_bg"></div><div class="select_word" value="recharge">充值</div>
						<div class="select_bg"></div><div class="select_word" value="deposit">提现</div>
					</div>
				</div>
				<div class="search_condition">
					<div class="condition_desc">交易状态:</div>
					<div class="condition_radio">
						<div class="select_bg"></div><div class="select_word" value="all">全部</div>
						<div class="select_bg"></div><div class="select_word" value="paying">进行中</div>
						<div class="select_bg"></div><div class="select_word" value="refund">退款</div>
						<div class="select_bg"></div><div class="select_word" value="failure">失败</div>
						<div class="select_bg"></div><div class="select_word" value="success">成功</div>
					</div>
				</div>
			</div>
			<div id="trade_table" class="table_common">
			</div>
		</div>
		<!-- over -->
		
		<!-- 收支记录 -->
		<div id="budget_data_list">
			<div class="menu_search_condition">
				<div class="menu_search_word">交易日期:</div>
				<div class="menu_search_date">
					<input type="text" id="budget_start_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'budget_end_time\')}'})">&nbsp;至
					<input type="text" id="budget_end_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'budget_start_time\')}'})">
				</div>
				<div id="search_budget_btn" class="search_btn">查询</div>
				<div class="menu_search_sel">
					<select id="budget_date_range" class="sel_date_range">
						<option value="today">今天</option>
						<option value="week">最近1周</option>
						<option value="month">最近1个月</option>
						<option value="months">最近3个月</option>
						<option value="years">最近1年</option>
					</select>
				</div>
			</div>
			<div id="budget_table" class="table_common">
				<table>
					<tr height="30px;">
						<th width="150px">交易号</td>
						<th width="150px">交易时间</td>
						<th width="200px">交易内容|交易方</td>
						<th width="110px">收入</td>
						<th width="110px">支出</td>
						<th width="120px">交易状态</td>
						<th>操作</td>
					</tr>
					<tr height="120px;">
						<td>交易号：100002365</td>
						<td>2015-11-02 09:24:00</td>
						<td>购课：课程名称<br>创课老师姓名</td>
						<td style="color:#4cb164;">+¥ 10.50</td>
						<td style="color:#ff3300;">-¥ 12.00</td>
						<td>交易成功</td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
		<!-- over -->
		
		<!-- 充值记录 -->
		<div id="recharge_data_list">
			<div class="menu_search_condition">
				<div class="menu_search_word">交易日期:</div>
				<div class="menu_search_date">
					<input type="text" id="recharge_start_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'recharge_end_time\')}'})">&nbsp;至
					<input type="text" id="recharge_end_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'recharge_start_time\')}'})">
				</div>
				<div id="search_recharge_btn" class="search_btn">查询</div>
				<div class="menu_search_sel">
					<select id="recharge_date_range" class="sel_date_range">
						<option value="today">今天</option>
						<option value="week">最近1周</option>
						<option value="month">最近1个月</option>
						<option value="months">最近3个月</option>
						<option value="years">最近1年</option>
					</select>
				</div>
			</div>
			<div id="recharge_table" class="table_common">
			</div>
		</div>
		<!-- over -->
		
		<!-- 提现记录 -->
		<div id="deposit_data_list">
			<div class="menu_search_condition">
				<div class="menu_search_word">交易日期:</div>
				<div class="menu_search_date">
					<input type="text" id="deposit_start_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,maxDate:'#F{$dp.$D(\'deposit_end_time\')}'})">&nbsp;至
					<input type="text" id="deposit_end_time" class="Wdate" onFocus="WdatePicker({lang:'zh-cn',dataFmt:'yyyyMMdd',readOnly:true,minDate:'#F{$dp.$D(\'deposit_start_time\')}'})">
				</div>
				<div id="search_deposit_btn" class="search_btn">查询</div>
				<div class="menu_search_sel">
					<select id="deposit_date_range" class="sel_date_range">
						<option value="today">今天</option>
						<option value="week">最近1周</option>
						<option value="month">最近1个月</option>
						<option value="months">最近3个月</option>
						<option value="years">最近1年</option>
					</select>
				</div>
			</div>
			<div id="deposit_table" class="table_common">
				<table>
					<tr height="30px;">
						<th width="150px">交易号</td>
						<th width="150px">交易时间</td>
						<th width="180px">交易内容</td>
						<th width="120px">交易方</td>
						<th width="120px">交易金额</td>
						<th width="120px">交易状态</td>
						<th>操作</td>
					</tr>
					<tr height="120px;">
						<td>交易号：100002365</td>
						<td>2015-11-02 09:24:00</td>
						<td>提现至银行卡</td>
						<td>银行-银行卡尾号</td>
						<td>-¥ 100.00</td>
						<td>交易成功</td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
		<!-- over -->
		<div id="page"></div>
	</div>
	<!-- over -->
</div>