import React from 'react'
import { Link } from 'react-router-dom'

class SearchButton extends React.Component {

  render() {
    return (
      <div className="open-search">
      {/* React Router DOM Link used with React-Router */}
        <Link to="/search">Add a book</Link>
      </div>
    )
  }
}

export default SearchButton
