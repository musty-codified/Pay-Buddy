import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function TransactionPin(props) {
    const [createPin, setCreatePin] = useState("");
    const [confirmCreatePin, setConfirmCreatePin] = useState("");
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

const TransactionPinInput = async(e)=>{
    e.preventDefault()
   if(createPin !== confirmCreatePin){
    setIsError(true)
    setErrorMessage("Passwords do not match")
   }else{
        try {
            const {data} = await axios.post("http://127.0.0.1:8080/api/v1/wallet/updateWalletPin", {createPin, confirmCreatePin});
            if (data.status === 200){
                setCreatePin("")
                setConfirmCreatePin("")
                toast.success(data.data.description)
        } 
    }catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
    }   
    };
    return (
        <>
            <Modal show={props.open} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title className='modal-title'>Create Transaction Pin</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                <div className='container mt-1'>
                    <div> 
                        <h3 style={{fontWeight: "bold"}}>Create Transaction Pin</h3>
                        <p>
                            Create a transaction pin to be able to make a secured transaction
                        </p>
                    </div>
                        <div className="mb-3" style={{fontWeight: "bold"}}>
                            <label htmlFor="username" className="form-label">Create Pin</label>
                            <input type="email" className="form-control" id="username" value={createPin} onChange={(e)=> {
                                setIsError(false)
                                setCreatePin(e.target.value)
                            }
                            }
                                name="username" placeholder="4 digit transaction pin"/>
                        </div>
                        <div className="mb-3" style={{fontWeight: "bold"}}>
                            <label htmlFor="username" className="form-label">Confirm Pin</label>
                            <input type="email" className="form-control" id="username" value={confirmCreatePin} onChange={(e)=> {
                                setIsError(false)
                                setConfirmCreatePin(e.target.value)
                            }
                            }
                                name="username" placeholder="4 digit transaction pin"/>
                        </div>
                        {isError && <div style={{color: "red"}}>{errorMessage}</div>}
                        <div className="mb-3 mt-5">
                        <button className="btn btn-primary" onClick={TransactionPinInput}>Create</button>
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TransactionPin;