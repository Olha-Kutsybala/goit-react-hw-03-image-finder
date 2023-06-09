import ImageGalleryItem from 'components/imageGalleryItem';

import fetchImages from 'api';
import { Component } from 'react';
import { Notify } from 'notiflix';

class ImageGallery extends Component {
  state = {
    images: [],
  };

  // componentDidUpdate(prevProps, prevState) {
  // const { query, page } = this.state;
  // if (prevProps.query !== this.props.query) {
  //   console.log(this.props.query);
  // fetchImages(this.props.query);

  // }

  render() {
    const { images } = this.state;
    return (
      <ul className="gallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            // onOpenModal={onClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
