import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class Search extends React.Component {

  static propTypes = {
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    foundBooks: [],
    query: ''
  }

  searchBooks(query) {
    BooksAPI.search(query, 20).then((foundBooks) => {
      if(!foundBooks.error) this.setState({ foundBooks });
    })
  }

  updateQuery = (query) => {
    this.setState({ query })
    if(query !== '') this.searchBooks(query)
  }

  render() {
    const { onUpdateBook } = this.props
    const { foundBooks, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type='text'
              placeholder='Search by title or author'
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
