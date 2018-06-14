package com.class8.eduPlatform.pay.alipay.controller;

import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.course.bean.CourseBasicInfo;
import com.class8.course.bean.CourseStudent;
import com.class8.course.bean.UserOrder;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.common.util.MD5Util;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.pay.PayBaseController;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.eduPlatform.security.controller.LoginController;
import com.class8.pay.common.bean.Chargeorderform;
import com.class8.pay.common.bean.PayAccount;
import com.class8.pay.common.bean.PayAccountBillInfo;
import com.class8.pay.common.constants.ChargeorderformTypeConstant;
import com.class8.pay.common.constants.PayAccountBillTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.user.bean.SchoolsStudent;
import com.class8.user.bean.SchoolsTeacher;
import com.class8.user.bean.TeacherStudent;
import com.class8.user.constants.SchoolMembersStatueConstant;
import com.class8.user.webservice.intf.IEduUserService;

@Controller
public class AilpayController extends PayBaseController{

	private static Logger logger = Logger.getLogger(AilpayController.class);

	
	// 支付接口
	@RequestMapping(value = "/alipayTopay")
	public String alipayTopay(HttpSession session, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String strUidString = session.getAttribute("uid").toString();
		if (StringUtils.isEmpty(strUidString))
			return "redirect:/";

		// 商户订单号

		// 商户网站订单系统中唯一订单号，必填

		// 订单名称
		String subject = "支付";
		// 必填

		return alipay(subject, ChargeorderformTypeConstant.PAY, session,
				request, response);
	}
	
	@ResponseBody
	@RequestMapping(value = "/topayorderbyali")
	public String toPayOderByAli(@RequestParam String orderid, HttpSession session,
			HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
	
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return "redirect:/";
			} 
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			UserOrder userOrder = eduCourseService.getsimpleUserOrder(orderid);
			int nCheck = CheckBeforePay(userOrder);
			if(nCheck < 0){
				System.out.println(" to check payorder errorno:" + nCheck + "  orderid:" + orderid);
				json.put("status", nCheck);  //订单不存在
				return json.toString();
			}
			///TODO:银行卡或者支付宝支付，当银行支付回调后再填写流水明细，并更改订单状态,此处只管生成网页
			// 付款金额
			int fRmbs = userOrder.getRealPrice();		
			String exter_invoke_ip = CommonUtil.getIpAddr(request);

			// 订单名称
			String payName = "支付";
			// 必填
			response.setContentType("text/html;charset=utf-8");
			// 支付类型
			String payment_type = "1";
			// 订单描述

			String body = request.getParameter("WIDbody");
			// 商品展示地址
			String show_url = request.getParameter("WIDshow_url");
			// 需以http://开头的完整路径，例如：http://www.商户网址.com/myorder.html

			// 防钓鱼时间戳
			String anti_phishing_key = "";
			// 若要使用请调用类文件submit中的query_timestamp函数
			
			float toPayRmbs = (float)fRmbs;
			toPayRmbs = toPayRmbs / 100;
			// ////////////////////////////////////////////////////////////////////////////////

			// 把请求参数打包成数组
			Map<String, String> sParaTemp = new HashMap<String, String>();
			sParaTemp.put("service", "create_direct_pay_by_user");
			sParaTemp.put("payment_type", payment_type);
			sParaTemp.put("out_trade_no", orderid);
			sParaTemp.put("subject", payName);
			sParaTemp.put("total_fee", Float.toString(toPayRmbs));
			sParaTemp.put("body", body);
			sParaTemp.put("show_url", show_url);
			sParaTemp.put("anti_phishing_key", anti_phishing_key);
			sParaTemp.put("exter_invoke_ip", exter_invoke_ip);

			System.out.println("to pay oder by ali: " + orderid + " uid:" + uid + " rmbs: "+ fRmbs);
			payName = iEduPayService.toGetAlipayUrl(sParaTemp, ChargeorderformTypeConstant.PAY, uid,
					fRmbs, 0);
			
			//payName = alipay(payName, ChargeorderformTypeConstant.CHARGE, session,
			//		request, response);
			// json.put("state", 0);
			json.put("url", payName);
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return json.toString();
	}
	

	// 充值接口
	@RequestMapping(value = "/alipayToCharge", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String alipayToCharge(HttpSession session,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {		
		// request.getCharacterEncoding());
		Subject subject = SecurityUtils.getSubject();
		long uid = 0;
		if (!subject.isAuthenticated()) {
			return "redirect:/";
		} else {
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
		}
		
		JSONObject json = new JSONObject();
		
		// 付款金额
		String total_fee = request.getParameter("WIDtotal_fee");
		// 必填
		float fRmbs = Float.parseFloat(total_fee);		
		String exter_invoke_ip = CommonUtil.getIpAddr(request);

		// 订单名称
		String payName = "充值";
		// 必填
		response.setContentType("text/html;charset=utf-8");
		// 支付类型
		String payment_type = "1";
		// 订单描述

		String body = request.getParameter("WIDbody");
		// 商品展示地址
		String show_url = request.getParameter("WIDshow_url");
		// 需以http://开头的完整路径，例如：http://www.商户网址.com/myorder.html

		// 防钓鱼时间戳
		String anti_phishing_key = "";
		// 若要使用请调用类文件submit中的query_timestamp函数

		
		String out_trade_no = request.getParameter("WIDout_trade_no");

		// ////////////////////////////////////////////////////////////////////////////////

		// 把请求参数打包成数组
		Map<String, String> sParaTemp = new HashMap<String, String>();
		sParaTemp.put("service", "create_direct_pay_by_user");
		sParaTemp.put("payment_type", payment_type);
		sParaTemp.put("out_trade_no", out_trade_no);
		sParaTemp.put("subject", payName);
		sParaTemp.put("total_fee", total_fee);
		sParaTemp.put("body", body);
		sParaTemp.put("show_url", show_url);
		sParaTemp.put("anti_phishing_key", anti_phishing_key);
		sParaTemp.put("exter_invoke_ip", exter_invoke_ip);

		float toRms = Float.parseFloat(total_fee) * 100;		
		payName = iEduPayService.toGetAlipayUrl(sParaTemp, ChargeorderformTypeConstant.CHARGE, uid,
				(int)toRms, 0);
		
		//payName = alipay(payName, ChargeorderformTypeConstant.CHARGE, session,
		//		request, response);
		// json.put("state", 0);
		json.put("url", payName);
		System.out.println(json.toString());
		return json.toString();
	}

	public String alipay(String subject, int nType, HttpSession session,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		/*
		 * String strUidString = session.getAttribute("uid").toString();
		 * if(StringUtils.isEmpty(strUidString)) return "redirect:/"; long uid =
		 * Integer.parseInt(strUidString);
		 */
		Subject auSubject = SecurityUtils.getSubject();
		long uid = 0;
		if (!auSubject.isAuthenticated()) {
			return "redirect:/";
		} else {
			ShiroUser shiroUser = (ShiroUser) auSubject.getPrincipal();
			uid = shiroUser.getUid();
		}
		// long uid = 21931;
		response.setContentType("text/html;charset=utf-8");
		// subject = new String(subject.getBytes("ISO-8859-1"),"UTF-8");
		// subject = URLEncoder.encode(subject, "UTF-8");
		System.out.println(subject);
		// 支付类型
		String payment_type = "1";

		// 必填

		// 付款金额
		String total_fee = request.getParameter("WIDtotal_fee");
		// 必填

		// 订单描述

		String body = request.getParameter("WIDbody");
		// 商品展示地址
		String show_url = request.getParameter("WIDshow_url");
		// 需以http://开头的完整路径，例如：http://www.商户网址.com/myorder.html

		// 防钓鱼时间戳
		String anti_phishing_key = "";
		// 若要使用请调用类文件submit中的query_timestamp函数

		// 客户端的IP地址
		String exter_invoke_ip = CommonUtil.getIpAddr(request);//request.getParameter("WIDip");
		;
		// 非局域网的外网IP地址，如：221.0.0.1
		String out_trade_no = request.getParameter("WIDout_trade_no");

		// ////////////////////////////////////////////////////////////////////////////////

		// 把请求参数打包成数组
		Map<String, String> sParaTemp = new HashMap<String, String>();
		sParaTemp.put("service", "create_direct_pay_by_user");
		sParaTemp.put("payment_type", payment_type);
		sParaTemp.put("out_trade_no", out_trade_no);
		sParaTemp.put("subject", subject);
		sParaTemp.put("total_fee", total_fee);
		sParaTemp.put("body", body);
		sParaTemp.put("show_url", show_url);
		sParaTemp.put("anti_phishing_key", anti_phishing_key);
		sParaTemp.put("exter_invoke_ip", exter_invoke_ip);

		float toRms = Float.parseFloat(total_fee) * 100;
		String sHtmlText = iEduPayService.toGetAlipayUrl(sParaTemp, nType, uid,
				(int)toRms, 0);

		return sHtmlText;
	}

	// 外网测试时再测试这个。，内网先测试alipayReturn，原因是支付宝回调通知服务器是无法连接到内网的
	@RequestMapping(value = "/alipayNofity")
	@ResponseBody
	public String alipayNofity(HttpSession session, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		// 获取支付宝POST过来反馈信息
		
		System.out.println("alipayNofity");

		Map<String, String> params = new HashMap<String, String>();
		Map requestParams = request.getParameterMap();
		for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
			// valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
			params.put(name, valueStr);
			System.out.println(name + "=" + valueStr);
		}

		// 获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
		// 商户订单号
		//return "success"; // return "fail";//支付宝要求成功则返回，
		Chargeorderform chargeorderform = iEduPayService.alipayNofity(params);
		if(UpdateOrderAccoutInfos(chargeorderform) == 0){
			return "success";
		}else {
			return "fail";
		}
	}

	@RequestMapping(value = "/alipayReturn")
	public String alipayReturn(HttpSession session, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String orderString = request.getParameter("out_trade_no");
		if(orderString != null){
			Chargeorderform chargeorderform = iEduPayService.getChargeorderform(orderString);
			if(chargeorderform != null){
				if(chargeorderform.getChargetype() == ChargeorderformTypeConstant.CHARGE){
					return "redirect:/persondata/myAccount";
				}else {
					return "redirect:/order/studentOrder";
				}
			}
		}
		//alipayNofity(session, request, response);
		return "redirect:/";
	}

}
