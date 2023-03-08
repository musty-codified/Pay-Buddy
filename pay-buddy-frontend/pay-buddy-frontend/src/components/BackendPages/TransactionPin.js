import React, { useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import "./TransactionPin.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import appApi from "../../apis/AppApi";
import { notifyError, notifySuccess } from "../notification/Toastify";
import LoadingSpin from "react-loading-spin";

function TransactionPin(props) {
    const[isLoading, setIsLoading] = useState(false)
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
   
const TransactionPinInput = async(e)=>{
    e.preventDefault()
   if(pin !== confirmPin){
    setIsError(true)
    setErrorMessage("Pin do not match")
   }else{
    setIsLoading(true);
    const token = localStorage.getItem('token')
        try {
            const {data} = await axios.put('http://localhost:8080/api/v1/wallet/updateWalletPin', {pin}, {headers:{
                Authorization:`Bearer ${token}`
        }})
             setPin("")
             setConfirmPin("")
             notifySuccess("success")
             toast.success(data.description)
             setIsLoading(false);
    }catch (error) {
        console.log(error)
            notifyError("Internal server Error")
            setIsLoading(false);
    }
    }   
    };
    useEffect(() => {
    
    }, [])
    return (
        <div className='modals mt-1'>
            <Modal show={props.open} onHide={props.handleClose}>
                <Modal.Body>
                <div className='container_modal mt-1' >
                    <div> 
                        <h3 className="create-transaction-h3" style={{fontWeight: "bold"}}>Create Transaction Pin</h3>
                        <p className="secured-transaction-p_tag">
                            Create a transaction pin to be able to make a <br></br>secured transaction
                        </p>
                    </div>
                        <div className="mb-3" style={{fontWeight: "bold"}}>
                            <label htmlFor="password" className="form-label">Create Pin</label>
                            <input  maxlength="4" type="password" className="form-control" id="username" value={pin} onChange={(e)=> {
                                setIsError(false)
                                setPin(e.target.value)
                            }
                            }
                                name="password" placeholder="4 digit transaction pin"/>
                        </div>
                        <div className="mb-3" style={{fontWeight: "bold"}}>
                            <label htmlFor="password" className="form-label">Confirm Pin</label>
                            <input maxlength="4" type="password" className="form-control" id="username" value={confirmPin} onChange={(e)=> {
                                setIsError(false)
                                setConfirmPin(e.target.value)
                            }
                            }
                                name="password" placeholder="4 digit transaction pin"/>
                        </div>
                        {isError && <div style={{color: "red"}}>{errorMessage}</div>}
                        <div className="mb-3 mt-3">
                        <button className="btn btn-primary" onClick={TransactionPinInput}> { isLoading && <LoadingSpin size="40px" color="white" numberOfRotationsInAnimation={3}/>}Create</button>
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TransactionPin;