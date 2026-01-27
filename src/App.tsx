import { TextField } from "./components"
import { ChatFactory } from "./factory/ChatFactory"
import { useChat } from "./hooks/useChat"
import { cn } from "./lib/tailwind"

import Close from '@/assets/close.svg?react'

function App() {
  const chat = useChat()

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <main className={cn(
        'app px-4 pb-4 flex flex-col',
        'md:h-175 md:w-full md:max-w-268.5 md:rounded-[14px]'
      )}>
        <header className="w-full px-4 py-2.5 flex items-center justify-end">
          <button className="cursor-pointer">
            <Close />
          </button>
        </header>
        <div className="flex flex-1 flex-col gap-4 py-6 pr-4 overflow-y-auto">
          <ChatFactory {...chat} />
        </div>
        <form onSubmit={event => {
          event.preventDefault()
          chat.onUserNext()
        }}>
          <TextField 
            label="Pergunte"
            placeholder="pergunte qualquer coisa"
          />
        </form>
      </main>
    </div>
  )
}

export default App
