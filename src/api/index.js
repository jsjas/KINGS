
import axios from 'axios'

import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

axios.defaults.baseURL = 'http://127.0.0.1:3000/api'

export const getlunbo = async function () { 
  var res = await axios.get('/getlunbo')
  return res.data
}

export const getnewslist = async function (hasFull) { 
  var res = await axios.get('/getnewslist')
  if( hasFull ) {
    Toast('刷新成功') 
  }
  return res.data
}

export const getNewsDetail = async function (id) { 
  var res = await axios.get('/getnew/' + id)
  return res.data
}

export const getNewsComments = async function (id, pageindex) { 
  var res = await axios.get('/getcomments/' + id + '?pageindex=' + pageindex)
  return res.data
}


export const sendComment = async function (id, content) { 
  // 对post表单的数据进行编码，模拟post表单来传递数据
  // 类似  x-www-urlencode-form
  var params = new URLSearchParams()
  params.append('content', content)
  var res = await axios.post('/postcomment/' + id, params)
  return res.data
}

export const getGoods = async function (id) { 
  var res = await axios.get('/getgoodsinfo/' + id)
  return res.data
}

export const getGoodsThumb = async function (id) { 
  var res = await axios.get('/getthumbimages/' + id)
  return res.data
}


