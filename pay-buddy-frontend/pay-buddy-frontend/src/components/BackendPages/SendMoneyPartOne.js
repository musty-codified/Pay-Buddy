import sendMoneyLogo from "../../assets/images/sendmoney-logo.svg";
import axios from "axios";
import { bankList } from "../../data/SendMoneyData";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../statemanagement/ComponentState";

const SendMoneyPartOne = () => {
    const navigate = useNavigate();

    const { pagename, setPageName } = useContext(MyContext);
    setPageName("Send Money");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/pay-buddy/send-money-2");

    }
    return ( 
        <div class="row justify-content-center align-items-center">
            <div class="col-md-5">
                <form onSubmit={handleSubmit}>
                    <div class="payment-logo mb-3">
                    <img src={sendMoneyLogo} />
                    <div className="mt-3 payment-info"><span>Enter your details to send mone</span></div>
                    </div>

                    <div class="mb-3">
                        <label for="bankName" class="form-label">Bank Name</label>
                        <select class="form-select" aria-label="Select a bank" required>
                            {bankList.map((b)=>
                                <option key={b.bankId}>{b.bankName}</option>
                            )}
                            
                            {/* <option>Diamon-Access Bank</option>
                            <option>UBA Bank</option> */}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="accountNumber" class="form-label">Account Number</label>
                        <input type="accountNumber" class="form-control" id="accountNumber" placeholder="0122319083" required/>
                    </div>
                    <div class="mb-3">
                        <label for="accountName" class="form-label">Account Name</label>
                        <input type="text" disabled name="accountName" class="form-control" id="accountName" placeholder="John doe" required/>
                    </div>
                    <div class="mb-3 button-margin">
                        <button type="submit" class="btn btn-primary ">Proceed</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default SendMoneyPartOne;