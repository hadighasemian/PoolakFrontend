import HomeLayoutComponent from '@/components/Layouts/HomeLayout';
import React from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <HomeLayoutComponent>{children}</HomeLayoutComponent>;
}
