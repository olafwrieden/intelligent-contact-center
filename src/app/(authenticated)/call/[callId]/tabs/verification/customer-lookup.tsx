import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PossibleMatch = () => {
  return (
    <Alert variant={"info"}>
      <AlertTitle>Possible Matches</AlertTitle>
      <AlertDescription>
        One or more customers with this phone number has been found in the
        system.
        <Button size={"sm"} variant={"link"}>
          View Matches
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default function CustomerLookup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Lookup</CardTitle>
        <CardDescription>
          Verify the caller or register them as a new customer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="my-2">
          <PossibleMatch />
        </div>
        <Input className="w-full p-4 bg-card" placeholder="e.g. David Jones" />
        <div className="flex justify-end mt-4">
          <Button variant="default">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
}
