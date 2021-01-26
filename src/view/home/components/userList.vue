<template>
  <div>
    <!-- 没抽过的奖 -->
    <div v-show="!this.successful">
      <div class="flex-sb head custom-head">
        <div>参与人数：{{this.list.length}}</div>
        <div @click="reFreshList">参与名单</div>
        <div>已获奖人数:{{winners}}人</div>
      </div>
      <div
        class="flex list"
        ref="main"
      >
        <div
          ref="content"
          class="flex list2"
        >
          <div id="myCanvasContainer">
            <canvas
              :width="canvasWidth"
              height="900"
              id="myCanvas"
              class='canvas'
            >
              <p>Anything in here will be replaced on browsers that support the canvas element</p>
              <!-- :src='item.avatar !=="" ? item.avatar:default_url' -->
              <ul>
                <li
                  v-for="item in list"
                  :key='item.id'
                >
                  <a>
                    <img
                      :src='default_url'
                      width="10px"
                      height="10px"
                    >
                    <div>{{item.dept_name}}</div>
                    <div>{{item.user_name}}</div>

                  </a></li>
              </ul>
            </canvas>
          </div>

        </div>
      </div>
    </div>
    <!-- 已抽过的奖 -->
    <div v-show="this.successful">
      <div class="flex-sb head custom-head">
        <div>参与人数：{{this.list.length}}</div>
        <div>获奖名单</div>
        <div>本轮获奖人数:{{this.x.length}}人</div>
      </div>
      <div class="flex-center win">

        <div
          v-for="item in x"
          :key='item.index'
          class="item"
        >
          <a>
            <img
              v-show="false"
              :src='default_url'
              shape="square"
              icon="user"
              class="boll"
            />
          </a>
          <div>{{item.employee.dept_name}}</div>
          <div>{{item.employee.user_name}}</div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
require("./tagCanvas");
// import bus from "../../../assets/js/eventBus";
import { setTimeout, setInterval } from "timers";
import * as R from "ramda";

import { getSignList, getGift } from "../../../api/index.js";

export default {
    name: "UserList",
    props: {
        count: Number,
        not_winners: Number,
        giftId: Number,
        list2: Array,
        successful: Boolean,
        winners: Number,
        center: Object,
    },
    watch: {
        list2: function(newVal, oldVal) {
            //只显示本轮中间的人
            this.x = R.difference(newVal, oldVal);
            // this.historyPrize = oldVal;
            // this.x = newVal;
        },
    },
    data: function() {
        return {
            // default_url: "https://i.loli.net/2021/01/20/vCY9cIF3umDJGEB.png",
            default_url: "https://i.loli.net/2021/01/26/IMJp1WfuCdmk7et.png",
            historyPrize: [],
            timer: "",
            rewordCount: 0, //获奖人数
            list: [], //参与成员列表
            x: this.list2,
            timer1: "",
            canvasWidth: "", //屏幕宽度
        };
    },
    methods: {
        //转动的效果

        async startGame() {
            this.startTurning();
            window.TagCanvas.SetSpeed("myCanvas", [0.1, 0.1]);
            await setTimeout(() => {
                window.TagCanvas.SetSpeed("myCanvas", [0.2, 0.2]);
                window.TagCanvas.zoom = 2;
                setTimeout(() => {
                    window.TagCanvas.SetSpeed("myCanvas", [0.3, 0.3]);
                    setTimeout(() => {
                        window.TagCanvas.SetSpeed("myCanvas", [0.4, 0.4]);
                        setTimeout(() => {
                            window.TagCanvas.SetSpeed("myCanvas", [0.5, 0.5]);
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        },

        // 中奖成员
        async getWinner() {
            const { data } = await getGift(this.giftId);
            this.x = data.gift_records;
        },
        orSpeed() {
            window.TagCanvas.SetSpeed("myCanvas", [0.02, 0.02]);
        },
        //轮询已签列表，参与人数实时变动
        reFreshUser() {
            setInterval(async () => {
                const { data } = await getSignList();
                this.list = data.data;
                this.canvasWidthChange();
            }, 4000);
        },
        //更新展示参与人员的列表 更新时会有卡顿
        // setInterval(() => {
        //     window.TagCanvas.Update("myCanvas");
        // }, 20000);
        reFreshList() {
            //更新展示列表
            window.TagCanvas.Update("myCanvas");
        },
        stopTurning() {
            //停止转动
            window.TagCanvas.Pause("myCanvas");
        },
        startTurning() {
            window.TagCanvas.Resume("myCanvas");
        },
        canvasWidthChange() {
            let clientWidth = document.body.clientWidth; //屏幕宽度变化的话  展示的参与列表球体也变化
            clientWidth > 2000
                ? ((this.canvasWidth = 3000), this.$set(this.center, "value", ""))
                : ((this.canvasWidth = 1400), this.$set(this.center, "value", "center"));
        },
    },
    async mounted() {
        this.canvasWidthChange();
        const { data } = await getSignList();
        this.list = data.data;
        window.TagCanvas.textColour = "#fff";
        window.TagCanvas.minSpeed = 0.05;
        // window.TagCanvas.maxSpeed = 0.01;
        window.TagCanvas.imageMode = "both"; //图片和文字1
        window.TagCanvas.imagePosition = "top"; //图片位置
        window.TagCanvas.textHeight = "15"; //字体高度
        window.TagCanvas.splitWidth = "1"; //换行
        // window.TagCanvas.clickToFront = "3";
        window.TagCanvas.imageRadius = "50%";
        window.TagCanvas.zoom = 1.2; //大小
        window.TagCanvas.maxBrightness = 1; //前端亮度
        window.TagCanvas.minBrightness = 1; //后端亮度
        window.TagCanvas.dragControl = true; //鼠标拖动旋转
        window.TagCanvas.noSelect = true; //是否可以选中某一项
        window.TagCanvas.initial = [0.02, 0.02]; //初始方向和速度1
        await window.TagCanvas.Start("myCanvas");
        window.TagCanvas.Update("myCanvas");
        this.reFreshUser();
    },
};
</script>

<style>
.head {
    margin: 20px 40px 20px 20px;
    font-size: 30px;
    width: 95%;
    position: absolute;
    top: -12px;
    left: 10px;
    color: #fff;
}
.list {
    flex-wrap: wrap;
    height: 80vh;
    /* overflow: scroll; */
}
.list2 {
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
}
.win {
    flex-wrap: wrap;
    /* margin: auto; */
    margin-top: 30px;
    color: #fff;
}
.item {
    margin: 60px 18px;
    font-size: 30px;
    width: 218px;
}
.item div {
    white-space: nowrap;
}
#myCanvasContainer {
    /* 电脑屏幕 */
    width: 100%;
    /* 大屏幕宽屏 */
    /* margin: 30px auto; */
}
.canvas {
    width: 100%;
    height: 100%;
    font-size: 12px;
}
.custom-head {
    width: 95%;
    position: absolute;
    top: 0;
    left: 0;
}
.boll {
    border-radius: 50%;
    width: 30px;
}
</style>

