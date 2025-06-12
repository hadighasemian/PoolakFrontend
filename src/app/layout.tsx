import MainLayout from '@/components/Layouts/MainLayout';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
