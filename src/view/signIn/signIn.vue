<template>

  <van-cell-group class="wrap">
    <van-image :src="require('../../assets/rantion.png')" />
    <div class="content">

      <van-field
        readonly
        clickable
        label="部门"
        :value="value.dept_name"
        placeholder="请选择部门"
        @click="showPicker = true"
      />
      <van-popup
        v-model="showPicker"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          value-key="dept_name"
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <van-field
        v-model="info.user_name "
        label="姓名"
        placeholder='请输入姓名'
      />
      <van-field
        type="phone"
        v-model="info.phone"
        label="手机号"
        placeholder='请输入手机号'
      />

      <div class="flex">
        <van-field
          v-model="info.code"
          placeholder='请输入验证码'
          type="digit"
          label="验证码"
        />

        <van-button
          :disabled='disabled'
          id="sendCode"
          type="info"
          size='small'
          @click="sendCode"
        >{{sendCodeInnerText}}</van-button>

      </div>

    </div>
    <van-button
      class="btn"
      round
      block
      type="info"
      native-type="submit"
      @click="submi"
      icon-position='right'
    >签到</van-button>
  </van-cell-group>

</template>

<script>
require("./wechat.js");
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import { getDepartment, getCode, giftUserInfo } from "../../api/index.js";
Vue.use(Vant);

export default {
    name: "signIn",
    data() {
        return {
            disabled: false,
            sendCodeInnerText: "发送验证码",
            info: {
                user_name: "",
                phone: "",
                code: "",
                dept_code: "",
                weixin_name: "1111",
                avatar: "https://picsum.photos/200",
                signed_addr: "广州蓝深一楼wc2号",
            },
            value: "",
            showPicker: false,
            columns: [],
        };
    },
    methods: {
        onConfirm(value) {
            this.value = value;
            this.$set(this.info, "dept_code", value.id);
            this.showPicker = false;
        },
        async getUser() {
            const { data } = await giftUserInfo();
            console.log(data);
        },
        async sendCode() {
            const count = 3;
            let curCount = count;
            const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;

            if (!phoneReg.test(this.info.phone)) {
                this.$toast({
                    message: "手机号码格式错误",
                });
                return false;
            } else {
                this.wx.request({
                    url: "test.php", //仅为示例，并非真实的接口地址
                    data: {
                        x: "",
                        y: "",
                    },
                    header: {
                        "content-type": "application/json", // 默认值
                    },
                    success(res) {
                        console.log(res.data);
                    },
                });
                const { data, msg, code } = await getCode(this.info.phone);
                this.$toast({
                    message: msg,
                });
                code == 0 ? alert(data.code) : "";

                this.disabled = true;
                this.sendCodeInnerText = curCount + "s后再获取";
                const that = this;
                const InterVal = window.setInterval(function SetTime() {
                    if (curCount == 0) {
                        window.clearInterval(InterVal); //停止计时器
                        that.disabled = false; //启用按钮
                        that.sendCodeInnerText = "重新发送";
                    } else {
                        curCount--;
                        that.sendCodeInnerText = curCount + "s后再获取";
                    }
                }, 1000);
            }
        },
        async submi() {
            if (
                this.value == "" ||
                this.info.phone == "" ||
                this.info.user_name == "" ||
                this.info.code == ""
            ) {
                this.$toast({
                    message: "请输入信息",
                });
            } else {
                const requestOptions = {
                    method: "POST",
                    body: JSON.stringify(this.info),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                };
                fetch("http://47.107.254.110:28088//api/lottery/signIn", requestOptions)
                    .then((response) => response.json())
                    .then((result) => console.log(result, 111))
                    .catch((error) => console.log("error", error));

                // const { data, code, msg } = await signIn(this.info);
                // if (data) {
                //     this.$toast({
                //         message: "已经签过到啦",
                //     });
                // } else {
                //     code == 0
                //         ? this.$toast({
                //               message: "签到成功",
                //           })
                //         : this.$toast({
                //               message: msg,
                //           });
                // }
            }
        },
    },
    async mounted() {
        // this.getUser();
        const { data } = await getDepartment();
        this.columns = data;
    },
};
</script>

<style scoped>
.wrap {
    text-align: center;
    margin-top: 30%;
    padding: 50px;
}
.content {
    margin: 50px 0;
}
#sendCode {
    white-space: nowrap;
    font-size: 13px;
    margin-top: 5px;
}
</style>
