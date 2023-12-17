import useSwrPost from "../useSwrPost";
import URLs from "../URLs";
import createSwrConf from "../Swr/createSwrConf";

function SWRLogin(values) {
    const { data, loading, error } = useSwrPost(URLs['login'],
        values, createSwrConf(false,0));
    return { data, loading, error }
}
export default SWRLogin;