import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ZhTab0 from './ZhTab0'
import ZhTab1 from './ZhTab1'
import ZhTab2 from './ZhTab2'

export default function ZhTabsBody({nub}) {
  return (
    <View style={ss.body}>
      <View style={{display:nub===0?'flex':'none'}}>
        <ZhTab0/>
      </View>
      <View style={{display:nub===1?'flex':'none'}}>
        <ZhTab1/>
      </View>
      <View style={{display:nub===2?'flex':'none'}}>
        <ZhTab2/>
      </View>
    </View>
  )
}

let ss = StyleSheet.create({
  body:{
    // backgroundColor:'blue',
    flex:1,
  }
})