import React from 'react'
import './App.css'
import Book from './Book'

class Shelf extends React.Component {

  render() {
    const { books, shelf, onUpdateBook } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          { books.map((book) => (
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

export default Shelf
