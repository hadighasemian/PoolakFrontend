import StatusFrame from "../../../Other/StatusFrame";
import {useState} from "react";
import authModel from "../../../../Resource/DB/Models/Auth/AuthModel";


function LoanProfile({group}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {login,user} = authModel();
    let cash = group?.users?.reduce((accumulator, currentValue) =>
            accumulator +
            currentValue?.transactions?.reduce((accumulator, currentValue) =>{
                if (currentValue.type==1) return accumulator + currentValue.value
                else return accumulator - currentValue.value
            } , 0),
        0);
    let loans = group?.users?.reduce((accumulator, currentValue) =>
            accumulator +
            currentValue?.loans?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0),
        0);
    // console.log(group)

    return(
        <StatusFrame loading={loading} error={error}>
            <div className="container p-4">
                <div className="card my-1">
                    <div className="card-header fw-bold">
                        وضعیت گروه
                    </div>
                    <div className="card-body">
                        <div className="card-body  d-flex flex-row justify-content-around">
                  <span className=' small  border-1 rounded-4 border py-1 px-2'>
                      موجودی:
                      &nbsp;
                      {/*{digitsEnToFa(cash)}*/}
                  </span>
                            <span className=' small  border-1 rounded-4 border p-1'>
                      مجموع وام ها:
                                &nbsp;
                                {/*{digitsEnToFa(loans)}*/}
                  </span>
                            <span className=' small  border-1 rounded-4 border p-1'>
                    <i className="bi bi-people"></i>
                                &nbsp;
                                *
                                &nbsp;
                                {/*{digitsEnToFa(group.users.length)}*/}
                </span>
                        </div>
                    </div>
                    <div className="card-footer"></div>
                </div>
                {/*<div className="card my-1">*/}
                {/*    <div className="card-header fw-bold">*/}
                {/*        وضعیت شما در این گروه*/}
                {/*    </div>*/}
                {/*    <div className="card-body">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-12 d-flex flex-column justify-content-center align-items-center">*/}
                {/*                <svg xmlns="http://www.w3.org/2000/svg"  fill="#888"*/}
                {/*                     className="bi bi-person-circle " width='20%'  viewBox="0 0 16 16">*/}
                {/*                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>*/}
                {/*                    <path fill-rule="evenodd"*/}
                {/*                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>*/}
                {/*                </svg>*/}
                {/*                <span className='mt-3 '>{user.name}</span>*/}
                {/*                <span className='mt-2 '>{digitsEnToFa(user.mobile)}</span>*/}
                {/*            </div>*/}
                {/*            <div className="col-12 px-1 d-flex flex-row justify-content-between mt-3" >*/}
                {/*                <Link className='btn small  mx-1 w-50 btn-outline-dark ' to={getAddress('EditProfile')}>ویرایش اطلاعات</Link>*/}
                {/*                <Link className='btn small mx-1 w-50 btn-outline-dark' to={getAddress('ChangePassword')}>تغییر پسورد</Link>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="card-footer d-flex flex-row justify-content-evenly">*/}
                {/*        <span className=' text-dark'>*/}
                {/*            موجودی:*/}
                {/*        </span>*/}
                {/*        <span className=' text-dark'>*/}
                {/*            امتیاز وام:*/}
                {/*        </span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </StatusFrame>
    )
}
export default LoanProfile;