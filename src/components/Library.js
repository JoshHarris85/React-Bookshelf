import React from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import SearchButton from './SearchButton'

class Library extends React.Component {
  // propTypes to force props coming in to be of certain types
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    // Setting local constants so we don't have to this.props.books we can just type 'books'
    const { books, shelves, onUpdateBook } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* Map over all types of shelves and put their info in the component */}
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
        {/* search button component */}
        <SearchButton/>
      </div>
    )
  }
}

export default Library
