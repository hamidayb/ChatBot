import React, { useEffect } from 'react'

const myMessages = []

const setChat = ({ chatMsg }) => {
  let chat = JSON.parse(localStorage.getItem('chat'))
  if (!chat) {
    chat = []
  }
  if (chatMsg) {
    chat.push(chatMsg)
    localStorage.setItem('chat', JSON.stringify(chat))
    console.log(chat)
  }
}

const getChat = () => {
  const chat = JSON.parse(localStorage.getItem('chat'))
  return chat
}

export { setChat, getChat }
