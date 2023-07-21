import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

// 使用上下文对象的步骤3 , 孙辈组件找到爷爷的组件共享
// import { GoodsTypesCtx } from '../app/mall/list'
import { GoodsTypesCtx } from '../ctx'
import { FlatList } from 'react-native-gesture-handler'
import { zhBorderColor, zhBorderWidth, zhSpacingColLg, zhSpacingColSm, zhSpacingRowSm, zhSpacingRowbase, zhThemeColor } from '../global'
import { base, mallGoodsList } from '../service'
import { useRouter } from 'expo-router'



export default function ZhTab0() {
  // 使用expoRouter模块提供的钩子创建路由器对象
  let router = useRouter()
  // 获取屏幕尺寸,算出商品图片应有的尺寸
  let {width} = useWindowDimensions()
  let imgWidth = (width - 80 - zhSpacingRowbase*4) /2

  // 状态变量,记录当前选中的什么变量
  let [curType ,setcurType] = useState(0)
  // 记录商品列表
  let [goodsList , setgoodsList] = useState([])
  // 使用上下文对象步骤4:从上下文中读取数据
  let types = useContext(GoodsTypesCtx)
  // console.log('读取上下文共享对象',types)
  let renderType = ({item,index})=>{
    return<Text onPress={_=>{setcurType(index)}} style={[ss.type , {color:index===curType?'#FFF':'#333',
    backgroundColor:index===curType?zhThemeColor:'transparent'}]}>{item.tname}</Text>
  }

  useEffect(()=>{
    if(types.length===0){
      //商品类别数组的长度为0，即目前还没查询到任何的商品类别数据
      return
    }
    (async()=>{
      console.log(types[curType].tid)
     let data =await  mallGoodsList(types[curType].tid)
    //  console.log('商品列表',data)
      setgoodsList(data)
    })()
  },[curType,types])
  //渲染商品
  let renderGoods= ({item,index})=>{
    return(
      <TouchableOpacity  style={ss.goods} activeOpacity={0.5} onPress={_=>{router.push('/mall/detail?gid='+item.gid)}}>
        <Image style={[{width:imgWidth , height:imgWidth}]} source={{uri:base+item.mainPic}}/>
        {/* numberofLines: 文本最多显示几行 */}
        <Text style={ss.title} numberOfLines={1}>{item.goodsName}</Text>
        <Text style={ss.count}>月售:{item.soldCount}</Text>
        <View style={ss.price}>
          {item.discount<1&&(
            <Text style={ss.discountPrice}>￥{(item.originalPrice*item.discount).toFixed(2)}</Text>
            )}
          <Text style={[ss.originalPrice , {textDecorationLine:item.discount==1?'none':'line-through'}] }>￥{item.originalPrice}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <View style={[ss.tab0]}>
      {/* 左侧:商品列表 */}
      <FlatList style={ss.typeList} data={types} renderItem={renderType}/>
      {/* 右侧:当前类别下的商品列表 */}
      {/* numColumns:一行中可以呈现几列  */}
      <FlatList numColumns={2} data={goodsList} renderItem={renderGoods}/>

    </View>
  )
}

let ss = StyleSheet.create({
  tab0:{
    // 
    
    flexDirection:'row',
    // 尺寸的增长权重:1
    // backgroundColor:'pink',
    //flex: 1, //尺寸增长权重:1 
    // width:'100%',
    height:'100%',
    
  },
  typeList:{
    backgroundColor:'#F2F2F2',
    width:80 ,
    flexShrink:0,  //尺寸的收缩权重
    flexGrow:0,    //尺寸的增长权重
  },
  type:{
    // 文字水平居中
    textAlign:'center',
    // 竖直方向的内边距
    paddingVertical:zhSpacingColLg,
    flex:1,
    
  },
  goods:{
    width:'50%',
    padding:zhSpacingRowSm,
    borderColor:zhBorderColor,
    borderWidth:zhBorderWidth,
  },
  pic:{
    // width:'100%',
    // height:100,
  },
  title:{
    fontSize:15,
    marginVertical:zhSpacingColSm,
  },
  count:{
    fontSize:13,
    color:'#999',
  },
  discountPrice:{
    fontSize:14,
    color:'#F20'
    // paddingRight: 30， //Text中的Text水平方向上不能添加margin或padding
  },
  originalPrice:{
    fontSize:13,
    textDecorationLine:'line-through'
  },
  price:{
    
    flexDirection:'row',
    justifyContent:'space-between'
  }
})