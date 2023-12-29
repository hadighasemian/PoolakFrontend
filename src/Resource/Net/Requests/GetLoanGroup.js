import useSwrPost from "../useSwrPost";
import URLs from "../URLs";
import createSwrConf from "../Swr/createSwrConf";
import getLoanGroupFromResponse from "../../../DataManagers/getLoanGroupFromResponse";
import {setClientRole} from "../../DB/Redux/authSlice";
import UnpackGroupAuthRole from "../../../Apps/Group/UnpackGroupAuthRole";
import {useDispatch} from "react-redux";

function GetLoanGroup(id) {
    const dispatch = useDispatch()
    const { response, loading, error } = useSwrPost(URLs['loanGroup'],
        {'loan_group_id':id}, createSwrConf(false,5000));
    // console.log(response?.data?.data?.loanGroup)
    let loanGroup = getLoanGroupFromResponse(response);
    dispatch(setClientRole(UnpackGroupAuthRole(loanGroup)))
    return { loanGroup, loading, error }
}
export default GetLoanGroup;