import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage customers and their details.",
};

interface CustomersLayoutProps {
  children: React.ReactNode;
}

export default function CustomersLayout({ children }: CustomersLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage customers and their details.
          </p>
        </div>
        <Separator className="my-6" />
        {children}
      </div>
    </>
  );
}
