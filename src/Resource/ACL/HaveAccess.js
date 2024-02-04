import {useSelector} from "react-redux";

function HaveAccess() {
    // return true
    // console.log(useSelector(state => state.auth.clientRole?.role?.title) === "admin")
    return useSelector(state => state.auth.clientRole?.role?.title) === "admin"
}
export default HaveAccess;