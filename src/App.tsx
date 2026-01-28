import { TextField } from "./components"
import { ChatFactory } from "./factory/ChatFactory"
import { useChat } from "./hooks/useChat"
import { cn } from "./lib/tailwind"

import Close from '@/assets/close.svg?react'

function App() {
  const chat = useChat()

  return (
    <div className="w-full h-dvh overflow-auto flex flex-col justify-center items-center md:px-4">
      <main className={cn(
        'app px-4 pb-4 flex flex-col bg-background',
        'h-full md:h-175 w-full md:max-w-268.5 md:rounded-[14px]'
      )}>
        <header className="w-full px-4 py-2.5 flex items-center justify-end sticky bg-background top-0 md:pr-6">
          <button className="cursor-pointer">
            <Close />
          </button>
        </header>
        <ChatFactory {...chat} />
        <form 
          className="sticky bottom-0 pt-2"
          onSubmit={event => {
            event.preventDefault()
            chat.onUserNext()
          }}>
          <TextField 
            disabled={chat.next?.type !== 'user'}
            label="Pergunte"
            placeholder="pergunte qualquer coisa"
          />
        </form>
      </main>
    </div>
  )
}

export default App
