import { Component } from 'react';
import Modal from 'components/modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  onOpenModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <li className="item">
        <img
          src={webformatURL}
          alt={tags}
          data-source={largeImageURL}
          className="image"
          onClick={this.onOpenModal}
        />
        if(showModal ){<Modal />}
      </li>
    );
  }
}
export default ImageGalleryItem;
