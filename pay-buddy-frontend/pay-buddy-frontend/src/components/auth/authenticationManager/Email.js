import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";

function Email(props) {
    return (
        <>
            <Modal show={props.open} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Email address</label>
                        <input type="text" className="form-control" id="username"
                               name="username" placeholder="name@companyemail.com"/>
                    </div>
                    <div className="mb-3 mt-3">
                        <button className="btn btn-primary c-submit-button">Send</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Email;