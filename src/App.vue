<template>
  <div id="app">
    <router-view />

  </div>
</template>

<script>
// import Home from "./view/home";

export default {
    name: "App",
};
</script>

<style>
#app {
    height: 100%;
    padding: 30px;
    user-select: none;
    background-image: url("./assets/bgc.jpg");
    background-size: cover;
    overflow-x: auto;
}
</style>
