package com.class8.eduPlatform.pay.wxpay.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.class8.eduPlatform.common.util.CommonUtil;
import com.class8.eduPlatform.pay.PayBaseController;
import com.class8.eduPlatform.pay.wxpay.constant.WxConstant;
import com.class8.pay.common.bean.Chargeorderform;
import com.class8.pay.common.constants.ChargePayOrderStateConstant;
import com.class8.pay.webservice.intf.IEduPayService;

@Controller
@RequestMapping("/wxpay")
public class WxNotifyController  extends PayBaseController{
	
	private static Logger logger = Logger.getLogger(WxNotifyController.class);
	
	
	
	@RequestMapping("/notify")
	public @ResponseBody String notify(HttpServletRequest request){
		String resultXml = "";
		String returnXml = "";
		
		StringBuffer buffer = new StringBuffer("");
		BufferedReader reader = null;
		String temp = "";
		try {
			reader = request.getReader();
			while ((temp = reader.readLine()) != null) {
				buffer.append(temp);
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(reader != null){
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		resultXml = buffer.toString();
		logger.info("微信回调通知数据：" +resultXml);
		try {
			Map<String,Object> dataMap = CommonUtil.getMapFromXML(resultXml);
			String returnCode = (String) dataMap.get("return_code");
			if(WxConstant.SUCCESS.equals(returnCode)){
				String resultCode = (String) dataMap.get("result_code");
				//订单号
				String orderId = (String) dataMap.get("out_trade_no");
				//支付状态
				int payState = ChargePayOrderStateConstant.failed;
				//错误码
				String errCode = (String) dataMap.get("err_code");
				//错误描述
				String errCodeDes = (String) dataMap.get("err_code_des");
				
				if(WxConstant.SUCCESS.equals(resultCode)){
					payState = ChargePayOrderStateConstant.success;
					returnXml = "<xml>"+
							"<return_code><![CDATA[SUCCESS]]></return_code>"+
							"<return_msg><![CDATA[OK]]></return_msg>"+
							"</xml>";
				} else {
					payState = ChargePayOrderStateConstant.failed;
					returnXml = "<xml>"+
							"<return_code><![CDATA[FAIL]]></return_code>"+
							"<return_msg><![CDATA[FAIL]]></return_msg>"+
							"</xml>";
				}
				
				Chargeorderform chargeorderform = iEduPayService.updateOrderPayState(orderId, payState, errCode, errCodeDes);
				UpdateOrderAccoutInfos(chargeorderform);
			}
		} catch (Exception e) {
			logger.error("微信回调处理出错：",e);
		}
		return returnXml;
	}
}
