"use client";

import { UpdateIVRSchema, UpdateIVRSchemaType } from "@/actions/ivr/schema";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

interface RoutingFormProps {
  className?: string;
}
export const RoutingForm = ({ className }: RoutingFormProps) => {
  // const [pending, startTransition] = useTransition();

  const form = useForm<any>({
    // resolver: zodResolver(UpdateIVRSchema),
    defaultValues: {
      redirectAllCalls: false,
      redirectAllCallsTo: "",
      distributionPolicy: "roundRobin",
    },
  });

  // const onSubmit = async (data: UpdateIVRType) => {
  //   startTransition(async () => {
  //     await updateIVR(data);
  //   });
  // };

  const redirectCalls = form.watch("redirectAllCalls");

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="redirectAllCalls"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Redirect Incoming Calls
                </FormLabel>
                <FormDescription>
                  When enabled, all incoming calls will be redirected to the
                  number provided.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="bg-destructive-foreground"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {redirectCalls ? (
          <>
            <FormField
              control={form.control}
              name="redirectAllCallsTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Phone number to which you want to redirect all incoming
                    calls.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <Separator />
        )}

        {!redirectCalls ? (
          <FormField
            control={form.control}
            name="distributionPolicy"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div>
                  <FormLabel>Call Distribution Policy</FormLabel>
                  <FormDescription>
                    How incoming calls are assigned to agents.
                  </FormDescription>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="roundRobin" />
                      </FormControl>
                      <div className="flex flex-col">
                        <FormLabel className="font-normal">
                          Round Robin
                        </FormLabel>
                        <FormDescription>
                          Evenly distribute calls amongst agents.
                        </FormDescription>
                      </div>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="longestIdle" />
                      </FormControl>
                      <div className="flex flex-col">
                        <FormLabel className="font-normal">
                          Longest Idle Time
                        </FormLabel>
                        <FormDescription>
                          Assign to longest idle agent.
                        </FormDescription>
                      </div>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="bestWorker" disabled />
                      </FormControl>
                      <div className="flex flex-col">
                        <FormLabel className="font-normal text-muted-foreground felx flex-row items-center">
                          Best Agent{" "}
                          <Badge className="rounded-md" variant={"outline"}>
                            Coming Soon
                          </Badge>
                        </FormLabel>
                        <FormDescription>
                          Assign best agent based on performance.
                        </FormDescription>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
