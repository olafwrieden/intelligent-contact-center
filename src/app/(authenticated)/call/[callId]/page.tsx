import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CallHeader from "./_components/call-header";
import CallNotes from "./_components/call-notes";
import CallReason from "./_components/call-reason";
import CallerCard from "./_components/caller-card";
import Search from "./_components/search-card";
import CustomerLookup from "./tabs/verification/customer-lookup";
import { Info } from "lucide-react";
import { getCustomer } from "@/actions/customers/customers";
import { callAutomationClient } from "@/lib/acs";
import { formatPhoneNumber } from "@/lib/utils";
import CallPlaybook from "./_components/call-playbook";

interface CallProps {
  params: {
    callId: string;
  };
}

export default async function Call({ params }: CallProps) {
  const callId = params.callId;
  // const callProps = await callAutomationClient
  //   .getCallConnection(callId)
  //   .getCallConnectionProperties();

  // const callerNumber = formatPhoneNumber(callProps.sourceDisplayName || "");

  // console.log(
  //   "Caller Number: ",
  //   callProps.sourceDisplayName,
  //   "cleansed:",
  //   callerNumber
  // );
  const customer = await getCustomer({ phone: "callerNumber" });

  const customerName = customer
    ? `${customer.firstName} ${customer.lastName}`
    : "Unknown Caller";

  return (
    <>
      <CallHeader
        callId={callId}
        callNumber={"callerNumber"}
        calledAt={new Date()}
        isPriority={customer?.isPriority || false}
        callerName={customerName}
      />
      <Separator className="my-6" />
      {/* <Accordion type="single" collapsible className="w-1/3 border-none">
        <AccordionItem value="call-context">
          <AccordionTrigger>
            <span className="flex gap-2 items-center">
              <Info className="w-4 h-4" />
              Call Context
            </span>
          </AccordionTrigger>
          <AccordionContent>
            John is facing an unplanned power outage near 141 Brisbane Street,
            Sydney.
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
      <div className="grid grid-cols-2 gap-4">
        <CallReason />
        <CallPlaybook />
      </div>
      <Tabs defaultValue="lookup" className="w-full">
        <TabsList>
          <TabsTrigger value="lookup">Customer Lookup</TabsTrigger>
          <TabsTrigger value="search">Knowledge Base</TabsTrigger>
        </TabsList>
        <TabsContent value="lookup">
          {/* <h2 className="text-xl font-bold mt-4">Customer Lookup</h2> */}
          {/* <p className="text-muted-foreground">
            Verify the caller or register them as a new customer
          </p> */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <CustomerLookup />
          </div>
        </TabsContent>
        <TabsContent value="search">
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Search />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
