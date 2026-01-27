export type ChatEvent =
  | UserMessage
  | AgentMessage
  | ProductSuggestion
  | TypingIndicatorEvent

export type ChatEventType = 'user' | 'agent' | 'products' | 'typing'

export interface BaseEvent {
  id: string
  type: ChatEventType
  timestamp: number
  delay?: number
}

export interface UserMessage extends BaseEvent {
  type: 'user'
  text: string
}

export interface AgentMessage extends BaseEvent {
  type: 'agent'
  text: string
}

export interface ProductSuggestion extends BaseEvent {
  type: 'products'
  products: {
    id: string
    title: string
    price: number
    originalPrice?: number
    image?: {
      src: string
      alt: string
    }
    rating?: number
    badge?: string
  }[]
}

export interface TypingIndicatorEvent extends BaseEvent {
  type: 'typing'
}
