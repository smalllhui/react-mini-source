import { REACT_ELEMENT, REACT_FORWARD_REF } from "./constant"
import { toVdom } from "./util"
import Component from "./Component"

/**
 * 创建虚拟dom
 * @param {*} type 类型
 * @param {*} config 属性
 * @param {*} children 
 * @return {*} vNode
 */
function createElement(type, config, children) {

  // 处理 key ref
  let key = null, ref = null
  if (config) {
    key = config.key !== undefined ? config.key : null
    ref = config.ref !== undefined ? config.ref : null
    delete config.key
    delete config.ref
  }

  // 处理children
  const props = { ...config }
  // 1、没有children
  // 2、只有一个children (1)文本 (2元素)
  // 3、有多个儿子
  if (arguments.length > 3) { //有多个儿子
    props.children = Array.prototype.slice.call(arguments, 2).map(toVdom)
  } else if (arguments.length === 3) { //只有一个children
    props.children = toVdom(children) // { type: REACT_TEXT, content: 666 }
  }
  return { // vnode => react元素
    $$typeof: REACT_ELEMENT,
    key, // 后面diff算法
    props,
    ref,// 获取到的真实dom
    type // 类型 div
  }
}


function createRef() {
  return { current: null }
}


function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF,
    render
  }
}
const React = {
  createElement,
  createRef,
  forwardRef,
  Component
}

export default React