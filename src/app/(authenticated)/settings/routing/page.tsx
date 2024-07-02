import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RoutingForm } from "./routing-form";

export default function RoutingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Call Routing</h3>
        <p className="text-sm text-muted-foreground">
          Determine how calls are assigned to agents.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-10">
        <RoutingForm className="col-span-2" />
        <div className="space-y-2">
          <Card className="col-span-1 h-min">
            <CardHeader>
              <CardTitle className="text-lg">How does routing work?</CardTitle>
              {/* <CardDescription>What does this do?</CardDescription> */}
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                Incoming calls can either be redirected to another number or be
                answered by agents. In the case where a call is routed to an
                agent, you can decide the routing policy.
              </p>
              {/* <div className="mt-4">
                <span className="font-semibold">Examples:</span>
                <ul className="list-disc list-inside">
                  <li>Greet the caller.</li>
                  <li>Ask them for the nature of their call.</li>
                  <li>Add context for the agent.</li>
                </ul>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
