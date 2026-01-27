/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ChatEvent,
  ChatEventType,
} from "@/models/chat";
import { Fragment, useEffect, useRef, type ReactNode } from "react";

import {
  AgentBubble,
  TypingIndicator,
  UserMessageBubble,
  type AgentBubbleProps
} from "@/components";
import type { UseChatReturn } from "@/hooks/useChat";
import { ProductFactory } from "./productFactory";

type ExtraPropsMap = {
  agent: Partial<AgentBubbleProps>
}

const components: {
  [K in ChatEventType]: (
    event: Extract<ChatEvent, { type: K }>,
    extraProps?: ExtraPropsMap
  ) => ReactNode | null
} = {
  user: (event) => (
    <UserMessageBubble 
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

  return chat?.map(event => (
    <Fragment key={event.id}>
      {components[event.type]?.(event as any, {
        agent: {
          onComplete: () => {
            onAgentNext()
          },
        },
      }) ?? null}
      <div ref={ref} />
    </Fragment>
    
  ))
}