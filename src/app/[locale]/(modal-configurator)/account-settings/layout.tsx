import AccountSideBar from './account-side-bar';

export default function AccountSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col lg:flex-row">
      <AccountSideBar />
      {children}
    </div>
  );
}
