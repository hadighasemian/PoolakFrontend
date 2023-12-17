
import TransactionRow from "./TransactionRow";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import Fab from "../../../../Resource/Component/Fab";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";

function Transaction({loanGroup}) {
    const transaction =  {
        id: -1,
        user_id: '-1',
        // loan_group_id: loanGroup?.id,
        value: 0,
        date: new Date(),
        type: 1
    }

    return(
        <div>
            <div className="container-fluid">
                {
                    // transactions?.map((transaction)=>{
                    //     // return (
                    //     //     <TransactionRow  transaction={transaction}></TransactionRow>
                    //     // )
                    // })
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
            {haveAccess()? <Fab addr={getAddress('AddTransaction',loanGroup?.id??-1)}  initObj =  {transaction} /> :""}
        </div>
    );
}
export default Transaction;