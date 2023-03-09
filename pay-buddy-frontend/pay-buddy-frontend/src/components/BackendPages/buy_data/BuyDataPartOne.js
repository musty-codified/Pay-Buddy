import buyDataLogo from "../../../assets/images/buydata-logo.svg";
import { useNavigate} from "react-router-dom";

const BuyDataPartOne = () => {

    const navigate = useNavigate();

        return (
            <div className= "row justify-content-center align-items-center">
                <div className="col-md-5">
                    <form>
                        <div className= "payment-logo mb-3">
                            <img src= {buyDataLogo}/>
                            <div className="mt-3 payment-info"><span>Enter your details to buy data</span></div>
                        </div>

                        <div className="mb-3">
                            <label for="phoneNumber" className="form-label">Phone Number</label>
                            <input type="text" className="form-control"/>
                        </div>

                        <div className="mb-3">
                            <label for="network" className="form-label">Network</label>
                            <select className="form-select"></select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dataPlan" className="form-label">Data Plan</label>
                            <select className="form-select"></select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pin" className="form-label">Pin</label>
                            <input type="password" className="form-control"/>
                        </div>

                        <div className="mb-3 button-margin">
                            <button type="submit" className="btn btn-primary proceed">Proceed</button>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default BuyDataPartOne;