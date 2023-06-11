import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import fetchImages from 'api';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';
import css from './App.module.css';
import Button from './button';
import Loader from './loader';

let page = 1;

class App extends Component {
  state = {
    showModal: false,
    query: '',
    images: [],
    largeImageURL: '',
    page: 1,
    status: 'idle',
    totalHits: 0,
    showButton: false,
  };

  handleSearch = async query => {
    this.setState({ query });
    if (query.trim() === '') {
      Notify.failure('Field is empty');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(query, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notify.failure('Sorry, there are no such images. Please try again.');
        } else {
          this.setState({
            images: hits,
            query,
            totalHits: totalHits,
            status: 'resolved',
            showButton: true,
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };

  onNextPage = async () => {
    this.setState({ status: 'pending' });
    page += 1;
    try {
      const { hits } = await fetchImages(this.state.query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery query={this.state.query} images={this.state.images} />
        {this.state.status === 'pending' && <Loader />}
        {this.state.status === 'resolved' && this.state.images.length >= 12 && (
          <Button onClick={this.onNextPage} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  query: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
};
export default App;
