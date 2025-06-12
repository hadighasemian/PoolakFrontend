import GroupLayoutComponent from '@/components/Layouts/GroupLayout';
import React from 'react';

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <GroupLayoutComponent>{children}</GroupLayoutComponent>;
}
