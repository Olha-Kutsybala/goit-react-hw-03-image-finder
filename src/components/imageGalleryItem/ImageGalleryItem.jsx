function ImageGalleryItem({ webformatURL, largeImageURL, tags, onShowModal }) {
  return (
    <li className="item">
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        className="image"
        // onClick={onShowModal}
      />
    </li>
  );
}
export default ImageGalleryItem;
