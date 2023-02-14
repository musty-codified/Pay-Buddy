import React from 'react';

function PasswordResetForm() {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-6">

                    <h4 className="h4 mb-3 mt-3">Password Reset</h4>

                    <div className="mb-3">
                        <label htmlFor="new-password" className="form-label">New Password</label>
                        <input type="password" className="form-control" id="new-password"
                               placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm-password"
                               placeholder="name@example.com" />
                    </div>

                    <div className="mb-3 mt-5">
                        <button className="btn btn-primary c-submit-button">Reset</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default PasswordResetForm;