import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewArticle() {
    const [articles, setArticle] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4001/viewarticle')
            .then(Response => {
                console.log(Response);
                setArticle(Response.data.response)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <b><Link to='/HomePage' className="nav-link">Home</Link></b>
                        </li>
                        <li className="nav-item">
                            <b><Link to='/AddArticle' className="nav-link">AddArticle</Link></b>
                        </li>
                        <li className="nav-item">
                            <b><Link to='/ViewArticle' className="nav-link">ViewArticles</Link></b>
                        </li>
                    </ul>
                </div>
                <p className="nav-item" style={{ margin: "0px 20px" }}>
                    <b><Link to='/login' className="nav-link">LogOut</Link></b>
                </p>
            </nav>
            <br /><br /><br />
            <div>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Text</th>
                            <th scope="col">Author</th>
                        </tr>
                    </thead>
                    {
                        articles.map((article) => {
                            return (

                                <tbody>
                                    <tr>
                                        <th scope="row">{article.title}</th>
                                        <td>{article.text}</td>
                                        <td>{article.author}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>



            </div>
        </div>
    )
}

export default ViewArticle
