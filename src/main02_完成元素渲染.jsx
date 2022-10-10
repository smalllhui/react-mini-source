import React from './my/react'
import ReactDOM from './my/react-dom'

const element = React.createElement("h1", {
  className: "title",
  style: {
    color: "red", backgroundColor: "pink"
  }
}, "Hello world!", 666, React.createElement("span", null, '我是span'))


ReactDOM.render(
  element,
  document.getElementById('root')
)
