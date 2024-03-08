import StatusFrame from "../../../../Other/StatusFrame";
import PaymentRow from "./PaymentRow";
import TerminatedPaymentRow from "./TerminatedPaymentRow";


function TerminatedPaymentList({loan,loan_group_id}) {
    return(
        <StatusFrame className='position-relative ' loading={false} error={false}>
            <div>
                <div className="container-fluid p-0">
                    {
                        loan.payments?.map((payment)=>{
                            return (
                                <TerminatedPaymentRow  loan={loan} payment={payment}></TerminatedPaymentRow>
                            )
                        })
                    }
                </div>
            </div>
        </StatusFrame>
    );
}
export default TerminatedPaymentList;