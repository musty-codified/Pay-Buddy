import React, { useContext, useEffect } from "react";
import { MyContext } from "../../statemanagement/ComponentState";
import Sidebar from "./layout/Sidebar";
import { useState } from "react";
import "../../assets/css/dashboard.css";
import { RiFilter3Fill } from "react-icons/ri";
import { BsBank2 } from "react-icons/bs";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import Mastercard from "../../assets/images/mastercard.svg";
import HappyUser from "../../assets/images/happyuser.svg";
import bankLogo from "../../assets/images/bank-logo.svg";
import appApi from "../../apis/AppApi.js";
import { currency } from "../../includes/Config";
import Wallet from "./wallet/Wallet";
import { screenSize } from "../../includes/Config";
import { pageLimit } from "../../includes/Config";
import { Pagination } from "@mui/material";
import Transaction from "../BackendPages/TransactionPin";
import { ToastContainer } from "react-bootstrap";
import { toUnitless } from "@mui/material/styles/cssUtils";


function Dashboard() {
  const initialValues = [
    {
      id: 1,
      user: "olayinka sulaiman",
      bankname: "ecobank",
      amount: 3000,
      transactionType: "DEBIT",
    },
    {
      id: 2,
      user: "teju kolawole",
      bankname: "access",
      amount: 4000,
      transactionType: "CREDIT",
    },
    {
      id: 3,
      user: "olayinka sulaiman",
      bankname: "ecobank",
      amount: 3000,
      transactionType: "DEBIT",
    },
    {
      id: 4,
      user: "teju kolawole",
      bankname: "access",
      amount: 4000,
      transactionType: "CREDIT",
    },
    {
      id: 5,
      user: "olayinka sulaiman",
      bankname: "ecobank",
      amount: 3000,
      transactionType: "DEBIT",
    },
  ];
  //CONTENT DISPLAY LOGIC
  let hiddenElement = "";
  if (screenSize < 768) {
    hiddenElement = "hiddenElement";
  }

  const { name, setPageName } = useContext(MyContext);
  setPageName("Dashboard");

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const onLoadOpen = () => setModalOpen(true);
  const onLoadClose = () => setModalOpen(false)

  const [walletBalance, setWalletBalance] = useState(0);
  const [Search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transaction, setTransaction] = useState([]);
  const [accountNumLastFourDigits, setAccountNumLastFourDigits] = useState(null);
    const rendercount = 1;

    // const triggerModal = () => {
    //   const user = localStorage.getItem("user")
    //   const userDetails= JSON.parse(user);
    //   if (userDetails.loginCount === 1){
    //     return (
    //       <>
    //       {onLoadOpen()}
    //       </>
    //     )
    //   }
    // }
    
  useEffect(() => {
    //triggerModal();
    getBalance();
  }, [rendercount]);

  const getBalance = () => {
    appApi
      .get("api/v1/wallet/balance")
      .then((res) => {
        console.log(res);
        const balance = currency.format(res.data.walletBalance);
        localStorage.setItem("isPinUpdated",res.data.pinUpdated);
        let accountNumber = res.data.accountNumber;
        let accountNumberArr =accountNumber.split("");
        const count = accountNumberArr.length-1;
        let lastFourDigits = accountNumber[count-3]+""+accountNumber[count-2]+""+accountNumber[count-1]+""+accountNumber[count]
        setAccountNumLastFourDigits(lastFourDigits);
        if(res.data.pinUpdated){
          setModalOpen(false);
        }
        else{
          setModalOpen(true);
        }
       
          
        setWalletBalance(balance);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function HandleChange(e) {
    setSearch(e.target.value);
  }

  function getInitials(name) {
    const nameArr = name.split(" ");
    const initials = nameArr.map((word) => word[0].toUpperCase());
    return initials.join("");
  }

  const [pageTotal, setPageTotal] = useState(10);

  useEffect(() => {
    appApi
        .get(`/api/v1/viewTransaction?page=${currentPage}&limit=${pageLimit}`)
        
      .then((res) => {
          setTransaction(res.data.list);
        // console.log("datas:", res.data);
          console.log(transaction);
        console.log(res.data.totalPage);
        setPageTotal(res.data.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);
  // console.log("transaction", transaction);
  const pageHandler = (event, value) => {
    setCurrentPage(() => value);
    console.log(value);
  };

  const aa = [
    {
      id: 1,
      user: "olayinka sulaiman",
      bankname: "ecobank",
      amount: currency.format(3000),
      transactionType: "DEBIT",
    },
    {
      id: 2,
      user: "teju kolawole",
      bankname: "access",
      amount: currency.format(4000),
      transactionType: "CREDIT",
    },
    {
      id: 3,
      user: "olayinka sulaiman",
      bankname: "ecobank",
      amount: currency.format(3000),
      transactionType: "DEBIT",
    },
    {
      id: 4,
      user: "teju kolawole",
      bankname: "access",
      amount: currency.format(4000),
      transactionType: "CREDIT",
    },
  ];

  const QuickTransfer = aa.map((list) => (
    <div className="recipient-info col-sm-3 col-6 align-items-center justify-content-center">
      <button>{getInitials(list.user)}</button>

      <p>{list.user}</p>
    </div>
  ));


  return (
    <>
      <div className="row dashboard ">
        <div className="col-md-7 p-3 ">
          {/* the user card  starts here*/}
          <div className="row mt-3">
            <div className="col-6">
              <div className="total-balance-div">
                <div>
                  <MdAccountBalanceWallet size={30} className="blue" />
                  <p>Total Balance</p>
                </div>
                <h4>{walletBalance}</h4>
              </div>
            </div>
            <div className="col-6">
              <div className="card-balance-div">
                <div className="card-balance-icon">
                  <img src={Mastercard} alt="" />
                  <p>Gift Chuks</p>
                </div>
                <h4>***{accountNumLastFourDigits}</h4>
              </div>
            </div>
          </div>
          {/* the user card ends here */}

          {/* Add amount starts here */}
          <div className="row">
            <div className="col-md-12 mt-3 hmmn">
              <div className="add-money-dashboard-div">
                <p>Add money to your wallet</p>
                <div className="add-money">
                  <button onClick={handleOpen}>
                    <BsFillPlusSquareFill id="add-money-icon" />
                    <div>Fund Account</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Add amount ends here */}

          {/* Quick transfer starts here */}
          <div className="row">
            <div className="col-md-12 mt-3">
              <div className="transfer-dashboard-div">
                <p>Quick Transfer</p>
                <div className="row align-items-center justify-content-center ">
                  {QuickTransfer}
                </div>
              </div>
            </div>
          </div>

          {/* Quick transfer ends here */}
          {/* refer and end start here */}
          <div className={`row ${hiddenElement}`}>
            <div className="col-md-12 mt-3">
              <div className="refer-dashboard-div">
                <p>Earn and Refer</p>
                <div className="refer">
                  <img src={HappyUser} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* refer and end earn here */}
        </div>

        <div className="col-md-5 list-of-transaction p-3">
          {/* search transaction starts here */}
          <div className="row mt-3">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="transaction-search-box d-flex align-items-center">
                <div className="search-icon">
                  <AiOutlineSearch />
                </div>
                <div className="search-input-field">
                  <input
                    type="search"
                    value={Search}
                    onChange={HandleChange}
                    placeholder="Search Transaction"
                  />
                </div>
              </div>&nbsp;&nbsp;
              <div className="search-filter">
                <RiFilter3Fill className="filter" />
              </div>
            </div>
          
          </div>

          {/* <div className='mt-5'> 
                            {ListOfTransaction}
                        </div> */}

          <div className="mt-5">
            {Search === ""
              ? transaction?.map((list) => {
                  const getDebit =
                    list.transactionType === "DEBIT"
                      ? "red text-right"
                      : list.transactionType === "CREDIT text-right"
                      ? "green text-center"
                      : "text-right";

                  return (
                    <div className="row">
                      <div className="col-2 d-flex flex-column align-items-center">
                        <div className="bank-logo">
                          <img src={bankLogo} alt="" />
                        </div>
                      </div>
                      <div className="col-6  user-name d-flex flex-column align-items-start">
                        {/* <h4>{list.user}</h4> */}
                        <h4 className="text-uppercase">{list.name}</h4>
                        {/* <p>{list.bankname}</p> */}
                        <p className="text-left">{list.bankCode}</p>
                      </div>
                      <div className="col-4 d-flex flex-column align-items-center ">
                        <h5 className={getDebit}>{currency.format(list.amount)}</h5>
                      </div>
                    </div>
                  );
                })
              : transaction
                  .filter((p) => p.name.includes(Search))
                  .map((list) => {
                    const getDebit =
                      list.transactionType === "DEBIT"
                        ? "red text-right"
                        : list.transactionType === "CREDIT text-right"
                        ? "green text-center"
                        : "text-right";

                    return (
                      <div className="row">
                        <div className="col-2 align-items-center justify-content-center">
                          <div className="bank-logo">
                            <img src={bankLogo} alt="" />
                          </div>
                        </div>
                        <div className="col-6  user-name align-items-center justify-content-center">
                          <h4>{list.name}</h4>
                          <p>{list.bankCode}</p>
                        </div>
                        <div className="col-4 align-items-center justify-content-center">
                          <h5 className={getDebit}>{currency.format(list.amount)}</h5>
                        </div>
                      </div>
                    );
                  })}
          </div>
          <div className="d-flex align-items-center justify-content-center">
          <Pagination
            className="my-3"
            count={pageTotal}
            page={currentPage}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={pageHandler}
          />
          </div>
          
        </div>
      </div>

      <Wallet open={open} handleClose={handleClose} handleOpen={handleOpen} />
      <Transaction open={modalOpen} handleClose={onLoadClose} handleOpen={onLoadOpen} />

    </>
  );
}

export default Dashboard;
