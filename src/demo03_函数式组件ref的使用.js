import React from 'react'
import ReactDOM from 'react-dom'

// import React from './my/react'
// import ReactDOM from './my/react-dom'

// 函数式组件的ref的使用
function TextInput(props, ref) {
  return (
    <input ref={ref}></input>
  )
}
// 函数式组件ref的传递必须通过forwardRef进行转发
const ForwardTextInput = React.forwardRef(TextInput)

class MyClassComponent extends React.Component {
  constructor(props) {
    super(props) //执行父类构造函数
    // 定义属性
    this.classF = React.createRef() //{ current: 真实dom }
  }

  getFocus = () => {
    this.classF.current.focus()
  }

  render() {
    return (
      <div >
        <ForwardTextInput ref={this.classF} />
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
