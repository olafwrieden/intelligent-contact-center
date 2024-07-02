import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Search = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Internal Search</CardTitle>
        <CardDescription>Search for relevant documentation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input className="w-full p-4 bg-card" placeholder="Add notes..." />
        <div className="flex justify-end mt-4">
          <Button variant="default">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Search;
