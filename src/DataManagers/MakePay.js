function MakePay(payment, loan) {
    return {
        ...payment,
        name:loan.name,
        user_id:loan.user_id,
        loan_group_id:loan.loan_group_id,
    }
}
export default MakePay;