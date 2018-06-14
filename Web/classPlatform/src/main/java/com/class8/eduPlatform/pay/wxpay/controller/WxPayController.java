package com.class8.eduPlatform.pay.wxpay.controller;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.course.bean.UserOrder;
import com.class8.course.constants.OrderStatusConstant;
import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.common.util.DateUtil;
import com.class8.eduPlatform.core.controller.BaseController;
import com.class8.eduPlatform.pay.PayBaseController;
import com.class8.eduPlatform.pay.wxpay.constant.WxTradeType;
import com.class8.eduPlatform.security.bean.ShiroUser;
import com.class8.pay.common.constants.ChargeorderformTypeConstant;
import com.class8.pay.webservice.intf.IEduPayService;
import com.class8.pay.wxpay.protocol.unifiedorder.UnifiedOrderReqData;
import com.class8.pay.wxpay.protocol.unifiedorder.UnifiedOrderResData;
import com.class8.pay.wxpay.util.Configure;
import com.class8.pay.wxpay.util.MatrixToImageWriter;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;


@Controller
@RequestMapping("/wxpay")
public class WxPayController extends PayBaseController {
	
	private static final String PAY_CONFIRM = "/pay/wxpay";
	
	private static final int WIDTH = 300;
	private static final int HEIGHT = 300;
	
		
	@RequestMapping(value = "/toWxpay",method=RequestMethod.GET)
	public String coursesOfMine(@RequestParam("code_url") String codeUrl,Model model) {
		model.addAttribute("code_url", codeUrl);
		return PAY_CONFIRM;
	}
	/**
	 * 微信支付确认
	 * @param model
	 * @return
	 */
	@RequestMapping("/payConfirm")
	public String payConfirm(@RequestParam(value="outTradeNo",required=false) String outTradeNo,Model model){
		try {
			//TODO 根据订单id查询订单信息
			//商品描述
			String body = "账户充值";
			
			//商户订单号
			String our_trade_no = "201511201122";
			
			//总金额
			int total_fee = 1;
			
			//ip地址
			String spbill_create_ip = InetAddress.getLocalHost().getHostAddress();
			
			//交易类型
			String trade_type = WxTradeType.NATIVE;
			
			//商品id
			String product_id = "10000";
			
			//支付类型
			int payType = ChargeorderformTypeConstant.CHARGE;
			
			//总金额
			int nRmbS = 1;
			
			//赠送金额
			int nGifeS = 0;
			
			UnifiedOrderReqData reqData = new UnifiedOrderReqData(Configure.APPID,Configure.MCH_ID,body,our_trade_no,total_fee,spbill_create_ip,trade_type,product_id);
			
			//用户id
			long uid = 109947;
			
			UnifiedOrderResData resData = iEduPayService.unifiedOrder(reqData,uid,payType,nRmbS,nGifeS);
			
			model.addAttribute("code_url", resData.getCode_url());
			
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		return PAY_CONFIRM;
	}
	
	/**
	 * 根据code_url生成二维码
	 * @param codeUrl
	 * @param response
	 */
	@RequestMapping("/qrcode")
	public void qrCode(@RequestParam("code_url") String codeUrl,HttpServletResponse response){
		try {
			Hashtable<EncodeHintType, String> hints = new Hashtable<EncodeHintType, String>();  
			hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
			BitMatrix bitMatrix = new MultiFormatWriter().encode(codeUrl, BarcodeFormat.QR_CODE, WIDTH, HEIGHT, hints);  
			MatrixToImageWriter.writeToStream(bitMatrix, "gif", response.getOutputStream());
		} catch (WriterException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 微信充值
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/payCharge")
	public String payCharge(HttpServletRequest request, Model model){
		JSONObject json = new JSONObject();
		String codeUrl="";
		try {
			Subject subject = SecurityUtils.getSubject();
			long uid = 0;
			if (!subject.isAuthenticated()) {
				json.put("status", -1);
				return "redirect:/";
			} 
			ShiroUser shiroUser = (ShiroUser) subject.getPrincipal();
			uid = shiroUser.getUid();
			//TODO 根据订单id查询订单信息
			//商品描述
			String body = "账户充值";
			
			//商户订单号
			String our_trade_no = "201511201122";
			
			
			// 付款金额
			String total_fee = request.getParameter("WIDtotal_fee");
			// 必填
			float fRmbs = Float.parseFloat(total_fee) * 100;	
			int nRmbs = (int)fRmbs;
			//ip地址
			
			String spbill_create_ip = CommonUtil.getIpAddr(request);
			
			//交易类型
			String trade_type = WxTradeType.NATIVE;
			
			//商品id
			String product_id = "10000";
			
			//支付类型
			int payType = ChargeorderformTypeConstant.CHARGE;			
			
			
			//赠送金额
			int nGifeS = 0;
			
			UnifiedOrderReqData reqData = new UnifiedOrderReqData(Configure.APPID,Configure.MCH_ID,body,our_trade_no,nRmbs,spbill_create_ip,trade_type,product_id);
			
			System.out.println(DateUtil.millisecond2String(System.currentTimeMillis()) + " to get code url");
			UnifiedOrderResData resData = iEduPayService.unifiedOrder(reqData,uid,payType,nRmbs,nGifeS);
			codeUrl = resData.getCode_url();
//			model.addAttribute("code_url", codeUrl);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return codeUrl;
	}
	/**
	 * 微信支付确认
	 * @param model
	 * @return
	 */
//	@ResponseBody
	@RequestMapping("/topayorderbyweixin")
	public String paybyweixin(@RequestParam String orderid,HttpServletRequest request, Model model){
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
			//TODO 根据订单id查询订单信息
			//商品描述
			String body = "账户支付";
			
			
			//ip地址
			String spbill_create_ip = CommonUtil.getIpAddr(request);
			
			//交易类型
			String trade_type = WxTradeType.NATIVE;
			
			//商品id
			String product_id = "10000";
			
			//支付类型
			int payType = ChargeorderformTypeConstant.PAY;
			
			
			//赠送金额
			int nGifeS = 0;
			
			UnifiedOrderReqData reqData = new UnifiedOrderReqData(Configure.APPID,Configure.MCH_ID,body,orderid,fRmbs,spbill_create_ip,trade_type,product_id);
			
			
			UnifiedOrderResData resData = iEduPayService.unifiedOrder(reqData,uid,payType,fRmbs,nGifeS);
			
			model.addAttribute("code_url", resData.getCode_url());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return PAY_CONFIRM;
	}
	
}
