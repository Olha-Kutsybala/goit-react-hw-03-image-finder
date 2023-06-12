import { Component } from 'react';
// import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import fetchImages from 'api';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';
import css from './App.module.css';
import Button from './button';
import Loader from './loader';

// let page = 1;

class App extends Component {
  state = {
    // showModal: false,
    query: '',
    images: [],
    // largeImageURL: '',
    page: 1,
    status: 'idle',
    totalHits: 0,
    // showButton: false,
  };

  componentDidUpdate = async (_, prevState) => {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.fetchImages();
    }
  };

  handleSearch = query => {
    if (!query) {
      Notify.failure('Field is empty');
      return;
    }
    this.setState({ query, images: [], page: 1, totalHits: 0 });
  };

  onNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchImages = async () => {
    const { page, query } = this.state;
    try {
      this.setState({ status: 'pending' });
      const { totalHits, hits } = await fetchImages(query, page);
      if (!totalHits) {
        this.setState({ status: 'idle' });
        Notify.failure('Sorry, there are no such images. Please try again.');
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved',
        totalHits,
      }));
      // this.setState({
      //   images: hits,
      //   query,
      //   totalHits: totalHits,
      //   status: 'resolved',
      //   showButton: true,
      // });
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  // onNextPage = async () => {
  //   this.setState({ status: 'pending' });
  //   // page += 1;
  //   try {
  //     const { hits } = await fetchImages(this.state.query, page);
  //     this.setState(prevState => ({
  //       images: [...prevState.images, ...hits],
  //       status: 'resolved',
  //     }));
  //   } catch (error) {
  //     this.setState({ status: 'rejected' });
  //   }
  // };

  render() {
    const { status, images, totalHits } = this.state;
    const showButton = status === 'resolved' && images.length !== totalHits;
    return (
      <div className={css.App}>
        <Searchbar handleSearch={this.handleSearch} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {showButton && <Button onClick={this.onNextPage} />}
      </div>
    );
  }
}

// App.propTypes = {
//   query: PropTypes.string.isRequired,
//   images: PropTypes.array.isRequired,
// };
export default App;
