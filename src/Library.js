import React from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import SearchButton from './SearchButton'
import './App.css'

class Library extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, shelves, onUpdateBook } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          { shelves.map((shelf) => (
            <Shelf
              books={books.filter((book) => book.shelf === shelf.name)}
              shelf={shelf}
              onUpdateBook={onUpdateBook}
              key={shelf.name}
            />
          ))}
          </div>
        </div>
        <SearchButton/>
      </div>
    )
  }
}

export default Library
