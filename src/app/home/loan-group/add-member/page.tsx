import AddMemberComponent from '@/components/Apps/Group/Tabs/Member/AddMember';

export default function Page() {
  // AddMemberComponent uses useSearchParams(), so it must be a client component.
  // The component itself is already marked 'use client'.
  return <AddMemberComponent />;
}
