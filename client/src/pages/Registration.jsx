import React, { useState } from "react"
import video from "../assets/cinema3.mp4"
import "./Login/Login.css"
import API from "../utils/api"
import { validateEmail } from "../utils/helpers"
import { useNavigate } from "react-router-dom"

function Registration() {

    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [userName, setUsername] = useState(null);
    const [emptyError, setEmptyError] = useState(false);
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !userName) {
            setError(false);
            setEmptyError(true)
            setEmailError(false);
        } else if (!validateEmail(email)) {
            setError(false);
            setEmptyError(false);
            setEmailError(true);
        } else {
            try {
                const response = await API.post('/auth/register', {
                    email: email,
                    password: password,
                    username: userName
                })
                if (response.status === 201) {
                    navigate("/");
                }
            } catch (error) {
                setEmptyError(false);
                setEmailError(false);
                setError(true);
            }
        }
    }


    const handleRedirect = (e) => {
        e.preventDefault();
        // window.location.href = "http://localhost:3000/login"
        navigate("/login");
    }

    return (
        <>
            <div className="loginWrapper">
                <video className="videoBackground" loop autoPlay muted>
                    <source src={video} type="video/mp4"></source>
                </video>
                <div className="formWrapper">
                    <div className="titleWrapper">
                        <p className="title">WATCHNEXT</p>
                        {/* <p className="title" style={{ fontFamily: "'Bebas Neue', 'cursive'", fontSize: 75, color: 'white' }}>WATCHNEXT</p> */}
                        {emptyError && <p style={{ color: 'red', fontWeight: 800 }}>All fields must be filled</p>}
                        {error && <p style={{ color: 'red', fontWeight: 800 }}>User with that e-mail already exists</p>}
                        {emailError && <p style={{ color: 'red', fontWeight: 800 }}>Invalid e-mail</p>}
                    </div>
                    {/* <p className="h2" style={{ fontFamily: "'Bebas Neue', 'cursive'", fontSize: 75, color: 'white' }}>WatchNext</p>
                    {emptyError && <p style={{ color: 'red', fontWeight: 800 }}>All fields must be filled</p>}
                    {error && <p style={{ color: 'red', fontWeight: 800 }}>User with that e-mail already exists</p>}
                    {emailError && <p style={{ color: 'red', fontWeight: 800 }}>Invalid e-mail</p>} */}
                    <form style={{ fontSize: 18, fontWeight: "500" }}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputUsername1" className="form-label" style={{ color: 'white' }}>Username</label>
                            <input type="email" className="form-control" id="exampleInputUsername1" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'white' }}>E-mail address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: 'white' }}>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="buttonWrapper">
                            <button type="submit" className="btn btn-primary" style={{ fontSize: 20 }} onClick={handleSubmit}>
                                Create an account
                            </button>
                            <button type="submit" className="btn btn-secondary" style={{ fontSize: 20 }} onClick={handleRedirect}>Log in</button>
                        </div>

                    </form>
                </div>
            </div >
        </>
    )
}

export default Registration;