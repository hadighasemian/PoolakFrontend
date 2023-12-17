import LoanRow from "./LoanRow";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import Fab from "../../../../Resource/Component/Fab";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";

function Loan({loanGroup}) {

    const loan = {
        id:'-1',
        amount:1000,
        length:1,
        date:new Date(),
        user_id:-1,
        loan_group_id:loanGroup?.id
    }

    return(
            <div>
                <div className="container-fluid ">
                    {
                        // loans?.map((loan)=>{
                        //     return (
                        //         <LoanRow key={loan.id}  loan={loan} loan_group_id={loanGroup.id}></LoanRow>
                        //     )
                        // })
                        loanGroup?.memberships.map((member)=>{
                            return(
                                member?.loans.map((loan)=>{
                                    return (
                                        <LoanRow key={loan.id}  lon={loan} user={member.user} loan_group_id={loanGroup.id}></LoanRow>
                                    )
                                }))
                        })
                    }
                </div>
                {haveAccess()? <Fab addr={getAddress('AddLoan',loanGroup?.id??-1)}  initObj =  {loan} /> :""}

            </div>
    )
}
export default Loan;