package com.class8.eduPlatform.core.controller.account;


import com.class8.eduPlatform.core.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController extends BaseController {


    @RequestMapping("/course") String mycourse(){
        return "/account/courseCentral_bm";
    }

    @RequestMapping("/resLib") String reslib(){
        return "/account/teachResLibCentral_bm";
    }

    @RequestMapping("/wealth") String wealth(){
        return "/account/wealthCentral_bm";
    }

    @RequestMapping("/settings") String settings(){
        return "/account/accountCentral_bm";
    }
}
