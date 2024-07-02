"use client";

import { end } from "@/actions/call/call";
import { useEndCallModal } from "@/app/hooks/use-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ClipboardPenLine, PhoneOff } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const EndButton = ({ callId }: { callId: string }) => {
  const [pending, startTransition] = useTransition();
  const { onOpen } = useEndCallModal();

  const endCall = async (id: string) => {
    startTransition(async () => {
      await end(id)
        .then(() => toast.success("Call ended"))
        // .then(() => onOpen({ callId, agentId: 1 }))
        .catch(() => toast.error("Failed to end call"));
    });
  };

  return (
    <div className="flex items-center space-x-1 rounded-md bg-destructive text-destructive-foreground">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            className="px-3 shadow-none gap-2"
            onClick={async () => onOpen({ callId, agentId: "1" })}
            disabled={pending}
          >
            <PhoneOff className="w-4 h-4" /> End Call
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Terminate this call</p>
        </TooltipContent>
      </Tooltip>
      <Separator orientation="vertical" className="h-[20px]" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="destructive"
            className="px-2 shadow-none"
            disabled={pending}
          >
            <ChevronDown className="h-4 w-4 text-destructive-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-5}
          className="w-[200px]"
          forceMount
        >
          <DropdownMenuLabel>Advanced Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={async () => await endCall(callId)}>
            <PhoneOff className="mr-2 h-4 w-4" /> End Call
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={async () => await endCall(callId)}>
            <ClipboardPenLine className="mr-2 h-4 w-4" /> End with Survey
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EndButton;
