import { View, Text, FlatList, Image, useWindowDimensions, Button } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { base } from '../service/index'

export default function ZhSwiper({ list }) {
  // console.log(list)
  let idx = 0
  // 创建组件对象的引用
  let swiperRef = useRef()
  // 获取屏幕的宽度，即轮播图片的宽度（600：180）
  let { width } = useWindowDimensions()
  // 计算图片
  let height = width * 180 / 600

  // 钩子函数，监听变化
  //Effect创建生命周期方法优于过往的机制优秀一集中管理特定数据相关的所有操作
  useEffect(() => {
    // console.log('list发生改变',list)
    let timer = null
    if (list.length > 1) {
      timer = setInterval(next, 2000)
      return () => {
        //依赖的数据即将改变时 + 组件即将卸载时 调用 - 可以获得即将逝去的数据
        clearInterval(timer)
        timer = null      //销毁旧数据时创建的定时器
      }
    }
  }, [list])



  // 渲染轮播广告中的一个列表项
  let renderAd = ({ index, item }) => {
    return <Image style={{ width, height }} source={{ uri: base + item.pic }} />
  }
  // 轮播到下一个图片，如果到了最后一张，则返回第一张
  let next = () => {
    idx++
    idx = idx >= list.length ? 0 : idx
    //找到页面中的FlatList元素，调用其“滚动到指定下标处”方法
    swiperRef.current.scrollToIndex({ index: idx })
  }
  return (
    // 临时添加view点击效果，轮播到下一张
    //轮播广告下面的兄弟(ZhTabs) 组件高度很大，可能会挤小兄弟元素:此处声明轮播广告尺寸不参于收缩
    <View style={{flexShrink:0}}>
      {/* <Button title='下一张' onPress={next} /> */}
    

      {/* RN中可以使用FlatList模拟实现轮播广告 */}
      {/*彬6horizontal: 是否水平排布列表项 */}
      {/* pagingEnabled: 是否启用分页显示(要么显示列表项N，要么显示列表项N+1，
        不允许停留在二者之间 */}
      <FlatList
        ref={swiperRef}
        data={list}
        renderItem={renderAd}
        horizontal={true}
        pagingEnabled={true}
      />
    </View>
  )
}