"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { differenceInSeconds } from "date-fns";
import { Clock, Phone, ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import EndButton from "./controls/end";
import HoldButton from "./controls/hold";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CallHeaderProps {
  callId: string;
  callNumber: string;
  callerName?: string;
  customerId?: string;
  calledAt: Date;
  isPriority: boolean;
  priorityReason?: string;
}

const CallHeader = ({
  callId,
  calledAt,
  callNumber,
  callerName,
  customerId,
  isPriority,
  priorityReason,
}: CallHeaderProps) => {
  const [duration, setDuration] = useState("00:00");
  const verified = true;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const secondsDiff = differenceInSeconds(now, calledAt);
      const minutesPart = Math.floor((secondsDiff % 3600) / 60);
      const secondsPart = Math.floor(secondsDiff % 60);
      setDuration(
        `${minutesPart.toString().padStart(2, "0")}:${secondsPart
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [calledAt]);

  return (
    <div className="space-y-0.5 flex items-center justify-between">
      <div>
        <div className="items-center flex gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {callerName ? callerName : "Unknown Caller"}{" "}
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              {verified ? (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-red-500" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Caller {!verified && "not"} verified</p>
            </TooltipContent>
          </Tooltip>
          {isPriority && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="destructive" className="rounded-md">
                  Priority
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{priorityReason ? priorityReason : "Priority customer"}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="text-muted-foreground gap-4 flex flex-row">
          <span className="flex flex-row items-center gap-1">
            <Phone className="w-3 h-3" />
            {callNumber}
          </span>
          <span className="flex flex-row items-center gap-1">
            <Clock className="w-3 h-3" />
            <p>{duration}</p>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <HoldButton callId={callId} />
        <Separator orientation="vertical" className="h-6" />
        <EndButton callId={callId} />
      </div>
    </div>
  );
};

export default CallHeader;
