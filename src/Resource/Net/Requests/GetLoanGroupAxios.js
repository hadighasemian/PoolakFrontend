import AxiosPost from "../AxiosPost";
import getLoanGroupFromResponse from "../../../DataManagers/getLoanGroupFromResponse";
import {setLoanGroup} from "../../DB/Redux/loanGroupSlice";
import {useDispatch} from "react-redux";
import URLs from "../URLs";
import {setClientRole} from "../../DB/Redux/authSlice";
import UnpackGroupAuthRole from "../../../Apps/Group/UnpackGroupAuthRole";

function GetLoanGroupAxis(id) {
    const dispatch = useDispatch()
    const { data, loading, error} = AxiosPost(URLs.loan_groups.view,{'loan_group_id':id})
    let loanGroup = data?.data?.data?.loanGroup;
    dispatch(setClientRole(data?.data?.data?.loanGroup.clientRole))
    dispatch(setLoanGroup(data?.data?.data?.loanGroup))

    return { loanGroup, loading, error }
}
export default GetLoanGroupAxis;