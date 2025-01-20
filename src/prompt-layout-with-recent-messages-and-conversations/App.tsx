"use client"

import { useState, useRef, useEffect } from "react"
import {
  ScrollShadow,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@heroui/react"
import { Icon } from "@iconify/react"

import SidebarContainer from "./sidebar-with-chat-history"
import MessagingChatMessage from "./messaging-chat-message"
import PromptInputWithEnclosedActions from "./prompt-input-with-enclosed-actions"

export default function Component() {
  interface Message {
    role: string
    content: string
    avatar: string
    name: string
  }

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      avatar:
        "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/3a906b3de8eaa53e14582edf5c918b5d.jpg",
      name: "Sen",
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setIsLoading(true)

    const userInput = inputValue
    setInputValue("")

    try {
      const response = await fetch(
        `https://derstech-backend.onrender.com/api/v1/demo/query?id=1&query=${encodeURIComponent(userInput)}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        },
      )

      const responseText = await response.text()
      console.log("Ham yanıt:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
      } catch (jsonError) {
        throw new Error(`Geçersiz JSON yanıtı: ${responseText}`)
      }

      const aiMessage: Message = {
        role: "assistant",
        content: data.response || "Yanıt alınamadı",
        avatar: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png",
        name: "Dersitech",
      }

      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      console.error("Yanıt alınırken bir hata oluştu:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: `Bir hata oluştu: ${error instanceof Error ? error.message : String(error)}`,
        avatar: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png",
        name: "Dersitech",
      }

      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full w-full max-w-full">
      <SidebarContainer
        header={
          <Dropdown className="bg-content1">
            <DropdownTrigger>
              <Button
                className="min-w-[120px] text-default-400"
                endContent={
                  <Icon className="text-default-400" height={20} icon="solar:alt-arrow-down-linear" width={20} />
                }
                variant="light"
              >
                Dersitech v4
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Model seçimi menüsü" className="px-0 py-[16px]" variant="faded">
              <DropdownSection title="Model">
                <DropdownItem
                  key="dersitech-v4"
                  description="En son ve en gelişmiş model"
                  startContent={<Icon height={24} icon="solar:star-rings-linear" width={24} />}
                >
                  Dersitech v4
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        }
        subTitle="Bugün"
        title="Dersitech ile Sohbet Et"
      >
        <div className="relative flex h-full flex-col">
          <ScrollShadow ref={scrollRef} className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 pb-8">
            {messages.map((message, idx) => (
              <MessagingChatMessage
                key={idx}
                avatar={message.avatar}
                name={message.name}
                message={message.content}
                classNames={{
                  base: message.role === "user" ? "bg-primary text-primary-foreground" : "bg-default-100",
                }}
              />
            ))}
            {isLoading && <div className="text-center text-default-500">Dersitech düşünüyor...</div>}
          </ScrollShadow>
          <div className="mt-auto flex max-w-full flex-col gap-2 px-6">
            <PromptInputWithEnclosedActions
              classNames={{
                button: "bg-default-foreground opacity-100 w-[30px] h-[30px] !min-w-[30px] self-end",
                buttonIcon: "text-background",
                input: "placeholder:text-default-500 min-h-[100px]",
              }}
              placeholder="Dersitech'e bir mesaj gönder"
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              onSendMessage={handleSendMessage}
            />
            <p className="px-2 text-center text-small font-medium leading-5 text-default-500">
              Dersitech hata yapabilir. Önemli bilgileri lütfen doğrulayın.
            </p>
          </div>
        </div>
      </SidebarContainer>
    </div>
  )
}
