function LoanGroupSummarise(loanGroup) {
    let loanNumber = 0;
    const cash = loanGroup?.memberships?.reduce((accumulator, membership) =>
            accumulator +
            membership?.transactions?.reduce((accumulator, transaction) =>{
                if (transaction.type==1) return accumulator + transaction.value
                else return accumulator - transaction.value
            } , 0),
        0);
    const loan = loanGroup?.memberships?.reduce((accumulator, membership) =>{
        return accumulator + membership?.loans?.reduce((accumulator, loan) =>{
            loanNumber++;
            return accumulator + loan?.amount
        }
            , 0)
    }, 0);


    return {cash,loan,loanNumber}
}
export default LoanGroupSummarise;