import React from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  handleSelect = (e) => {
    e.preventDefault();
    // Update the book state within the api using onUpdateBook
    // Update the shelf locally as well (Not the best way to do this)
    if(this.props.onUpdateBook) {
      this.props.onUpdateBook(this.props.book, e.target.value);
      this.props.book.shelf = e.target.value;
    }
  }

  render() {
    const { book } = this.props

    return (
      <div className="book-shelf-changer">
      {/* Use an onChange to attach the method above. */}
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
