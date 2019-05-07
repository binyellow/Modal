import React, { Component } from 'react'

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: '',
    };
    ['enterAnimate', 'leaveAnimate', 'cloneChildren'].forEach(n=>this[n] = this[n].bind(this))
  }

  getSnapshotBeforeUpdate(preProps) {
    const { visible: preVisible } = preProps;
    const { visible } = this.props;
    if (!preVisible && visible) {
      return visible;
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.enterAnimate(1);
    }
  }

  // 进入动画
  enterAnimate() {
    // 这里定义每种状态的类名,就是我们之前modal.css文件中添加的类
    const enterClasses = "modal-enter";
    const enterActiveClasses = "modal-enter-active";
    const enterEndActiveClasses = "modal-enter-end";
    // 这里定义了每种状态的过度时间,对应着modal.css中对应类名下的transition属性的时间,这里的单位为毫秒
    const enterTimeout = 0;
    const enterActiveTimeout = 200;
    const enterEndTimeout = 100;
    // 将显隐状态改为true,同时将classes改为enter状态的类名
    this.setState({ classes: enterClasses });
    // 这里使用定时器,是因为定时器中的函数会被加入到事件队列,带到主线程任务进行完成才会被调用,相当于在元素渲染出来并且加上初始的类名后enterTimeout时间后开始执行.
    // 因为开始状态并不需要过度,所以我们直接将之设置为0.
    const enterActiveTimer = setTimeout(_ => {
      this.setState({ classes: enterActiveClasses });
      clearTimeout(enterActiveTimer);
    }, enterTimeout);
    const enterEndTimer = setTimeout(_ => {
      this.setState({ classes: enterEndActiveClasses });
      clearTimeout(enterEndTimer);
    }, enterTimeout + enterActiveTimeout);

    // 最后将类名置空,还原元素本来的状态
    const initTimer = setTimeout(_ => {
      this.setState({ classes: "" });
      clearTimeout(initTimer);
    }, enterTimeout + enterActiveTimeout + enterEndTimeout);
  }

  // 离开动画
  leaveAnimate(cb) {
    const leaveClasses = "modal-leave";
    const leaveActiveClasses = "modal-leave-active";
    const leaveEndActiveClasses = "modal-leave-end";
    const leaveTimeout = 0;
    const leaveActiveTimeout = 100;
    const leaveEndTimeout = 200;
    // 初始元素已经存在,所以不需要改变显隐状态
    this.setState({ classes: leaveClasses });
    const leaveActiveTimer = setTimeout(_ => {
      this.setState({ classes: leaveActiveClasses });
      clearTimeout(leaveActiveTimer);
    }, leaveTimeout);
    const leaveEndTimer = setTimeout(_ => {
      this.setState({ classes: leaveEndActiveClasses });
      clearTimeout(leaveEndTimer);
    }, leaveTimeout + leaveActiveTimeout);
    // 最后将显隐状态改为false，同时将类名还原为初始状态
    const initTimer = setTimeout(_ => {
      this.setState({ classes: "" });
      cb();
      clearTimeout(initTimer);
    }, leaveTimeout + leaveActiveTimeout + leaveEndTimeout);
  }

  cloneChildren() {
    const { classes } = this.state
    const [children] = this.props.children.props.children
    // console.log(this.props)
    const className = children.props.className
    console.log(className, classes);

    // 通过React.cloneElement给子元素添加额外的props，
    return React.cloneElement(
      children,
      { className: `${className} ${classes}` }
    )
  }

  render() {
    const { visible } = this.props
    return visible && this.cloneChildren()
  }
}
