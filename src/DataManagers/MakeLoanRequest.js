function MakeLoanRequest(loan, user, loanGroupID) {
    return {
        ...loan,
        name:user.name,
        user_id:user.id,
        loan_group_id:loanGroupID,
    }
}
export default MakeLoanRequest;