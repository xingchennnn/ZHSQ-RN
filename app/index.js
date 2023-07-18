import { View, Text, StatusBar, Image, TextInput, Button, Pressable, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { gss, zhThemeColor } from '../global'

// 必须事先导入未来要用到的app中使用的图片
import eyeclose from '../assets/img/eye-close.png'
import eyeopen from '../assets/img/eye-open.png'
import { userLogin } from '../service'
import { Link } from 'expo-router'

//Expo Router的路由系统中页面组件名与路由地址无关，且可以任意命名，甚至无名
export default function Login() {
  let [btnBgColor, setbtnBgColor] = useState(zhThemeColor)
  let [phone, setphone] = useState('13501234567')
  let [pwd, setpwd] = useState('123456')
  let [hidepwd, sethidepwd] = useState(true)
  // 登录流程
  let doLogin =async () => {
    // 验证手机号
    let p1 = phone.trim()
    if (p1.length == 0) {
      Alert.alert('错误', "手机号码不能为空", [
        { text: '确定', onPress: () => { } }
      ])
      return
    }
    if (!/^1[3-9]\d{9}$/.test(p1)) {
      Alert.alert('错误', "手机号码格式错误", [{ text: '确定' }])
      return
    }
    // 验证密码
    let p2 = pwd.trim()
    if(p2.length<6 || p2.length>36){
      Alert.alert('错误' , "密码长度非法" , [{text:'确定'}])
      return
    }

    // 请求参数进行登录、
    let data = await userLogin(p1,p2)
    console.log(data)
    if(data.code === 2000){ //登录成功
      ToastAndroid.show('欢迎回来',ToastAndroid.SHORT)  //消息 / 吐司对话框持续时长
      // 在客户端中保存当前的身份信息
     
    }else{   //登录失败
      Alert.alert('失败' , '登录失败!服务器返回错误信息'+data.msg ,[{'text':'确定'}])
    }
  }
  


  return (
    <View>
      {/* F1:顶部状态栏 */}
      <StatusBar backgroundColor={zhThemeColor} barStyle='light-content' />
      {/* F2:上方Logo图 */}
      <Image style={gss.logo} source={require('../assets/img/logo.png')} />
      {/* F3: 手机号码输入框组*/}
      <View style={gss.inputGroup}>
        <TextInput value={phone} onChangeText={txt => { setphone(txt) }} placeholder='请输入手机号' style={gss.input} />
        <Image style={[gss.inputIcon, gss.left]} source={require('../assets/img/cellphone.png')} />
        <Pressable style={[gss.inputIcon, gss.right]} onPressIn={_ => { setphone('') }}>
          <Image style={[gss.inputIcon, { top: 0 }]} source={require('../assets/img/clear.png')} />
        </Pressable>
      </View>
      {/* F4:密码输入框组 */}
      <View style={gss.inputGroup}>
        {/* secureTextEntry :是否采用'安全文本输入' */}
        <TextInput value={pwd}
          onChangeText={t => { setpwd(t) }}
          placeholder='请输入登录密码'
          secureTextEntry={hidepwd}
          style={gss.input} />
        <Image style={[gss.inputIcon, gss.left]} source={require('../assets/img/lock.png')} />
        <Pressable style={[gss.inputIcon, gss.right]} onPressIn={_ => { sethidepwd(!hidepwd) }}>
          {/* // source={hidepwd ? require('../assets/img/eye-close.png') :require('../assets/img/eye-open.png') } /> */}
          <Image style={[gss.inputIcon, { top: 0 }]}
            source={hidepwd ? eyeclose : eyeopen} />
        </Pressable>
      </View>
      {/* F5:登录按钮*/}
      {/* <Button title='立即登录' />  不推荐使用 */}
      {/* <Text style={[gss.btn]}>立即登录</Text> */}
      <Pressable onPress={doLogin} onPressIn={_ => { setbtnBgColor('#080') }} onPressOut={_ => { setbtnBgColor(zhThemeColor) }}>
        <Text style={[gss.btn, { backgroundColor: btnBgColor }]} >立即登录</Text>
      </Pressable>
      {/* F6:忘记密码超链接 */}
      {/* 因为RN自身没有提供路由和导航功能 ,所以也就没有提供超链接 */}
      
      <Link href="/tabs/my">我的</Link>
    </View>
  )
}