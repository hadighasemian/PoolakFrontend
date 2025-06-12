import GroupComponent from '@/components/Apps/Group/Group';

// This is a server component by default in Next.js App Router
// To use hooks like useParams directly in it, it would need to be 'use client'
// Or, params are passed by Next.js directly to page components.
export default function Page({ params }: { params: { id: string } }) {
  // If GroupComponent itself needs to be a client component to use useParams,
  // it's fine. This page just passes the id.
  // Or GroupComponent can be adapted to take id as a prop.
  // The current Group.tsx is already 'use client' and uses useParams().
  return <GroupComponent />;
}
