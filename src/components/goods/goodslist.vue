<template>
  <div class="goodslist_container">

    <router-link tag="div" :to="'/goodsdetail/'+item.id" class="item" v-for="item in goodslist" :key="item.id">
      <!-- <img :src="item.img_url" alt=""> -->
      <!-- v-lazy:可以实现图片的按需加载（图片达到可视区域才会加载图片） -->
      <lazy-component>
        <img v-lazy="item.img_url" alt="">
      </lazy-component>
      <div class='goodsName'>{{item.title}}</div>
      <div class="goodsInfo">
        <div class="price">
          <span class="now">¥ {{item.sell_price}}</span>
          <span class="old">¥ {{item.market_price}}</span>
        </div>
        <div class="hot">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span> 
        </div>
      </div>
    </router-link>

    <van-button type="danger" size="large" @click="loadMore">加载更多</van-button>
    
   
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Lazyload } from 'vant';
  Vue.use(Lazyload, {
    lazyComponent: true
  });
  import { getGoods } from '@/api/index.js'
  export default {
    data(){
      return {
        goodslist: [],
        pageindex: 1,
        hasGoods: true
      }
    },
    methods:{
      //获取商品列表数据
      getGoodsList(){
        //判断是否已经加载完毕
        if(this.hasGoods == false){
          this.$toast('没有更多')
          return
        }
        getGoods(this.pageindex).then( res => {
          if(res.message.length == 0){
            this.hasGoods = false
            this.$toast('数据已加载完毕')
            return
          }
          if(res.status == 0){
            //把原来的goodslist在连接返回res.message组成一个新数组，在赋值给goodslist
            this.goodslist = this.goodslist.concat( res.message )
            this.$toast('加载成功')
          }
        })
      },
      //加载更多商品
      loadMore(){
        this.pageindex ++;
        this.getGoodsList();
      }
    },
    created(){
      this.getGoodsList()
    }
  }
</script>

<style lang='scss' scoped>
  .goodslist_container{
    background: #eee;
    padding:5px;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;

    .item{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 47%;
      padding:3px;
      margin: 3px 5px;
      box-sizing: border-box;  
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0px 0px 10px #ccc;
      img{
        height: 160px;
        width: 100%;
      }
      .goodsName{
        font-size: 14px;
        color:#232326;
        overflow: hidden;
      }
      .goodsInfo{
        //display: flex;
        // flex-direction: row; // 横着排列，即主轴是横轴  横轴的space-between实现左右对齐
       // flex-direction: column; // 竖着排列，即主轴是纵轴  纵轴的space-between实现上下对齐
       // justify-content: space-between; //纵轴上下对齐
        color:#565252;
        .price{
          .now{
            color:red;
            font-weight: bold;
            margin-right: 20px;
          }
          .old{
            text-decoration: line-through;
            font-size: 12px;
          }

          
        }

        .hot{
            display: flex;
            justify-content: space-between;
        }
      }
    }
  }
   
</style>