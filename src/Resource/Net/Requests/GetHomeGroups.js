import useSwrPost from "../useSwrPost";
import URLs from "../URLs";
import createSwrConf from "../Swr/createSwrConf";
import getHomeGroupFromResponse from "../../../DataManagers/getHomeGroupsFromRespons";
function GetHomeGroups() {
    const {  response, loading, error } = useSwrPost(URLs['loan_groups_index'],
        {}, createSwrConf(false,5000),{setData:false,checkData:false});
    let loanGroups = getHomeGroupFromResponse(response);

    return { loanGroups, loading, error }
}
export default GetHomeGroups;