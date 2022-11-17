import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function SignUp() {
    const [value, setValue] = useState({ username:'',email: '', password: '' })
    const submitSignUp = (e) => {
        const header = {
            'Access-Control-Allow-Origin': '*'
        }
        axios.post('http://localhost:4001/register', value, header)
            .then(Response => {
                console.log(Response);
                if(Response.status===201){
                    alert('User Created Successfully')
                }
            })
            .catch(error => {
                if(error.response.status===409){
                    alert('User Already Exist with this mail. Please Login')
                }
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
            <div >
                <form onSubmit={submitSignUp} className="form-box">
                    <br /><h2>Sign Up</h2><br />
                    <div className="form-group row">
                        <h4 htmlFor="inputEmail3" className="col-sm-2 col-form-label">Username</h4>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="Username" onChange={(e) => setValue({ ...value, username: e.target.value })}></input>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group row">
                        <h4 htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</h4>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" placeholder="Email" onChange={(e) => setValue({ ...value, email: e.target.value })}></input>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                    <h4 htmlFor="inputEmail3" className="col-sm-2 col-form-label">Password</h4>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" placeholder="Password" onChange={(e) => setValue({ ...value, password: e.target.value })}></input>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-success">SignUP</button>
                        </div>
                    </div><br/><br/>
                </form>
            </div>
        </div>
    )
}

export default SignUp
