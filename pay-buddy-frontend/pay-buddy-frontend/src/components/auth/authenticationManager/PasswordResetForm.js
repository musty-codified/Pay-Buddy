import React, {useEffect,useState} from 'react';
import axios from 'axios'

function PasswordResetForm() {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Password = async(e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post("http://127.0.0.1:8080/api/v1/auth/reset-password", {newPassword, confirmPassword});
            if(data.error){
                console.log(data.error)
            }else{
                window.location.href = "/"
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-6">

                    <h4 className="h4 mb-3 mt-3">Password Reset</h4>

                    <div className="mb-3">
                        <label htmlFor="new-password" className="form-label">New Password</label>
                        <input type="password" className="form-control" id="new-password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}
                               placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm-password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
                               placeholder="name@example.com" />
                    </div>

                    <div className="mb-3 mt-5">
                        <button className="btn btn-primary c-submit-button" onClick={Password}>Reset</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default PasswordResetForm;