
export interface UserMessageBubbleProps {
  message: string;
}

export function UserMessageBubble (props: UserMessageBubbleProps) {
  const { message } = props;

  return (
    <p className="bg-primary max-w-[500px] rounded-lg rounded-tr-[2px] p-2 text-surface ml-auto">{message}</p>
  )
}