import React from 'react'
import ReactDOM from 'react-dom'

// import React from './my/react'
// import ReactDOM from './my/react-dom'



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

    /**
     *     JS中所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。
     *
     *   同步任务指的是：
     *          在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
     *  异步任务指的是：
     *          不进入主线程、而进入”任务队列”的任务，当主线程中的任务运行完了，才会从”任务队列”取出异步任务放入主线程执行。
     */

    // 同步任务（synchronous）
    this.setState({ num: this.state.num + 1 }) // 0+1
    this.setState({ num: this.state.num + 1 }) // 0+1
    console.log(this.state.num) // 0


    // 异步任务
    // 宏任务： 整个script代码、setTimeout、 setInterval、UI交互事件、requestAnimationFrame（请求动画）, I/O；
    // 微任务： process.nextTick（node）、Promise.then、Promise.catch、 Object.observe, MutationObserver
    setTimeout(() => {
      this.setState({ num: this.state.num + 1 }) // 1+1
      console.log(this.state.num) // 2
      this.setState({ num: this.state.num + 1 }) // 2+1
      console.log(this.state.num) // 3
    }, 0);

  }
  render() {
    return (
      <div>
        <h1>类组件 </h1>
        <div>接收到的属性：name {this.props.name}</div>
        <div>组件自身：num {this.satte.num}</div>
        <button onClick={this.handleClick}>+1</button>
      </div>
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
