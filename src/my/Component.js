import { updateDom } from "./react-dom"

/**
 * 更新队列
 */
export const updateQueue = {
  isBatchData: false,// 标识符 是同步更新还是异步更新 true:异步 false:同步
  updaters: [], //需要更新的数组
  batchUpdate() {
    // 执行批量更新
    updateQueue.updaters.forEach(updater => updater.updateComponent())
    // 清空数组
    updateQueue.updaters.length = 0
    // 修改标识符为同步更新
    updateQueue.isBatchData = false
  }
}
/**
 * 更新器 用户获取到最新的数据
 */
class Updater {
  constructor(classInsatnce) {
    this.classInsatnce = classInsatnce //保存类组件实例 获取render
    this._pendingStateQueue = [] //用与保存待更新的数据的数组
    this._pendingCallbackQueue = [] //用与保存更新的数据的回调函数数组
  }

  /**
   * 保存待更新的状态到更新队列
   * @param {*} partialState  待更新的状态
   */
  enqueueSetState(partialState) {
    this._pendingStateQueue.push(partialState)
    // 更新
    this.enqueueUpdate()
  }
  /**
   * 保存更新的数据的回调函数回调函数队列
   * @param {*} callback 回调函数
   */
  enqueueCallback(callback) {
    this._pendingCallbackQueue.push(callback)
  }
  /** 
   * 通知更新
   */
  enqueueUpdate() {
    // 判读是异步还是同步更新
    if (updateQueue.isBatchData) { //异步
      // 需要收集setState => updater => this
      updateQueue.updaters.push(this)
    } else {
      //同步更新
      this.updateComponent()
    }
  }

  /**
   * 更新组件
   */
  updateComponent() {
    const { _pendingStateQueue, classInsatnce } = this
    // 获取到数据 => 更新组件
    if (_pendingStateQueue.length > 0) {
      shouldUpdate(classInsatnce, this.getState())
      this.executeUpdatedCallback()
    }
  }

  /**
   * 执行更新状态后render后的回调函数
   */
  executeUpdatedCallback() {
    if (this._pendingCallbackQueue.length > 0) {
      this._pendingCallbackQueue.forEach(callback => callback())
      this._pendingCallbackQueue.length = 0
    }
  }

  // 获取到最新的状态
  getState() {
    const { _pendingStateQueue, classInsatnce } = this
    // 获取到旧的数据
    let { state, props } = classInsatnce
    // 生成最新的数据
    _pendingStateQueue.forEach(partialState => {
      if (typeof partialState === "object") {
        state = { ...state, ...partialState }
      } else if (typeof partialState === "function") {
        const nextState = partialState && partialState(state, { ...props })
        if (typeof nextState === "object")
          state = { ...state, ...nextState }
      }
    })
    // 清空【更新数据的数组】
    _pendingStateQueue.length = 0
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
   * @param {object|function} partialState 部分数据
   *  @param {?function} callback 回调函数
   */
  setState(partialState, callback) {
    if (callback && typeof callback === "function") {
      this.updater.enqueueCallback(callback)
    }
    this.updater.enqueueSetState(partialState)
  }

  /**
   * 强制更新:重新渲染dom
   */
  forceUpdate() {
    // 获取到新的虚拟dom
    let newVNode = this.render()
    let oldVNode = this.oldReaderVnode  //获取初始化的时候有旧的VNode
    updateDom(oldVNode, newVNode)
    // 将新的VNode变为旧的VNode
    this.oldReaderVnode = newVNode
  }
}

export default Component