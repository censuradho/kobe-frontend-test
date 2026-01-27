import { useEffect } from "react";

export function useDelay (callback: () => void, ms: number) {
  useEffect(() => {

    const timeoutId = setTimeout(() => {
      callback();
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [callback, ms])
}