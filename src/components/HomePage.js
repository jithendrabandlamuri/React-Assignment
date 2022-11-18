import React from 'react'
import { Link } from 'react-router-dom'

function HomePage({data2}) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <b><Link to='/AddArticle' className="nav-link">AddArticle</Link></b>
                        </li>
                        <li className="nav-item">
                            <b><Link to='/ViewArticle' className="nav-link">ViewArticles</Link></b>
                        </li>
                    </ul>
                </div>
                <p className="nav-item" style={{margin:"0px 20px"}}>
                    <b><Link to='/login' className="nav-link">LogOut</Link></b>
                </p>
            </nav>
            <div>
                <h1>Welcome {data2} </h1>
            </div>

        </div>
    )
}

export default HomePage
