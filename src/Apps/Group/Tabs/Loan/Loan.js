import LoanRow from "./LoanRow";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import Fab from "../../../../Resource/Component/Fab";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {height} from "@mui/system";
import styled from "styled-components";
import TerminatedLoanRow from "./TerminatedLoanRow";
import GetLoanGroupAxis from "../../../../Resource/Net/Requests/GetLoanGroupAxios";
import URLs from "../../../../Resource/Net/URLs";
import Space from "../../../../Resource/Component/Space";

function Loan({loanGroup}) {
    const [terminate,setTerminate] = useState(0)

    // updateLoanGroups()
    const loan = {
        id:'-1',
        amount:1000,
        length:1,
        date:new Date(),
        user_id:-1,
        loan_group_id:loanGroup?.id
    }

    function changeLoanType(e) {
        setTerminate(e.target.value)
    }

    return(
            <div>
                <div className="container-fluid ">
                    <div className={'row d-flex justify-content-around px-5 py-2'}>
                    <ButtonGroup className='ltr-direction'>
                        <ToggleButton
                            key='2'
                            id='terminated'
                            type="radio"
                            variant='outline-secondary'
                            name="terminated"
                            value={1}
                            checked={terminate==1}
                            onChange={(e) => changeLoanType(e)}
                        >مختومه</ToggleButton>
                            <ToggleButton
                                key='1'
                                id='active'
                                type="radio"
                                variant='outline-secondary'
                                name="active"
                                value={0}
                                checked={terminate==0}
                                onChange={(e) => changeLoanType(e)}
                            >فعال</ToggleButton>
                    </ButtonGroup>
                </div>

                    {

                        loanGroup?.memberships.map((member)=>{
                            // console.log(member.loans)
                            const activeLoans = member?.loans.filter(loan=> loan.terminate == terminate)
                            return(
                                activeLoans.map((loan)=>{
                                    if(!loan.terminate) {
                                        return (
                                            <LoanRow key={loan.id} lon={loan} user={member.user}
                                                     loan_group_id={loanGroup.id}></LoanRow>
                                        )
                                    }
                                    else {
                                        return (
                                            <TerminatedLoanRow key={loan.id} lon={loan} user={member.user}
                                                     loan_group_id={loanGroup.id}></TerminatedLoanRow>
                                        )
                                    }
                                }))
                        })
                    }
                </div>
                <Space />
                {haveAccess()? <Fab addr={getAddress('AddLoan',loanGroup?.id??-1)}  initObj =  {loan} /> :""}

            </div>
    )
}
export default Loan;