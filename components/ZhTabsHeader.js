import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { zhBorderColor, zhBorderWidth, zhSpacingColLg, zhSpacingColSm, zhSpacingColbase, zhSpacingRowLg, zhSpacingRowbase, zhThemeColor } from '../global'

export default function ZhTabsHeader({change}) {
  // 状态变量 --记录页签下标 current:当前的
  let [cur , setcur] = useState(0)

  return (
    <View style={ss.header}>
      <Text onPress={_=>{change(0) ; setcur(0)}} style={[ss.item,{borderBottomColor:cur===0?zhThemeColor:'transparent'}]}>商品</Text>
      <Text onPress={_=>{change(1) ; setcur(1)}} style={[ss.item,{borderBottomColor:cur===1?zhThemeColor:'transparent'}]}>评价</Text>
      <Text onPress={_=>{change(2) ; setcur(2)}} style={[ss.item,{borderBottomColor:cur===2?zhThemeColor:'transparent'}]}>介绍</Text>
    </View>
  )
}

let ss = StyleSheet.create({
  header:{
    // 
    flexShrink:0,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:zhSpacingColLg,
    paddingHorizontal:zhSpacingRowLg,
    borderBottomColor:zhBorderColor,
    borderBottomWidth:zhBorderWidth,
    marginBottom:zhSpacingColbase,
    
  },
  item:{
    fontSize:14,
    marginHorizontal:zhSpacingRowLg,
    paddingHorizontal:zhSpacingRowbase,
    paddingBottom:zhSpacingColSm,
    borderBottomColor:zhThemeColor,
    borderBottomWidth:zhBorderWidth,
  },
})