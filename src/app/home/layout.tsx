'use client'

import NavBar from '@/components/home/layout/NavBar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="position-relative h-100 sansFont p-0 m-0">
      <NavBar />
      <div className="p-0 m-0 home_frame back3">
        {children}
      </div>
    </div>
  )
}