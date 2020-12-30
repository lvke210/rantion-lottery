<template>

  <div class="flex wrap">

    <div class="left">

      <a-card style="height:93vh">
        <a-space
          direction="vertical"
          :size='50'
          class="center"
        >

          <div>
            <h1>年会抽奖</h1>
          </div>

          <!-- <prize :msg='prize' /> -->
          <div>
            <div>
              <!-- 奖项 -->
              <a-select
                style="min-width:120px"
                class="a-select"
                :value="defaultPrize"
                @change="handleprizeChange"
              >
                <a-select-option
                  v-for="prize in prizeData"
                  :key="prize.id"
                >
                  {{ prize.name }}
                </a-select-option>
              </a-select>
            </div>
            <!-- 奖品 -->
            <div>
              <a-select
                style="min-width:120px"
                :value="defaultGift"
                @change="handlegiftChange"
              >
                <a-select-option
                  v-for="item in gift"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
            <!-- 奖品图片预览 -->
            <img
              class="img"
              :src="gift_url"
              alt="奖品图片"
            >

          </div>
          <Quantity :not_winners='not_winners' />
          <a-button
            type='primary'
            @click="lotteryStart"
            :disabled='disabled'
          >开始</a-button>
          <a-button
            type='primary'
            @click="lotteryStop"
            :disabled='disabled'
          >停止</a-button>
          <div>剩余奖品数量{{not_winners}}</div>
        </a-space>
      </a-card>
    </div>
    <div class="right">
      <a-card style="min-height:93vh;width:100%;display:flex;justify-content:center;align-items: center;">
        <UserList
          ref="UserList"
          :not_winners='not_winners'
          :successful='successful'
          :list2='list2'
          :giftId='giftId'
          :winners='winners'
        />
      </a-card>
    </div>

  </div>

</template>

<script>
// import Level from "./components/level";
// import Prize from "./components/prize";
import Quantity from "./components/quantity";
import UserList from "./components/userList";
import { getPrize } from "../../../api";
import { giftRoll, getGift } from "../../../api/index.js";
import bus from "../../assets/js/eventBus";

export default {
    name: "Home",
    components: { Quantity, UserList },
    data: function() {
        return {
            successful: false,
            disabled: false,
            prizeData: [], //奖项列表
            gift: [], //奖品列表
            curGift: "",
            defaultPrize: "", //默认奖项
            defaultGift: "", //默认奖品
            gift_url: "", //奖品图片
            prizeId: 1, // 奖项的ID ，用于
            giftId: 1, //奖品的ID
            not_winners: 0, //剩余奖品数量
            list: [], //参与成员列表
            list2: [], //中奖名单列表
            rewordCount: 1,
            winners: 0,
        };
    },
    async mounted() {
        const { data } = await getPrize(); //获取奖项
        this.prizeData = data;
        this.defaultPrize = this.prizeData[0].id; //初始页面默认特等奖 奖品 图片
        this.defaultGift = this.prizeData[0].gifts[0].name;
        this.gift_url = this.prizeData[0].gifts[0].images;
        this.gift = this.prizeData[0].gifts; //奖品列表
        this.curGift = this.gift[0]; //初始奖品
        this.giftId = this.curGift.id;
        this.not_winners = this.curGift.not_winners; //剩余奖品数量
        this.showWinner();
        bus.$on("sendByBus", (count) => {
            this.rewordCount = count;
        });
    },

    methods: {
        showWinner() {
            //判断该奖品是否还可以抽奖，

            if (this.curGift.status == 1) {
                this.successful = false;
                this.disabled = false;
                // this.$refs.UserList.loadGame(); ////更换奖品时重新请求参与者名单
                console.log("可以抽奖");
            } else {
                console.log("奖品抽完了");
                this.successful = true;
                this.disabled = true;
                this.$nextTick(() => {
                    this.$refs.UserList.getWinner();
                });
            }
        },
        async handleprizeChange(value) {
            //奖项变化时执行
            this.$nextTick(() => {
                this.$refs.UserList.orSpeed();
            });
            this.prizeId = value;
            this.defaultPrize = value;

            this.gift = this.prizeData[value - 1].gifts;
            this.defaultGift = this.gift[0].name;
            this.giftId = this.gift[0].id;
            const { data } = await getGift(this.giftId);
            this.curGift = data;
            this.gift_url = this.gift[0].images;
            this.not_winners = this.gift[0].not_winners;
            this.winners = this.gift[0].winners;
            this.showWinner();
        },
        async handlegiftChange(value) {
            //奖品变化时执行

            this.$refs.UserList.orSpeed();

            this.defaultGift = value;
            this.giftId = value;
            const { data } = await getGift(this.giftId);
            this.curGift = data;
            console.log(this.curGift, "1112");
            // this.curGift = this.prizeData //筛选出对应奖品
            //     .filter((val) => {
            //         return val.id == this.prizeId; //先找到对应奖项
            //     })[0]
            //     .gifts.filter((val) => {
            //         return val.id == value; //再找到对应奖品
            //     })[0];
            this.gift_url = this.curGift.images;
            this.not_winners = this.curGift.not_winners;
            this.winners = this.curGift.winners;
            this.showWinner();
        },

        lotteryStart() {
            //开始按钮 只有加速效果

            this.successful = false;

            this.$refs.UserList.startGame();
        },
        async lotteryStop() {
            //抽奖按钮
            //停止转动 请求展示中奖名单

            if (this.not_winners < this.rewordCount) {
                this.$message.info("剩余奖品数量不足");
                return false;
            }
            this.not_winners = this.not_winners - this.rewordCount; //剩余奖品数量
            await giftRoll(this.curGift.id, this.rewordCount); //抽奖
            const { data } = await getGift(this.curGift.id);
            this.list2 = data.gift_records;
            if (this.not_winners <= 0) {
                this.disabled = true;
            }
            this.successful = true;
        },
    },
};
</script>

<style >
.wrap {
    height: 100%;
    padding: 30px;
    user-select: none;
    /* background-image: url("./assets/bgc.jpg"); */
    background-image: url("../../assets/bgc.jpg");
    background-size: cover;
    overflow-x: auto;
    opacity: 0.9;
}
.left {
    width: 20%;
    text-align: center;
    margin-right: 20px;
    background-color: #b655ed;
}
.right {
    flex: 1;
    text-align: center;
}
.center {
    margin: 120px 0;
}
.img {
    width: 50%;
    display: inline-block;
}
.ant-select-selection {
    border: none !important;
}

.ant-select {
    outline: none !important;
}
.ant-select-selection-selected-value {
    float: unset !important;
}
.ant-select-dropdown-menu-item,
.ant-select-dropdown-menu-item-selected {
    text-align: center;
    margin-left: -12px;
}
</style>
