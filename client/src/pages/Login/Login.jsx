import React, { useState } from "react"
import video from "../../assets/cinema3.mp4"
import "./Login.css"
import API from "../../utils/api"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError(true)
        } else {
            try {
                const response = await API.post('/auth/login', {
                    email: email,
                    password: password
                })
                if (response.status === 200) {
                    // window.location.href = "http://localhost:3000/"
                    navigate("/");
                }
            } catch (error) {
                setError(true)
            }
        }
    }


    const handleRedirect = (e) => {
        e.preventDefault();
        // window.location.href = "http://localhost:3000/register"
        navigate("/register");
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
                        {error && <p style={{ color: 'red', fontWeight: 800 }}>Wrong email or password</p>}
                    </div>
                    <form style={{ fontSize: 20, fontWeight: "500" }}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'white' }}>E-mail address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: 'white' }}>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="buttonWrapper">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{ fontSize: 20 }}>
                                Login
                            </button>
                            <button type="submit" className="btn btn-secondary" onClick={handleRedirect} style={{ fontSize: 20 }}>Don't have an account?</button>
                        </div>
                    </form>
                    {/* <div className="buttonWrapper">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{ fontSize: 20 }}>
                            Login
                        </button>
                        <button type="submit" className="btn btn-secondary" onClick={handleRedirect} style={{ fontSize: 20 }}>Don't have an account?</button>
                    </div> */}
                </div>
            </div >
        </>
    )
}

export default Login;