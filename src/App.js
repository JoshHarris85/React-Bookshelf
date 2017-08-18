import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(response => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    })
  }

  render() {
    const { books } = this.state
    const SHELVES = [
                      {title: 'Currently Reading', name: 'currentlyReading'},
                      {title: 'Read', name: 'read'},
                      {title: 'Want To Read', name: 'wantToRead'}
                    ];

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <Library
          books={books}
          shelves={SHELVES}
          onUpdateBook={(book, shelf) => {
            this.updateBook(book, shelf)
          }}
          />
        )}/>

        <Route exact path='/search' render={() => (
          <Search
          onUpdateBook={(book, shelf) => {
            this.updateBook(book, shelf)
          }}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
