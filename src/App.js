import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Apps/Home/Home";
import AuthLayout from "./Apps/Auth/AuthLayout";
import NoPage from "./Apps/NoPage/NoPage";
import Splash from "./Apps/Splash/Splash";
import {SWRConfig} from "swr/_internal";
import HomeLayout from "./Apps/Home/Layout/HomeLayout";
import GroupLayout from "./Apps/Group/GroupLayout";
import Group from "./Apps/Group/Group";
import AddMember from "./Apps/Group/Tabs/Member/AddMember";
import EditProfile from "./Apps/Profile/EditProfile";
import ChangePassword from "./Apps/Profile/ChangePassword";
import AddLoan from "./Apps/Group/Tabs/Loan/AddLoan";
import 'moment/locale/fa';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AddTransaction from "./Apps/Group/Tabs/Transaction/AddTransaction";
import AddPayment from "./Apps/Group/Tabs/Loan/Payment/AddPayment";
import Auth from "./Apps/Auth/Auth";
import MobileCode from "./Apps/Auth/MobileCode/MobileCode";
import React, {useEffect, useState} from "react";
import AddLoanRequest from "./Apps/Group/Tabs/LoanRequest/AddLoanRequest";



function App() {




    return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <SWRConfig
            value={{
                refreshInterval: 0,
                // dedupingInterval: 100,
                // refreshInterval: 100,
                // fallback: { a: 1, b: 1 },
            }}
        >
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Layout  />}>
                          <Route index element={<Splash />} />
                          <Route path='/Home' element={<HomeLayout />} >
                              <Route index element={<Home />} />
                              <Route path="EditProfile" element={<EditProfile />} />
                              <Route path="ChangePassword" element={<ChangePassword />} />
                              <Route path='LoanGroup' element={<GroupLayout />} >
                                  <Route path=":id" element={<Group />} />
                                  <Route path="AddMember" element={<AddMember />} />
                                  <Route path="AddLoan/:group_id" element={<AddLoan />} />
                                  <Route path="AddLoanRequest/:group_id" element={<AddLoanRequest />} />
                                  <Route path="AddTransaction/:loan_group_id" element={<AddTransaction />} />
                                  <Route path="AddPayment/:group_id" element={<AddPayment />} />
                              </Route>
                          </Route>
                          <Route path="Auth" element={<AuthLayout />} >
                              <Route index element={<Auth />} />
                              <Route path="MobileCode/" element={<MobileCode/>} />
                              {/*<Route path="ForgetPassword" element={<Mobile />} />*/}
                          </Route>
                          <Route path="*" element={<NoPage />} />
                      </Route>
                  </Routes>
              </BrowserRouter>
        </SWRConfig>
        </LocalizationProvider>
  );
}
export default App;
