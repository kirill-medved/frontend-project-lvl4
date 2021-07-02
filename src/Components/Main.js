import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import TokenContext from '../context.js';
import { setMessages } from '../store/messagesSlice.js';
import { setChannels } from '../store/channelsSlice.js';

export default (props) => {
  const auth = useContext(TokenContext);
  const instance = axios.create({
    baseURL: '/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.user}`,
    },
  });

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  console.log(channels);
  console.log(messages);
  useEffect(async () => {
    const res = await instance.get(`data`);

    dispatch(setMessages(res.data.messages));
    dispatch(setChannels(res.data.channels));
    console.log(res);
  }, [dispatch]);

  return (
    <div>
      <div>
        {channels.channels.length &&
          channels.channels.map((channel) => {
            console.log(channel);
            return (
              <div key={channel.id}>
                <p>{channel.name}</p>
              </div>
            );
          })}
      </div>
      <div>
        {messages.messages.length &&
          messages.messages.map((message) => {
            return (
              <div key={message.id}>
                <p>{message.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
