<template>
  <div class="app_container">
    <!-- nav固定导航 -->
    <van-nav-bar
      fixed
      title="爱购商城"
      :left-text="backText"
      :left-arrow="isBack"
      @click-left="goBack"
     
    />

    <!-- 这里的内容是动态变化的，存放匹配导航的内容 -->
    <router-view></router-view>
    
    <!-- 底部tabbar菜单 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o"  info="20" to="/shopcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/person" >个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        active: 1,
        backText:'',
        isBack: false
      }
    },
    methods:{
      goBack(){
        //返回上一页
        this.$router.go(-1)
      }
    },
    watch:{
      $route:function(newPath,oldPath){
        //oldPath: 切换之前的路由
        //newPath: 切换之后的路由
        // console.log(newPath.path,oldPath.path)
        if(newPath.path == '/home'){
          //如果是/home,则不显示返回操作
          this.isBack = false
          this.backText = ''
        }else{
          //显示返回操作
          this.isBack = true
          this.backText = '返回'
        }
      }
    }
  }
</script>

<style lang='scss'  scoped>
   .app_container{
      //  background-color: #eee;
      padding-top: 46px;
      padding-bottom: 50px;
      .van-nav-bar{
        background-color: #4d7ce6;
        .van-nav-bar__title{
          color:#fff;
        }
        .van-nav-bar__text{
          color:#fff;
        }
        .van-nav-bar__arrow{
          color:#fff;
        }
      }
   } 
</style>