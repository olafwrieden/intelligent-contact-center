import { cn } from "@/lib/utils";
import { TranscriptionData } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { PencilLine, User } from "lucide-react";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "./separator";

interface ChatListProps {
  messages: TranscriptionData[];
  selectedUser: string;
  followUps: string[];
}

export function ChatList({ messages, selectedUser, followUps }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full max-h-96 flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.participantRawID !== selectedUser
                  ? "items-end"
                  : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.participantRawID.includes(selectedUser) && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={""}
                      alt={message.participantRawID}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs">
                  {message.resultStatus === "Final" ? (
                    <>
                      {message.text}
                      <span className="text-xs text-gray-500 gap-2 flex items-center">
                        <PencilLine className="h-3 w-3" />{" "}
                        {(100 * message.confidence).toPrecision(2)}%
                      </span>
                    </>
                  ) : (
                    <>
                      {message.text}..
                      <span className="text-xs text-gray-500 gap-2 flex items-center italic">
                        Talking
                      </span>
                    </>
                  )}
                </span>
                {message.participantRawID !== selectedUser && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={""}
                      alt={message.participantRawID}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {messages.length === 0 ? (
        <p className="text-muted-foreground">
          Start speaking to view the transcript.
        </p>
      ) : (
        <>
          <Separator />
          <p className="text-sm mt-2 font-medium">You may like to ask:</p>
          <ul className="list-disc list-inside mt-2 text-sm">
            {followUps.map((item, idx) => (
              <li key={idx} className="list-inside list-item">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
