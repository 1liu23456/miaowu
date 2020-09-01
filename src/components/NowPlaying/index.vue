<template>
  <div class="movie_body" ref="movie_body">
    <Scroller :handlToScroll="handlToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.id">
          <div class="pic_show" @click="handleToDetail">
            <!-- <a href="https://m.maoyan.com/#movie"> -->
            <img :src="item.img | setWH('120.180')" />
            <!-- </a> -->
          </div>
          <div class="info_list">
            <h2>
              {{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" />
            </h2>
            <p>
              观众评 <span class="grade">{{ item.sc }}</span>
            </p>
            <p>主演： {{ item.star }}</p>
            <p>{{ item.showInfo }}</p>
            <!-- <span class="movie_rt">上映时间：{{ item.rt }}</span> -->
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
// import BScroll from "better-scroll";

export default {
  name: "CommingSoon",
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
    };
  },
  methods: {
    handleToDetail() {
      console.log("handleTOdet");
    },
    handlToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中...";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/goods").then((res) => {
          if (res.status === 200) {
            this.pullDownMsg = "更新成功...";
            setTimeout(() => {
              this.movieList = res.data.data;
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    },
  },

  mounted() {
    this.axios.get("/api/goods").then((res) => {
      // console.log(res);
      var msg = res;
      if (res.status === 200) {
        this.movieList = res.data.data;
        console.log(this.movieList);
        // 确保数据渲染完毕 第一个参数 被包裹容器 第二个是配置
        // this.$nextTick(() => {
        //   var scroll = new BScroll(this.$refs.movie_body, {
        //     click: true,
        //     probeType: 1,
        //   });
        //   // 滚动时触发  需配置 probeType
        //   scroll.on("scroll", (pos) => {
        //     // console.log('scroll');
        //     // 打印出手指 拖动距离  下拉为正
        //     // console.log(pos);
        //     if (pos.y > 30) {
        //       this.pullDownMsg = "正在更新中...";
        //     }
        //   });
        //   scroll.on("touchEnd", (pos) => {
        //     // console.log('touchEnd');
        //     if (pos.y > 30) {
        //       this.axios.get("/api/goods").then((res) => {
        //         if (res.status === 200) {
        //       this.pullDownMsg = '更新成功...'
        //       setTimeout(() => {
        //           this.movieList = res.data.data;
        //           this.pullDownMsg = ''
        //       }, 1000)
        //         }
        //       });
        //     }
        //   });
        // });
        // let scroll = new BScroll(".movie_body");
        // console.log(scroll);
        //         this.$nextTick(() => {
        //     if (!this.scroll) {
        // 	this.scroll = new BScroll(this.$refs.movie_body, {})
        // 	console.log(this.scroll)
        //     }
        //  })
      }
    });
  },
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
  max-height: 520px;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
.movie_body .pullDown {
  padding: 0;
  margin: 0;
  border: none;
  padding-left: 35%;
  color: hotpink;
  background-color: skyblue;
}
</style>
