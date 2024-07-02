import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";

export default async function Profile() {
  const profile = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Manage your account.</p>
      </div>
      <Separator />
      <div></div>
    </div>
  );
}
