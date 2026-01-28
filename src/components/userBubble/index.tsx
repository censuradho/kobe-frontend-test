
export interface UserBubbleProps {
  message: string;
}

export function UserBubble (props: UserBubbleProps) {
  const { message } = props;

  return (
    <p 
      aria-label={message}
      className="bg-primary max-w-[500px] rounded-lg rounded-tr-[2px] p-2 text-surface ml-auto"
    >{message}</p>
  )
}