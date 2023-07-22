import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter, useSearchParams,Stack } from 'expo-router'
import { base, mallGoodsDetail } from '../../service'
import { zhBorderColor, zhBorderWidth, zhSpacingColLg, zhSpacingColSm, zhSpacingColbase, zhSpacingRowLg, zhSpacingRowbase, zhThemeColor } from '../../global'
import {WebView} from "react-native-webview"
import AutoHeightWebView from 'react-native-autoheight-webview'

export default function Detail() {
  let [goods, setgoods] = useState({})

  let { width } = useWindowDimensions()

  // let x =  useSearchParams()  //返回值多
  let { gid } = useLocalSearchParams() //返回值只有参数
  console.log(gid)

  let router = useRouter()
  useEffect(() => {
    //1.读取上个页面传递来的路由参数gid,如果没有跳转回列表页
    if (!gid) {
      router.replace('/mall/list')
      return
    }
    //2.根据此gid异步查询服务器端接口数据
    (async () => {
      let data = await mallGoodsDetail(gid)
      // console.log('获取到的值',data)
      data.details = data.details.replace(/src="img/g,`src="${base}img`)
      data.details = data.details.replace(/<img/g,`<img style="width:100%"`)
      setgoods(data)
    })()
  }, [gid])
  // console.log(goods)

  return (
    <ScrollView style={{height:'100%'}}>
      {/* f0:动态修改导航器的内容 */}
      <Stack.Screen options={{title:goods.shortTitle}}/>
      {/* F1: 顶部的banner图片*/}
      <Image style={{ width: width, height: width }} source={{ uri: base + goods.mainPic }} />
      {/* F2: 主标题 */}
      <Text style={ss.title}>{goods.goodsName}</Text>
      {/* F3: 副标趣*/}
      <Text style={ss.subTitle}>{goods.descriptions}</Text>
      {/* F4: 原价 */}
      <Text style={ss.price}>价格:
        <Text style={{ textDecorationLine: goods.discount < 1 ? 'line-through' : 'none' }}>￥{goods.originalPrice}</Text>
      </Text>
      {/* F5: 折扣价 */}
      {goods.discount<1&&(
      <Text style={ss.discountprice}>促销价格：
        <Text style={{color:'#F00'}}>￥{(goods.originalPrice * goods.discount).toFixed(2)}</Text>
      </Text>
      )}
      
      {/* F6: 两个按钮 */}
      <View style={ss.f6}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={ss.buy}>立即购买</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={ss.add}>添加到购物车</Text>
        </TouchableOpacity>
      </View>
      {/* F7: 商品详情标题字 */}
      <Text style={ss.f7}>商品详情</Text>
      {/* F8: 商品详细介绍 */}
      {/* <WebView source={{uri:'https://www.tmooc.cn'}} /> */}
      {/* <Text>{goods.details}</Text> */}
    
        <WebView style={{height:5000}} source={{html:goods.details}} />
        {/* <AutoHeightWebView  source={{html:goods.details}}></AutoHeightWebView> */}
        {/* <Text onPress={_=>{console.log('123132')}}>{goods.details}</Text> */}
    </ScrollView>
  )
}
let ss = StyleSheet.create({
  title: {
    fontSize: 15,//字体大小
    marginVertical: zhSpacingColLg,
  },
  subTitle: {
    fontSize: 13,
    color: '#777'
  },
  price: {
    paddingHorizontal: zhSpacingRowLg,
    marginTop: zhSpacingColLg,
  },
  discountprice: {
    paddingHorizontal: zhSpacingRowLg,
    marginTop: zhSpacingColLg,
  },
  f6:{
    flexDirection:'row',
    paddingHorizontal:zhSpacingRowLg,
    marginTop:zhSpacingColLg,
  },
  buy:{
    borderColor:zhThemeColor,
    color:zhThemeColor,
    backgroundColor:"#cfc",
    borderWidth:zhBorderWidth,
    textAlign:'center',
    paddingVertical:zhSpacingColSm*2,
    paddingHorizontal:zhSpacingRowLg*2,
    marginRight:zhSpacingRowLg*2,
  },
  add:{
    borderColor:zhThemeColor,
    color:"#afa",
    backgroundColor:zhThemeColor,
    borderWidth:zhBorderWidth,
    textAlign:'center',
    paddingVertical:zhSpacingColSm*2,
    paddingHorizontal:zhSpacingRowLg*2,
  },
  f7:{
    fontSize:15,
    color:'#777',
    padding:zhSpacingRowbase,
    borderBottomColor:zhBorderColor,
    borderBottomWidth:zhBorderWidth,
  },

})