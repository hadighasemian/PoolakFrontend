'use client'

import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { SWRConfig } from 'swr'
import { store, persistor } from '@/lib/redux/store'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'moment/locale/fa'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="پولک نرم افزار مدیریت مالی صندوق های خانگی"
        />
        <title>Poolak</title>
        <link rel="icon" href="/icons/main.svg" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider maxSnack={5}>
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                <SWRConfig
                  value={{
                    refreshInterval: 0,
                  }}
                >
                  <div className='container-fluid back6 p-0 m-0' dir="rtl">
                    <div className='row p-0 m-0'>
                      <div className='col-sm-10 col-md-8 col-lg-6 col-xl-4 p-0 my-0 mx-auto vh-100'>
                        {children}
                      </div>
                    </div>
                  </div>
                </SWRConfig>
              </LocalizationProvider>
            </SnackbarProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}