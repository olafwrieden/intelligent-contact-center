"use client";

import { UpdateIVRSchema, UpdateIVRSchemaType } from "@/actions/ivr/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface IVRFormProps {
  className?: string;
}
export const IVRForm = ({ className }: IVRFormProps) => {
  // const [pending, startTransition] = useTransition();

  const form = useForm<UpdateIVRSchemaType>({
    resolver: zodResolver(UpdateIVRSchema),
    defaultValues: {
      enabled: true,
      greeting: `Welcome to ${COMPANY_NAME}, ${COMPANY_TAGLINE}. In a few words, please tell us why you are calling today.`,
      captureResponse: true,
      captureMethod: "SPEECH",
    },
  });

  // const onSubmit = async (data: UpdateIVRType) => {
  //   startTransition(async () => {
  //     await updateIVR(data);
  //   });
  // };

  const isEnabled = form.watch("enabled");

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Enable Interactive Voice Response
                </FormLabel>
                <FormDescription>
                  Toggles the IVR on or off for all incoming calls.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {isEnabled ? (
          <>
            <FormField
              control={form.control}
              name="greeting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Greeting Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Welcome to Example Corp. In a few words, please tell us why you are calling today."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How you would like incoming callers to be greeted.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="captureResponse"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Capture Call Reason
                    </FormLabel>
                    <FormDescription>
                      Captures the reason for calling.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        ) : null}

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
