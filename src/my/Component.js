import { updateDom } from "./react-dom"

/**
 * 更新器
 *  用户获取到最新的数据
 */
class Updater {
  constructor(classInsatnce) {
    this.classInsatnce = classInsatnce //保存类组件实例 获取render
    this.peddingState = [] //用与保存待更新的数据的数组
  }

  /**
   * 将最新的数据添加到的【待更新的数据的数组】
   * @param {*} partialState  最新的数据
   */
  addState(partialState) {
    this.peddingState.push(partialState)
    // 更新
    this.emitUpdate()
  }

  /**
   * 通知更新
   */
  emitUpdate() {
    this.updateComponent()
  }

  /**
   * 更新组件
   */
  updateComponent() {
    const { peddingState, classInsatnce } = this
    // 获取到数据 => 更新组件
    if (peddingState.length > 0) {
      shouldUpdate(classInsatnce, this.getState())
    }
  }

  // 获取到最新的状态
  getState() {
    const { peddingState, classInsatnce } = this
    // 获取到旧的数据
    let { state } = classInsatnce
    // 生成最新的数据
    peddingState.forEach(partialState => {
      state = { ...state, ...partialState }
    })
    // 清空【更新数据的数组】
    peddingState.length = 0
    // 返回最新数据
    return state
  }

}

/**
 * 更新组件
 * @param {*} classInsatnce 类组件实例
 * @param {*} nextState 最新状态
 */
// 1、初始化的使用
// 2、更新的时候：获取新的状态,把这个新的状态vnode(render方法)变为真实dom
// 3、用新的真实dom替换老的
function shouldUpdate(classInsatnce, nextState) {
  // 将最新状态保存到实例state上
  classInsatnce.state = nextState
  // 强制更新
  classInsatnce.forceUpdate()
}


class Component {
  // 子类可以继承 父类的  实例方法、静态方法、原型方法
  static isReactComponent = true
  constructor(props) {
    this.props = props
    // 创建更新器
    this.updater = new Updater(this)
  }

  /**
   * 更新数据
   * @param {*} partialState 部分数据
   */
  setState(partialState) {
    this.updater.addState(partialState)
  }

  /**
   * 强制更新:重新渲染dom
   */
  forceUpdate() {
    // 获取到新的虚拟dom
    let newVNode = this.render()
    let oldVNode = this.oldReaderVnode  //获取初始化的时候有旧的VNode
    let parentDom = oldVNode.dom.parentNode
    updateDom(parentDom, oldVNode, newVNode)
    // 将新的VNode变为旧的VNode
    this.oldReaderVnode = newVNode
  }
}

export default Component