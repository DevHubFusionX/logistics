import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Truck, Package, MapPin } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const QUICK_REPLIES = [
  { icon: <Truck className="w-3 h-3" />, label: 'Track my shipment' },
  { icon: <Package className="w-3 h-3" />, label: 'Get a quote' },
  { icon: <MapPin className="w-3 h-3" />, label: 'Our locations' },
]

const BOT_INTRO = {
  id: 0,
  from: 'bot',
  text: "Hi there 👋 Welcome to Dara Logistics! How can we help you today?",
}

export default function StickyChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([BOT_INTRO])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send(text) {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text: text.trim() }
    const botMsg = {
      id: Date.now() + 1,
      from: 'bot',
      text: "Thanks for reaching out! A Dara agent will be with you shortly. In the meantime, feel free to browse our services.",
    }
    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
            className="w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="bg-sky-900 px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm leading-none">Dara Support</p>
                <p className="text-sky-300 text-xs mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online now
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-sky-300 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-[#f0f7ff] px-4 py-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-sky-900 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Truck className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-white text-sky-900 shadow-sm rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length === 1 && (
              <div className="bg-[#f0f7ff] px-4 pb-3 flex flex-wrap gap-2">
                {QUICK_REPLIES.map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => send(label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sky-200 text-sky-800 text-xs font-semibold rounded-full hover:bg-sky-50 transition-colors shadow-sm"
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t border-sky-100 px-4 py-3 flex items-center gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Type a message…"
                className="flex-1 text-sm text-sky-900 placeholder-[#94a3b8] outline-none bg-transparent"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 1.2 }}
        whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(14,165,233,0.4)' }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-sky-900 hover:bg-sky-800 text-white shadow-2xl flex items-center justify-center transition-colors"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!open && (
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
      </motion.button>

    </div>
  )
}
