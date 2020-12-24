<template>
  <div class="flex-center">
    <a-icon
      type="minus-circle"
      class="arrow"
      @click='reduce'
    />
    <div class="padding">抽{{count}}人</div>
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
            count: 1,
            notWin: this.not_winners,
        };
    },

    methods: {
        plus() {
            this.count >= this.not_winners ? this.$message.info("剩余奖品数量不足") : this.count++;

            bus.$emit("sendByBus", this.count);
        },
        reduce() {
            this.count <= 1 ? (this.count = 1) : this.count--;
            bus.$emit("sendByBus", this.count);
        },
    },
};
</script>

<style>
</style>
