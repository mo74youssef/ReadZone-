"use client"

import { useState, useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

interface Chat {
  id: string
  messages: Message[]
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load chats from localStorage on component mount
    const savedChats = localStorage.getItem("chats")
    if (savedChats) {
      setChats(JSON.parse(savedChats))
    }

    // Create a new chat if none exists
    if (!currentChatId) {
      createNewChat()
    }
  }, [])

  // No auto-scroll effect at all

  const createNewChat = () => {
    const newChatId = Date.now().toString()
    setCurrentChatId(newChatId)
    setMessages([])
    setShowWelcome(true)

    // Add new chat to chats array
    const newChat: Chat = { id: newChatId, messages: [] }
    const updatedChats = [...chats, newChat]
    setChats(updatedChats)
    localStorage.setItem("chats", JSON.stringify(updatedChats))
  }

  const loadChat = (chatId: string) => {
    setCurrentChatId(chatId)
    const chat = chats.find((c) => c.id === chatId)
    if (chat) {
      setMessages(chat.messages)
      setShowWelcome(false)
    }
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Create new user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }

    // Add message to current chat
    const updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    setMessage("")
    setShowWelcome(false)

    // Update chat in chats array
    if (currentChatId) {
      const updatedChats = chats.map((chat) => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: updatedMessages }
        }
        return chat
      })
      setChats(updatedChats)
      localStorage.setItem("chats", JSON.stringify(updatedChats))
    }

    // No auto-scroll when sending a message

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: "This AI chatbot has been developed to optimize communication and simplify work processes, ultimately leading to smoother operations.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }

      const updatedMessagesWithBot = [...updatedMessages, botMessage]
      setMessages(updatedMessagesWithBot)

      // Update chat in chats array
      if (currentChatId) {
        const updatedChats = chats.map((chat) => {
          if (chat.id === currentChatId) {
            return { ...chat, messages: updatedMessagesWithBot }
          }
          return chat
        })
        setChats(updatedChats)
        localStorage.setItem("chats", JSON.stringify(updatedChats))
      }

      // No auto-scroll for bot response
    }, 1000)
  }

  const displayRecentChats = () => {
    setShowWelcome(false)
    setMessages([])
  }

  return (
    <div className="chat-page-wrapper">
      <Navigation />

      <div className="chat-main-content">
        <div className="chat-container">
          <aside className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
            <div className="chatbot-info">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robot-RSDbEHoCFiR3xIBvBmMP3ODu3vRyET.png"
                alt="ChatRZ Avatar"
                width={50}
                height={50}
                className="chatbot-avatar"
              />
              <div>
                <h2>ChatRZ</h2>
                <span className="online-status">• Online</span>
              </div>
            </div>
            <button className="sidebar-button" onClick={createNewChat}>
              <span>+ New Chat</span>
            </button>
            <button className="sidebar-button" onClick={displayRecentChats}>
              <span>Recent Chats</span>
            </button>

            {chats.length > 0 && !showWelcome && messages.length === 0 && (
              <div>
                <h3 style={{ margin: "1rem 0" }}>Recent Chats</h3>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="sidebar-button"
                    onClick={() => loadChat(chat.id)}
                    style={{ marginTop: "0.5rem" }}
                  >
                    <span>Chat {new Date(Number.parseInt(chat.id)).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>

          <div className="main-chat">
            <div className="chat-messages" ref={messagesContainerRef}>
              {showWelcome ? (
                <div className="welcome-message">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robot-RSDbEHoCFiR3xIBvBmMP3ODu3vRyET.png"
                    alt="ChatRZ Welcome"
                    width={180}
                    height={180}
                    className="welcome-avatar"
                  />
                  <h2>How can I help you today?</h2>
                </div>
              ) : (
                <>
                  {messages.length === 0 && !showWelcome ? (
                    <div>
                      <h2 style={{ margin: "1rem 0" }}>Recent Chats</h2>
                      {chats.map((chat) => (
                        <div key={chat.id} className="recent-chat" onClick={() => loadChat(chat.id)}>
                          <span>Chat {new Date(Number.parseInt(chat.id)).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="messages-container">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.isUser ? "user-message" : "bot-message"}`}>
                          {msg.text}
                          <div className="timestamp">{msg.timestamp}</div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </>
              )}
            </div>

            <button className="scroll-to-bottom-btn" onClick={scrollToBottom} aria-label="Scroll to bottom">
              ↓
            </button>

            <div className="chat-input-container">
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Ask something..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button className="send-button" onClick={handleSendMessage}>
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
