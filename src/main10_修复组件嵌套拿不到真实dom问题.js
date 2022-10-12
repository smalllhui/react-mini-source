// import React from 'react'
// import ReactDOM from 'react-dom'

import React from './my/react'
import ReactDOM from './my/react-dom'

function ThreeTextComponent(props) {
  return (
    <div>num:{props.num}</div>
  )
}
function TwoComponent(props) {
  return (
    <ThreeTextComponent {...props} />
  )
}

// class TwoComponent extends React.Component {
//   render() {
//     return (
//       <ThreeTextComponent {...this.props} />
//     )
//   }
// }

class MyClassComponent extends React.Component {
  constructor(props) {
    super(props) //执行父类构造函数
    this.state = { num: 1 }

    setTimeout(() => {
      this.setState({ num: 2 })
    }, 1000)
  }
  render() {
    return (
      <TwoComponent num={this.state.num} />
    )
  }
}

//类组件的使用
let element = <MyClassComponent />

ReactDOM.render(
  element,
  document.getElementById('root')
)
