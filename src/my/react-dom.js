import { REACT_TEXT, REACT_FORWARD_REF } from "./constant"
import { toVdom } from "./util"
import { addEvent } from "./event"
/**
 * 将VNode渲染到container上面
 * @param {*} vdom 虚拟Dom
 * @param {*} container  真实Dom
 */
function render(vdom, container) {
  mount(vdom, container)
}

/**
 * 将虚拟dom挂载到真实dom
 * @param {*} vdom  虚拟dom
 * @param {*} dom  真实dom
 */
function mount(vdom, dom) {
  // 1、vdom => 真实dom
  let newDom = createDom(vdom)
  // 2、真实dom放到容器上
  dom.appendChild(newDom)
}

/**
 * 将虚拟dom变为真实dom
 * @param {*} vdom 
 */
function createDom(vdom) {
  const { type, props, content, ref } = vdom
  // 真实dom
  let dom;
  // 1、判断type => 文本 或者元素div
  if (type === REACT_TEXT) {
    // 文本
    dom = document.createTextNode(content)
  } else if (typeof type === "function") {// 区分 【函数式组件 还是类组件】
    if (type.isReactComponent) {
      return mountClassComponent(vdom) //类组件
    }
    // 变成一个vNode
    return mountFunctionComponent(vdom) //函数式组件
  }
  else if (type && type.$$typeof === REACT_FORWARD_REF) {// forwardRef组件
    return mountForwardRefComponent(vdom) //处理forwardRef组件
  } else {
    // 元素
    dom = document.createElement(type) // div
  }
  // 2、处理属性  <div></div> 
  if (props) {
    // 2.1、更新属性
    updateProps(dom, {}, props)
    // 2.2、处理children
    const { children } = props
    if (children) {
      handleChildren(children, dom)
    }
  }
  // 将真实dom保存到vdom上
  vdom.dom = dom
  // 将真实dom绑定到ref.current上
  if (ref) ref.current = dom
  // 返回真实
  return dom
}

/**
 * 处理forwardRef组件：将类组件转换为真实dom并返回
 * @param {*} vdom  虚拟dom
 */
function mountForwardRefComponent(vdom) {
  let { type, props, ref } = vdom
  let refVNode = type.render(props, ref) //函数式组件
  // 生成真实dom并返回
  return createDom(refVNode)
}
/**
 * 处理类组件：将类组件转换为真实dom并返回
 * @param {*} vdom  虚拟dom
 */
function mountClassComponent(vdom) {
  let { type, props, ref } = vdom
  // 注意 type是个类 =》 render 返回值
  let classInstance = new type(props)
  // 将类组件的实例绑定到ref.current上
  if (ref) ref.current = classInstance
  // 获取到虚拟dom
  let classVnode = classInstance.render()
  // 将虚拟dom放到组件实例上
  classInstance.oldReaderVnode = classVnode
  // 给vdom添加oldReaderVnode属性
  vdom.oldReaderVnode = classVnode
  // 生成真实dom并返回
  return createDom(classVnode)
}

/**
 * 处理函数式组件，返回函数的虚拟dom
 * @param {*} vdom  虚拟dom
 */
function mountFunctionComponent(vdom) {
  let { type, props } = vdom
  let functioVdom = type(props)
  // 给vdom添加oldReaderVnode属性
  vdom.oldReaderVnode = functioVdom
  return createDom(functioVdom)
}
/**
 * 处理子节点挂载到真实dom上
 * @param {*} children  子节点
 * @param {*} dom 真实dom
 */
function handleChildren(children, dom) {
  // 兼容webpack babel默认的转换 React.createElement
  children = toVdom(children)
  // 1、有一个儿子 { type: REACT_TEXT, content: 666 }
  if (typeof children === "object" && children.type) {
    mount(children, dom)
  }
  else if (Array.isArray(children)) { // 2、有多个儿子
    // children.forEach(vChildDom => mount(vChildDom, dom))
    // 兼容webpack babel默认的转换 React.createElement
    children.forEach(vChildDom => mount(toVdom(vChildDom), dom))
  }

}
/**
 * 更新属性
 * @param {*} dom  真实dom
 * @param {*} oldProps 旧的属性
 * @param {*} newProps 新的属性
 */
function updateProps(dom, oldProps, newProps) {

  if (newProps) {
    for (let key in newProps) {
      // 处理属性  <div></div>  注意:children style={color:"red",fontSize:"18px"}
      if (key === "children") {
        continue;//此处不处理
      } else if (key === "style") {
        // 处理样式 {color:"red",fontSize:"18px"}
        let styleObject = newProps.style
        for (let attr in styleObject) {
          dom.style[attr] = styleObject[attr]
        }
      } else if (key.startsWith("on")) {
        //处理事件
        // dom[key.toLocaleLowerCase()] = newProps[key]
        // 以后不在把事件绑定在dom上,而是通过事件委托全部放到document上
        addEvent(dom, key.toLocaleLowerCase(), newProps[key])
      }
      else {
        // 其它属性 className key
        dom[key] = newProps[key]
      }
    }
  }

  // 更新属性
  if (oldProps) {
    // 旧的属性在新的属性中没有 =》 删除
    for (let key in oldProps) {
      if (!newProps.hasOwnProperty(key)) {
        delete dom[key]
      }
    }
  }
}

/**
 * 更新dom
 * @param {*} oldVNode 旧的虚拟dom
 * @param {*} newVNode 新的虚拟dom
 */
export function updateDom(oldVNode, newVNode) {
  // 获取到旧的虚拟dom的真实dom
  let oldDom = findDOM(oldVNode)
  // 生成真实dom
  let newDom = createDom(newVNode)
  // 获取到旧节点的父节点
  let parentDom = oldDom.parentNode
  // 更新dom
  parentDom.replaceChild(newDom, oldDom)
}

/**
 * 根据虚拟dom查找dom
 * @param {*} vNode 
 */
function findDOM(vdom) {
  if (!vdom) return null

  if (vdom.dom)
    return vdom.dom
  else {
    return findDOM(vdom.oldReaderVnode)
  }
}


const ReactDOM = { render }
export default ReactDOM