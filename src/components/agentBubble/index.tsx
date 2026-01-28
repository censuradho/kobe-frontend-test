import { useEffect, useRef, useState } from "react";

export interface AgentBubbleProps {
  message: string;
  onComplete?: () => void;
}

export function AgentBubble(props: AgentBubbleProps) {
  const { message, onComplete } = props;

  const [displayed, setDisplayed] = useState("");

  const iterator = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      iterator.current += 1;
      setDisplayed(message.slice(0, iterator.current));
      if (iterator.current >= message.length) {
        onComplete?.();
        clearInterval(interval);
      }
    }, 30)
    return () => clearInterval(interval);
  }, []);
  
  return (
    <p 
      className="w-full body-small--light max-w-[290px] sm:max-w-max" 
      aria-label={displayed}
    >{displayed}</p>
  )
}