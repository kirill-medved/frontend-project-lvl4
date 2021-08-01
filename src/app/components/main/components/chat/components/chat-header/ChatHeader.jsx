import React from 'react';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
  const currentChannelName = useSelector(
    (state) => state.channels.currentChannelName,
  );
  return (
    <header className='bg-light mb-4 p-3 shadow-sm small'>
      <p className='m-0 text-center h5'>{currentChannelName}</p>
    </header>
  );
};

export default ChatHeader;
