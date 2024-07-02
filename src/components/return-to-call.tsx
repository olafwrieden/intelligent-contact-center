"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const ReturnToCall = () => {
  const pathname = usePathname();
  const activeCallId = null; // TODO: Connect to active call state

  // Do not show button if there is no active call
  if (!activeCallId) return null;

  // Show button only if we are not already on the call page
  if (pathname.endsWith(`/call/${activeCallId}`)) return null;

  return (
    <Button
      asChild
      variant={"outline"}
      className="animate-border-flash"
      size={"sm"}
    >
      <Link href={`/call/${activeCallId}`} className="gap-2">
        <Undo2 className="w-4 h-4" />
        Return to Call
      </Link>
    </Button>
  );
};

export default ReturnToCall;
