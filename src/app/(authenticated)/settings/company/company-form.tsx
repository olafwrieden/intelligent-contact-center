"use client";

import {
  UpdateCompanySchema,
  UpdateCompanyType,
} from "@/actions/company/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  COMPANY_ADDRESS,
  COMPANY_CONTEXT,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_WEBSITE,
} from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CompanyFormProps {
  className?: string;
}
export const CompanyForm = ({ className }: CompanyFormProps) => {
  // const [pending, startTransition] = useTransition();

  const form = useForm<UpdateCompanyType>({
    resolver: zodResolver(UpdateCompanySchema),
    defaultValues: {
      name: COMPANY_NAME,
      context: COMPANY_CONTEXT,
      email: COMPANY_EMAIL,
      phone: COMPANY_PHONE,
      website: COMPANY_WEBSITE,
      address: COMPANY_ADDRESS,
    },
    values: {
      name: COMPANY_NAME,
      context: COMPANY_CONTEXT,
      email: COMPANY_EMAIL,
      phone: COMPANY_PHONE,
      website: COMPANY_WEBSITE,
      address: COMPANY_ADDRESS,
    },
    disabled: true,
  });

  // const onSubmit = async (data: UpdateCompanyType) => {
  //   startTransition(async () => {
  //     await updateCompany(data);
  //   });
  // };

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Example Ltd." {...field} />
              </FormControl>
              <FormDescription>Your trading name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Context</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Example Ltd. is an Australian energy utility..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide as much context as possible about your company.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your company website.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="support@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your company support email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+00 123 456 789" {...field} />
              </FormControl>
              <FormDescription>
                Your company support phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button
          type="submit"
          disabled={pending || !form.formState.isDirty}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {pending ? "Saving..." : "Save"}
        </Button> */}
      </form>
    </Form>
  );
};
