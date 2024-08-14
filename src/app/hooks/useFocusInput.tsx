import { useEffect, useRef } from "react";

const useFocusInput = (nextId?: string, prevId?: string) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = inputRef.current;

    if (!el) return;

    const handleKeyUp = () => {
      if (el.value.length === 0 && prevId) {
        document.getElementById(prevId)?.focus();
      } else if (el.value.length > 0 && nextId) {
        document.getElementById(nextId)?.focus();
      }
    };

    el.addEventListener("keyup", handleKeyUp);

    return () => {
      el.removeEventListener("keyup", handleKeyUp);
    };
  }, [nextId, prevId]);

  return inputRef;
};

export default useFocusInput;
