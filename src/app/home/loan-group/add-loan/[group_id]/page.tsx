import AddLoanComponent from '@/components/Apps/Group/Tabs/Loan/AddLoan';

// Params are passed by Next.js to page components.
// AddLoanComponent is 'use client' and uses useParams() internally to get group_id.
export default function Page({ params }: { params: { group_id: string } }) {
  return <AddLoanComponent />;
}
