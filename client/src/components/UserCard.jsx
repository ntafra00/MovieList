import React, { useState, useEffect } from "react";
import API from "../utils/api";
import image from "../assets/user.png"
import { MdDelete } from "react-icons/md"
import { FaUserEdit } from "react-icons/fa"


function UserCard() {

    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const userData = await API.get('/users');
            setUserName(userData.data.data.username);
            setEmail(userData.data.data.email);
        }

        getUserInfo();
    }, [])

    return (
        <div className="row mt-5">
            <div className="mt-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="card" style={{ backgroundColor: "#FEE715FF" }}>
                    <img src={image} style={{ width: "100%", height: "300px" }} className="card-img-top" alt="Movie" />
                    <h5 className="card-header" style={{ textAlign: "center" }}>{userName}</h5>
                    <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <p className="card-title" style={{ fontWeight: 500, fontSize: 18 }}>USERNAME: {userName}</p>
                        <p className="card-text" style={{ fontWeight: 500, fontSize: 18 }}>E-MAIL: {email}</p>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <FaUserEdit style={{ marginRight: 30, cursor: "pointer" }} size="2em" data-bs-toggle="modal" data-bs-target="#editModal"></FaUserEdit>
                            <MdDelete data-bs-toggle="modal" data-bs-target="#deleteModal" size="2em" style={{ cursor: "pointer" }}></MdDelete>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        //     <div className="card" style={{ width: "30%", height: "10%" }}>
        //         <img src={image} className="card-img-top" alt="user" />
        //         <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#FEE715FF" }}>
        //             <h5 className="card-title">{userName}</h5>
        //             <p className="card-text">username: <span style={{ fontWeight: 500, color: "crimson" }}>{userName}</span></p>
        //             <p className="card-text">mail: <span style={{ fontWeight: 500, color: "crimson" }}>{email}</span></p>
        //             <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        //                 <FaUserEdit style={{ marginRight: 30, cursor: "pointer" }} size="2em" data-bs-toggle="modal" data-bs-target="#editModal"></FaUserEdit>
        //                 <MdDelete data-bs-toggle="modal" data-bs-target="#deleteModal" size="2em" style={{ cursor: "pointer" }}></MdDelete>
        //             </div>
        //         </div>
        //     </div>
        // </div >
    )
}

export default UserCard