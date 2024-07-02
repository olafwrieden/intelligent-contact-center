import { create } from "zustand";

type EndCallData = {
  callId: string;
  agentId: string;
};

interface EndCallModalStore {
  data: EndCallData | null;
  isOpen: boolean;
  onOpen: (data: EndCallData) => void;
  onClose: () => void;
}

export const useEndCallModal = create<EndCallModalStore>((set) => ({
  data: null,
  isOpen: false,
  onOpen: (data) => set({ data, isOpen: true }),
  onClose: () => set({ data: null, isOpen: false }),
}));
