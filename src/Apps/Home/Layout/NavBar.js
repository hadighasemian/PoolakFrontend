import i18next from "i18next";
import LoginIcon from '@mui/icons-material/Login';
import {Link, useNavigate} from "react-router-dom";
import getAddress from "../../../Resource/Routing/Addresses/getAddress";
import HomeIcon from '@mui/icons-material/Home';
import {useDispatch} from "react-redux";
import {setAuthState} from "../../../Resource/DB/Redux/authSlice";
import {useRef} from "react";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import authModel from "../../../Resource/DB/Models/Auth/AuthModel";
import './NavBar.css'
import ArchitectureIcon from '@mui/icons-material/Architecture';function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const closeBtn = useRef(null);
    const {login,user} = authModel();

    function logout() {
        const auth = {
            login: {
                login: false,
                token: '',
            },
            user:
                {
                    id: 1,
                    name: "",
                    mobile: "",
                }
        };
        dispatch(setAuthState(auth))
        navigate(getAddress('Splash'), { replace: true })
    }

    function closeOffCanvas() {
        const element = closeBtn.current;
        if (element) {
            // Do something with the DOM element
            element.click() ;
        }
    }

    return(
        <nav className="navbar  bg-body-tertiary  m-0 p-0 ">
            <div className="container-fluid NavBar back-prime1 p-2 shadow-lg">
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <i className="bi bi-three-dots-vertical"></i>

                    <span className='px-2 h5'>
                        {/*<HeaderLogo className=""/>*/}
                        {i18next.t('App_name')}
                    </span>
                </button>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                     aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{i18next.t('App_name')}</h5>
                        <button ref={closeBtn} type="button" id='closeOffCanvas' className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="#888"
                                 className="bi bi-person-circle " width='20%'  viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            <span className='mt-3 '>{user.name}</span>
                            <span className='mt-2 '>{digitsEnToFa(user.mobile)}</span>
                        </div>
                        <div className="col-12 px-1 d-flex flex-row justify-content-between mt-3" >
                            <Link onClick={closeOffCanvas} className='btn small  mx-1 w-50 border-0 btn-outline-dark ' to={getAddress('EditProfile')}>ویرایش اطلاعات</Link>
                            <Link onClick={closeOffCanvas} className='btn small mx-1 w-50 border-0 btn-outline-dark' to={getAddress('ChangePassword')}>تغییر پسورد</Link>
                        </div>
                        <div className='w-100 line'></div>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pt-3 pe-3">
                            <li className="nav-item">
                                <button onClick={logout} className="nav-link w-100 text-end" aria-current="page" >
                                    <LoginIcon className='mx-2'/> خروج
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link to={getAddress('Home')} onClick={closeOffCanvas} className="nav-link" href="src/Apps/Home/Layout/HomeLayout#">
                                    <HomeIcon className='mx-2'/>خانه
                                </Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <Link to={getAddress('About')} onClick={closeOffCanvas} className="nav-link" href="src/Apps/Home/Layout/HomeLayout#">*/}
                            {/*        <ArchitectureIcon className='mx-2'/>درباره ما*/}
                            {/*    </Link>*/}
                            {/*</li>*/}

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;