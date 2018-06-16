<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form action="<%=request.getContextPath()%>/teacher/authtoteacher" method="post" id="form"
	enctype="multipart/form-data" name="form"
	onSubmit="return checkForm();">
	<div class="t_all">
		<jsp:include page="/taglibs/common/teacherMenu.jsp">
		<jsp:param value="teacher_auth" name="module"/>
	</jsp:include>

		<div class="t_main" id="t_main">
			<div class="r_v_line add_line">
				<img alt="" src="<%=request.getContextPath()%>/images/piano_certificate/id_teach.gif" class="c_tips">老师认证
			</div>
			<div class="th_content">
				<div class="r_v_photo">
					<img src="<%=request.getContextPath()%>/images/piano_certificate/unpass_id.png" class="th_back" id="idVerify">
				</div>
				<div class="r_v_idfy piano_idfy">
					<p class="r_v_undefy">
						身份证认证（<span class="th_iden">未认证</span>）
					</p>
					<p class="r_v_info"><img alt="" src="<%=request.getContextPath()%>/images/piano_certificate/warn.gif" class="c_tips">提示：只有通过实名认证方可发布课程哦！</p>
				</div>
				<div class="r_v_idfy th_btn">
					<input type="button" id="identify" value="去认证" class="r_v_btn">
					<input type="button" id="alIdentify" value="已认证"
						class="r_v_btn al_btn" style="display: none" disabled>
				</div>
			</div>
			
			<!-- piano other identification -->
			<div class="pn_other_idfy">
				<div class="pn_tips"><img alt="" src="<%=request.getContextPath()%>/images/piano_certificate/warn.gif" class="c_tips">提示：您还可以补充一下认证，大大增加您的教学权威和知名度哦！</div>	
				<div class="pn_other_info">
					<div class="pn_high">
						<img src="<%=request.getContextPath()%>/images/piano_certificate/unpass_edu.png" id="eduVerify">
						<div class="pn_high_info">最高学历认证</div>
						<div class="pn_high_info pass_high">（认证通过）</div>
						<div class="pn_idfy">
							<input type="button" id="identifyEdu" value="去认证" class="r_v_btn">
							<input type="button" id="alIdentifyEdu" value="已认证"
								class="r_v_btn al_btn" style="display: none" disabled>
						</div>
					</div>
					
					<div class="pn_high">
						<img src="<%=request.getContextPath()%>/images/piano_certificate/unpass_tech.png" id="techVerify">
						<div class="pn_high_info">教师证认证</div>
						<div class="pn_high_info pass_high">（认证通过）</div>
						<div class="pn_idfy">
							<input type="button" id="identifyTech" value="去认证" class="r_v_btn">
							<input type="button" id="alIdentifyTech" value="已认证"
								class="r_v_btn al_btn" style="display: none" disabled>
						</div>
					</div>
				</div>		
			</div>
		</div>

		<div class="idenfy_dtl" id="idenfyDtl" style="display: none;">
			<div class="r_v_line add_line">
				<img alt="" src="<%=request.getContextPath()%>/images/piano_certificate/id_teach.gif" class="c_tips">老师认证
			</div>
			<div>
				<p class="r_v_ti add_p">
					<img src="<%=request.getContextPath()%>/images/account/tips.png" class="tp_img">身份认证 <font
						color="red"> ( * 必须认证)</font>
				</p>
				<div class="r_v_warn add_p">
					身份认证将会增强学生对你的信任度，另外认证过程中填写的身份证号与等材料信息，只用于认证身份，不会用于其他地方！</div>

				<div class="r_w_card" id="idenfyCard">

					<table class="r_w_photo">
						<tr>
							<th><font color="red" class="th_must">*</font>真实姓名：</th>
							<td class="r_v_tb"><input type="text" class="r_v_input"
								id="realName" name="realName" maxlength="20"><span
								class="info"></span></td>
						</tr>
						<tr>
							<th><font color="red" class="th_must">*</font>身份证号码：</th>
							<td class="r_v_tb"><input type="text" class="r_v_input"
								id="idCardNum" name="idCardNum" maxlength="18"><span
								class="info"></span></td>
						</tr>
						<tr>
							<th><font color="red" class="th_must">*</font>手持身份证：</th>
							<td class="special_pt"><img alt="" src="<%=request.getContextPath()%>/images/certificate/file_up.png" id="img1" width="190px" height="150px"> 
								<a href="javascript:;" class="th_file_up">上传图片 
									<input type="file" id="chooseFile1" name="myFiles" accept="image/*">
								</a> 
								<img alt="" src="<%=request.getContextPath()%>/images/certificate/hand_take.png" class="r_v_imgsp">
							</td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td class="r_v_text1">支持 jpg、jpeg、png格式的图片</td>
							<td class="r_v_text2">
								<p>
									<font color="#d8271c">注意：</font>
								</p>
								<p>1、手持身份证正面，五官可见；</p>
								<p>2、证件信息清晰无模糊，且不能有遮挡；</p>
								<p>3、照片不要有任何的修改和处理！</p>
							</td>
						</tr>
						<tr>
							<th><font color="red" class="th_must">*</font>身份证正面：</th>
							<td class="special_pt"><img alt="" src="<%=request.getContextPath()%>/images/certificate/file_up.png" id="img1" width="190px" height="150px"> 
								<a href="javascript:;" class="th_file_up">上传图片 
									<input type="file" id="chooseFile2" name="myFiles" accept="image/*">
								</a> 
								<img alt="" src="<%=request.getContextPath()%>/images/certificate/front.png" class="r_v_imgsp">
							</td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td class="r_v_text1">支持 jpg、jpeg、png格式的图片</td>
							<td class="r_v_text2">
								<p>
									<font color="#d8271c">注意：</font>
								</p>
								<p>1、证件信息清晰无模糊，且不能有遮挡；</p>
								<p>2、照片不要有任何的修改和处理！</p>
							</td>
						</tr>
						<tr>
							<th><font color="red" class="th_must">*</font>身份证反面：</th>
							<td class="special_pt"><img alt="" src="<%=request.getContextPath()%>/images/certificate/file_up.png" id="img1" width="190px" height="150px"> 
								<a href="javascript:;" class="th_file_up">上传图片 
									<input type="file" id="chooseFile3" name="myFiles" accept="image/*">
								</a> 
								<img alt="" src="<%=request.getContextPath()%>/images/certificate/back.png" class="r_v_imgsp">
							</td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td class="r_v_text1">支持 jpg、jpeg、png格式的图片</td>
							<td class="r_v_text2">
								<p>
									<font color="#d8271c">注意：</font>
								</p>
								<p>1、证件信息清晰无模糊，且不能有遮挡；</p>
								<p>2、照片不要有任何的修改和处理！</p>
							</td>
						</tr>
						<tr>
							<td colspan="3"><input type="submit" id="submitIdCard"
								class="r_s_card" value="提  交"> <input type="button"
								id="cancelIdCard" class="r_c_card" value="取  消"
								onClick="javascript:history.go(-1);"></td>
						</tr>
					</table>
				</div>

			</div>
		</div>

		<!-- 学历证书  		 -->
		<div class="idenfy_edu" id="idenfyEdu" style="display: none;">
			
			<div class="r_v_line add_line">
				<img alt="" src="<%=request.getContextPath()%>/images/piano_certificate/id_teach.gif" class="c_tips">老师认证
			</div>
			<div>
				<p class="r_v_ti add_p">
					<img src="<%=request.getContextPath()%>/images/account/tips.png" class="tp_img">学历学位认证
				</p>
				<div class="r_v_warn add_p">
					学历认证将会提高学生对你的信任度，另外认证过程中填写材料信息，只用于认证专业能力，不会用于其他地方！</div>

				<div class="r_w_card" id="idenfyCard">
					<table class="r_w_edu">
						<tr>
							<th>最高学历：</th>
							<td class="r_v_tb" colspan="2"><select name="education"
								id="education" class="r_v_input">
									<option value="0">请选择</option>
									<option value="1">小学</option>
									<option value="2">初中</option>
									<option value="3">中等专业学校(中专)</option>
									<option value="4">技工学校(中技)</option>
									<option value="5">职业高中(职高)</option>
									<option value="6">普通高级中学</option>
									<option value="7">大学专科</option>
									<option value="8">大学本科</option>
									<option value="9">硕士研究生</option>
									<option value="10">博士研究生</option>
							</select><span class="info"></span></td>
						</tr>
						<tr>
							<th>最高学历证书：</th>
							<td class="special_pt add_pt">
								<div class="r_v_eduFile">
									<img alt="" src="<%=request.getContextPath()%>/images/certificate/file_up.png" id="highEdu"
										width="235px" height="150px"> <a href="javascript:;"
										class="file_up">上传图片 <input type="file" id="authEdu"
										name="eduFiles" accept="image/*">
									</a>
								</div> <span class="info"></span><img src="" id="front"
								style="display: none;">
							</td>
							<td class="p_content" width="400px" height="200px">
								<p class="r_v_p1">请提供您的最高学历证书：</p>
								<p class="r_v_p1">如大学本科毕业证书、硕士研究生毕业证书、博士</p>
								<p class="r_v_p1">研究生毕业证书或相关学历的结业证书等。</p>
								<div class="warn_tip">
									<p class="r_v_p2">
										<font color="#d8271c">注意：</font>
									</p>
									<p class="r_v_p2">1、证件信息清晰无模糊，且不能有遮挡；</p>
									<p class="r_v_p2">2、照片不要有任何的修改和处理！</p>
								</div>
							</td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td class="r_v_text1" colspan="2">支持 jpg、jpeg、png格式的图片</td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td colspan="3">
								<input type="submit" id="submitEduCard" class="r_s_edu" value="提  交" onClick="submitEduCer(1);">
								<input type="button" id="cancelEduCard" class="r_c_edu" value="取  消" onClick="javascript:history.go(-1);">
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- 学历证书		 -->
		<!-- 教师认证		 -->
		<div class="idenfy_edu" id="idenfyTech" style="display: none;">
			<div class="r_v_line add_line">
				<img alt="" src="<%=request.getContextPath()%>/images/piano_certificate/id_teach.gif" class="c_tips">老师认证
			</div>
			<div>
				<p class="r_v_ti add_p">
					<img src="<%=request.getContextPath()%>/images/account/tips.png" class="tp_img">教师证认证
				</p>
				<div class="r_v_warn add_p">
					教师证资质认证将会增强生对你的专业信任，另外认证过程中填写材料信息，只用于认证专业能力，不会用于其他地方！</div>

				<div class="r_w_card" id="idenfyCard">
					<table class="r_w_edu">
						<tr>
							<th>教师证：</th>
							<td class="special_pt add_pt">
								<div id="r_v_techFile">
									<img alt="" src="<%=request.getContextPath()%>/images/certificate/file_up.png" id="highTech"
										width="235px" height="150px"> <a href="javascript:;"
										class="file_up">上传图片 <input type="file" id="authTech"
										name="eduFiles" accept="image/*">
									</a>

								</div> <span class="info"></span><img src="" id="front"
								style="display: none;">
							</td>
							<td class="p_tech" width="400px">
								<p class="r_v_p1">请提供您的教师证！</p>
								<div class="warn_tip">
									<p class="r_v_p2">
										<font color="#d8271c">注意：</font>
									</p>
									<p class="r_v_p2">1、证件信息清晰无模糊，且不能有遮挡；</p>
									<p class="r_v_p2">2、照片不要有任何的修改和处理！</p>
								</div></td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td class="r_v_text1" colspan="2">支持 jpg、jpeg、png格式的图片</td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td colspan="3">
								<input type="submit" id="submitTechCard" class="r_s_edu" value="提交" onClick="submitEduCer(2);"> 
								<input type="button" id="cancelTechCard" class="r_c_edu" value="取消" onClick="javascript:history.go(-1);">
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<!-- 教师认证		 -->
		<!-- 其它认证		 -->
		<div class="idenfy_edu" id="idenfyOther" style="display: none;">
			<div class="r_v_line add_line">
				<img alt="" src="<%=request.getContextPath()%>/images/piano_certificate/id_teach.gif" class="c_tips">老师认证
			</div>
			<div>
				<p class="r_v_ti add_p">
					<img src="<%=request.getContextPath()%>/images/account/tips.png" class="tp_img">学士学位认证
				</p>
				<div class="r_v_warn add_p">
					专业认证将会提升学生对你的认可度，另外认证过程中填写材料信息，只用于认证专业能力，不会用于其他地方！</div>

				<div class="r_w_card" id="idenfyCard">

					<table class="r_w_edu">
						<tr>
							<th>最高学历：</th>
							<td class="r_v_tb" colspan="2"><select name="eduOth"
								id="eduOth" class="r_v_input">
									<option value="0">请选择</option>
									<option value="1">小学</option>
									<option value="2">初中</option>
									<option value="3">中等专业学校(中专)</option>
									<option value="4">技工学校(中技)</option>
									<option value="5">职业高中(职高)</option>
									<option value="6">普通高级中学</option>
									<option value="7">大学专科</option>
									<option value="8">大学本科</option>
									<option value="9">硕士研究生</option>
									<option value="10">博士研究生</option>
							</select><span class="info"></span></td>
						</tr>
						<tr>
							<th>教师证：</th>
							<td class="special_pt add_pt"><img alt=""
								src="<%=request.getContextPath()%>/images/certificate/file_up.png" id="highOther"
								width="235px" height="150px"> <a href="javascript:;"
								class="file_up">上传图片 <input type="file" id="authOther"
									name="eduFiles" accept="image/*">
							</a> <span class="info"></span><img src="" id="front"
								style="display: none;"></td>
							<td class="p_other">
								<p class="r_v_p1">请提供您的专业考级证书：</p>
								<p class="r_v_p1">如英语专业八级证书、会计从业资格证书等。</p>
								<div class="warn_tip">
									<p class="r_v_p2">
										<font color="#d8271c">注意：</font>
									</p>
									<p class="r_v_p2">1、证件信息清晰无模糊，且不能有遮挡；</p>
									<p class="r_v_p2">2、照片不要有任何的修改和处理！</p>
								</div>
							</td>
						</tr>
						<tr>
							<th>&nbsp;</th>
							<td class="r_v_text1" colspan="2">支持 jpg、jpeg、png格式的图片</td>
						</tr>
						<tr>
							<td colspan="3">
								<input type="submit" id="submitOtherCard" class="r_s_edu" value="提交" onClick="submitEduCer(3);"> 
								<input type="button" id="cancelOtherCard" class="r_c_edu" value="取消" onClick="javascript:history.go(-1);">
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>

	</div>
	<div class="add_with_line"></div>
</form>
