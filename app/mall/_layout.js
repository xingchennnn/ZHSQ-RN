import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { zhThemeColor } from '../../global'

export default function _layout() {
  let router = useRouter()
  return (
    // mall目录下的页面采用栈式导航
    // screenOptions用于配置当前目录下的所有页面的共性
    <Stack screenOptions={{
      headerStyle:{backgroundColor:zhThemeColor }, //导航条背景颜色
      headerTintColor:'#fff',         //导航条的颜色颜色(文字颜色)
      headerTitleStyle:{fontSize:16}, //导航条的标题样式
      headerTitleAlign:'center' ,    //标题文字对其方式
    }}>
      <Stack.Screen name='list' //页面的地址名称
        options={{
          // headerShow:false,   //是否显示header
          title:'商品列表',
          headerLeft:()=>(<Text onPress={_=>{router.replace('/tabs/community')}} style={{color:'#fff'}}>返回</Text>),        //左侧内容
          headerRight:()=>(<></>),       //右侧内容
          headerTitle:()=>(<Image style={{width:30,height:30}} source={require('../../assets/img/logo.png')}/>)
        }} />
      <Stack.Screen name='detail' options={{
          title:'商品详情'
      }} />
    </Stack>
  )
}