"use client";
import { useRef } from "react";

export default function Page2() {
    const ref = useRef<HTMLInputElement>(null);

    const triggerHaptic = () => {
        ref.current?.click(); // fires real iOS haptic
    };

    const foursec = () => {
        setTimeout(triggerHaptic, 4000);
    };

    return (
        <>
            <label style={{ position: "absolute", left: -9999 }}>
                <input ref={ref} type="checkbox" /* @ts-ignore */ />
            </label>
            <button onClick={foursec}>Vibrate after 4 sec</button>
        </>
    );
}