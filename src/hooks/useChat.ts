import { mockChat } from "@/mocks/products";
import type { ChatEvent, ChatEventType } from "@/models/chat";
import { useCallback, useState } from "react";
import { useDelay } from "./useDelay";

export function useChat () {
  const [step, setStep] = useState(0)

  const chatStack: ChatEvent[] = mockChat.slice(0, step)
  const current = mockChat[step - 1];
  const next = mockChat[step];
  const isLastChat = step >= mockChat.length
  
  const onAutoNext = useCallback((
    current?: ChatEventType, 
  ) => {
    if (!current || current === 'agent') return;
    setStep(s => s + 1);
  }, []);

  const onAgentNext = () => {
    const isUserTurn = step > 1 && next?.type === 'user'

    if (isLastChat || isUserTurn) return;
    setStep(s => s + 1);
  }

  const onUserNext = () => {
    const isNotUserTurn =  next?.type !== 'user'

    if (isLastChat || isNotUserTurn) return;
    setStep(s => s + 1);
  }
  
  const filteredChat = chatStack.filter((item, index) =>
    item.type !== "typing" || index === step - 1
  );

  useDelay(() => {
    onAutoNext(current?.type)
  }, current?.delay || 500);

  return {
    chat: filteredChat,
    onAgentNext,
    onUserNext,
  }
}

export type UseChatReturn = ReturnType<typeof useChat>;
