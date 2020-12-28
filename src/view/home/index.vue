<template>

  <div class="flex wrap">

    <div class="left">

      <a-card style="max-height:93vh">
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
      <a-card style="min-height:90vh">
        <UserList
          ref="UserList"
          :not_winners='not_winners'
          :successful='successful'
          :list2='list2'
          :giftId='giftId'
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
import { giftRoll } from "../../../api/index.js";
import bus from "../../assets/js/eventBus";
// require("./components/tagCanvas.js");

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
            if (this.curGift.status == 1) {
                this.successful = false;
                this.disabled = false;
                this.$refs.UserList.loadGame(); ////更换奖品时重新请求参与者名单
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
        handleprizeChange(value) {
            this.prizeId = value;
            this.defaultPrize = value;
            this.gift = this.prizeData[value - 1].gifts;
            this.curGift = this.prizeData[value - 1].gifts[0];
            this.defaultGift = this.prizeData[value - 1].gifts[0].name;
            this.giftId = this.prizeData[value - 1].gifts[0].id;
            this.gift_url = this.prizeData[value - 1].gifts[0].images;
            this.not_winners = this.prizeData[value - 1].gifts[0].not_winners;
            this.showWinner();
        },
        handlegiftChange(value) {
            this.defaultGift = value;
            this.giftId = value;
            console.log("奖品ID", this.giftId);
            this.curGift = this.prizeData //筛选出对应奖品
                .filter((val) => {
                    return val.id == this.prizeId; //先找到对应奖项
                })[0]
                .gifts.filter((val) => {
                    return val.id == value; //再找到对应奖品
                })[0];
            this.gift_url = this.curGift.images;
            this.not_winners = this.curGift.not_winners;
            this.showWinner();
            // .gifts.filter((val) => {
            //     return val.id === value;
            // }).images;
        },

        // async getgifts() {
        //     const { data } = await getPrize();
        //     this.gift = data[this.prizeId - 1].gifts;
        //     console.log(this.gift);
        // },
        lotteryStart() {
            this.$refs.UserList.startGame();
            // this.successful = !this.successful;
            // this.disabled = true;
        },
        async lotteryStop() {
            this.not_winners = this.not_winners - this.rewordCount; //剩余中奖人数
            const { data } = await giftRoll(this.curGift.id, this.rewordCount);
            this.list2 = data;
            console.log("this.list2", this.list2);
            this.successful = true;

            if (this.not_winners === 0) {
                this.disabled = true;
            }
        },
    },
};
</script>

<style >
.wrap {
    opacity: 0.9;
}
.left {
    width: 20%;
    text-align: center;
    margin-right: 20px;
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
