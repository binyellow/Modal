import React, { Component } from 'react';
import Modal from './modal';

import './App.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.state = {
      visible: false
    }
  }

  showModal() {
    this.setState({ visible: true })
  }

  hideModal() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state
    return <div className="app">
      <button onClick={this.showModal}>click here</button>
      <Modal
        maskClosable
        visible={visible}
        title="这是自定义title"
        onCancel={this.hideModal}
        onOk={this.showModal}
      >
        这是自定义content
      </Modal>
    </div>
  }
}
export default App;
