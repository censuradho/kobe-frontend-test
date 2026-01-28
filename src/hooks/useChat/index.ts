import { mockChat } from "@/mocks/products";
import type { ChatEvent, ChatEventType } from "@/models/chat";
import { useCallback, useState } from "react";
import { useDelay, type IDelay } from "../useDelay";

interface UseChatOptions {
  useDelay: IDelay
  data?: ChatEvent[]
}

export function useChat (props: UseChatOptions = { 
  useDelay: useDelay,
  data: mockChat
}) {
  const { useDelay, data } = props;

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
    const isUserTurn = step > 1 && next?.type === 'user'

    if (isLastChat || isUserTurn) return;
    setStep(s => s + 1);
  }

  const onUserNext = () => {
    const isNotUserTurn =  next?.type !== 'user'

    if (isLastChat || isNotUserTurn) return;
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
  }
}

export type UseChatReturn = ReturnType<typeof useChat>;
