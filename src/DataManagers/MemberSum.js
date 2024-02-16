import LoanSum from "./LoanSum";
import {forEach} from "react-bootstrap/ElementChildren";

function MemberSum(member) {
    // let loansAmountSum = member.loans?.reduce((accumulator, loan) =>{
    //         if(!loan.terminate) return accumulator + loan.amount
    //     }, 0);
    let terminatedLoan = 0;
    let terminatedLoanNo = 0;
    let activeLoan = 0;
    let paidActiveLoan = 0;
    let activeLoanNo = 0;

    member.loans.forEach((loan,index)=>{
        if (loan.terminate){
            terminatedLoan += loan.amount;
            terminatedLoanNo++;
        }else{
            activeLoan += loan.amount;
            paidActiveLoan += LoanSum(loan);
            activeLoanNo++;
        }
    })


    let transactionsValueSum = member.transactions?.reduce((accumulator, transaction) => {
        if (transaction.type=='1'){
            return accumulator + transaction.value
        }else{
            return accumulator - transaction.value
        }
    }, 0);

    return {terminatedLoan,terminatedLoanNo,activeLoan,activeLoanNo,paidActiveLoan,transactionsValueSum}
}
export default MemberSum;