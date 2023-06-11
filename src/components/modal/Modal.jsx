import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
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
    const { largeImageURL, alt } = this.props;

    return createPortal(
      <div onClick={this.handleOverlay} className={css.overlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>,
      rootModal
    );
  }
}

Modal.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
