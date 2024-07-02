"use client";

import { Badge } from "@/components/ui/badge";
import { CallCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CallCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "defaultPriority",
    header: "Default Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell({ row }) {
      const status = row.original.status;

      return (
        <Badge
          variant={status === "ACTIVE" ? "default" : "destructive"}
          className="rounded-md"
        >
          {status ? "Active" : "Suspended"}
        </Badge>
      );
    },
  },
];
