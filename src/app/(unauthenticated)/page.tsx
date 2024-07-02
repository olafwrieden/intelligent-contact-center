import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Overview() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("azure-ad", { redirectTo: "/dashboard" });
      }}
    >
      <p>You are currently not logged in..</p>
      <Button type="submit">Sign in with Entra ID</Button>
    </form>
  );
}
