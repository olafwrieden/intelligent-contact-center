import { getCustomers } from "@/actions/customers/customers";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";

export default async function Settings() {
  const customers = await getCustomers();

  return (
    <>
      <DataTable columns={columns} data={customers} noData="No customers." />
    </>
  );
}
