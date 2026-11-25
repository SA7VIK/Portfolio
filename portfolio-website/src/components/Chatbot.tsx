import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUp, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const HINTS = [
  { label: 'Me', value: "Tell me about Satvik Singh." },
  { label: 'Symbian Health', value: "What products did Satvik build at Symbian Health?" },
  { label: 'Projects', value: "What projects has Satvik worked on?" },
  { label: 'Skills', value: "What are Satvik's main skills?" },
  { label: 'Fun', value: "What are Satvik's hobbies or fun facts?" },
  { label: 'Contact', value: "How can I contact Satvik?" },
]

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! I'm Satvik's AI assistant. Ask me anything about his skills, projects, or experience!",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (override?: string) => {
    const text = (override ?? inputValue).trim()
    if (!text || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const apiUrl = import.meta.env.PROD ? 'https://api.sa7vik.in/chat' : 'http://localhost:8000/chat'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          conversation_history: messages.map(m => ({ role: m.sender, content: m.text }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error calling AI backend:', error)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to my AI backend right now. Please try again later!",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const onlyGreeting = messages.length === 1

  return (
    <div className="noise relative flex h-[100dvh] flex-col overflow-hidden bg-ink-950 text-ink-100">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-[-16rem] h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent-500/[0.12] blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06] bg-ink-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Portfolio
          </a>
          <div className="flex items-center gap-2.5">
            <span className="relative grid h-7 w-7 place-items-center rounded-lg bg-white text-[11px] font-bold text-ink-950">
              SS
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-mint-400 ring-2 ring-ink-950" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-medium text-white">Satvik’s AI</div>
              <div className="font-mono text-[10px] text-ink-500">RAG · answers from my background</div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-5 px-5 py-8">
          {onlyGreeting && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-6 pt-10 text-center"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Sparkles className="h-5 w-5 text-accent-400" />
              </span>
              <h1 className="h-display mt-5 text-3xl sm:text-4xl">
                Ask me <span className="serif-accent text-ink-300">anything.</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink-400">
                Experience, the products I built at Symbian Health, research at DRDO, or what I’m writing about.
              </p>
            </motion.div>
          )}

          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[75%] ${
                  message.sender === 'user'
                    ? 'rounded-br-md bg-white text-ink-950'
                    : 'rounded-bl-md border border-white/[0.07] bg-ink-900/80 text-ink-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className="mt-1.5 font-mono text-[10px] text-ink-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-ink-900/80 px-4 py-4">
                {[0, 0.15, 0.3].map(d => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-400" style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Composer */}
      <div className="relative z-10 border-t border-white/[0.06] bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-5 pb-5 pt-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {HINTS.map(hint => (
              <button
                key={hint.label}
                type="button"
                disabled={isLoading}
                onClick={() => handleSendMessage(hint.value)}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-ink-300 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
              >
                {hint.label}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-ink-900/80 p-2 focus-within:border-white/20">
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, products, research…"
              aria-label="Message"
              rows={1}
              className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-white placeholder-ink-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-ink-950 transition-all hover:bg-ink-200 disabled:cursor-not-allowed disabled:bg-ink-700 disabled:text-ink-400"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
