import MemberRow from "./MemberRow";
import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
import loanGroupSummarise from "../../../../DataManagers/LoanGroupSummarise";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import Fab from "../../../../Resource/Component/Fab";
import styled from "styled-components";
import React from "react";

function Members({loanGroup}) {
    const {cash,loan} = loanGroupSummarise(loanGroup);
    const member =  {
        id: -1,
        mobile: '',
        loan_group_id: loanGroup?.id??-1,
        role_id: 0,
    }
    const Space = styled.div`
          height: 5em;

    `;
    return(
            <>
                <div className='position-sticky rounded-bottom-2 z-3 border-bottom border-dark-subtle  bg-white top-0 w-100 p-2'>
                    <div className="d-flex  flex-row justify-content-evenly ">
                        <span className='  text-dark border-1'>
                            موجودی:
                            {digitsEnToFa(addCommas(cash?cash:0))}
                        </span>
                        <span className=' text-dark border-1'>
                            {/*تعداد*/}
                            {/*    &nbsp;*/}
                            {/*    /!*{digitsEnToFa(loanNumber?loanNumber:0)}*!/*/}

                            {/*    &nbsp;*/}
                                وام به مجموع مبالغ:
                                &nbsp;
                                {digitsEnToFa(addCommas(loan?loan:0))}
                        </span>
                    </div>
                </div>
                <div className="container-fluid">
                    {
                        loanGroup?.memberships?.map((membership)=>{
                            return (
                                <MemberRow key={membership?.id}  member={membership}></MemberRow>
                            )
                        })
                    }
                </div>
                <Space />
                {haveAccess()? <Fab addr={getAddress('AddMember',loanGroup?.id??-1)}  initObj =  {member} /> :""}
            </>
    )

}
export default Members;