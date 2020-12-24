<template>

  <div class="flex wrap">

    <div class="left">

      <a-card style="max-height:93vh">
        <a-space
          direction="vertical"
          :size='size'
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
          >停止</a-button>
          <div>剩余奖品数量{{not_winners}}</div>
        </a-space>
      </a-card>
    </div>
    <div class="right">
      <a-card style="min-height:90vh">
        <UserList ref="UserList" />
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

// require("./components/tagCanvas.js");

export default {
    name: "Home",
    components: { Quantity, UserList },
    data: function() {
        return {
            successful: false,
            size: 50,
            prizeData: [], //奖项列表
            gift: [], //奖品列表
            defaultPrize: "", //默认奖项
            defaultGift: "", //默认奖品
            gift_url: "", //奖品图片
            prizeId: 1, // 奖项的ID ，用于
            not_winners: 0, //剩余奖品数量
        };
    },
    async mounted() {
        const { data } = await getPrize();
        this.prizeData = data;
        this.defaultPrize = this.prizeData[0].id;
        this.defaultGift = this.prizeData[0].gifts[0].name;
        this.gift_url = this.prizeData[0].gifts[0].images;
        this.gift = this.prizeData[0].gifts;
        this.not_winners = this.prizeData[0].gifts[0].not_winners;
    },

    methods: {
        handleprizeChange(value) {
            this.prizeId = value;
            this.defaultPrize = value;
            this.gift = this.prizeData[value - 1].gifts;
            this.defaultGift = this.prizeData[value - 1].gifts[0].name;
            this.gift_url = this.prizeData[value - 1].gifts[0].images;
            this.not_winners = this.prizeData[value - 1].gifts[0].not_winners;
        },
        handlegiftChange(value) {
            this.defaultGift = value;
            const gifts = this.prizeData
                .filter((val) => {
                    return val.id == this.prizeId;
                })[0]
                .gifts.filter((val) => {
                    return val.id == value;
                })[0];
            this.gift_url = gifts.images;
            this.not_winners = gifts.not_winners;

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
        lotteryStop() {
            this.$refs.UserList.stopGame();
        },
    },
};
</script>

<style >
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
