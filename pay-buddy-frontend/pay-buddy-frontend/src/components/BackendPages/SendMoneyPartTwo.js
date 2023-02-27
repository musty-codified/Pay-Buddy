import sendMoneyLogo from "../../assets/images/sendmoney-logo.svg";
import axios from "axios";
import { bankList } from "../../data/SendMoneyData";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../statemanagement/ComponentState";

const SendMoneyPartTwo = () => {

    const { pagename, setPageName } = useContext(MyContext);
    setPageName("Send Money");
    
    return ( 
        <div class="row justify-content-center align-items-center">
            <div class="col-md-5">
                <form>
                    <div class="payment-logo mb-3">
                    <Link to="/pay-buddy/send-money-1">
                        <img src={sendMoneyLogo} />
                    </Link>
                    <div className="mt-3 payment-info"><span>Enter your details to send money</span></div>
                    </div>
                    <div class="mb-3">
                        <label for="accountNumber" class="form-label">Note (Optional)</label>
                        <input type="text" class="form-control" id="note" placeholder="Eneter a transaction note" />
                    </div>
                    <div class="mb-3">
                        <label for="accountName" class="form-label">Amount</label>
                        <input type="text" name="amount" class="form-control" id="accountName" placeholder="Enter an amount" />
                    </div>
                    <div class="mb-3">
                        <label for="accountName" class="form-label">Pin</label>
                        <input type="password" name="transactionPin" class="form-control" id="transactionPin" placeholder="Enter transaction pin" />
                    </div>
                    <div class="mb-3 button-margin">
                        <button type="button" class="btn btn-primary">Pay</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default SendMoneyPartTwo;