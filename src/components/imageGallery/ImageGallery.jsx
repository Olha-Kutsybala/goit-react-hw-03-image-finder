import ImageGalleryItem from 'components/imageGalleryItem';

// import fetchImages from 'api';
import { Component } from 'react';
// import { Notify } from 'notiflix';

class ImageGallery extends Component {
  render() {
    return (
      <ul className="gallery">
        {this.props.images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
