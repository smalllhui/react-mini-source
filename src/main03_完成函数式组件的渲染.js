// import React from 'react'
// import ReactDOM from 'react-dom'

import React from './my/react'
import ReactDOM from './my/react-dom'

// 函数式组件？它就是一个函数
/**
 * 特点
 *  1、函数式组件名称首字母大写 react原生组件 div span  只定义组件 大写
 *  2、函数式组件的返回值 => 一个react元素 => jsx
 *  3、jsx是一个父子结构
 *  4、还有个props
 */

// 定义函数式组件
function MyFunctionComponent(props) {
  // return <h1>Hello {props.name}</h1>
  return React.createElement("h1", null, "Hello ", props.name);
}

//函数式组件的使用
let element = <MyFunctionComponent name={'张三'} />

// babel转换以后  babel官网：https://www.babeljs.cn/
// function MyFunctionComponent(props) {
//   return /*#__PURE__*/React.createElement("h1", null, "Hello ", props.name);
// }
// let element = /*#__PURE__*/React.createElement(MyFunctionComponent, {
//   name: 100
// });

console.log("element")
console.log(element)
ReactDOM.render(
  element,
  document.getElementById('root')
)
