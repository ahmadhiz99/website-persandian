import Sidebar from "./sidebar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex min-h-screen pt-15">
        <Sidebar />
        <div className="flex-1 p-6 mt-6 ">
          {children}
        </div>
      </div>
    );
  }