// import React from 'react'
// import ReactDOM from 'react-dom'

import React from './my/react'
import ReactDOM from './my/react-dom'
// 实现组件的更新
// 组件数据来源：(1)、一个是父组件属性 (2)、内部定义的
// 更新数据：更新state状态，只有唯一的方法 setState()
class MyClassComponent extends React.Component {
  constructor(props) {
    super(props) //执行父类构造函数
    // 定义属性
    this.state = { num: 0, id: 1 }
  }

  // 处理点击事件
  handleClick = () => {

    // this.setState((prestate, props) => {
    //   // console.log(props)
    //   return { num: prestate.num + 1 }
    // }, () => {
    //   console.log("num----", this.state.num); //3
    // })

    // this.setState((prestate, props) => {
    //   // console.log(props)
    //   return { num: prestate.num + 1 }
    // })

    // this.setState((prestate, props) => {
    //   // console.log(props)
    //   return { num: prestate.num + 1 }
    // }, () => {
    //   console.log("num****", this.state.num);  //3
    // })


    setTimeout(() => {
      this.setState((prestate, props) => {
        // console.log(props)
        return { num: prestate.num + 1 }
      }, () => {
        console.log("num----", this.state.num); //1
      })

      this.setState((prestate, props) => {
        // console.log(props)
        return { num: prestate.num + 1 }
      })

      this.setState((prestate, props) => {
        // console.log(props)
        return { num: prestate.num + 1 }
      }, () => {
        console.log("num****", this.state.num);  //3
      })
    }, 0)

  }

  render() {
    return (
      <div style={{ backgroundColor: "pink" }}>
        <h1>类组件 </h1>
        <div>接收到的属性：name {this.props.name}</div>
        <div>组件自身：num {this.state.num}</div>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

//类组件的使用
let element = <MyClassComponent name={"李四"} />

ReactDOM.render(
  element,
  document.getElementById('root')
)
