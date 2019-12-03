<template>
  <div class="home_container">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#ccc">
      <van-swipe-item v-for="item in lunBoData" :key="item.img">
        <img class="item-img" :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>


    <!-- 九宫格 -->
    <van-grid :column-num="3" :border='false'>
      <router-link class="grid-item" tag="div" to="/newslist">
        <img src="../../assets/image/menu1.png" alt="">
        <div>新闻资讯</div>
      </router-link>
      <router-link class="grid-item" tag="div" to="/goodslist">
        <img src="../../assets/image/menu3.png" alt="">
        <div>商品购买</div>
      </router-link>
      <div class="grid-item">
        <img src="../../assets/image/menu2.png" alt="">
        <div>图片分享</div>
      </div>
      
      <div class="grid-item">
        <img src="../../assets/image/menu4.png" alt="">
        <div>留言反馈</div>
      </div>
      <div class="grid-item">
        <img src="../../assets/image/menu5.png" alt="">
        <div>视频专区</div>
      </div>
      <div class="grid-item">
        <img src="../../assets/image/menu6.png" alt="">
        <div>话费充值</div>
      </div>
      <div class="grid-item">
        <img src="../../assets/image/menu7.png" alt="">
        <div>联系我们</div>
      </div>
      <div class="grid-item">
        <img src="../../assets/image/menu8.png" alt="">
        <div >清仓特卖</div>
      </div>
      <div class="grid-item">
        <img src="../../assets/image/menu9.png" alt="">
        <div>一元福利</div>
      </div>
    </van-grid>
  </div>
</template>

<script>
  //导入请求接口的函数
  import { getlunbo } from '@/api/index.js'
  export default {
    data(){
      return {
        lunBoData:[]
      }
    },
    methods:{
      getLunBoData(){
        getlunbo().then( res => {
          if(res.status == 0){
            this.lunBoData = res.message
          }
        } )
      }
    },
    created(){
      //自调用，获取轮播图数据
      this.getLunBoData()
    }
  }
</script>

<style lang='scss' scoped>
  .home_container{
    // background-color: #fff;
    .van-swipe{
      height: 200px;
      background-color: #eee;

      .item-img{
        width: 100%;
        height: 200px;
      }
    }

    .van-grid{
      padding-top:10px;
      text-align: center;
      .grid-item{
        margin: 14px 2px;
        img{
          width: 45%;
        }
        div{
          color:#524949;
        }
      }
    }
  }
</style>