import {useSelector} from "react-redux";

function AuthModel() {
    let login ={
        login: false,
        token: '',
    }
    let user = {
        id: 0,
        name: "",
        mobile: "",
    }
    const auth = useSelector(state => state.auth.auth)
    if (auth){
        login = auth.login;
        user = auth.user;
    }
    return {login,user}
}
export default AuthModel;