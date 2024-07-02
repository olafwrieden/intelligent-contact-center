"use client";

import { useSocket } from "@/components/socket-provider";
import { INCOMING_CALL_GROUP } from "@/lib/constant";
import { CallQueueItem } from "@/lib/pubsub";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { WaitingCall } from "./call-queue-item";

const CallQueue = () => {
  const [callers, setCallers] = useState<CallQueueItem[]>([
    {
      type: "INCOMING_CALL",
      id: "1",
      name: "Randy Tow",
      isPriority: true,
      timestamp: new Date(),
      number: "+1234567890",
    },
    {
      type: "INCOMING_CALL",
      id: "2",
      name: "Ted",
      isPriority: false,
      timestamp: new Date(),
      number: "+0987654321",
    },
  ]);
  const { socket, isConnected } = useSocket();

  const appendCall = (call: CallQueueItem) => {
    setCallers((prev) => [...prev, call]);
  };

  const removeCall = (id: string) => {
    setCallers((prev) => prev.filter((call) => call.id !== id));
  };

  useEffect(() => {
    const handleGroupMessage = (data: any) => {
      if (data.message.group === INCOMING_CALL_GROUP) {
        const payload: CallQueueItem = JSON.parse(data.message.data);
        if (payload.type === "DROPPED_CALL") {
          removeCall(payload.id);
        } else {
          appendCall(payload);
        }
      }
    };

    socket?.joinGroup(INCOMING_CALL_GROUP);
    socket?.on("group-message", handleGroupMessage);

    return () => {
      socket?.leaveGroup(INCOMING_CALL_GROUP);
      socket?.off("group-message", handleGroupMessage);
    };
  }, [socket]);

  // const calls = [
  //   { id: 1, name: "Randy Tow", tag: "Priority", timestamp: new Date() },
  //   { id: 2, name: "Unknown Caller", tag: "", timestamp: new Date() },
  // ];

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="text-base mb-3 flex flex-col sm:flex-row justify-between items-center">
        <h5 className="font-semibold text-gray-900 md:text-xl dark:text-white">
          Call Queue
        </h5>
        <span className="flex items-center">
          <Dot
            className={cn(
              "w-10 h-10",
              isConnected ? "text-emerald-600" : "text-red-600"
            )}
          />{" "}
          {isConnected ? "Live" : "Offline"}
        </span>
      </div>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        There are {callers.length} calls in the queue.
      </p>
      <ul className="my-4 space-y-3">
        {callers.map((call) => (
          <li key={call.id}>
            <WaitingCall
              id={call.id}
              name={call.name || "Unknown Caller"}
              tag={call.isPriority ? "Priority" : ""}
              number={call.number}
              timestamp={call.timestamp}
            />
          </li>
        ))}
      </ul>
      <div className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
        This is the end of the call queue.
      </div>
    </div>
  );
};

export default CallQueue;
