import { REACT_ELEMENT } from "./constant"
import { toVdom } from "./util"

/**
 * 创建虚拟dom
 * @param {*} type 类型
 * @param {*} props 属性
 * @param {*} children 
 * @return {*} vNode
 */
function createElement(type, props, children) {

  // 处理 key ref
  let key = null, ref = null
  if (props) {
    key = props.key !== undefined ? props.key : null
    ref = props.ref !== undefined ? props.key : null
    delete props.key
    delete props.ref
  }

  // 处理children
  const vNodeProps = { ...props }
  // 1、没有children
  // 2、只有一个children (1)文本 (2元素)
  // 3、有多个儿子
  if (arguments.length > 3) { //有多个儿子
    vNodeProps.children = Array.prototype.slice.call(arguments, 2).map(toVdom)
  } else if (arguments.length === 3) { //只有一个children
    vNodeProps.children = toVdom(children) // { type: REACT_TEXT, content: 666 }
  }
  return { // vnode => react元素
    $$typeof: REACT_ELEMENT,
    key, // 后面diff算法
    props: vNodeProps,
    ref,// 获取到的真实dom
    type // 类型 div
  }
}

const React = {
  createElement
}

export default React