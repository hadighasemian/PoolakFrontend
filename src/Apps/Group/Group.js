import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {BottomNavigation, BottomNavigationAction, CssBaseline, Paper, Typography} from '@mui/material';
import {Box} from "@mui/system";
import { Cyclone,Chat, EventAvailable, RecentActors} from "@mui/icons-material";
import StatusFrame from "../Other/StatusFrame";
import {useDispatch, useSelector} from "react-redux";
import {setHomeTab} from "../../Resource/DB/Redux/configSlice";
import GetLoanGroup from "../../Resource/Net/Requests/GetLoanGroup";
import {setClientRole} from "../../Resource/DB/Redux/authSlice";
import UnpackGroupAuthRole from "./UnpackGroupAuthRole";
import Members from "./Tabs/Member/Members";
import Loan from "./Tabs/Loan/Loan";
import Transaction from "./Tabs/Transaction/Transaction";
import ChatPage from "./Tabs/Chat/Chat";
import './Group.css'

function Group() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const homeTabNumber = useSelector(state => state.config.homeTab);

//todo
    const { loanGroup, loading, error } = GetLoanGroup(id)

    // useEffect(()=>{
    //     dispatch(setClientRole(UnpackGroupAuthRole(loanGroup)))
    //     // console.log(loanGroup)
    //     // console.log(UnpackGroupAuthRole(loanGroup))
    // },[loanGroup])

    // const handleChange = (event, newValue) => {
    //     changeHomeTab(newValue);
    // };

    const changeHomeTab = (tab) => {
        dispatch(setHomeTab(tab))
    }
    const renderContent = () => {

        switch (homeTabNumber) {
            case 0:
                return <Members loanGroup={loanGroup}/>;
            case 1:
                return <Loan loanGroup={loanGroup}   />
            case 2:
                return <Transaction loanGroup={loanGroup} />;
            case 3:
                return <ChatPage loanGroup={loanGroup} />;
            default:
                return <></>;
        }

    };
    return (
        <StatusFrame className='h-100' loading={loading} error={error}>
            <div className={' h-100'}>
                <div className=' tab-frame overflow-auto'>
                    {renderContent()}
                </div>
                <BottomNavigation
                    value={homeTabNumber}
                    onChange={(event, newValue) => {
                        changeHomeTab(newValue);
                    }}
                    className='sansFont px-2 back-second m-auto
                    position-fixed bottom-0 end-0 start-0
                    col-sm-10 col-md-8 col-lg-6 col-xl-4 p-0 my-0 mx-auto
                    '
                    showLabels>
                        <BottomNavigationAction
                            label={
                                <Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>
                                    اعضا
                                </Typography>
                            }
                            icon={<RecentActors/>}
                        />
                        <BottomNavigationAction
                            label={
                                <Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>
                                     وام ها
                                </Typography>
                            }
                            icon={<Cyclone/>}
                        />
                        <BottomNavigationAction
                            label={
                                <Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>
                                    تراکنشها
                                </Typography>
                            }
                            icon={<EventAvailable/>}
                        />
                        <BottomNavigationAction
                            label={
                                <Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>
                                    چت
                                </Typography>
                            }
                            icon={<Chat/>}
                        />
                </BottomNavigation>
            </div>
        </StatusFrame>
    )
}
export default Group