const React = require('react')
const Default = require('./layouts/default')

function Index ({breads, title})  {
    return (
      <Default title={title}>
        <h2>Index Page</h2>
        <ul>
            {
                breads.map((bread) => {
                    return (<li key={bread.id}>
                        {/* going to /breads/ and then the breads index # */}
                        <a href={`/breads/${bread.id}`}>
                            {bread.name}
                        </a>
                    </li>)
                })
            }
        </ul>
        <div className="newButton">
            <a href="/breads/new"><button>Add a new bread</button></a>
        </div>
      </Default>
    )
}

module.exports = Index
