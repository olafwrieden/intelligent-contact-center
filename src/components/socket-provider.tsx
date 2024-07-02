"use client";

import { getSocketAuth } from "@/actions/socket-auth";
import {
  WebPubSubClient,
  WebPubSubJsonReliableProtocol,
} from "@azure/web-pubsub-client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const SocketContext = createContext<{
  socket: WebPubSubClient | null;
  isConnected: boolean;
}>({ socket: null, isConnected: false });

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebPubSubClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const initSocket = useCallback(async () => {
    const url = await getSocketAuth();
    if (!url) return;

    console.log(url);

    const socketInstance = new WebPubSubClient(url, {
      protocol: WebPubSubJsonReliableProtocol(),
    });

    socketInstance.start();

    socketInstance.on("connected", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnected", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.stop();
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
