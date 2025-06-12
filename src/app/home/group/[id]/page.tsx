'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BottomNavigation, BottomNavigationAction, Typography } from '@mui/material'
import { Cyclone, Chat, EventAvailable, RecentActors } from "@mui/icons-material"
import BackHandIcon from '@mui/icons-material/BackHand'
import StatusFrame from '@/components/common/StatusFrame'
import { setHomeTab } from '@/lib/redux/configSlice'
import Members from '@/components/group/tabs/member/Members'
import Loan from '@/components/group/tabs/loan/Loan'
import Transaction from '@/components/group/tabs/transaction/Transaction'
import ChatPage from '@/components/group/tabs/chat/Chat'
import LoanRequest from '@/components/group/tabs/loanRequest/LoanRequest'
import { setLoanGroup } from '@/lib/redux/loanGroupSlice'
import { setClientRole } from '@/lib/redux/authSlice'
import { getConfiguredAxios } from '@/lib/net/CreateAxiosInstance'
import { useAuthModel } from '@/lib/hooks/useAuthModel'
import URLs from '@/lib/net/URLs'

export default function GroupPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const axiosInstance = getConfiguredAxios(useAuthModel())
  const homeTabNumber = useSelector((state: any) => state.config.homeTab)
  const [loanGroupData, setLoanGroupData] = useState<any>()
  const updateFlag = useSelector((state: any) => state.loanGroup.updateFlag)

  const updateData = () => {
    axiosInstance.post(URLs.loan_groups.view, { 'loan_group_id': id }).then(function (response) {
      setLoanGroupData(response?.data?.data?.loanGroup)
    }).catch(function (error) {
      // Handle error
    })
  }

  useEffect(() => {
    if (loanGroupData?.clientRole) dispatch(setClientRole(loanGroupData?.clientRole))
    if (loanGroupData) dispatch(setLoanGroup(loanGroupData))
  }, [loanGroupData, dispatch])

  useEffect(() => {
    updateData()
  }, [updateFlag, id])

  const changeHomeTab = (tab: number) => {
    dispatch(setHomeTab(tab))
  }

  const renderContent = () => {
    switch (homeTabNumber) {
      case 0:
        return <Members loanGroup={loanGroupData} />
      case 1:
        return <Loan loanGroup={loanGroupData} />
      case 2:
        return <LoanRequest loanGroup={loanGroupData} />
      case 3:
        return <Transaction loanGroup={loanGroupData} />
      case 4:
        return <ChatPage loanGroup={loanGroupData} />
      default:
        return <></>
    }
  }

  return (
    <StatusFrame className='h-100' loading={false} error={false}>
      <div className='h-100'>
        <div className='tab-frame overflow-auto'>
          {renderContent()}
        </div>
        <BottomNavigation
          value={homeTabNumber}
          onChange={(event, newValue) => {
            changeHomeTab(newValue)
          }}
          className='sansFont px-2 back-second m-auto
                    position-fixed bottom-0 end-0 start-0
                    col-sm-10 col-md-8 col-lg-6 col-xl-4 p-0 my-0 mx-auto'
          showLabels>
          <BottomNavigationAction
            label={
              <Typography variant="body2" style={{ fontFamily: 'sansDn', fontWeight: 'bold' }}>
                اعضا
              </Typography>
            }
            icon={<RecentActors />}
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" style={{ fontFamily: 'sansDn', fontWeight: 'bold' }}>
                وام ها
              </Typography>
            }
            icon={<Cyclone />}
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" style={{ fontFamily: 'sansDn', fontWeight: 'bold' }}>
                طلب وام
              </Typography>
            }
            icon={<BackHandIcon />}
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" style={{ fontFamily: 'sansDn', fontWeight: 'bold' }}>
                تراکنشها
              </Typography>
            }
            icon={<EventAvailable />}
          />
          <BottomNavigationAction
            label={
              <Typography variant="body2" style={{ fontFamily: 'sansDn', fontWeight: 'bold' }}>
                چت
              </Typography>
            }
            icon={<Chat />}
          />
        </BottomNavigation>
      </div>
    </StatusFrame>
  )
}