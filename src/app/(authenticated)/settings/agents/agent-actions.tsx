import { deleteAgent, updateAgentStatus } from "@/actions/agents/agents";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Trash, UserCheck, UserX } from "lucide-react";
import { useTransition } from "react";

export const AgentActions = ({ row }: CellContext<User, unknown>) => {
  const [pending, startTransition] = useTransition();

  const agent = row.original;
  const enabled = agent.enabled;

  const onToggleStatus = async () => {
    startTransition(async () => {
      await updateAgentStatus(agent.id, !enabled);
    });
  };

  const onDelete = async () => {
    startTransition(async () => {
      await deleteAgent(agent.id);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={onToggleStatus}
          disabled={pending}
          className="gap-2"
        >
          {enabled ? (
            <>
              <UserX className="w-4 h-4" />
              Suspend Agent
            </>
          ) : (
            <>
              <UserCheck className="w-4 h-4" /> Activate Agent
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          disabled={pending}
          className="gap-2"
        >
          <Trash className="w-4 h-4" /> Delete Agent
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
