<template>
  <div class="flex-center">
    <a-icon
      type="minus-circle"
      class="arrow"
      @click='reduce'
    />
    <div class="padding">{{count}}人</div>
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

    data: function() {
        return {
            count: 1,
        };
    },
    methods: {
        plus() {
            this.count++;
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
