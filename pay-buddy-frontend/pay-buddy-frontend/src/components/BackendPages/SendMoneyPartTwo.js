import sendMoneyLogo from "../../assets/images/sendmoney-logo.svg";
import axios from "axios";
import { bankList } from "../../data/SendMoneyData";
import { json, Link,useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../../statemanagement/ComponentState";
import appApi from "../../apis/AppApi.js";
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess, notifyWarning } from '../notification/Toastify';
import LoadingSpin from "react-loading-spin";

const SendMoneyPartTwo = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [amount, setAmount] = useState(null);
    const [walletPin, setWalletPin] = useState(null)
    const[isLoading, setIsLoading] = useState(false)
    
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        formData["accountName"] = bankDetails.accountName;
        formData["accountNumber"] = bankDetails.accountNumber;
        formData["bankCode"] = bankDetails.bankCode;
        setIsLoading(true);
        sendMoney(formData);
    }

    const sendMoney =(data) =>{
        appApi.post("api/v1/wallet/sendMoney",data)
        .then(res => {
            console.log(res);
            setIsLoading(false);
            notifySuccess("Transaction successful");
            localStorage.setItem("amountSent",formData["amount"]);
            localStorage.setItem("beneficiary",`${user.firstName} ${user.lastName}`);
            navigate("/pay-buddy/send-money-3");
        })
        .catch(err => {
            console.log(err.response.data.error);
            setIsLoading(false);
            if(err.response.data.error){
                notifyError(err.response.data.error);
            }
            else{
                notifyError(err.response.data);
            }        
        })
    }

    let bankDetails = JSON.parse(localStorage.getItem("bankDetails"));
    let user =JSON.parse(localStorage.getItem("user"));
    console.log(bankDetails);
    if(bankDetails["accountName"]=="") navigate("/pay-buddy/send-money-1"); 

    const { pagename, setPageName } = useContext(MyContext);
    setPageName("Send Money");
    
    return ( 
        <div class="row justify-content-center align-items-center">
            <div class="col-md-5">
                <form onSubmit={handleSubmit}> 
                    <div class="payment-logo mb-3">
                    <Link to="/pay-buddy/send-money-1">
                        <img src={sendMoneyLogo} />
                    </Link>
                    <div className="mt-3 payment-info"><span>Enter your details to send money</span></div>
                    </div>
                    <div className="mb-3">
                        <div className="row border-dash">
                            <div className="col-2">From</div>
                            <div className="col-10">{`${user.firstName} ${user.lastName}`}</div>
                        </div>
                        <div className="row border-dash">
                            <div className="col-2">To</div>
                            <div className="col-10">{`${bankDetails.accountName} ${bankDetails.accountNumber}`}</div>
                        </div>
                        <div className="row border-dash">
                            <div className="col-2">Bank</div>
                            <div className="col-10">{bankDetails.bankName}</div>
                        </div>     
                    </div>
                    <div className="mb-3">
                        <label for="accountNumber" class="form-label">Note (Optional)</label>
                        <input type="text" class="form-control" id="note"  name="note" placeholder="Eneter a transaction note" />
                    </div>
                    <div className="mb-3">
                        <label for="amount" class="form-label">Amount</label>
                        <input type="number" name="amount" class="form-control" 
                        id="amount" placeholder="Enter an amount" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label for="walletPin" class="form-label">Pin</label>
                        <input type="password" name="walletPin" class="form-control"
                         id="walletPin" placeholder="Enter transaction pin" 
                         onChange={handleChange}  maxLength="4"/>
                    </div>

                    <div className="mb-3 button-margin">
                        <button type="submit" class="btn btn-primary">{ isLoading &&<LoadingSpin size="40px" color="white" numberOfRotationsInAnimation={3}/>} Pay</button>
                    </div>
                </form>
                <div className="rectangle-2">
                    <ToastContainer />
                </div>
            </div>
        </div>
     );
}
 
export default SendMoneyPartTwo;