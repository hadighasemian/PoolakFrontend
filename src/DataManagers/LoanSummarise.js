import {differenceInDays} from "date-fns";

function LoanSummarise(loan) {
    let sum = loan.payments?.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
    sum = sum?sum:0;
    const paid = sum/loan.amount*100;
    const daysDifference = differenceInDays(new Date(),new Date(loan.date));
    const time = daysDifference/(loan.length*30)*100
    return {sum,paid,time}
}
export default LoanSummarise