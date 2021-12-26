import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { getChat, setChat } from './Conversation'
import Typing from './Typing/Typing'
import './chat.scss'

export default function Chat() {
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState(getChat())
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMsg = async (e) => {
    e.preventDefault()
    if (msg) {
      localStorage.setItem('message', msg)
      const { data } = await axios.post('/chat', { message: msg })

      setChat({ chatMsg: { message: msg, received: true } })

      setMessages(getChat())
      setMsg('')
      setIsTyping(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setChat({ chatMsg: { message: data.msg, received: false } })
      setMessages(getChat())
      setIsTyping(false)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="chat">
      {/* <Header /> */}
      <div className="header">
        <i className="fas fa-robot robot"></i>
        <div className="header__desc">
          <h2>Chatbot</h2>
        </div>
      </div>

      {/* <Message /> */}
      <div className="message">
        {messages &&
          messages.map(({ message, received }) => (
            <p ref={messagesEndRef} className={`msg + ${received && 'sender'}`}>
              <p className="msg-body">
                <span className="msg-text">{message}</span>
              </p>
            </p>
          ))}
        {isTyping && (
          <p ref={messagesEndRef} className={`msg`}>
            <p className="msg-body">
              <span className="msg-text">
                <Typing />
              </span>
            </p>
          </p>
        )}
      </div>

      {/* <Footer /> */}
      <div className="footer">
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={sendMsg} type="submit">
            <i className="fas fa-location-arrow"></i>
          </button>
        </form>
      </div>
    </div>
  )
}
