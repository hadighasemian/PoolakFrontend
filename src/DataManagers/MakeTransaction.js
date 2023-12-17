function MakeTransaction(transaction, user, loanGroupID) {
    return {
        ...transaction,
        name:user.name,
        user_id:user.id,
        loan_group_id:loanGroupID,
    }
}
export default MakeTransaction;