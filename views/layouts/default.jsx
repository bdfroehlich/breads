const React = require('react')

function Default(html) {
  return (
    <html>
    <head>
      {/* if title is not null display the title if null display default, see breads_controller.js render object title */}
        {/* need to also add title to the Index function in index.js and as an attribute on the default tag in the Index function */}
      <title>{html.title || 'Default'}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ==" crossOrigin="anonymous" />
      {/* need to access the main.css file */}
      <link rel="stylesheet" href="/main.css"/>
    </head>
    <body>
      <div className="wrapper">
        <header>
          {/* returns you to the /breads page with the list of clickable breads */}
          <h1><a className="title" href="/breads">BreadCRUD</a></h1>
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