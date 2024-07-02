import { getAgents } from "@/actions/agents/agents";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

export default async function AgentSettings() {
  const agents = await getAgents();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Agents</h3>
        <p className="text-sm text-muted-foreground">
          Agents are staff with access to this application. You can manage their
          individual access here.
        </p>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={agents} />
      </div>
    </div>
  );
}
