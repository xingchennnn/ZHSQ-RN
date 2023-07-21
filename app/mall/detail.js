import { View, Text, Image, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter, useSearchParams,Stack } from 'expo-router'
import { base, mallGoodsDetail } from '../../service'
import { zhBorderWidth, zhSpacingColLg, zhSpacingColSm, zhSpacingColbase, zhSpacingRowLg, zhThemeColor } from '../../global'

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
      setgoods(data)
    })()
  }, [gid])
  console.log(goods)

  return (
    <View>
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
      {/* F8: 商品详细介绍 */}
    </View>
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
    backgroundColor:"#afa",
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

})