import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  render() {
    // const { } = this.props
    const { books, showSearchPage } = this.state
    const SHELVES = [
                      {title: 'Currently Reading', name: 'currentlyReading'},
                      {title: 'Read', name: 'read'},
                      {title: 'Want To Read', name: 'wantToRead'}
                    ];

    return (
      <div className="app">
        {showSearchPage ? (
          <Search />
        ) : (
          <Library books={books} shelves={SHELVES}/>
        )}
      </div>
    )
  }
}

export default BooksApp
