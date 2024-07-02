"use client";

import {
  CameraButton,
  ControlBar,
  DevicesButton,
  EndCallButton,
  MicrophoneButton,
  ScreenShareButton,
} from "@azure/communication-react";
import { useState } from "react";

export const CallControls = () => {
  const [muted, setMuted] = useState(true);

  return (
    <ControlBar>
      <MicrophoneButton checked={muted} onClick={() => setMuted(!muted)} />
      <CameraButton />
      <ScreenShareButton />
      <DevicesButton />
      <EndCallButton className="rounded-md" />
    </ControlBar>
  );
};
