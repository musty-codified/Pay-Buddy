import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import appApi from "../../apis/AppApi";
import "./TransactionPin.css";

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
            const {data} = await appApi.post("/api/v1/wallet/updateWalletPin", {createPin, confirmCreatePin});
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
                {/* <Modal.Header closeButton>
                </Modal.Header> */}
                <Modal.Body>
                <div className='container_modal mt-1' >
                    <div> 
                        <h3 className="create-transaction-h3" style={{fontWeight: "bold"}}>Create Transaction Pin</h3>
                        <p className="secured-transaction-p_tag">
                            Create a transaction pin to be able to make a <br></br>secured transaction
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
                            <label htmlFor="username" className="form-label form-label-pin">Confirm Pin</label>
                            <input type="email" className="form-control form-control-pin" id="username" value={confirmCreatePin} onChange={(e)=> {
                                setIsError(false)
                                setConfirmCreatePin(e.target.value)
                            }
                            }
                                name="username" placeholder="4 digit transaction pin"/>
                        </div>
                        {isError && <div style={{color: "red"}}>{errorMessage}</div>}
                        <div className="mb-3 mt-5">
                        <button className="btn btn-primary btn-pin" onClick={TransactionPinInput}>Create</button>
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TransactionPin;