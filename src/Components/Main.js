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

  useEffect(async () => {
    const data = await instance.get(`data`);
    console.log(data);
  }, []);

  return (
    <div>
      <div>
        {data.data.channels.length &&
          data.data.channels.map((channel) => {
            return (
              <div key={channel.id}>
                <p>{channel.name}</p>
              </div>
            );
          })}
      </div>
      <div>
        {data.data.messages.length &&
          data.data.messages.map((message) => {
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
