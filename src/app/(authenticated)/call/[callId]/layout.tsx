import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call in progress",
  description: "View the call in progress.",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 md:block">{children}</div>
    </>
  );
}
