import {useParams} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, CssBaseline, Paper, Typography} from '@mui/material';
import { Cyclone,Chat, EventAvailable, RecentActors} from "@mui/icons-material";
import BackHandIcon from '@mui/icons-material/BackHand';
import StatusFrame from "../Other/StatusFrame";
import {useDispatch, useSelector} from "react-redux";
import {setHomeTab} from "../../Resource/DB/Redux/configSlice";
import Members from "./Tabs/Member/Members";
import Loan from "./Tabs/Loan/Loan";
import Transaction from "./Tabs/Transaction/Transaction";
import ChatPage from "./Tabs/Chat/Chat";
import './Group.css'
import LoanRequest from "./Tabs/LoanRequest/LoanRequest";
import GetLoanGroupAxis from "../../Resource/Net/Requests/GetLoanGroupAxios";
import {useEffect, useState} from "react";
import AxiosPost from "../../Resource/Net/AxiosPost";
import URLs from "../../Resource/Net/URLs";
import {setLoanGroup} from "../../Resource/DB/Redux/loanGroupSlice";
import UnpackErrors from "../../Resource/Net/Error/UnpackErrors";
import getConfiguredAxis from "../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../Resource/DB/Models/Auth/AuthModel";

function Group() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const axiosInstance = getConfiguredAxis(AuthModel());
    const homeTabNumber = useSelector(state => state.config.homeTab);
    const [loanGroup,setLoanGroup] = useState(useSelector(state => state.loanGroup.loanGroup));
    const updateFlag = useSelector(state => state.loanGroup.updateFlag);
    // const [update, setUpdate] = useState(0)
    GetLoanGroupAxis(id)
    const updateData =  ()=>{
        // const { data, loading, error} = AxiosPost(URLs['loanGroup'],{'loan_group_id':id})
        axiosInstance.post(URLs['loanGroup'],{'loan_group_id':id}).then(function (response) {
            // console.log(response?.data?.data?.loanGroup)
            // let loanGroup = response?.data?.data?.loanGroup;
            dispatch(setLoanGroup(response?.data?.data?.loanGroup))
            // setUpdate(update+1)
            // loanGroup = response?.data?.data?.loanGroup;
        }).catch(function (error) {
            // setErrors(UnpackErrors(error))
        }).finally(()=>{
            // setLoading(false)
        });
        // let loanGroup = data?.data?.loanGroup;
        // dispatch(setLoanGroup(loanGroup))
    }
    useEffect(() => {
        // console.log(updateFlag)
        updateData()
    }, [updateFlag]);
    // useEffect(() => {
    //     console.log('loanGroup',loanGroup)
    // }, [loanGroup]);
    const changeHomeTab = (tab) => {
        dispatch(setHomeTab(tab))
    }
    const renderContent = () => {

        switch (homeTabNumber) {
            case 0:
                return <Members loanGroup={loanGroup} />;
            case 1:
                return <Loan loanGroup={loanGroup} />;
            case 2:
                return <LoanRequest loanGroup={loanGroup} />;
            case 3:
                return <Transaction loanGroup={loanGroup} />;
            case 4:
                return <ChatPage loanGroup={loanGroup} />;
            default:
                return <></>;
        }

    };
    return (
        <StatusFrame className='h-100' loading={false} error={false}>
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
                                     طلب وام
                                </Typography>
                            }
                            icon={<BackHandIcon/>}
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