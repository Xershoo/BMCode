<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div>
    <div class="topMenu">
        <ul>
            <li id="tclick" onclick="select(0,this)"><font>我的账户</font></li>
            <li onclick="select(1,this)"><font>交易记录</font></li>
            <li onclick="select(2,this)"><font>支付安全设置</font></li>
        </ul>
    </div>
    <script>

        $(document).ready(function () {
            $("#transaction_record").hide();
            $("#account").show();
            $("#pay_settings").hide();
        });

        var lastObj = $("#tclick");
        function select(index, obj) {
            var tr = $("#transaction_record");
            var ac = $("#account");
            var ps = $("#pay_settings");
            if ($(obj).is(lastObj)) {
                return;
            }
            $(obj).attr("id", "tclick");
            lastObj.removeAttr("id");
            lastObj = $(obj);
            switch (index) {

                case 0:
                    tr.hide();
                    ac.show();
                    ps.hide();
                    break;
                case 1:
                    tr.show();
                    ac.hide();
                    ps.hide();
                    break;
                case 2:
                    tr.hide();
                    ac.hide();
                    ps.show();
                    break;
            }
        }
    </script>


    <%--我的账户--%>
    <div class="zhanwei146" id="account">
        <div class="Kuang250">
            <div class="kfont1"><font>总资产&nbsp;&nbsp;(元)</font></div>
            <div class="kfont2"><font>0.00</font></div>
        </div>
        <div class="Kuang250">
            <div class="kfont1"><font>可用余额&nbsp;&nbsp;(元)</font></div>
            <div class="kfont3"><font>0.00</font></div>
        </div>
        <a href="recharge.html"><input class="congzhi" type="button" value="充值"/></a>

    </div>


    <%--交易记录--%>
    <div id="transaction_record">
        <div class="midMenu">
            <ul>
                <li>
                    <div id="all_record" class="xiaxian" onclick="recordSelect(0,this)">所有记录</div>
                </li>
                <li>
                    <div id="sz" onclick="recordSelect(1,this)">收支记录</div>
                </li>
                <li>
                    <div id="cz" onclick="recordSelect(2,this)">充值记录</div>
                </li>
                <li>
                    <div id="tx" onclick="recordSelect(3,this)">提现记录</div>
                </li>
            </ul>
        </div>
        <script>

            var all = $("#all_record");
            var sz = $("#sz");
            var cz = $("#cz");
            var tx = $("#tx");
            var last = all;
            function recordSelect(index, obj) {
                if ($(obj).is (last)) {
                    return;
                }
                switch (index) {

                    case 0:
                        all.addClass("xiaxian");
                        last.removeClass("xiaxian");
                        last = all;
                        break;
                    case 1:
                        sz.addClass("xiaxian");
                        last.removeClass("xiaxian");
                        last = sz;
                        break;
                    case 2:
                        cz.addClass("xiaxian");
                        last.removeClass("xiaxian");
                        last = cz;
                        break;
                    case 3:
                        tx.addClass("xiaxian");
                        last.removeClass("xiaxian");
                        last = tx;
                        break;
                }
            }
        </script>
        <div class="zhanwei164">
            <div class="line800">
                <div class="linefont1">交易日期：</div>
                <input type="text" placeholder="开始日期"/>
                <input type="text" placeholder="结束日期"/>
                <div class="Time">
                    <ul>
                        <li>
                            <div class="Onclick">全部</div>
                        </li>
                        <li>
                            <div>最近一周</div>
                        </li>
                        <li>
                            <div>最近一月</div>
                        </li>
                        <li>
                            <div>最近三月</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="line800">
                <div class="linefont2">类型：</div>
                <div class="Time1">
                    <ul>
                        <li>
                            <div class="Onclick">全部</div>
                        </li>
                        <li>
                            <div>收入</div>
                        </li>
                        <li>
                            <div>支出</div>
                        </li>
                        <li>
                            <div>充值</div>
                        </li>
                        <li>
                            <div>提现</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="line800">
                <div class="linefont2">状态：</div>
                <div class="Time1">
                    <ul>
                        <li>
                            <div class="Onclick">全部</div>
                        </li>
                        <li>
                            <div>进行</div>
                        </li>
                        <li>
                            <div>退款</div>
                        </li>
                        <li>
                            <div>失败</div>
                        </li>
                        <li>
                            <div>成功</div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <div class="thOrder">
            <font class="thOrder1">交易号</font>
            <font class="thOrder2">交易时间</font>
            <font class="thOrder2">交易分类/交易内容</font>
            <font class="thOrder2">交易方</font>
            <font class="thOrder2">交易金额</font>
            <font class="thOrder2">交易状态</font>
            <font class="thOrder2">操作</font>
        </div>
        <!--
            交易记录
        -->
        <div class="deal">
            <div class="OrderNum">100002365</div>
            <div class="OrderTime">
                <div class="OrderTimeY">2015-11-02</div>
                <div class="OrderTimeH">09:24:00</div>
            </div>
            <div class="OrderText">
                <div class="OrderTimeY">购课：课程名称</div>
                <div class="OrderTimeH">创课老师姓名</div>
            </div>
            <div class="OrderPeo">银行卡尾号</div>
            <div class="OrderPrice">￥-100.00</div>
            <div class="OrderState">交易成功</div>
            <div class="OrderOpera">查看 / 删除</div>
        </div>

        <!--
            交易记录
        -->
        <div class="deal">
            <div class="OrderNum">100002365</div>
            <div class="OrderTime">
                <div class="OrderTimeY">2015-11-02</div>
                <div class="OrderTimeH">09:24:00</div>
            </div>
            <div class="OrderText">
                <div class="OrderTimeY">购课：课程名称</div>
                <div class="OrderTimeH">创课老师姓名</div>
            </div>
            <div class="OrderPeo">银行卡尾号</div>
            <div class="OrderPrice">￥-100.00</div>
            <div class="OrderState">交易成功</div>
            <div class="OrderOpera">查看 / 删除</div>
        </div>

        <div class="zhanwei76"></div>
    </div>

    <%--支付安全设置--%>
    <div class="zhanwei500" id="pay_settings">
        <div class="zhanwei874">
            <img src="<%=path%>/images/account/myWealth/hongren.png"/>
            <span>资料完整度</span>
            <div class="K648">请进行支付密码及手机绑定，账户资金、信息变动时，需要支付密码进行验证！方便短信通知账户资金变动，及找回支付密码。</div>
        </div>
        <div class="zhanwei66">
            <img src="<%=path%>/images/account/myWealth/huangsuo.png"/>
            <span>支付密码</span>
            <font>未设置</font>
            <a href="payPWD.html"><input class="bangding" type="button" value="立即设置"/></a>
        </div>
        <div class="zhanwei66">
            <img src="<%=path%>/images/account/myWealth/phone3.png"/>
            <span>绑定手机</span>
            <font>未设置</font>
            <a href="setPhone.html"><input class="bangding" type="button" value="立即绑定"/></a>/>
        </div>
    </div>
    <div class="zhanwei400"></div>


</div>
<script>

</script>