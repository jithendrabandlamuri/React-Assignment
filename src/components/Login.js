import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function Login({setData2}) {
    const [value, setValue] = useState({ email: '', password: '' })
    
    const header = {
        'Access-Control-Allow-Origin': '*'
    }
    const navigate = useNavigate()

    const submitLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4001/login', value, header)
            .then(Response => {
                console.log(Response.data.token);
                setData2(Response.data.username);
                navigate("/HomePage")
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
                            <b><Link to='/' className="nav-link">Home</Link></b>
                        </li>
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
                <form onSubmit={submitLogin} className="form-box">
                    <br /><h2>Login</h2><br />
                    <div className="form-group row">
                        <h4 htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</h4>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onChange={(e) => setValue({ ...value, email: e.target.value })}></input>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <h4 htmlFor="inputEmail3" className="col-sm-2 col-form-label">Password</h4>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onChange={(e) => setValue({ ...value, password: e.target.value })}></input>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-success">Login</button>
                        </div>
                    </div><br /><br />
                </form>
            </div>
        </div>
    )
}

export default Login
