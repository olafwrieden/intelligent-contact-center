"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { UserIcon } from "lucide-react";
import { AgentActions } from "./agent-actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      const agent = row.original;

      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10 text-muted-foreground hidden lg:block">
            <AvatarImage src={agent.image || undefined} alt={agent.name} />
            <AvatarFallback>
              <UserIcon className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{agent.name}</p>
            <p className="text-muted-foreground leading-none text-sm hidden lg:block">
              {agent.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell({ row }) {
      const enabled = row.original.enabled;

      return (
        <Badge
          variant={enabled ? "default" : "destructive"}
          className="rounded-md"
        >
          {enabled ? "Active" : "Suspended"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: AgentActions,
  },
];
