import React from "react"
import API from "../../utils/api"
import "./Navigation.css"
import { useNavigate } from "react-router-dom"

function Navigation() {


    let navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            let response = await API.get('/auth/logout');
            if (response.status === 200)
                // window.location.href = "http://localhost:3000/login"
                navigate("/login");
        } catch (error) {
            return
        }
    }

    const handleRedirect = (path) => {
        // window.location.href = `http://localhost:3000/${path}`
        navigate(`/${path}`);
    }

    const openIMDB = () => {
        window.open("https://www.imdb.com/", "_blank");
    }

    // napisi media query za dropdown botun

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <span className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => { handleRedirect("") }}>WATCHNEXT</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button type="button" className="btn btn-outline-primary marginButton" onClick={() => handleRedirect("user")}>My Profile</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-outline-danger styledButton" onClick={handleLogOut}>Log Out</button>
                        </li>
                        <li>
                            <button type="button" className="btn btn-outline-warning styledButton" onClick={openIMDB}>IMDb</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navigation;