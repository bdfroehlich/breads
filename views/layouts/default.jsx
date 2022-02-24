const React = require('react')

function Default(html) {
  return (
    <html>
    <head>
        {/* if title is not null display the title if null display default, see breads_controller.js render object title */}
        {/* need to also add title to the Index function in index.js and as an attribute on the default tag in the Index function */}
      <title>{html.title || 'Default'}</title>
    </head>
    <body>
      <h1>HTML Rendered!</h1>
      <div className="container">
        {html.children}
      </div>
    </body>
    </html>
  )
}

module.exports = Default