import { REACT_TEXT } from "./constant"
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
  const { type, props, content } = vdom
  // 真实dom
  let dom;
  // 1、判断type => 文本 或者元素div
  if (type === REACT_TEXT) {
    // 文本
    dom = document.createTextNode(content)
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
      changeChildren(children, dom)
    }
  }
  return dom
}

/**
 * 处理子节点挂载到真实dom上
 * @param {*} children  子节点
 * @param {*} dom 真实dom
 */
function changeChildren(children, dom) {
  // 1、有一个儿子 { type: REACT_TEXT, content: 666 }
  if (typeof children === "object" && children.type) {
    mount(children, dom)
  }
  else if (Array.isArray(children)) { // 2、有多个儿子
    children.forEach(vChildNode => mount(vChildNode, dom))
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
        continue;
      } else if (key === "style") {
        // {color:"red",fontSize:"18px"}
        let styleObject = newProps.style
        for (let attr in styleObject) {
          dom.style[attr] = styleObject[attr]
        }
      } else {
        // 其它属性 className key
        dom[key] = newProps[key]
      }
    }
  }


  // 更新属性
  if (oldProps) {
    // 旧的属性在新的属性中没有 =》 删除
    for (let key in oldProps) {
      if (!newProps[key]) {
        dom[key] = null
      }
    }
  }
}
const ReactDOM = { render }

export default ReactDOM