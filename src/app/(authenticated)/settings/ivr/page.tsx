import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IVRForm } from "./ivr-form";

export default function IVRSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          Interactive Voice Response (IVR)
        </h3>
        <p className="text-sm text-muted-foreground">
          Field incoming calls with an automated greeting and menu system.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-10">
        <IVRForm className="col-span-2" />
        <div className="space-y-2">
          <Card className="col-span-1 h-min">
            <CardHeader>
              <CardTitle className="text-lg">How is my data used?</CardTitle>
              <CardDescription>
                Understand how your data is used.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                The Interactive Voice Response is a greeting message and
                menu-like option played at the start of a call to gather context
                about the call and route it to the right agent.
              </p>
              <p>
                This data is synthesised into human speech and played back to
                callers.
              </p>
              <div className="mt-4">
                <span className="font-semibold">Examples:</span>
                <ul className="list-disc list-inside">
                  <li>Greet the caller.</li>
                  <li>Ask them for the nature of their call.</li>
                  <li>Add context for the agent.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
