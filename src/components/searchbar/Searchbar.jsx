import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleSubmit = async evt => {
    evt.preventDefault();
    const { value } = this.state;
    this.props.handleSearch(value);
  };

  render() {
    const { value } = this.state.value;
    return (
      <header className={css.searchbar}>
        <form
          className={css.searchForm}
          role="search"
          onSubmit={this.handleSubmit}
        >
          <button type="submit" className={css.searchForm_button}>
            {/* <span className={css.searchForm_button_label}>Search</span> */}
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleChange}
            aria-label="Search"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
