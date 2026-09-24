// Project direction and ownership: Aarush & Project Team.
import { useCallback, useEffect, useState } from "react";

const listeners = new Set<(speaking: boolean) => void>();
let speaking = false;

function setSpeaking(value: boolean) {
  speaking = value;
  listeners.forEach((fn) => fn(value));
}

export function speakText(text: string, locale: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = locale;
  utterance.rate = 0.95;
  utterance.onend = () => setSpeaking(false);
  utterance.onerror = () => setSpeaking(false);
  window.speechSynthesis.speak(utterance);
  setSpeaking(true);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  setSpeaking(false);
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fn = (value: boolean) => setIsSpeaking(value);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  const speak = useCallback((text: string, locale: string) => speakText(text, locale), []);
  return { isSpeaking, speak, stop: stopSpeaking };
}
