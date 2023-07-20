import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { zhSpacingColSm, zhSpacingRowbase, zhThemeColor } from '../../global'

export default function _layout() {
  let router = useRouter()
  return (
    // 标签式导航,为页签提供'顶部导航条'和底部导航条
    <Tabs screenOptions={{
      /***************下面是共有的**************** */
      headerStyle: { backgroundColor: zhThemeColor },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 16 },
      /***************下面是Tabs导航专有的**************** */
      tabBarStyle: { height: 63, paddingBottom: zhSpacingColSm },
      tabBarLabelStyle: { fontSize: 14 }, // 文字样式
      tabBarActiveTintColor: zhThemeColor,// 标签文字激活时的颜色
      // tabBarInactiveTintColor:'#f00',// 标签文字未激活时的颜色

    }}>
      <Tabs.Screen name='home' options={{
        title: '智慧社区',
        headerRight: () => (<TouchableOpacity activeOpacity={0.6} onPress={_ => Alert.alert('提示', '您确定要退出吗?', [
          { text: '确定', onPress: () => router.replace('/') },
          { text: '取消' }
        ])}>
          {/* 触摸后不透明度可以发生改变的组件 */}

          <Image style={{ width: 30, height: 30, marginRight: zhSpacingRowbase }} source={require('../../assets/img/user1.png')} />
        </TouchableOpacity>),
        /***************下面选项Tabs导航专有的**************** */
        tabBarLabel: '首页',
        // 当前页签对应的图标: 激活时状态的图标 + 未激活状态的图标
        tabBarIcon: ({ focused, color, size }) => {
          //框架调用当前函数时，会传递进来一个实参: {focused,color,size}
          if (focused) { //当前页签获得焦点
            return <Image source={require('../../assets/img/home_active.png')}
              style={{ width: 32, height: 32 }} />
          } else {      //当前页签失去焦点
            return <Image source={require('../../assets/img/home.png')}
              style={{ width: 32, height: 32 }} />
          }
        }

      }} />
      <Tabs.Screen name='property' options={{
        title: '物 业',
        tabBarLabel:'物业',
        tabBarIcon: ({ focused }) => {
          if(focused){
            return <Image style={{width:32 , height:32}} source={require('../../assets/img/property_active.png')} />
          }else{
            return <Image style={{width:32 , height:32}} source={require('../../assets/img/property.png')} />
          }
        }
      }} />
      <Tabs.Screen name='community' options={{
        title: '社 区',
        tabBarLabel:'社区',
        tabBarIcon: ({ focused }) => {
          if(focused){
            return <Image style={{width:32 , height:32}} source={require('../../assets/img/community_active.png')} />
          }else{
            return <Image style={{width:32 , height:32}} source={require('../../assets/img/community.png')} />
          }
        }
      }} />
      <Tabs.Screen name='my' options={{
        title: '我 的',
        tabBarLabel:'我的',
        tabBarIcon: ({ focused }) => {
          if(focused){
            return <Image style={{width:32 , height:32}} source={require('../../assets/img/my_active.png')} />
          }else{
            return <Image style={{width:32 , height:32}} source={require('../../assets/img/my.png')} />
          }
        }
      }} />
    </Tabs>
  )
}
