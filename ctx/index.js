/**
 * 当前模块用于存储整个项目中所有的上下文对象从而打破“爷孙组件”间的循环依赖问题
 */

import React from "react"

// 商品类型 上下文对象 -用于在list和Tab0间传递数据
export let GoodsTypesCtx = React.createContext()




