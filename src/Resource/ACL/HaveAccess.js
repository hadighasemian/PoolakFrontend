import {useSelector} from "react-redux";

function HaveAccess() {
    // return true
    // console.log(useSelector(state => state?.auth))

    return useSelector(state => state?.auth?.clientRole?.title) === "admin"
}
export default HaveAccess;