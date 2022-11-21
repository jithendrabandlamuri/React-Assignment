import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { If, Then } from 'react-if-elseif-else-render';

function ViewArticle({ email }) {
    const [articles, setArticle] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4001/viewarticle')
            .then(Response => {
                setArticle(Response.data.response)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const deleteArticle = (e) => {
        axios.delete('http://localhost:4001/delete-user/jithendra@gmail.com')
            .then(Response => {
                console.log(Response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

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

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Text</th>
                            <th scope="col">Author</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        articles.map(article => {
                            const a = article.email
                            return (
                                <tbody key={article._id}>
                                    <tr >
                                        <th scope="row">{article.title}</th>
                                        <td>{article.text}</td>
                                        <td>{article.author}</td>
                                        <If condition={email === a}>
                                            <Then>
                                            <td><button className='btn btn-success'>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={deleteArticle}>Delete</button></td>
                                            </Then>
                                        </If>
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
