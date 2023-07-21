import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { mallIndex } from '../../service'
import ZhSwiper from '../../components/ZhSwiper'
import ZhTabs from '../../components/ZhTabs'


//上下文第一步, 创建上下文对象,并导出,供子孙使用
import { GoodsTypesCtx } from '../../ctx'
// export let GoodsTypesCtx = React.createContext()

export default function List() {
  let [userinfo ,setuserinfo] = useState({})
  let [carousels ,setcarousels] = useState({})
  let [goodsTypes ,setgoodsTypes] = useState({})


  useEffect(()=>{
    // 注意:此处不允许给外部函数直接添加async --Effect方法只能返回promise
    (async()=>{
      let data = await mallIndex()
      setuserinfo(data.userinfo)
      setcarousels(data.carousels)
      setgoodsTypes(data.goodsTypes)
    })()
  },[])
  return (
    <View style={{height:'100%'}}>
      {/* F1:顶部状态栏 */}
      <StatusBar barStyle="light-content"/>
      {/* F2:头部的标题栏 -_layout中的Stack导航已经设置完成 */}
      {/* F3:上方的轮播广告 */}
      <ZhSwiper list={carousels}/>
    
      {/* F4:主题的标签页 --使用自定义组件 */}
      {/* <View style={{flex:1}}>  ------------暂时取消*/}
      {/* 使用上下文对象的步骤2 :在上下文中提供数据 */}
      <GoodsTypesCtx.Provider value={goodsTypes}>
        <ZhTabs/>
      </GoodsTypesCtx.Provider>
      {/* </View> */}

    </View>
  )
}