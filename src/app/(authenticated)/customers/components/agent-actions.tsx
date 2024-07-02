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
import { MoreHorizontal, Trash, UserX } from "lucide-react";

export const CustomerActions = ({ row }: CellContext<User, unknown>) => {
  const customer = row.original;

  // TODO: Implement customer actions

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
        <DropdownMenuItem onClick={() => {}} className="gap-2">
          <UserX className="w-4 h-4" /> Suspend Customer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}} className="gap-2">
          <Trash className="w-4 h-4" /> Delete Customer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
