import AuthLayoutComponent from '@/components/Layouts/AuthLayout';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
}
