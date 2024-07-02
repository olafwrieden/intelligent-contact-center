"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

const categories = [
  {
    name: "Power Outage",
    checklist: [
      "Are you in immediate danger?",
      "Is the power outage affecting your entire home?",
      "Have you checked the circuit breaker?",
    ],
  },
  {
    name: "New Connection",
    checklist: ["Welcome greeting", "Are they already a customer?"],
  },
];

const CallPlaybook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState(
    "Kitchen lamp caused a shortcircuit resulting in the loss of power to the entire home. Wants to schedule an electrician for next Monday."
  );
  const [details, setDetails] = useState(
    "More...Kitchen lamp caused a shortcircuit resulting in the loss of power to the entire home. Wants to schedule an electrician for next Monday. Kitchen lamp caused a shortcircuit resulting in the"
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-lg">Call Playbook</CardTitle>
        <div className="space-x-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={"sm"}
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? categories.find((category) => category.name === value)?.name
                  : "Select playbook..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No playbook found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.name}
                      value={category.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === category.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          {categories[0].checklist.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CallPlaybook;
