import React from 'react'
import './App.css'

class ShelfChanger extends React.Component {
  handleSelect = (e) => {
    e.preventDefault();
    if(this.props.onUpdateBook)
      this.props.onUpdateBook(this.props.book, e.target.value);
  }

  render() {
    const { book } = this.props
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleSelect} value={book.shelf ? book.shelf : 'none'}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger
