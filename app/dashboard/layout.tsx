import Header from '@/app/components/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="p-6">{children}</main>
    </div>
  );
}
