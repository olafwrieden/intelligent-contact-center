import { startNewSession } from "@/actions/training";
import { Button } from "@/components/ui/button";

export default function Overview() {
  const startCall = async (data: FormData) => {
    "use server";
    await startNewSession();
  };

  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">Begin Training</h2>
      <div className="flex items-center space-x-2">
        <form action={startCall}>
          <Button type="submit">Simulate Power Outage Call</Button>
        </form>
      </div>
    </div>
  );
}
