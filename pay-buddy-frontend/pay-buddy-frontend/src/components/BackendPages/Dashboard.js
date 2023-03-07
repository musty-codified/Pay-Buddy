import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../statemanagement/ComponentState';
import Sidebar from "./layout/Sidebar";
import { useState } from 'react'
import '../../assets/css/dashboard.css';
import { RiFilter3Fill } from "react-icons/ri"
import { BsBank2 } from "react-icons/bs"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { AiOutlineSearch } from "react-icons/ai"
import { MdAccountBalanceWallet } from 'react-icons/md'
import Mastercard from "../../assets/images/mastercard.svg"
import HappyUser from "../../assets/images/happyuser.svg"
import bankLogo from "../../assets/images/bank-logo.svg"
import appApi from "../../apis/AppApi.js";
import { currency } from '../../includes/Config';
import Wallet from './wallet/Wallet';
import { screenSize } from '../../includes/Config';

function Dashboard() {
    //CONTENT DISPLAY LOGIC
    let hiddenElement= "";
    if(screenSize<768){
        hiddenElement= "hiddenElement";
    }
    

    const { name, setPageName } = useContext(MyContext);
    setPageName("Dashboard");
    
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [walletBalance, setWalletBalance] = useState(0);
    const [Search, setSearch] = useState('');
    const rendercount=1;
    useEffect(()=>{
        getBalance();
    },[rendercount])

    const getBalance = () =>{
        appApi.get("api/v1/wallet/balance")
        .then(res =>{
            console.log(res);
            const balance =currency.format(res.data.walletBalance)
           setWalletBalance(balance);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    function HandleChange(e) {
        setSearch(e.target.value)
    }

    function getInitials(name) {
        const nameArr = name.split(' ');
        const initials = nameArr.map(word => word[0].toUpperCase());
        return initials.join('');
    }

    const aa = [
        {
            id: 1,
            user: "olayinka sulaiman",
            bankname: "ecobank",
            amount: currency.format(3000),
            transactionType: "DEBIT"
        },
        {
            id: 2,
            user: "teju kolawole",
            bankname: "access",
            amount: currency.format(4000),
            transactionType: "CREDIT"
        },
        {
            id: 3,
            user: "olayinka sulaiman",
            bankname: "ecobank",
            amount: currency.format(3000),
            transactionType: "DEBIT"
        },
        {
            id: 4,
            user: "teju kolawole",
            bankname: "access",
            amount: currency.format(4000),
            transactionType: "CREDIT"
        }
    ]

    const QuickTransfer = aa.map(list =>

        <div className="recipient-info col-sm-3 col-6">
            <button>{getInitials(list.user)}</button>
        
            <p>{list.user}</p>

        </div>
    )

    const ListOfTransaction = Search === "" ?
        aa.map(list => {
           const getDebit =  list.transactionType=== "DEBIT" ? 'red text-right' : list.transactionType === "CREDIT text-right" ? 'green text-center' : "text-right";
        
            return (
               <div className='row'>
    
                       <div className='col-2'><div className='bank-logo'><img src={bankLogo} alt ="" /></div></div> 
                        <div className='col-6  user-name'>
                            <h4>{list.user}</h4>
                            <p>{list.bankname}</p>
                        </div>
                    <div className='col-4'>
                        <h5 className={getDebit}>{list.amount}</h5>
                    </div>
                   
                    </div>
            )
        }
        ) :
        aa.filter(p => p.user.includes(Search)).map(list => {
            const getDebit =  list.transactionType=== "DEBIT" ? 'red text-right' : list.transactionType === "CREDIT text-right" ? 'green text-center' : "text-right";

            return (
                <div className='row'>
    
                     <div className='col-2'><div className='bank-logo'><img src={bankLogo} alt ="" /></div></div> 
                 <div className='col-6  user-name'>
                     <h4>{list.user}</h4>
                     <p>{list.bankname}</p>
                 </div>
             <div className='col-4'>
                 <h5 className={getDebit}>{list.amount}</h5>
             </div>
            
             </div>
            )
        }
        )


    return (

            <>
            <div className="row dashboard ">
                <div className="col-md-8 ">
                    {/* the user card  starts here*/}
                    <div className="row mt-3">
                        
                        <div className='col-6'>
                        <div className="total-balance-div">
                        <div>
                             <MdAccountBalanceWallet size={30} className ="blue" />
                             <p>Total Balance</p>
                       </div>
                         <h4>{walletBalance}</h4>
                     </div>
                        </div>
                                    <div className='col-6'>
                                <div className="card-balance-div">
                                <div className='card-balance-icon'>
                                     <img src={Mastercard} alt="" />
                                    <p>Gift Chuks</p>
                                </div>
                             <h4>***1523</h4>

                     </div>
                        </div>
                       

                    </div> 
                            {/* the user card ends here */}

                            {/* Add amount starts here */}
                    <div className='row'>
                        <div className='col-md-12 mt-3 hmmn'>
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
                              <div className='row' >
                                <div className='col-md-12 mt-3'>
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
                                <div className= "col-md-12 mt-3">
                                <div className="refer-dashboard-div">
                                             <p>Earn and Refer</p>
                                  <div className='refer'>
                                        <img src={HappyUser} alt="" />


                                                    </div>
                                                </div>
                                            </div>
                                </div>
                              
                               {/* refer and end earn here */}

                </div>

                <div className="col-md-4 list-of-transaction">
                    {/* search transaction starts here */}
                        <div className='row mt-3'>
                            <div className='col-10'>

                            <div className='transaction-search-box d-flex align-items-center'>
                                <div className='search-icon'>
                                <AiOutlineSearch />
                                </div>
                                <div className='search-input-field'>
                                <input type="search" value={Search} onChange={HandleChange} placeholder='Search Transaction' />
                                </div>
                            
                            </div>
                        </div>
                            <div className='col-2'>
                            <div className="search-filter">
                        <RiFilter3Fill className='filter'/>

                            </div>
                        </div>

                    </div>
                
                 
                        <div className='mt-5'> 
                            {ListOfTransaction}
                        </div>
                            
                      
                   
                    
                </div>


            </div>

            <Wallet open={open} handleClose={handleClose} handleOpen={handleOpen} />
            
            </>

       



      
    )
}

export default Dashboard;
