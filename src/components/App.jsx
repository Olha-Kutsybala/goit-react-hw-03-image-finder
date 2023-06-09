import { Component } from 'react';
import { Notify } from 'notiflix';
import fetchImages from 'api';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';

let page = 1;

class App extends Component {
  state = {
    isShowModal: false,
    query: '',
    images: [],
    largeImageURL: '',
    page: 1,
    status: 'idle',
    totalHits: 0,
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
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };

  render() {
    return (
      <div>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery query={this.state.query} images={this.state.images} />
      </div>
    );
  }
}
export default App;
