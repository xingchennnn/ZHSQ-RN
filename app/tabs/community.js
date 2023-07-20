import { View, Text, StatusBar, FlatList, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { zhBorderColor, zhBorderWidth, zhSpacingColLg, zhSpacingColSm } from '../../global'
import { useRouter } from 'expo-router'

export default function Community() {
  let router = useRouter()
  let {width } = useWindowDimensions()
  let iconWidth = width * 0.5 * 0.4 //每一个小图标的宽高
  
  let menuList = [
    {id:100 ,title:'社区商城', icon:require('../../assets/img/cart.png') , href:'/mall/list'},
    {id:101 ,title:'社区医疗', icon:require('../../assets/img/hospital.png') , href:'/mall/list'},
    {id:102 ,title:'邻里互动', icon:require('../../assets/img/tree.png' ), href:'/mall/list'},
    {id:103 ,title:'社区活动', icon:require('../../assets/img/news.png' ), href:'/mall/list'},
    {id:104 ,title:'便民服务', icon:require('../../assets/img/list.png' ), href:'/mall/list'},
    {id:105 ,title:'志愿服务', icon:require('../../assets/img/earth.png') , href:'/mall/list'},
  ]
  let renderMenuItem = ({item})=>{
    
    return(
      <TouchableOpacity style={ss.menu} activeOpacity={0.5} onPress={()=>(router.push(item.href))}>
        <Image  style={[ss.icon,{width:iconWidth , height:iconWidth}]} source={item.icon}/>
        <Text style={ss.title}>{item.title}</Text>
      </TouchableOpacity>
    ) 
  }
  return (
    <View>
      {/* F1: 顶部状态栏 */}
      <StatusBar barStyle='#fff'/>
      {/* F2: 标题栏 - 由_layout中的页签式导航设定完成 */}
      {/* F3: 主题:六宫格系统 */}
      {/* FlatList:平面列表:在水平竖直方向上展开多个列表项 */}
      {/* data:列表中要渲染的数据 */}
      {/* renderItem:如何渲染一个列表项 */}
      {/* numColumns:每行渲染几个列表项 */}
      <FlatList data={menuList} renderItem={renderMenuItem} numColumns={2}/>
    </View>
  )
}

let ss = StyleSheet.create({
  menu:{
    width:'50%' ,
    borderColor:zhBorderColor,
    borderWidth:zhBorderWidth,
    paddingVertical:zhSpacingColLg *3,
    alignItems:'center'
  },
  icon:{
    // width:90,
    // height:90,
    marginBottom:zhSpacingColSm,
  },
  title:{},
})