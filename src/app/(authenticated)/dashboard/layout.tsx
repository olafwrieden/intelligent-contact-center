import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Modify the settings of application.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard 👋</h2>
          <p className="text-muted-foreground">
            Welcome to the Contact Centre.
          </p>
        </div>
        <Separator className="my-6" />
        {children}
      </div>
    </>
  );
}
