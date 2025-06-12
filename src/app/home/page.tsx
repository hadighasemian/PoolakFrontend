'use client'

import FabHome from '@/components/home/FabHome'
import HomeGroupsRow from '@/components/home/HomeGroupsRow'
import StatusFrame from '@/components/common/StatusFrame'
import { useHomeGroups } from '@/lib/hooks/useHomeGroups'

export default function HomePage() {
  const { loanGroups, loading, error } = useHomeGroups()

  return (
    <StatusFrame className='position-relative' loading={loading} error={error}>
      <div className="container-fluid overflow-auto h-100 home-root">
        {loanGroups?.map((loanGroup: any) => (
          <HomeGroupsRow key={loanGroup.id} loanGroup={loanGroup} />
        ))}
        <FabHome />
      </div>
    </StatusFrame>
  )
}