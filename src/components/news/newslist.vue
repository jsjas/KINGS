<template>
  <div class="newslist_container"> 
    <van-loading size="24px" v-show='flag' vertical>加载中...</van-loading>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="newslist">

        <router-link tag="div" :to="'/newsdetail/' + item.id" class="newsitem" v-for="item in newslist" :key="item.id">
          <div class="img_container">
              <img :src="item.img_url" alt="">
          </div>
          <div class="info">
            <h3 class="title">{{item.title}}</h3>
            <div class="time_click">
              <div class="time">发布时间：{{item.add_time | dateFormat}} </div>
              <div class="click">点击：{{item.click}}次</div>
            </div>
          </div>
        </router-link>

      </div>
    </van-pull-refresh>
    
  </div>
</template>

<script>
  //引入接口
  import { getnewslist } from "@/api/index.js"
  export default {
    data(){
      return {
        newslist: [],
        isLoading: false,
        flag:true,
      }
    },
    methods:{
      // 请求新闻资讯列表数据
      getNewlist(hasPull){
        getnewslist(hasPull).then( res => {
          if(res.status === 0){
            //隐藏loading提示,和下拉刷新提示
            this.flag = this.isLoading = false
            this.newslist = res.message
          }
        })
      },
      //下拉刷新事件
      onRefresh(){
        //下拉重新获取数据
        // console.log('下啦了');
        // console.log(this.isLoading); //此事件只要触发就会自动设置为true
        // this.$toast('刷新成功') 
        this.getNewlist(true)
      }
    },
    created(){
      //加载新闻资讯的数据
      this.getNewlist(false)
    }
  }
</script>

<style lang='scss' scoped>

  .newslist_container{
     background-color: #eee;
     padding:8px;
    .newslist{
      .newsitem{
        display: flex;
        // justify-content:space-between;
        align-items: center;
        border-bottom: 1px solid #888888;
        padding-bottom: 3px;


        .img_container{
          margin-right:5px;
          width: 100px;
          height: 100px;
        }

        .info{
          .title{
              font-size:14px;
            }
          .time_click{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color:#888888;
            margin-bottom:10px;
            
            .time{
              margin-right: 5px;
            }

            .click{
              margin-left:15px;
            }
          }
        }
      }
    }
  }

  img{
    width: 100px;
    height: 90px;
  }
</style>