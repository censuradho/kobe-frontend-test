/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ChatEvent,
  ChatEventType,
} from "@/models/chat";
import { useEffect, useRef, type ReactNode } from "react";

import {
  AgentBubble,
  TypingIndicator,
  UserBubble,
  type AgentBubbleProps
} from "@/components";
import type { UseChatReturn } from "@/hooks/useChat";
import { ProductFactory } from "./ProductFactory";

type ExtraPropsMap = {
  agent: Partial<AgentBubbleProps>
}

type Component = {
  [K in ChatEventType]: (
    event: Extract<ChatEvent, { type: K }>,
    extraProps?: ExtraPropsMap
  ) => ReactNode | null
}

const components: Component = {
  user: (event) => (
    <UserBubble 
      message={event.text} 
    />
  ),
  products: (event) => (
    <ProductFactory {...event} />
  ),
  typing: () => <TypingIndicator />,
  agent: (
    event, 
    extraProps
  ) => (
    <AgentBubble 
      message={event.text} 
      {...extraProps?.agent}
    />
  ),
}

export function ChatFactory(chats: UseChatReturn): ReactNode | null {
  const { chat, onAgentNext } = chats;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.length]);

  return (
    <ul className="flex flex-1 flex-col gap-4 py-6 md:pr-4 overflow-y-auto">
      {chat?.map(event => (
        <li key={event.id}>
          {components[event.type]?.(event as any, {
            agent: {
              onComplete: onAgentNext,
            },
          }) ?? null}
          <div ref={ref} />
        </li>
      ))}
    </ul>
  )
}