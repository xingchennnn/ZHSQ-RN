// 服务器接口封装模块

import AsyncStorage from "@react-native-async-storage/async-storage"

// 服务器基础地址
export const base = 'https://www.codeboy.com/zhsqapi/'
// export const base = 'https://web.codeboy.com/zhsqapi/'

/**
 * 接口地址：user/login
请求方式：POST
请求主体格式：application/json   
请求数据说明：
名称	必填	类型	说明
phone	是	string	手机号
pwd	是	string	密码

 */
export let userLogin = async(phone,pwd)=>{
  let uri = base + 'user/login'
  let options ={
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({phone,pwd})  //请求主体：必须手动进行json序列化
  }
  // 发起异步请求，得到响应数据
  let res = await fetch(uri,options)
  // 读取响应信息，得到json内容
  let data= await res.json()
  // 返回主题信息
  return data
}


/**
 * 7.1、商城首页数据
接口地址：mall/index
请求方式：GET
请求参数：无
请求头部：token - 用户登录后保存在客户端的身份凭证
 */
export let mallIndex = async()=>{
  let uri = base + 'mall/index'
  let options ={
    method:"GET",
    headers:{
      "token":await AsyncStorage.getItem('userToken')
    },
    body:JSON.stringify()  //请求主体：必须手动进行json序列化
  }
  // 发起异步请求，得到响应数据
  let res = await fetch(uri,options)
  // 读取响应信息，得到json内容
  let data= await res.json()
  // 返回主题信息
  return data
}

/**
 * 接口地址：mall/goods/list
请求方式：GET
查询参数： 
名称	必填	类型	说明
tid	可选	int	待查询的商品类型
1-折扣商品，默认值
2-新年精选
3-品牌精选
...
order	可选	string	查询结果排序方法，可选值：
soldcount：销量，默认值
price-asc：价格升序排列
price-desc：价格降序排列
 */
export let mallGoodsList= async(tid=1 , order="soldcount")=>{
  let uri = base + `mall/goods/list?tid=${tid}&order=${order}`
  
  // 发起异步请求，得到响应数据
  let res = await fetch(uri)
  // 读取响应信息，得到json内容
  let data= await res.json()
  // 返回主题信息
  return data
}

/**
 * 7.3、返回指定编号的商品详情
  接口地址：mall/goods/details
  请求方式：GET
  查询参数： 
  名称	必填	类型	说明
  gid	必需	int	待查询的商品编号

 */
  export let mallGoodsDetail= async(gid)=>{
    let uri = base + `mall/goods/details?gid=${gid}`
    
    // 发起异步请求，得到响应数据
    let res = await fetch(uri)
    // 读取响应信息，得到json内容
    let data=  res.json()
    // 返回主题信息
    return data
  }