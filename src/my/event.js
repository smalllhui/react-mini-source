import { updateQueue } from "./Component"

// 将dom上的事件委托到document,变为React合成事件

/**
 *  绑定事件
 * @param {*} dom 真实dom  div span ..
 * @param {*} eventType 事件类型 onclick
 * @param {*} handler 事件处理函数
 */
export function addEvent(dom, eventType, handler) {

  // debugger
  // 1 document store
  let store = dom.store || (dom.store = {}) // button.store={}

  // 2 创建映射表
  store[eventType] = handler
  // 获取到dom事件
  if (store[eventType]) {
    document[eventType] = dispatchEvent //通过事件委托、将dom上的事件放到document上
  }
}

/**
 * 实现React合成事件
 * @param {*} event 
 */
function dispatchEvent(event) {
  let { target, type } = event //event事件对象 target:真实元素 type：事件类型
  // 得到事件类型
  let eventType = `on${type}` //onclik

  // 从真实元素取出store
  let { store } = target
  //获取事件处理函数
  let handler = store && store[eventType]
  // 合并事件对象
  let SyntheticBaseEvent = createBaseEvent(event)
  // 开启批量更新
  updateQueue.isBatchData = true
  // 执行事件处理函数
  handler && handler(SyntheticBaseEvent)
  // 执行队列
  updateQueue.isBatchData = false
  // 进行批量更新
  updateQueue.batchUpdate()
}

/**
 * 合并原生事件对象 目的是为了兼容性
 * @param {*} event 
 */
function createBaseEvent(nativeEvent) {
  // 包装后的事件对象
  let syntheticBaseEvent = {}

  // 编辑原生对象属性添加到syntheticBaseEvent
  for (let key in nativeEvent) {
    syntheticBaseEvent[key] = nativeEvent[key]
  }
  // 添加属性nativeEvent
  syntheticBaseEvent['nativeEvent'] = nativeEvent
  // 兼容性处理
  syntheticBaseEvent.preventDefault = preventDefault

  // 返回包装后的事件对象
  return syntheticBaseEvent
}

// 处理默认事件
function preventDefault(event) {

  if (!event) { //兼容ie
    window.event.returnValue = false
  }

  if (event.preventDefault) {
    event.preventDefault()
  }
}