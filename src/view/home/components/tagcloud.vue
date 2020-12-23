<template>
  <div id="myCanvasContainer">
    <canvas
      width="1000"
      height="1000"
      id="myCanvas"
    >
      <p>Anything in here will be replaced on browsers that support the canvas element</p>

      <ul>
        <li
          v-for="item in list"
          :key='item.index'
        ><a>
            <img
              :src="item._url"
              width="40px"
              height="40px"
            >
            {{item.name}}

            <!-- <a-avatar
              :src='item._url'
              :size='avatar'
              id="avatar"
            /> -->

          </a></li>

      </ul>

    </canvas>
  </div>
</template>

<script>
require("./tagCanvas");

export default {
    name: "tagcloud",
    data: function() {
        return {
            list: [
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
                {
                    name: "张小凡",
                    id: 1,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3455415166,1606585041&fm=26&gp=0.jpg",
                },
                {
                    name: "陆雪琪",
                    id: 2,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg",
                },
                {
                    name: "碧瑶",
                    id: 3,
                    department: "蓝深信息中心",
                    _url:
                        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1475331839,2066156315&fm=26&gp=0.jpg",
                },
            ],

            list2: [1],
        };
    },
    mounted() {
        window.TagCanvas.textColour = "#000";
        window.TagCanvas.minSpeed = 0.05;
        window.TagCanvas.imageMode = "both";
        window.TagCanvas.imagePosition = "top";
        // window.TagCanvas.freezeActive = true;
        window.TagCanvas.initial = [0.05, 0.05];
        window.TagCanvas.Start("myCanvas");
    },
};
</script>

<style scoped>
</style>
