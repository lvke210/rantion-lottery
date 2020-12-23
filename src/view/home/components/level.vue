<template>
  <div class="flex-center">
    <a-icon
      type="left"
      class="arrow"
    />
    <div class="padding">{{msg[0]}}</div>
    <a-icon
      type="right"
      class="arrow"
    />
  </div>

</template>

<script>
export default {
    name: "Choose",
    props: [{ msg: [] }],
};
</script>

<style>
.arrow {
    margin-top: 5px;
}
</style>
