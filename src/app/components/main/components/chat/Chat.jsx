import React from 'react';
import { io } from 'socket.io-client';
import { ChatHeader, Form, Messages } from './components';

export default ({
  username,
  currentChannelId,
  messages,
  messagesContainerRef,
  sendMessageMode,
}) => {
  const socket = io();

  const formHandler = (message) => {
    const date = new Date();
    const messageObj = {
      message,
      date,
      username,
      channelId: currentChannelId,
    };
    socket.emit('newMessage', messageObj);
  };

  const newMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  );
  return (
    <div className='d-flex flex-column h-100 w-100'>
      <ChatHeader />
      <Messages
        messages={newMessages}
        username={username}
        containerRef={messagesContainerRef}
      />
      <Form formHandler={formHandler} sendMessageMode={sendMessageMode} />
    </div>
  );
};
