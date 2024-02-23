
import TransactionRow from "./TransactionRow";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import Fab from "../../../../Resource/Component/Fab";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import styled from "styled-components";
import React from "react";
import GetLoanGroupAxis from "../../../../Resource/Net/Requests/GetLoanGroupAxios";
import URLs from "../../../../Resource/Net/URLs";

function Transaction({loanGroup}) {

    // updateLoanGroups()
    const transaction =  {
        id: -1,
        user_id: '-1',
        code: '',
        value: 0,
        date: new Date(),
        type: 1
    }
    const Space = styled.div`
          height: 5em;

    `;
    return(
        <div>
            <div className="container-fluid">
                {
                    loanGroup?.memberships.map((member)=>{
                        return(
                        member?.transactions.map((transaction)=>{
                            return (
                                <TransactionRow loan_group_id={loanGroup.id} user={member.user}   transaction={transaction}></TransactionRow>
                            )
                        }))
                    })
                }
            </div>
            <Space />
            {haveAccess()? <Fab addr={getAddress('AddTransaction',loanGroup?.id??-1)}  initObj =  {transaction} /> :""}
        </div>
    );
}
export default Transaction;