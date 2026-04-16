"use client";

import { WebHaptics } from "web-haptics";

export default function Home() {

  function triggerDirectMatchVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 30 },
        { delay: 60, duration: 40, intensity: 1 },
        { delay: 50, duration: 40, intensity: 1 },
        { delay: 80, duration: 50, intensity: 1 },
      ])
      console.log("direct matched vibrate");
    }, 0);
  }


  function triggerFullUnmatchedVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger([
        { duration: 40, intensity: 0.7 },
        { delay: 40, duration: 40, intensity: 0.7 },
        { delay: 30, duration: 130, intensity: 0.9 },
        { delay: 50, duration: 50, intensity: 0.6 },
      ])
    }, 0);
  }


  function triggerErrorVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger(
        [{ duration: 800 }],
        { intensity: 1 }
      );
    }, 0);
  }


  function triggerSeparateVibration() {
    setTimeout(() => {
      const haptics = new WebHaptics();
      haptics.trigger("heavy");
    }, 0);
  }


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <button onClick={() => triggerDirectMatchVibration()}>triggerDirectMatchVibration</button>
      <button onClick={() => triggerFullUnmatchedVibration()}>triggerFullUnmatchedVibration</button>
      <button onClick={() => triggerErrorVibration()}>triggerErrorVibration</button>
      <button onClick={() => triggerSeparateVibration()}>triggerSeparateVibration</button>
    </div>
  );
}
