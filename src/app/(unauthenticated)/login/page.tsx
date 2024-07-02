import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("azure-ad", { redirectTo: "/dashboard" });
      }}
    >
      <p>To log in. Please click the button below.</p>
      <Button type="submit">Sign in with Entra ID</Button>
    </form>
  );
}
