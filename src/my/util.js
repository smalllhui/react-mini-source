import { REACT_TEXT } from "./constant"

/**
 * 判断元素是不是文节点，如果是加工返回对象
 *  统一规范，方便  diff
 * @param {*} element 
 * @returns 
 */
export function toVdom(element) {
  return typeof element === "string" || typeof element === "number" ?
    { type: REACT_TEXT, content: element } : element
}