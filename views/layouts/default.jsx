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
        <div className="wrapper">
          <header>
            {/* returns you to the /breads page with the list of clickable breads */}
            <h1><a href="/breads">BreadCRUD</a></h1>
          </header>
          <div className="container">
            {html.children}
          </div>
        </div>
      </body>
    </html>
  )
}

module.exports = Default