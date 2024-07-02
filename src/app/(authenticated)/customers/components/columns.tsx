"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { UserIcon } from "lucide-react";
import { format } from "date-fns";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      const customer = row.original;
      const fullName = `${customer.firstName} ${customer.lastName}`;

      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10 text-muted-foreground hidden lg:block">
            <AvatarImage src={customer.image || undefined} alt={fullName} />
            <AvatarFallback>
              <UserIcon className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{fullName}</p>
            <p className="text-muted-foreground leading-none text-sm hidden lg:block">
              Joined: {format(customer.createdAt, "dd/MM/yyyy")}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isPriority",
    header: "Priority",
    cell({ row }) {
      const priority = row.original.isPriority;
      return (
        <Badge
          variant={priority ? "destructive" : "outline"}
          className="rounded-md"
        >
          {priority ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: CustomerActions,
  // },
];
