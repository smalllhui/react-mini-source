import React from 'react';
import ReactDOM from 'react-dom'

// jsx
const element = (
  <h1 className="title" style={{ color: "red", backgroundColor: "pink" }}>
    Hello world!
  </h1>
)
// bable =>js方法 React.createElement() => VNode  babel官网：https://www.babeljs.cn/
const element1 = /*#__PURE__*/React.createElement("h1", {
  className: "title",
  style: {
    color: "red",
    backgroundColor: "pink"
  }
}, "Hello world!");

console.log(element)
ReactDOM.render(
  element,
  document.getElementById("root")
)
