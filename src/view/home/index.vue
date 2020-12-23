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

          <!-- <Level :msg='level' /> -->
          <a-select
            :default-value="levelData[0]"
            style="width: 120px;"
            @change="handlelevelChange"
          >
            <a-select-option
              v-for="level in levelData"
              :key="level"
            >
              {{ level }}
            </a-select-option>
          </a-select>
          <!-- <Prize :msg='prize' /> -->
          <div>

            <div><img
                src="../../assets/prize.png"
                alt="笔记本"
                class="img"
              ></div>
            <a-select
              v-model="secondprize"
              style="width: 120px"
              class="select"
            >
              <a-select-option
                v-for="prize in prizes"
                :key="prize"
                class="option"
              >
                {{ prize }}
              </a-select-option>
            </a-select>

          </div>
          <Quantity />
          <a-button
            type='primary'
            @click="lotteryStart"
          >开始</a-button>
          <a-button
            type='primary'
            @click="lotteryStop"
          >停止</a-button>
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
// require("./components/tagCanvas.js");

const levelData = ["一等奖", "二等奖"];

const prizeData = {
    一等奖: ["苹果", "笔记本"],
    二等奖: ["苹果一袋", "笔记本和笔"],
};
export default {
    name: "Home",
    components: { Quantity, UserList },
    data: function() {
        return {
            successful: false,
            disabled: false,
            size: 50,
            levelData,
            prizeData,
            prizes: prizeData[levelData[0]],
            secondprize: prizeData[levelData[0]][0],
        };
    },
    mounted() {},

    methods: {
        handlelevelChange(value) {
            this.prizes = prizeData[value];
            this.secondprize = prizeData[value][0];
        },
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
