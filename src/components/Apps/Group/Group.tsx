'use client';
import React, { useEffect, useState } from 'react'; // React import
import { useParams, useRouter } from 'next/navigation'; // Next.js hooks
import { BottomNavigation, BottomNavigationAction, CssBaseline, Paper, Typography } from '@mui/material';
import { Cyclone, Chat, EventAvailable, RecentActors } from "@mui/icons-material";
import BackHandIcon from '@mui/icons-material/BackHand';
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
// import {useDispatch, useSelector} from "react-redux"; // Needs Redux setup
// import {setHomeTab} from "@/Resource/DB/Redux/configSlice"; // Needs Redux setup
// import Members from "./Tabs/Member/Members"; // Needs migration
// import Loan from "./Tabs/Loan/Loan"; // Needs migration
// import Transaction from "./Tabs/Transaction/Transaction"; // Needs migration
// import ChatPage from "./Tabs/Chat/Chat"; // Needs migration
import './Group.css';
// import LoanRequest from "./Tabs/LoanRequest/LoanRequest"; // Needs migration
// import GetLoanGroupAxis from "@/Resource/Net/Requests/GetLoanGroupAxios"; // Needs migration
// import AxiosPost from "@/Resource/Net/AxiosPost"; // Needs migration
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import {setLoanGroup} from "@/Resource/DB/Redux/loanGroupSlice"; // Needs Redux setup
// import UnpackErrors from "@/Resource/Net/Error/UnpackErrors"; // Needs migration
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import getLoanGroupFromResponse from "@/DataManagers/getLoanGroupFromResponse"; // Needs migration
// import {setClientRole} from "@/Resource/DB/Redux/authSlice"; // Needs Redux setup
// import UnpackGroupAuthRole from "./UnpackGroupAuthRole"; // Needs migration

interface GroupProps {
  params: { id: string }; // For Next.js page component if this becomes one directly
}

function Group() {
    const params = useParams(); // For client component usage
    const id = params?.id as string; // Extract id
    // const dispatch = useDispatch(); // Redux
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Needs migration
    // const homeTabNumber = useSelector((state: any) => state.config.homeTab); // Redux
    const [homeTabNumber, setHomeTabNumber] = useState(0); // Placeholder for Redux state
    const [loanGroupData, setLoanGroupData] = useState<any>(null); // Placeholder
    // const updateFlag = useSelector((state: any) => state.loanGroup.updateFlag); // Redux

    // GetLoanGroupAxis(id) // Needs migration

    const updateData = () => {
        console.log("Fetching data for group:", id);
        // Mock data
        setLoanGroupData({ id: id, name: `Loan Group ${id}`, clientRole: 'member' });
        // axiosInstance.post(URLs.loan_groups.view,{'loan_group_id':id}).then(function (response) {
        //     setLoanGroupData(response?.data?.data?.loanGroup)
        // }).catch(function (error) {
        //     // setErrors(UnpackErrors(error))
        // }).finally(()=>{
        //     // setLoading(false)
        // });
    }
    useEffect(() => {
        // if(loanGroupData?.clientRole) dispatch(setClientRole(loanGroupData?.clientRole)) // Redux
        // if(loanGroupData) dispatch(setLoanGroup(loanGroupData)) // Redux
        console.log("Loan group data updated:", loanGroupData);
    }, [loanGroupData]);

    useEffect(() => {
        updateData();
    // }, [updateFlag]); // Redux: updateFlag
    }, [id]); // Update if id changes

    // useEffect(() => { // duplicate of above
    //     updateData()
    // }, []);

    const changeHomeTab = (tab: number) => {
        // dispatch(setHomeTab(tab)) // Redux
        setHomeTabNumber(tab); // Placeholder
    }

    const renderContent = () => {
        switch (homeTabNumber) {
            // case 0: return <Members loanGroup={loanGroupData} />;
            // case 1: return <Loan loanGroup={loanGroupData} />;
            // case 2: return <LoanRequest loanGroup={loanGroupData} />;
            // case 3: return <Transaction loanGroup={loanGroupData} />;
            // case 4: return <ChatPage loanGroup={loanGroupData} />;
            default: return <Typography>Content for Tab {homeTabNumber} (Component to be migrated)</Typography>;
        }
    };

    return (
        // <StatusFrame className='h-100' loading={false} error={false}> {/* StatusFrame needs migration */}
        <div className={' h-100'}>
            <Typography variant="h5">Group ID: {id}</Typography>
            <div className=' tab-frame overflow-auto'>
                {renderContent()}
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, margin: 'auto', maxWidth: '600px' }} elevation={3}>
                <BottomNavigation
                    value={homeTabNumber}
                    onChange={(event, newValue) => {
                        changeHomeTab(newValue);
                    }}
                    className='sansFont px-2 back-second' // Removed col-sm-10 etc. for better responsiveness with Paper
                    showLabels
                >
                    <BottomNavigationAction label={<Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>اعضا</Typography>} icon={<RecentActors/>}/>
                    <BottomNavigationAction label={<Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>وام ها</Typography>} icon={<Cyclone/>}/>
                    <BottomNavigationAction label={<Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>طلب وام</Typography>} icon={<BackHandIcon/>}/>
                    <BottomNavigationAction label={<Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>تراکنشها</Typography>} icon={<EventAvailable/>}/>
                    <BottomNavigationAction label={<Typography variant="body2" style={{fontFamily: 'sansDn', fontWeight: 'bold'}}>چت</Typography>} icon={<Chat/>}/>
                </BottomNavigation>
            </Paper>
        </div>
        // </StatusFrame>
    );
}
export default Group;
