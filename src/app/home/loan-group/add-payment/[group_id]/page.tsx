import AddPaymentComponent from '@/components/Apps/Group/Tabs/Loan/Payment/AddPayment';

// Params are passed by Next.js to page components.
// Component is 'use client' and uses useParams() for group_id.
export default function Page({ params }: { params: { group_id: string } }) {
  return <AddPaymentComponent />;
}
