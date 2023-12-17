function LoanSum(loan) {

    let paysValueSum =  loan.payments?.reduce(
                (accumulator, payment) =>accumulator + payment.value , 0) ;


    return paysValueSum
}
export default LoanSum;