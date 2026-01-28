import { useEffect } from "react";

export interface IDelay {
  (callback: () => void, ms: number): void;
}

export const useDelay: IDelay =  (callback: () => void, ms: number) => {
  useEffect(() => {

    const timeoutId = setTimeout(() => {
      callback();
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [callback, ms])
}