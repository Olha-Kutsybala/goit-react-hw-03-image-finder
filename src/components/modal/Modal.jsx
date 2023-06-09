import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  render() {
    const { largeImageURL } = this.props.image;
    return (
      <div onClick={this.handleOverlay} className="overlay">
        <div className="modal">
          <img src={largeImageURL} alt="show big foto" />
        </div>
      </div>
    );
  }
}

export default Modal;
