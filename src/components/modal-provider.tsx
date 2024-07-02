"use client";

import { useEffect, useState } from "react";
import { EndCallModal } from "./modals/end-call";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <EndCallModal />
    </>
  );
}
