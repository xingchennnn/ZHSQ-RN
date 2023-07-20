import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

// 使用上下文对象的步骤3 , 孙辈组件找到爷爷的组件共享
import { GoodsTypesCtx } from '../app/mall/list'


export default function ZhTab0() {
  // 使用上下文对象步骤4:从上下文中读取数据
  let types = useContext(GoodsTypesCtx)
  console.log('读取上下文共享对象',types)
  return (
    <View style={ss.tab0}>
      {/* 左侧:商品列表 */}
      <Text>左</Text>
      {/* 右侧:当前类别下的商品列表 */}
      <Text>右</Text>

    </View>
  )
}

let ss = StyleSheet.create({
  tab0:{
    // 
    flexDirection:'row',

  },
  left:{

  }
})