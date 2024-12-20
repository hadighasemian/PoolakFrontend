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
import getLoanGroupFromResponse from "../../DataManagers/getLoanGroupFromResponse";
import {setClientRole} from "../../Resource/DB/Redux/authSlice";
import UnpackGroupAuthRole from "./UnpackGroupAuthRole";

function Group() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const axiosInstance = getConfiguredAxis(AuthModel());
    const homeTabNumber = useSelector(state => state.config.homeTab);
    const [loanGroupData,setLoanGroupData] = useState();
    const updateFlag = useSelector(state => state.loanGroup.updateFlag);

   //other way to update data
    // const [update, setUpdate] = useState(0)
    // const { loanGroupData, loading, error } = GetLoanGroup(id)
    GetLoanGroupAxis(id)


    const updateData =  ()=>{
        // const { data, loading, error} = AxiosPost(URLs['loanGroupData'],{'loan_group_id':id})
        axiosInstance.post(URLs.loan_groups.view,{'loan_group_id':id}).then(function (response) {
            setLoanGroupData(response?.data?.data?.loanGroup)
        }).catch(function (error) {
            // setErrors(UnpackErrors(error))
        }).finally(()=>{
            // setLoading(false)
        });
    }
    useEffect(() => {
        if(loanGroupData?.clientRole) dispatch(setClientRole(loanGroupData?.clientRole))
        if(loanGroupData) dispatch(setLoanGroup(loanGroupData))
    }, [loanGroupData]);
    useEffect(() => {
        updateData()
    }, [updateFlag]);
    useEffect(() => {
        updateData()
    }, []);
    const changeHomeTab = (tab) => {
        dispatch(setHomeTab(tab))
    }
    const renderContent = () => {

        switch (homeTabNumber) {
            case 0:
                return <Members loanGroup={loanGroupData} />;
            case 1:
                return <Loan loanGroup={loanGroupData} />;
            case 2:
                return <LoanRequest loanGroup={loanGroupData} />;
            case 3:
                return <Transaction loanGroup={loanGroupData} />;
            case 4:
                return <ChatPage loanGroup={loanGroupData} />;
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