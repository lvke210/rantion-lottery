<template>
  <div>
    <!-- 没抽过的奖 -->
    <div v-show="!this.successful">
      <div class="flex-sb head">
        <div>参与人数：{{this.list.length}}</div>
        <div>参与名单</div>
        <div>获奖人数:{{rewordCount}}人</div>
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
              width="1000"
              height="600"
              id="myCanvas"
              class='canvas'
            >
              <p>Anything in here will be replaced on browsers that support the canvas element</p>

              <ul>
                <li
                  v-for="item in list"
                  :key='item.id'
                ><a>
                    <img
                      :src='item.avatar !=="" ? item.avatar:default_url'
                      width="20px"
                      height="20px"
                      borderRadius='10px'
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
      <div class="flex-sb head">
        <div>参与人数：{{this.list.length}}</div>
        <div>获奖名单</div>
        <div>获奖人数:{{this.rewordCount}}人</div>
      </div>
      <div class="flex-center win">
        <div
          v-for="item in list2"
          :key='item.index'
          class="item"
        >
          <a-avatar
            shape="square"
            icon="user"
            :src='item.avatar !=="" ? item.avatar:default_url'
          />

          <div>{{item.dept_name}}</div>
          <div>{{item.user_name}}</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("./tagCanvas");
import bus from "../../../assets/js/eventBus";
import { setTimeout } from "timers";

import { getSignList, getGift } from "../../../../api/index.js";
export default {
    name: "UserList",
    props: {
        count: Number,
        not_winners: Number,
        giftId: Number,
        list2: Array,
        successful: Boolean,
    },
    data: function() {
        return {
            default_url: "https://picsum.photos/200",

            timer: "",
            rewordCount: 1, //获奖人数
            list: [], //参与成员列表
        };
    },
    methods: {
        //转动的效果
        startGame() {
            // window.TagCanvas.Start("myCanvas");
            setTimeout(() => {
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
            console.log("奖品id", this.giftId);
            const { data } = await getGift(this.giftId);
            console.log(data.gift_records);
        },
        // 可以抽奖时就加载列表
        async loadGame() {
            const { data } = await getSignList();
            this.list = data.data;

            window.TagCanvas.textColour = "#000";
            window.TagCanvas.minSpeed = 0.05;
            // window.TagCanvas.maxSpeed = 0.01;
            window.TagCanvas.imageMode = "both"; //图片和文字
            window.TagCanvas.imagePosition = "top"; //图片位置
            window.TagCanvas.textHeight = "5"; //字体高度
            window.TagCanvas.splitWidth = "1"; //换行
            // window.TagCanvas.clickToFront = "3";
            window.TagCanvas.imageRadius = "20%";
            window.TagCanvas.zoom = 1.2; //大小
            window.TagCanvas.dragControl = true; //鼠标拖动旋转
            window.TagCanvas.noSelect = true; //是否可以选中某一项
            window.TagCanvas.initial = [0.1, 0.1]; //初始方向和速度
            await window.TagCanvas.Start("myCanvas");
            window.TagCanvas.Update("myCanvas");
        },
    },
    mounted() {
        //中奖人数
        bus.$on("sendByBus", (count) => {
            this.rewordCount = count;
        });

        // this.$nextTick(() => {
        //     this.$refs.main.scrollTop = this.$refs.content.scrollHeight;
        // });
    },
};
</script>

<style>
.head {
    margin: 20px 40px 20px 20px;
}
.list {
    flex-wrap: wrap;
    height: 80vh;
    overflow: scroll;
}
.list2 {
    flex-wrap: wrap;
    width: 100%;
}
.win {
    margin: 20%;
}
.item {
    margin: 18px;
}
#myCanvasContainer {
    width: 100%;
}
.canvas {
    width: 100%;
    height: 88%;
    font-size: 12px;
}
</style>
