"use client";

import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface PriorCallProps {
  callId?: string;
  timestamp: Date;
  summary?: string;
  categories?: string[];
  outcome?: string;
}

const PriorCall = ({
  callId,
  timestamp,
  summary,
  categories,
  outcome,
}: PriorCallProps) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-2">
        <div className="flex flex-row gap-2">
          <span className="font-bold">Date/Time:</span>
          <span>{format(timestamp, "Pp")}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Summary</span>
          <span>
            Kitchen lamp caused a shortcircuit resulting in the loss of power to
            the entire home. Wants to schedule an electrician for next Monday.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorCall;
