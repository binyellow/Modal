import React, { Component } from "react";
import "./modal.css";
import Portal from "./newPortal";
import Transition from "./Transition";
class Modal extends Component {
  constructor(props) {
    super(props);
    this.transitionRef = React.createRef();
    ["onCancel", "onOk", "maskClick"].forEach(
      n => (this[n] = this[n].bind(this))
    );
  }

  onCancel() {
    console.log("大家好，我叫取消，听说你们想点我？傲娇脸👸");
    const { onCancel } = this.props;
    this.transitionRef.current.leaveAnimate(() => onCancel && onCancel());
  }

  onOk() {
    console.log("大家好，我叫确认，楼上的取消是我儿子，脑子有点那个~");
    const { onOk } = this.props;
    onOk && onOk();
  }

  maskClick() {
    // const { onCancel, maskClosable } = this.props;
    console.log("大家好，我是蒙层，我被点击了");
    // this.transitionRef.current.leaveAnimate(() => maskClosable && onCancel && onCancel());
  }

  render() {
    const { visible, title, children } = this.props;
    return (
      <Portal>
        <Transition visible={visible} ref={this.transitionRef}>
          <div className="modal-wrapper" id="modal-wrapper">
            <div className="modal">
              {/* 这里使用父组件的title*/}
              <div className="modal-title">{title}</div>
              {/* 这里的content使用父组件的children*/}
              <div className="modal-content">{children}</div>
              <div className="modal-operator">
                <button
                  className="modal-operator-close"
                  onClick={this.onCancel}
                >
                  取消
                </button>
                <button className="modal-operator-confirm" onClick={this.onOk}>
                  确认
                </button>
              </div>
            </div>
            <div className="mask" onClick={this.maskClick} />
          </div>
        </Transition>
      </Portal>
    );
  }
}
export default Modal;
