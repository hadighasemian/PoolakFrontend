import AddLoanRequestComponent from '@/components/Apps/Group/Tabs/LoanRequest/AddLoanRequest';

// Params are passed by Next.js to page components.
// AddLoanRequestComponent is 'use client' and uses useParams() internally to get group_id.
export default function Page({ params }: { params: { group_id: string } }) {
  return <AddLoanRequestComponent />;
}
