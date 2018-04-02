import React from 'react'
import ReactDOM from 'react-dom'
// Non default export i.e. specific module
import { BrowserRouter } from 'react-router-dom';
import App from './components/App'

// Load the main component into a browserouter
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
