import React, { useState } from "react";
import API from "../utils/api";
import { validateEmail } from "../utils/helpers"
import { useNavigate } from "react-router-dom"

function EditModal() {

    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [secondPassword, setSecondPassword] = useState(null);
    const [equalityError, setEqualityError] = useState(false);
    const [existanceError, setExistanceError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError(true);
            setEqualityError(false);
            setExistanceError(false);
            return;
        }
        if (password) {
            let compareResult = password.localeCompare(secondPassword);
            console.log(compareResult)
            if (compareResult) {
                setExistanceError(false);
                setEqualityError(true);
                setEmailError(false);
                return;
            }
        }
        try {
            let response = await API.put('/users', {
                username: username,
                email: email,
                password: password
            })
            if (response.status === 200) {
                try {
                    let response = await API.get('/auth/logout');
                    if (response.status === 200)
                        window.location.href = "http://localhost:3000/login"
                    // navigate("/login");
                } catch (error) {
                    return
                }
            }
        } catch (error) {
            console.log(error);
            setEqualityError(false);
            setExistanceError(true);
            setEmailError(false);
            return;
        }
    }



    return (
        <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* <h5 className="modal-title" id="exampleModalLabel">Edit info</h5> */}
                        <p>The most frequent value will be used if any field is empty. When data is edited, you will be logged out. </p>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {equalityError && <p style={{ color: 'red', fontWeight: 400 }}>Passwords do not match</p>}
                        {existanceError && <p style={{ color: 'red', fontWeight: 400 }}>Given e-mail is already in use</p>}
                        {emailError && <p style={{ color: 'red', fontWeight: 400 }}>Invalid e-mail</p>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUsername(e.target.value)} value={null} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">E-mail</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setEmail(e.target.value)} value={null} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail2" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} value={null} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail3" className="form-label">Confirm password</label>
                                <input type="password" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" value={null} onChange={(e) => setSecondPassword(e.target.value)} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditModal;