import React from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

import Messages from './Messages.jsx';
import Form from './Form.jsx';

const ChatHeader = () => {
  const currentChannelName = useSelector(
    (state) => state.channels.currentChannelName,
  );
  return (
    <header className='bg-light mb-4 p-3 shadow-sm small'>
      <p className='m-0'>{currentChannelName}</p>
    </header>
  );
};

export default ({
  username,
  currentChannelId,
  messages,
  messagesContainerRef,
}) => {
  const socket = io();

  const onSubmit = (message) => {
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
      <Form onSubmit={onSubmit} />
    </div>
  );
};
