import { getCategories } from "@/actions/categories/categories";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Categories</h3>
        <p className="text-sm text-muted-foreground">
          Context about how you categorise calls.
        </p>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
}
