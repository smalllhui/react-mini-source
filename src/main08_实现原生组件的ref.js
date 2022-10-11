// import React from 'react'
// import ReactDOM from 'react-dom'

import React from './my/react'
import ReactDOM from './my/react-dom'

// 使用原生组件的ref

class MyClassComponent extends React.Component {
  constructor(props) {
    super(props) //执行父类构造函数
    // 定义属性
    this.inputDom1 = React.createRef() //{ current: null }
    this.inputDom2 = React.createRef() //{ current: 真实dom }
    this.inputDom3 = React.createRef()
  }


  addSum = () => {
    console.log(this.inputDom1)
    let value1 = this.inputDom1.current.value * 1
    let value2 = this.inputDom2.current.value * 1
    this.inputDom3.current.value = value1 + value2
  }

  render() {
    return (
      <div >
        <input type="number" ref={this.inputDom1} />
        +
        <input type="number" ref={this.inputDom2} />
        <button onClick={this.addSum}>求和</button>
        <input type="number" readOnly={true} ref={this.inputDom3} />
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
