import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import Search from './Search'
import '../App.css'

class BooksApp extends React.Component {
  // local state
  state = {
    books: []
  }

  // Runs after the component has been 'mounted' or inserted/created
  // API call using the Udacity made API to retrieve all books, and
  // update the local state with this.setState using es6 syntax.
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  // Function to update the book passed all the way down to shelfchanger component.
  // Update the books in the api then update the local state.
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(response => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    })
  }

  // return render
  render() {
    // set constants within the render context
    const { books } = this.state;
    const SHELVES = [
                      {title: 'Currently Reading', name: 'currentlyReading'},
                      {title: 'Read', name: 'read'},
                      {title: 'Want To Read', name: 'wantToRead'}
                    ];
    // start of the jsx/javascript to return
    return (
      <div className="app">
        {/* library route */}
        <Route exact path='/' render={() => (
          // Render Library component passing down books, shelves, and onUpdateBook as local props
          <Library
            books={books}
            shelves={SHELVES}
            onUpdateBook={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
          />
        )}/>
        {/* Search route */}
        <Route exact path='/search' render={() => (
          // Render Search component passing down myBooks and onUpdateBook
          <Search
            myBooks={books}
            onUpdateBook={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

// export the component
export default BooksApp
