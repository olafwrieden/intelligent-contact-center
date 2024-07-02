"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

const CallReason = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState(
    "Kitchen lamp caused a shortcircuit resulting in the loss of power to the entire home. Wants to schedule an electrician for next Monday."
  );
  const [details, setDetails] = useState(
    "More...Kitchen lamp caused a shortcircuit resulting in the loss of power to the entire home. Wants to schedule an electrician for next Monday. Kitchen lamp caused a shortcircuit resulting in the"
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-lg">Call Context</CardTitle>
        <div className="space-x-2">
          <Badge variant={"default"} className="rounded-md">
            Power Outage
          </Badge>
          <Badge variant={"destructive"} className="rounded-md">
            Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          disabled={!!!details}
        >
          <p className={cn(isOpen ? "mb-2" : null)}>
            {!!summary ? summary : "Context is currently unavailable."}
          </p>
          <CollapsibleContent>
            <p>{details}</p>
          </CollapsibleContent>
          {!!details && (
            <CollapsibleTrigger asChild>
              <Button variant="link" className="p-0">
                {isOpen ? "Show less..." : "Show more..."}
              </Button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CallReason;
