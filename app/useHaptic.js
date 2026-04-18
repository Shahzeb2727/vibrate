let unlockedCtx = null;

const unlockAudioContext = () => {
  if (unlockedCtx) return unlockedCtx;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  unlockedCtx = new AudioContext();

  // Play silent buffer immediately to unlock within gesture window
  const buffer = unlockedCtx.createBuffer(1, 1, 22050);
  const source = unlockedCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(unlockedCtx.destination);
  source.start(0);

  return unlockedCtx;
};

const iosVibrate = (ctx, delaySeconds = 0) => {
  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.value = 0;
    oscillator.frequency.value = 1;
    oscillator.start(ctx.currentTime + delaySeconds);
    oscillator.stop(ctx.currentTime + delaySeconds + 0.01);
  } catch (e) {}
};

const useHaptic = () => {
  const trigger = (type = 'medium', delayMs = 0) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // Unlock IMMEDIATELY inside gesture handler, then schedule via AudioContext clock
      const ctx = unlockAudioContext();
      iosVibrate(ctx, delayMs / 1000);
    } else {
      if (navigator.vibrate) {
        const durations = { light: 30, medium: 60, heavy: 100 };
        const duration = durations[type] || 60;
        // [delay, duration] = silence then buzz — all in one gesture-window call
        navigator.vibrate(delayMs > 0 ? [delayMs, duration] : [duration]);
      }
    }
  };

  return { trigger };
};

export default useHaptic;