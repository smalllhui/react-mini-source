import React from 'react'
import ReactDOM from 'react-dom'

// import React from './my/react'
// import ReactDOM from './my/react-dom'

// 类组件的ref的使用

class TextInput extends React.Component {
  constructor(props) {
    super(props) //执行父类构造函数
    this.input = React.createRef()//{ current: 真实dom }
  }

  getFocus = () => {
    this.input.current.focus()
  }

  render() {
    return (
      <input ref={this.input}></input>
    )
  }
}

// 类组件获取ref => 是这个类组件的实例
class MyClassComponent extends React.Component {
  constructor(props) {
    super(props) //执行父类构造函数
    // 定义属性
    this.classF = React.createRef() //{ current: 类的实例 }
  }

  getFocus = () => {
    // 获取到子组件实例(类组件)
    const childInstance = this.classF.current
    // 调用组件实例的方法
    childInstance.getFocus()
  }

  render() {
    return (
      <div >
        <TextInput ref={this.classF} />
        <button onClick={this.getFocus} >获取焦点</button>
      </div>
    )
  }
}

//类组件的使用
let element = <MyClassComponent />

ReactDOM.render(
  element,
  document.getElementById('root')
)
