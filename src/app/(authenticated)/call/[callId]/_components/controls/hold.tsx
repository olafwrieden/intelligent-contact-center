"use client";

import { hold, resume } from "@/actions/call/call";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader, Pause, Play } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const HoldButton = ({ callId }: { callId: string }) => {
  const [pending, startTransition] = useTransition();
  const [isOnHold, setIsOnHold] = useState(false);

  const holdCall = async (id: string) => {
    startTransition(async () => {
      await hold(id)
        .then(() => setIsOnHold(true))
        .then(() => toast.success("Call on hold"));
    });
  };

  const resumeCall = async (id: string) => {
    startTransition(async () => {
      await resume(id)
        .then(() => setIsOnHold(false))
        .then(() => toast.success("Call resumed"));
    });
  };

  return (
    <Button
      variant="outline"
      className={cn("gap-2", isOnHold && "animate-border-flash")}
      onClick={async () => {
        if (isOnHold) {
          await resumeCall(callId);
        } else {
          await holdCall(callId);
        }
      }}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Connecting
        </>
      ) : isOnHold ? (
        <>
          <Play className="w-4 h-4" />
          Resume Call
        </>
      ) : (
        <>
          <Pause className="w-4 h-4" />
          Hold
        </>
      )}
    </Button>
  );
};

export default HoldButton;
