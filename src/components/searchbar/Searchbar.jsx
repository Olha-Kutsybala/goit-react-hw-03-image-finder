import { Component } from 'react';

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
      <header className="searchbar">
        <form className="form" role="search" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
