

<template>
  <div>
    <img
      src="../../../assets/prize.png"
      alt="笔记本"
      class="img"
    >
    <div class="flex-center">
      <a-icon
        type="left"
        class="arrow"
      />
      <div class="padding">{{msg}}</div>
      <div class="padding">1 </div>
      <a-icon
        type="right"
        class="arrow"
      />
    </div>

  </div>
</template>

<script>
export default {
    name: "Choose",
    props: ["msg"],
};
</script>

<style>
.img {
    width: 50%;
}
</style>
