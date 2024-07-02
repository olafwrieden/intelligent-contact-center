import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompanyForm } from "./company-form";

export default function CompanySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Company</h3>
        <p className="text-sm text-muted-foreground">
          Context about this company and its operating environment.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-10">
        <CompanyForm className="col-span-2" />
        <div className="space-y-2">
          <Card className="col-span-1 h-min">
            <CardHeader>
              <CardTitle className="text-lg">
                How do I edit these values?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Edit these values in the environment variables settings of the
                application. This may require the application to restart.
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-1 h-min">
            <CardHeader>
              <CardTitle className="text-lg">How is my data used?</CardTitle>
              <CardDescription>
                Understand how your data is used.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Information provided here is used to add context about your
                company to the AI for critical functionality of this
                application. However, no data is publicly shared, used to train
                the underlying model, or leaves your Azure OpenAI instance /
                Azure tenant.
              </p>
              <div className="mt-4">
                <span className="font-semibold">Examples:</span>
                <ul className="list-disc list-inside">
                  <li>Support conversations.</li>
                  <li>Provide email follow-ups.</li>
                  <li>Let customers contact you.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
