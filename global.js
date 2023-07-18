import { StyleSheet } from "react-native"

// 全局样式变量
export const zhThemeColor = "#090"
export const zhSpacingRowSm = 4
export const zhSpacingRowbase = 8
export const zhSpacingRowLg = 12
export const zhSpacingColSm = 5
export const zhSpacingColbase = 10
export const zhSpacingColLg = 15

export const zhBorderWidth= 1
export const zhBorderRadius= 4




// 全局样式对象
export const gss = StyleSheet.create({
  logo:{
    width:250,
    height:250,
    marginTop:zhSpacingColLg *6,
    // marginHorizontal:'auto' //水平外间距 ---不支持
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:zhSpacingColLg,
  },
  input:{
    borderColor:zhThemeColor,
    borderWidth:zhBorderWidth,
    borderRadius:zhBorderRadius,
    paddingHorizontal:zhSpacingRowLg *4, //水平方向上的内边距
    paddingVertical:zhSpacingColbase , //竖直方向上的内边距   
  },
  inputGroup:{
    marginTop:zhSpacingColLg , //上方内边距
    marginHorizontal:zhSpacingRowLg , //左右距离的外边距
    // position:'relative'   //RN中的定位只有relative | absoult
  },
  inputIcon:{
    // 绝对定位
    position:'absolute' ,
    // 宽
    width:30, 
    // 高
    height:30,
    // 定位
    top:10,
  },
  left:{
    left:zhSpacingRowbase,
  },
  right:{
    right:zhSpacingRowbase,

  },
  btn:{
    backgroundColor:zhThemeColor,
    color:'#fff',
    textAlign:'center',
    paddingVertical:zhSpacingColbase, //上下外间距
    paddingHorizontal:zhSpacingColLg , //左右外间距
    marginHorizontal:zhSpacingRowLg , //左右距离的外边距
    marginTop:zhSpacingColLg*2 ,  //上外边距
    borderRadius:zhBorderRadius,  //边框圆角

  }

})
