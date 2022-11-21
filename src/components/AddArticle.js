import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function AddArticle({email}) {
    const [value, setValue] = useState({ title: '', text: '', author: '',email:email })
    
    const submitAdd = (e) => {
        axios.post('http://localhost:4001/addarticle', value)
            .then(Response => {
                console.log(Response);
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
                <p className="nav-item" style={{margin:"0px 20px"}}>
                    <b><Link to='/login' className="nav-link">LogOut</Link></b>
                </p>
            </nav>
            <div >
                <form onSubmit={submitAdd} className="form-box">
                    <br /><h2>Add Article</h2><br />
                    <div className="form-group row">
                        <h4 htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</h4>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Title" onChange={(e) => setValue({ ...value, title: e.target.value })}></input>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <h4 htmlFor="inputText" className="col-sm-2 col-form-label">Text</h4>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" placeholder="Text" onChange={(e) => setValue({ ...value, text: e.target.value })}></textarea>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <h4 htmlFor="inputAuthor" className="col-sm-2 col-form-label">Author</h4>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Author" onChange={(e) => setValue({ ...value, author: e.target.value })}></input>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-success">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddArticle
