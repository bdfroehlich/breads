const React = require('react')
const Default = require('./layouts/default')

function notFound () {
    // Confirm we are getting our bread data in the terminal.
    // console.log(bread.name)
      return (
        <Default>
           <h1>404 PAGE NOT FOUND</h1>
        </Default>
      )
  }

module.exports = notFound