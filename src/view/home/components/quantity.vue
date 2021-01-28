<template>
  <div class="flex-center">
    <a-icon
      type="minus-circle"
      class="arrow"
      @click='reduce'
    />
    <!-- <div class="padding">{{count}}人</div> -->
    <input
      class="ipt"
      type="text"
      v-model="count"
      @keyup="hangleKeyup()"
      @focus="focus($event)"
    >

    <!-- <input type = "text" name= "number" id = 'number' onkeyup= "if(! /^d+$/.test(this.value)){alert('只能整数');this.value='';}" /> -->

    <a-icon
      type="plus-circle"
      class="arrow"
      @click='plus'
    />
  </div>
</template>

<script>
import bus from "../../../assets/js/eventBus";
export default {
    name: "Quantity",
    props: { not_winners: Number },
    data: function() {
        return {
            count: 10,
            notWin: this.not_winners,
        };
    },

    methods: {
        focus(event) {
            event.currentTarget.select();
        },
        plus() {
            this.count >= this.not_winners ? this.$message.info("剩余奖品数量不足") : this.count++;

            bus.$emit("sendByBus", this.count);
        },
        reduce() {
            this.count <= 1 ? (this.count = 1) : this.count--;
            bus.$emit("sendByBus", this.count);
        },
        hangleKeyup() {
            bus.$emit("sendByBus", this.count);
            this.count > this.not_winners
                ? (this.$message.info("剩余奖品数量不足"), (this.count = this.not_winners))
                : "";
            // this.count == 0 ? (this.count = 1) : "";
        },
    },
};
</script>

<style>
.ipt {
    color: #000;
    text-align: center;
    width: 50px;
    border-radius: 10px;
    margin: 0 10px;
    border: none;
}
</style>
