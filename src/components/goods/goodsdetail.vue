<template>
  <div class="goodsdetail_container">
    <!-- 轮播图 -->
    <van-swipe  :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunboData" :key="item.src">
        <img :src="item.src" alt="">
      </van-swipe-item>
     
    </van-swipe>
    <!-- 商品详基本信息 -->
    <div class="goodsInfo">
      <div class="goodsName">{{goodsInfo.title}}</div>
      <div class="price">
        <span>市场价：<span class="marketPrice">¥{{goodsInfo.market_price}}</span></span>
        <span>本店家：<span class="nowPrice">¥{{goodsInfo.sell_price}}</span></span>
      </div>
      <div class="goodsNumber">
        <span>购买数量：</span>
        <van-stepper v-model="value" />
      </div>
      <div class="btn-group">
        <van-button class="btn" type="info">立即购买</van-button>
        <van-button class="btn" type="danger">加入购物车</van-button>
      </div>
    </div>
    <!-- 商品的其他信息 -->
    <div class="otherInfo">
      <div class="title">
          <h3>其他信息</h3>
      </div>
      <div class="goods">
        <span>商品货号：{{goodsInfo.goods_no}}</span>
        <span>库存情况：{{goodsInfo.stock_quantity}}件</span>
        <span>上架时间：{{goodsInfo.add_time | dateFormat('YYYY-MM-DD')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { getGoodsThumb, getGoods } from '@/api/index.js'
  export default {
    data(){
      return {
        id: this.$route.params.id,
        value: 1,
        lunboData: [],
        goodsInfo: {}
      }
    },
    methods:{
      //获取商品轮播图
      getLunBo(){
        getGoodsThumb(this.id).then( res => {
          if(res.status == 0){
            this.lunboData = res.message
          }
        })
      },
      //获取商品的信息
      getGoodsInfo(){
        getGoods(this.id).then( res => {
          if(res.status == 0){
            this.goodsInfo = res.message[0]
          }
        } )
      }
    },
    created(){
      this.getLunBo()
      this.getGoodsInfo()
    }
  }
</script>

<style lang='scss' scoped>
  .goodsdetail_container{
    background-color: #eee;
    padding:5px 8px;

    .van-swipe{
      height: 240px;
      width: 100%;
      border-radius: 3px;
      background-color: #fff;
      .van-swipe-item{
        width: 100%;
        text-align: center;
        img{
          height: 240px;
          // width: 100%;
          
        }

      }
    }

    .goodsInfo{
      border-radius: 3px;
      background-color: #fff;
      margin-top:10px;
      padding:5px 8px;
      .goodsName{
        font-size: 16px;
        border-bottom:1px solid #888888;
        margin-bottom:10px;
        padding:10px 0px;
      }

      .price{
        margin-bottom: 10px;
        .marketPrice{
          text-decoration: line-through;
          margin-right: 20px;
        }
        .nowPrice{
          font-weight: bold;
          color:red;
        }
      }

      .goodsNumber{
        display: flex;
      }

      .btn-group{
        display: flex;
        margin-top:10px;
        justify-content: space-between;
        .btn{
          width:150px;
        }
      }

     
    }

    .otherInfo{
      border-radius: 3px;
      background-color: #fff;
      margin-top:10px;
      padding:5px 8px;

      .title{
        border-bottom: 1px solid #888888;
        margin: 15px 0px;
      }

      .goods{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
</style>