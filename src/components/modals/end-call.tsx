"use client";

import { useEndCallModal } from "@/app/hooks/use-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

export function EndCallModal() {
  const { isOpen, onClose, data } = useEndCallModal();

  const form = useForm({
    defaultValues: {
      situation:
        "Called about account balance and was concerned about a discrepancy in their last payment.",
      outcome:
        "Provided a detailed breakdown of their account balance. Confirmed that the discrepancy was due to a system error and assured them that it would be resolved in the next billing cycle.",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <DialogHeader>
              <DialogTitle>Call Summary</DialogTitle>
              <DialogDescription>
                Review the call situation and resolution details.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Situation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe the reason for the call."
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Your trading name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="outcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outcome</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe how the call was resolved."
                        readOnly
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Your trading name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="justify-between">
              <DialogClose asChild>
                <Button type="button" variant="link">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="default"
                disabled={!form.formState.isValid}
              >
                Save & Close
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
