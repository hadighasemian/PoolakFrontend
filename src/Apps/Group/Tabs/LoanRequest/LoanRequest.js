import haveAccess from "../../../../Resource/ACL/HaveAccess";
import Fab from "../../../../Resource/Component/Fab";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import React, {useEffect, useState} from "react";
import Space from "../../../../Resource/Component/Space";
import LoanRow from "../Loan/LoanRow";
import LoanRequestRow from "./LoanRequestRow";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";

function LoanRequest({loanGroup}) {
    const {user} = AuthModel()
    const loanRequest = {
        id:'-1',
        amount:1000,
        length:1,
        date:new Date(),
        user_id:user.id,
        loan_group_id:loanGroup?.id
    }


    return(
            <div>
                <div className="container-fluid ">
                    {
                        loanGroup?.memberships.map((member)=>{
                            return(
                                member?.loan_requests.map((request)=>{
                                    return (
                                        <LoanRequestRow key={request.id} lonRequest={request} user={member.user}
                                                 loan_group_id={loanGroup.id}/>
                                    )
                                }))
                        })
                    }
                </div>
                <Space />
                <Fab addr={getAddress('AddLoanRequest',loanGroup?.id??-1)}  initObj =  {loanRequest} />
            </div>
    )
}
export default LoanRequest;