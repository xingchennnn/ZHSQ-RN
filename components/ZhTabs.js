import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ZhTabsHeader from './ZhTabsHeader'
import ZhTabsBody from './ZhTabsBody'

export default function ZhTabs() {
  let [indx,setindx] =useState(0) 

  //切换页签- 传递给子组件ZhTabsHeader，用于获取子组件的数据
  // let switchTab=(i)=>{
  //   console.log('父组件接收到子组件1传来的数据' ,i)
  //   setindx(i)
  // }

  return (
    <View style={ss.tabs}>
      {/* F1：Tabs的头部部分 --ZhTabsHeader  --propsup */}
      <ZhTabsHeader change={setindx}/>
      {/* F2：Tabs的主题部分 --ZhTabsBody  --propsdown */}
      <ZhTabsBody   nub={indx}/>
    </View>
  )
}


let ss=StyleSheet.create({
  tabs:{
    backgroundColor:'#FFF',
    flex:1,
  }
})