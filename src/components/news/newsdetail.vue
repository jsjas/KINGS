<template>
  <div class="newsdetail_container">
    <h3 class="title">{{newsInfo.title}}</h3>
    <div class="subtitle">
      <span>发布时间：{{newsInfo.add_time | dateFormat}}</span>
      <span>点击：{{newsInfo.click}}次</span>
    </div>
    <div class="content" v-html="newsInfo.content">
    </div>
    <div class="comment">
      <!-- 文本域 -->
      <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label=""
          label-width = '0px'
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
      <!-- 评论按钮 -->
      <van-button class="postComment" type="default" color="#4d7ce6" @click='addComment' size="large">评论</van-button>
      <!-- 评论列表 -->
      <div class="commentlist">
        <div class="item" v-for="item in comments" :key="item.id">
          <div>{{item.user_name}}：{{item.content}}</div>
          <div>评论时间：{{item.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</div>
        </div>
      </div>
      <!-- 查看更多按钮 -->
      <van-button class="loadMore" :loading='loading'  loading-text="加载中..." plain type="primary" size="large" @click='loadMore'>查看更多</van-button>
    </div>
  </div>
</template>

<script>
  import { getNewsDetail,getNewsComments,sendComment } from '@/api/index.js'
  export default {
    data(){
      return {
        id: this.$route.params.id,
        pageIndex: 1, //默认第一页数据
        message: '',
        newsInfo: {},
        comments: [],
        loading: false,
        hasComment: true
      }
    },
    methods:{
      //获取文章详情
      getNews(){
        getNewsDetail(this.id).then( res => {
          if(res.status == 0){
            this.newsInfo = res.message[0]
          }
        })
      },
      //获取文章的评论数据
      getComments(){
        //请求之前，判断是否有数据
        if(this.hasComment === false){
          this.$toast('没有更多数据')
           this.loading = false
          return
        }

        getNewsComments(this.id, this.pageIndex).then(  res=>{
          this.loading = false // 恢复加载更多评论
          //先判断是否有评论数据
          if(res.message.length === 0){
            //说明没有评论数据
            this.$toast('没有更多数据')
            this.hasComment = false

            return
          }
          //需要把评论数据进行连接
          // this.comments = res.message
          this.comments = this.comments.concat(res.message)
          
        } )
      },
      //发表评论
      addComment(){
        sendComment(this.id,this.message).then( res => {
          if(res.status === 0){
            this.$toast('评论成功')
            //构造一个对象，放到comments数组的开头
            var comment = {
              id: Math.random(),
              add_time: new Date(),
              user_name: '匿名用户',
              content: this.message
            }
            this.comments.unshift(comment)
            //清空
            this.message = ''
          }
        })
      },
      //加载更多评论数据
      loadMore(){
        this.loading = true;
        ++ this.pageIndex 
        this.getComments()
      }

    },
    created(){
      this.getNews()
      this.getComments()
    }
  }
</script>

<style lang="scss" scoped>
  .newsdetail_container{
    padding:8px;
    background-color: #eee;

    .title{
      text-align: center;
      color:#404040;
      padding: 8px 0px;
    }

    .subtitle{
      color:#888888;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #888888;
      margin-bottom:10px;
    }

    .content{
      margin-bottom: 5px;
      /deep/  img{
        width: 100%;
      }
    }

    .comment{
      .commentlist{
        .item{
          background-color: #e8e8e8;
          font-size: 12px;
          margin-top:6px;
        }
      }
      .postComment{
        margin-top:10px;
      }
      .loadMore{
        color:red;
        border:1px solid red;
        margin-top: 20px;
      }
    }
  }
</style>