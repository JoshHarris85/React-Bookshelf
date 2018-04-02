import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  // local state to this component
  state = {
    foundBooks: [],
    query: ''
  }

  // debounced search finding all books within the search, and comparing them to your books
  // to set the shelf type.
  debouncedSearch = debounce(() => {
    if(this.state.query) {
      BooksAPI.search(this.state.query, 20).then((foundBooks) => {
        if(!foundBooks.error) {
          foundBooks.forEach((foundBook) => {
            for(let myBook of this.props.myBooks) {
              if(foundBook.id === myBook.id) {
                foundBook.shelf = myBook.shelf;
              }
            }
          });
          this.setState({ foundBooks });
        }
        else this.setState({ foundBooks: [] });
      });
    }
  }, 300);

  // When a query is entered do a search, and if no query
  // is entered set the foundbooks to none.
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
    const { onUpdateBook } = this.props;
    const { foundBooks, query } = this.state;

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
