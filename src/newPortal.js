import React from 'react';
import ReactDOM from 'react-dom';

class NewPortal extends React.Component {
  constructor(props) {
    super(props)
    // 初始化创建渲染的父元素并添加到body下
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }

  render() {
    const { children, visible } = this.props;
    // 直接通过显隐表示
    return visible && ReactDOM.createPortal(
      children,
      this.node,
    );
  }
}
export default NewPortal
