import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class Search extends React.Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    foundBooks: [],
    query: ''
  }

  debouncedSearch = debounce(() => {
    if(this.state.query) {
      BooksAPI.search(this.state.query, 20).then((foundBooks) => {
        if(!foundBooks.error) this.setState({ foundBooks });
        else this.setState({ foundBooks: [] });
      });
    }
  }, 300);

  updateQuery = (query) => {
    if(query) {
      this.setState({ query: query.trim() });
      this.debouncedSearch();
    }
    else {
      this.setState({ foundBooks: [] });
      this.setState({ query: '' });
    }
  }

  render() {
    const { onUpdateBook, myBooks } = this.props;
    const { foundBooks, query } = this.state;

    foundBooks.forEach((foundBook) => {
      for(let myBook of myBooks) {
        if(foundBook.id === myBook.id) {
          foundBook.shelf = myBook.shelf;
        }
      }
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { foundBooks.map((book) => (
              <Book
              book={book}
              onUpdateBook={onUpdateBook}
              key={book.id}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
