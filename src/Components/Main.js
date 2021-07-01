import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import TokenContext from '../context.js';

export default (props) => {
  const auth = useContext(TokenContext);
  const instance = axios.create({
    baseURL: '/api/v1/',
    headers: {
      Authorization: `Bearer ${auth.user}`,
    },
  });
  let data = { channels: [], messages: [] };
  useEffect(async () => {
    const res = await instance.get(`data`);
    data = res.data;
    console.log(data);
  }, [data]);

  return (
    <div>
      <div>
        {data.channels.length &&
          data.channels.map((channel) => {
            return (
              <div key={channel.id}>
                <p>{channel.name}</p>
              </div>
            );
          })}
      </div>
      <div>
        {data.messages.length &&
          data.messages.map((message) => {
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
