import { Component } from 'react';
import { createPortal } from 'react-dom';

const rootModal = document.querySelector('#root_modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  handleESC = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlay = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div onClick={this.handleOverlay} className="overlay">
        <div className="modal">
          <img src={largeImageURL} alt="show big foto" />
        </div>
      </div>,
      rootModal
    );
  }
}

export default Modal;
