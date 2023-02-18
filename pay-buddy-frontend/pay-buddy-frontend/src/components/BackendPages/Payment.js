import { useContext } from "react";
import { MyContext } from "../../statemanagement/ComponentState";

const Payment = () => {
    const { pagename, setPageName } = useContext(MyContext);
    setPageName("Payment");
    return (  
        <div className="row ">
            <div className="col-md-4 mt-3">
                <div className="payment-items">
                </div>
            </div>
            <div className="col-md-4 mt-3">
                <div className="payment-items">
                </div>
            </div>
            <div className="col-md-4 mt-3">
                <div className="payment-items">

                </div>
            </div>
            <div className="col-md-4 mt-5">
                <div className="payment-items">
                </div>
            </div>
        </div>
    );
}
 
export default Payment;