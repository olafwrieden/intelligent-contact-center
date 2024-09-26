import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Markdown } from "./markdown/markdown";
import { CitationAction } from "./citation/citation-action";

type ChatMessage = {
  content: string;
  role: "assistant" | "user";
};

interface ChatListProps {
  messages: ChatMessage[];
  selectedUser: string;
}

export function ChatList({ messages, selectedUser }: ChatListProps) {
  const session = useSession();
  const user = session.data?.user;
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
                message.role !== selectedUser ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.role === selectedUser && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={""}
                      alt={message.role}
                      width={6}
                      height={6}
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs">
                  {/* {message.resultStatus === "Final" ? (
                    <>
                      {message.text}
                      <span className="text-xs text-gray-500 gap-2 flex items-center">
                        <PencilLine className="h-3 w-3" />{" "}
                        {(100 * message.confidence).toPrecision(2)}%
                      </span>
                    </>
                  ) : ( */}
                  <>
                    <Markdown
                      content={message.content}
                      onCitationClick={CitationAction}
                    ></Markdown>
                    {/* <span className="text-xs text-gray-500 gap-2 flex items-center italic">
                      Talking
                    </span> */}
                  </>
                  {/* )} */}
                </span>
                {message.role !== selectedUser && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={user?.image || ""}
                      alt={message.role}
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
      {/* {messages.length === 0 ? null : (
        <>
          <Separator />
          <div className="flex flex-row gap-2 mt-4">
            <Input
              className="w-full p-4 bg-card"
              placeholder="Search..."
              // onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="default"
              className="gap-2"
              // onClick={() => search()}
              // disabled={isPending}
            >
              <SearchIcon className="h-4 w-4" /> Search
            </Button>
          </div>
        </>
      )} */}
    </div>
  );
}
