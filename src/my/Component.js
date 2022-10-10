class Component {
  // 子类可以继承 父类的  实例方法、静态方法、原型方法
  static isReactComponent = true
  constructor(props) {
    this.props = props
  }
}

export default Component