import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CallNotes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>
          In-call notes to assist with the conversation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          className="w-full h-32 p-4 bg-card border border-gray-200 rounded-lg"
          placeholder="Add notes..."
        />
        <div className="flex justify-end mt-4">
          <Button variant="default">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallNotes;
