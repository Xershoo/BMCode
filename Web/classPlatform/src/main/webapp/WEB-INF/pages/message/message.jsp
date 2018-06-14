<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<html>
<head>
<title>我的消息</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/images/favicon.png" type="image/x-icon" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/css/message/message.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/head.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/index/footer.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery.myPagination.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/message/message.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/index/head.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/page.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/tinyDialog.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/dialog.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/css/common/base.css">
</head>
<body>
<%@ include file="/taglibs/common/head.jsp"%>
<div class="message_all">
	<div class="navigation">
	<li class="myMessage" style="height:45px;"><div class="my_message_img"><img id="u7_img" class="img " src="<%=request.getContextPath()%>/images/c1-2index/u135.png"></div><span class="my_message">我的消息</span></li>
	<c:if test="${user.roleName != 'school' }">
	<li class="navigation_message" id="cm" onclick="tocouresemessage()" onmouseenter="enter(1)" id="l1" onmouseleave="leave(1)">课程消息</li>
	</c:if>
<!-- 	<li class="navigation_message"  id="cr" onclick="changeType(2)" onmouseenter="enter(2)" id="l1" onmouseleave="leave(2)">课程评价</li> -->
	<li class="navigation_message" id="pm" onclick="toprivatemessage()" onmouseenter="enter(3)" id="l1" onmouseleave="leave(3)"> 私信</li>
	<li class="navigation_message" id="sm" onclick="tosystemmessage()" onmouseenter="enter(4)" id="l1" onmouseleave="leave(4)">系统消息</li>
	</div>
	<input type="hidden" value="1" id="messageFlag">
	<input type="hidden" value="${type}" id="messageType">
	<input type="hidden" value="${uid}" id="receiverUid">
	<div class="message">
<!-- 	课程消息 -->
	<div class="courseMessage" style="display:none">
				<div class="message1">
					<div class="kcxx">课程消息</div>
					<c:if test="${user.roleName != 'student' && user.roleName != 'school'}">
						<div class="cmu262">
							<img tabindex="0" id="u227_img" class="img "
								src="<%=request.getContextPath()%>/images/u262.png">
						</div>
						<span class="newCourseMessage" onclick="newCourse()">新建课程消息</span>
					</c:if>
				</div>
				<!-- 	<div class="checkbox"><div class="checkbox1"><input type="checkbox" name="courseMessage">全部</div><div class="delete">删除</div><div class="mark">标记为已读</div></div> -->
<!-- 	<div class="xiahuxian"></div> -->
	<div id="courseMessageList">
<!-- 	<div class="courseMessage_list"> -->
<!-- 	<div class="courseMessage_list1"> -->
<%-- 	<div class="icon"><li class="icon1"><input type="checkbox" name="courseMessage"></li><li class="icon2"><img tabindex="0" id="u145_img" class="img " src="<%=request.getContextPath()%>/images/u145.png"></li></div> --%>
<!-- 	<div class="detail"><li class="detail1"><span class="d1">《课程名称》</span> <span class="d2">老师姓名</span> <span class="d3">老师</span></li><li class="detail2" ><span onclick="queryCourseMessage()">课程消息的标题</span></li></div> -->
<!-- 	<div class="time">消息发送时间</div> -->
<%-- 	<div class="delete_icon"><div class="delete_icon1"><img tabindex="0" id="u143_img" class="img " src="<%=request.getContextPath()%>/images/u47.png"></div></div> --%>
<!-- 	</div> -->
<!-- 	<div class="xiahuxian"></div> -->
<!-- 	</div> -->
	</div>
	
	</div>
<!-- 	课程消息  详情-->
<div class="courseMessage_detail" style="display:none" id="courseMessage_detail">
	<div class="message1"><img id="u7_img" class="img " src="<%=request.getContextPath()%>/images/c1-2index/u135.png"><span id="cd_name">《中国古典音乐鉴赏》课程</span><div class="back_courseMessage"><div class="u307_img"><img tabindex="0" id="u307_img" class="img " src="<%=request.getContextPath()%>/images/u307.png"></div ><div class="back_m"><span onclick="changeType(1)">返回消息列表</span></div></div></div>
	<div class="cd1">
	<div class="cd1_icon"><div class="u148_img"><img tabindex="0" id="cd_u148_img" class="imgu" src="<%=request.getContextPath()%>/images/u145.png"></div></div>
	<div class="cd1_teacher"><li class="cd1_teacher1" id="cd_teacher">江美琪老师</li><li class="cd1_teacher2" id="cd_time">发起于2015-02-03 15:00:26</li></div>
	</div>
	<div class="title">标题：<span id="cd_title">今天的中国古典音乐课改为下午第三节课，请各位同学不要迟到！（根据老师输入的内容而定）</span></div>
	<div class="title">内容：</div>
	<div class="content" id="cd_content">rt，请各位同学知晓，若有学生没有上网的，则希望其他同学能口传下！老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些~

       其他的课上再讲吧~

       各位同学，周末愉快！

（根据老师输入的内容而定）
</div>
	</div>
<!-- 	发送消息-->
<div class="sendMessage" style="display:none">
<div class="message1"><span id="cd_name">写新消息</span><div class="back_courseMessage"><div class="u307_img"><img tabindex="0" id="u307_img" class="img " src="<%=request.getContextPath()%>/images/u307.png"></div ><div class="back_m"><span onclick="back()">返回消息列表</span></div></div></div>
<div class="sendMessage_people1"></div>

<div class="sendMessage_people">发送给：<input type="text" placeholder="请输入课程名称和课程id" id="coureseId"><span id="cname" class="yanzheng"></span><input type="hidden" value="" id="courseIdHidden"></div>
<div style="display: none;" class="m_receiverInfo">
<!-- <p style="cursor:pointer;height:15px;line-height:15px;" classid="10219">测试非在线课程</p> -->
<!-- <p style="cursor:pointer;height:15px;line-height:15px;" classid="10197">测试上课提醒</p> -->
<!-- <p style="cursor:pointer;height:15px;line-height:15px;" classid="10143">2332</p> -->
</div>

<div class="sendMessage_title">标&nbsp;&nbsp;&nbsp;题：<input type="text" placeholder="标题" id="message_title"><span id="ctitle" class="yanzheng"></span></div>
<div class="sendMessage_content">内&nbsp;&nbsp;&nbsp;容：<input type="text" placeholder="内容" id="message_content"><span id="ccontent" class="yanzheng"></span></div>
<div class="sendMessage_caozuo"><div class="cancel" onclick="back()">撤销</div><div class="send" onclick="send()">发送</div></div>



</div>






	
<!-- 	课程评价 -->	
	<div class="courseRemark" style="display:none">
	<div class="message1">课程评价</div>
	<div class="checkbox"><div class="checkbox1"><input type="checkbox" name="courseMessage">全部</div><div class="delete">删除</div><div class="mark">标记为已读</div></div>
	
	<div class="remark_list">
	<div class="rd1">
	<div class="icon"><li class="icon1"><input type="checkbox" name="courseMessage"></li><li class="icon2"><img tabindex="0" id="u145_img" class="imgu" src="<%=request.getContextPath()%>/images/u145.png"></li></div>
	<div class="remark_detail">
	<div class="remark_detail1">学生昵称</div>
	<div class="remark_detail2">评论<span >《课程名称》</span><div class="u144_img"><img tabindex="0" id="u144_img" class="img " src="<%=request.getContextPath()%>/images/u47.png"></div></div>
	<div class="remark_detail3">这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容，这是学生评价的内容…
</div>
	<div class="remark_detail4">
2015-10-21 20:24:43<div class="review_reply">回复</div><div class="review_detail">查看详情</div>
</div>
	</div>
	</div>
	<div class="rd2"></div>
	</div>
	</div>
	
<!-- 	私信 -->	
	<div class="privateMessage" style="display:none" id="privateMessage">
	<div class="message1">私信</div>
	<div class="pm">已收：</div>
<!-- 	<div class="checkbox"><div class="checkbox1"><input type="checkbox" name="courseMessage">全部</div><div class="delete">删除</div><div class="mark">标记为已读</div></div> -->
<!-- 	<div class="xiahuxian"></div> -->
	<div id="privateMessageList">
	
<!-- 	<div class="courseMessage_list"> -->
<!-- 	<div class="icon"><li class="icon1"><input type="checkbox" name="courseMessage"></li><li class="icon2"><img tabindex="0" id="u145_img" class="img " src="images/u145.png"></li></div> -->
<!-- 	<div class="detail"><li class="detail1"><span class="d1">用户昵称/姓名</span> </li><li class="detail2" onclick="privateMessage()">小明，你今天学的怎么样啊，有听不懂的地方吗？</li></div> -->
<!-- 	<div class="time">消息发送时间</div> -->
<!-- 	<div class="delete_icon"><div class="delete_icon1"><img tabindex="0" id="u143_img" class="img " src="images/u47.png"></div></div> -->
<!-- 	</div> -->
	</div>
	
	</div>

<!-- 	私信  详情-->	
<div class="courseMessage_detail" style="display:none" id="private_detail">
	<div class="message1"><img id="u7_img" class="img " src="<%=request.getContextPath()%>/images/c1-2index/u135.png">与 <span class="user_name" id="puname">用户姓名、昵称</span> 对话<div class="back_courseMessage"><div class="u307_img"><img tabindex="0" id="u307_img" class="img " src="<%=request.getContextPath()%>/images/u307.png"></div ><div class="back_m"><span onclick="changeType(3)">返回消息列表</span></div></div></div>
	<div class="cd1">
	<div class="cd1_icon"><div class="u148_img"><img tabindex="0" id="cmd_u148_img" class="imgu" src="<%=request.getContextPath()%>/images/u145.png"></div></div>
	<div class="cd1_teacher"><li class="cd1_teacher1" id="cmdTeacher">江美琪老师</li><li class="cd1_teacher2" id="pdetail">发起于<span id="cmdTime">2015-02-03 15:00:26</span></li></div>
	</div>
	<div class="content"  id="cmdContent">rt，请各位同学知晓，若有学生没有上网的，则希望其他同学能口传下！老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些~

       其他的课上再讲吧~

       各位同学，周末愉快！

（根据老师输入的内容而定）
</div>
<input type="hidden" value="" id="privateMessageId"/>
<input type="hidden" value="" id="privateMessageSenderId"/>
<input type="hidden" value="" id="privateMessagetitle"/>
	<div class="replay"><div class="replay1" onclick="replay()">回复</div></div>
	
	
	</div>
<!-- 回复私信 -->
<div class="courseMessage_detail" style="display:none" id="send_private_detail">
	<div class="message1"><img id="u7_img" class="img " src="<%=request.getContextPath()%>/images/c1-2index/u135.png">与 <span class="user_name" >用户姓名、昵称</span> 对话<div class="back_courseMessage"><div class="u307_img"><img tabindex="0" id="u307_img" class="img " src="<%=request.getContextPath()%>/images/u307.png"></div ><div class="back_m"><span onclick="backPrivateMessage()">返回消息列表</span></div></div></div>
<!-- 	<div class="cd1"> -->
<!-- 	<input -->
<!-- 	</div> -->
	<textarea class="content_textarea"  id="send_private_cmdContent" value="">rt，请各位同学知晓，若有学生没有上网的，则希望其他同学能口传下！老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些~

       其他的课上再讲吧~

       各位同学，周末愉快！

（根据老师输入的内容而定）
</textarea>
<input type="hidden" value="" id="privateMessageId"/>
<input type="hidden" value="" id="privateMessageSenderId"/>
	<div class="replay"><div class="replay1" onclick="sendPrivteMessage()">回复</div></div>
	
	
	</div>
	
<!-- 发送私信 -->
<div class="courseMessage_detail" style="display:none" id="send_private_message">
	<div class="message1"><img id="u7_img" class="img " src="<%=request.getContextPath()%>/images/c1-2index/u135.png">与 <span class="user_name" >${realname}、${nickname}</span> 对话<div class="back_courseMessage">
	</div></div>
	<input type="text" id="privatemessagecontent" value="标题">
	<span id="privatemessagecontent_tip"></span>
	<textarea class="content_textarea"  id="send_private_Content" value="">
</textarea>
<span id="send_private_Content_tip"></span>
	<div class="replay"><div class="replay1" onclick="sendPrivteMessagesend()">发送</div></div>
	
	
	</div>

<!-- 系统消息 -->	
	<div class="systemMessage" id="systemMessage" style="display:none">
	<div class="message1">系统消息</div>
<!-- 	<div class="checkbox"><div class="checkbox1"><input type="checkbox" name="courseMessage">全部</div><div class="delete">删除</div><div class="mark">标记为已读</div></div> -->
<!-- 	<div class="xiahuxian"></div> -->
	<div id="systemMessageList">
<!-- 	<div class="courseMessage_list"> -->
<!-- 	<div class="icon"><li class="icon1"><input type="checkbox" name="courseMessage"></li><li class="icon2"><img tabindex="0" id="u145_img" class="img " src="images/u145.png"></li></div> -->
<!-- 	<div class="detail"><li class="detail1"><span class="d1">系统消息</span> </li><li class="detail2" onclick="systemMessage()">购课消费通知</li></div> -->
<!-- 	<div class="time">消息发送时间</div> -->
<!-- 	<div class="delete_icon"><div class="delete_icon1"><img tabindex="0" id="u143_img" class="img " src="images/u47.png"></div></div> -->
<!-- 	</div> -->
	</div>
	
	</div>
	
<!-- 系统消息  详情-->	
<div class="courseMessage_detail" id="system_detail" style="display:none">
	<div class="message1"><img id="u7_img" class="img " src="<%=request.getContextPath()%>/images/c1-2index/u135.png">系统消息<div class="back_courseMessage"><div class="u307_img"><img tabindex="0" id="u307_img" class="img " src="<%=request.getContextPath()%>/images/u307.png"></div ><div class="back_m"><span onclick="changeType(4)">返回消息列表</span></div></div></div>
	<div class="cd1">
	<div class="cd1_icon"><div class="u148_img"><img tabindex="0" id="smd_u148_img" class="imgu" src="<%=request.getContextPath()%>/images/u145.png"></div></div>
	<div class="cd1_teacher"><li class="cd1_teacher1">系统消息</li><li class="cd1_teacher2" id="smd_time">发起于2015-02-03 15:00:26</li></div>
	</div>
	<div class="title">标题：<span id="smd_title">今天的中国古典音乐课改为下午第三节课，请各位同学不要迟到！（根据老师输入的内容而定）</span></div>
	<div class="title">内容：</div>
	<div class="content" id="smd_content">rt，请各位同学知晓，若有学生没有上网的，则希望其他同学能口传下！老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些老师要讲的就这些~

       其他的课上再讲吧~

       各位同学，周末愉快！

（根据老师输入的内容而定）
</div>
	</div>
	<div id="page"></div>
	</div>
	</div>
	<%@ include file="/taglibs/common/footer.jsp"%>
	<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/tinyDialog.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/creatDialog.js"></script>
</body>
</html>