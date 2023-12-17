import LoanSum from "./LoanSum";

function MemberSum(member) {
    let loansAmountSum = member.loans?.reduce(
        (accumulator, loan) =>accumulator + loan.amount , 0);

    let paysValueSum = member.loans?.reduce(
        (accumulator, loan) =>
            accumulator + LoanSum(loan) , 0);

    let transactionsValueSum = member.transactions?.reduce((accumulator, transaction) => {
        if (transaction.type=='1'){
            return accumulator + transaction.value
        }else{
            return accumulator - transaction.value
        }
    }, 0);
    let loanNumber = member.loans.length;

    return {loansAmountSum,paysValueSum,transactionsValueSum,loanNumber}
}
export default MemberSum;