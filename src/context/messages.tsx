import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, ReactNode, useState } from "react";


const defaultValue = [
    {
      id: nanoid(),
      text: 'Hello, how can I help you?',
      isUserMessage: false,
    },
]
  
export const MessagesContext = createContext<{
    messages: Message[];
    isMessageUpdating: boolean;
    addMessage: (message: Message) => void;
    removeMessage: (id: string) => void;
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
    setIsMessageUpdating: (isUpdating: boolean) => void;

}>({
    messages: [],
    isMessageUpdating: false,
    addMessage: () => { },
    removeMessage: () => { },
    updateMessage: () => { },
    setIsMessageUpdating: () => { },

})

export function MessagesProvider({ children }: { children: ReactNode }) {
    
    const [messages, setMessages] = useState<Message[]>([
        {
            id: nanoid(),
            text: 'Hello, how can I help you?',
            isUserMessage: false,
        }
    ])

    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessages(prevMessages => prevMessages.map(message => {
            if (message.id === id) {
                return {
                    ...message,
                    text: updateFn(message.text)
                }
            }
            return message
        }))
    
    }

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message])
    }

    const removeMessage = (id: string) => {
        setMessages(prevMessages => prevMessages.filter(message => message.id !== id))
    }


    return (
        <MessagesContext.Provider value={{
            messages,
            updateMessage,
            isMessageUpdating,
            setIsMessageUpdating,
            addMessage,
            removeMessage,
        }}>

        </MessagesContext.Provider>
    )
}
