import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "./_components/side-nav";

export const metadata: Metadata = {
  title: "Settings",
  description: "Modify the settings of application.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Company",
    href: "/settings/company",
  },
  {
    title: "IVR",
    href: "/settings/ivr",
  },
  {
    title: "Call Routing",
    href: "/settings/routing",
  },
  {
    title: "Post-Call",
    href: "/settings/post-call",
  },
  {
    title: "Categories",
    href: "/settings/categories",
  },
  {
    title: "Agents",
    href: "/settings/agents",
  },
  {
    title: "Knowledge Base",
    href: "/settings/documents",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="hidden space-y-6  md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage the application and operating configuration.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-5xl">{children}</div>
      </div>
    </div>
  );
}
