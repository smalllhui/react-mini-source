// import React from 'react'
// import ReactDOM from 'react-dom'

import React from './my/react'
import ReactDOM from './my/react-dom'



// 定义一个类组件
class MyClassComponent extends React.Component {
  constructor(props) {
    super(props) //执行父类构造函数
    // 定义属性
  }
  render() {
    return (
      <h1>Hello {this.props.name}</h1>
    )
  }
}

//类组件的使用
let element = <MyClassComponent name={"李四"} />

// babel转换以后  babel官网：https://www.babeljs.cn/
// class MyClassComponent extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return /*#__PURE__*/React.createElement("h1", null, "Hello ", this.props.name);
//   }
// }
// let element = /*#__PURE__*/React.createElement(MyClassComponent, {
//   name: "李四"
// });

console.log("element")
console.log(element)
ReactDOM.render(
  element,
  document.getElementById('root')
)
