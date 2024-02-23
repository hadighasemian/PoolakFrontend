import AxiosPost from "../AxiosPost";
import getLoanGroupFromResponse from "../../../DataManagers/getLoanGroupFromResponse";
import {setLoanGroup} from "../../DB/Redux/loanGroupSlice";
import {useDispatch} from "react-redux";
import URLs from "../URLs";

function GetLoanGroupAxis(id) {
    const dispatch = useDispatch()
    const { data, loading, error} = AxiosPost(URLs['loanGroup'],{'loan_group_id':id})
    let loanGroup = data?.data?.loanGroup;
    dispatch(setLoanGroup(loanGroup))
    return { loanGroup, loading, error }
}
export default GetLoanGroupAxis;