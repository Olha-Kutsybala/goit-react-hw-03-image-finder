import { Component } from 'react';
import Modal from 'components/modal';
import css from './ImageGalleryItem.module.css';

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
      <li className={css.imageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          data-source={largeImageURL}
          className="image"
          onClick={this.onOpenModal}
          className={css.imageGalleryItem_image}
        />
        {this.state.showModal && <Modal onClose={this.onOpenModal} />}
      </li>
    );
  }
}
export default ImageGalleryItem;
