import AddTransactionComponent from '@/components/Apps/Group/Tabs/Transaction/AddTransaction';

// Params are passed by Next.js to page components.
// Component is 'use client' and uses useParams() for loan_group_id.
export default function Page({ params }: { params: { loan_group_id: string } }) {
  return <AddTransactionComponent />;
}
