import StatusFrame from "../../../../Other/StatusFrame";
import PaymentRow from "./PaymentRow";


function Payment({loan,loan_group_id}) {
    return(
        <StatusFrame className='position-relative ' loading={false} error={false}>
            <div>
                <div className="container-fluid p-0">
                    {
                        loan.payments?.map((payment)=>{
                            return (
                                <PaymentRow  loan={loan} payment={payment}></PaymentRow>
                            )
                        })
                    }
                </div>
            </div>
        </StatusFrame>
    );
}
export default Payment;