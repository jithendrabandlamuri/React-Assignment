import React from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <b><Link to='/signUp' className="nav-link">SignUp</Link></b>
                        </li>
                        <li className="nav-item">
                            <b><Link to='/login' className="nav-link">Login</Link></b>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br/><br/><br/>
                <h1>Welcome to Blog-App</h1>
            </div>
        </div>
    )
}

export default MainPage
