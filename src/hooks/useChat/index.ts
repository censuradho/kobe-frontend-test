import { mockChat } from "@/mocks/products";
import type { ChatEvent, ChatEventType } from "@/models/chat";
import { useCallback, useState } from "react";
import { useDelay as useCustomDelay, type IDelay } from "../useDelay";

interface UseChatOptions {
  useDelay: IDelay
  data?: ChatEvent[]
}

export function useChat (props?: UseChatOptions) {
  const { useDelay = useCustomDelay, data = mockChat } = props || {};

  const [step, setStep] = useState(0)

  const chatStack: ChatEvent[] = data?.slice(0, step) || []
  const current = data?.[step - 1];
  const next = data?.[step];
  const isLastChat = step >= (data?.length || 0)
  
  const onAutoNext = useCallback((
    current?: ChatEventType, 
  ) => {
    if (!current || current === 'agent') return;
    setStep(s => s + 1);
  }, []);

  const onAgentNext = () => {
    const isNextUserTurn = step > 1 && next?.type === 'user'

    if (isLastChat || isNextUserTurn) return;
    setStep(s => s + 1);
  }

  const onUserNext = () => {
    const isNotUserNextTurn =  next?.type !== 'user'

    if (
      isLastChat || 
      isNotUserNextTurn
    ) return;

    setStep(s => s + 1);
  }
  
  const filteredChat = chatStack.filter((item, index) => {
    const isNotTyping = item.type !== "typing"
    const isLastTyping = index === step - 1

    return isNotTyping || isLastTyping
  });

  useDelay(() => {
    onAutoNext(current?.type)
  }, current?.delay || 500);

  return {
    chat: filteredChat,
    onAgentNext,
    onUserNext,
    next,
    current
  }
}

export type UseChatReturn = ReturnType<typeof useChat>;
