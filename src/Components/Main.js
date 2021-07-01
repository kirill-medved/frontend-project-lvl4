import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import TokenContext from '../context.js';

export default (props) => {
  const auth = useContext(TokenContext);
  const instance = axios.create({
    baseURL: '/api/v1/',
    withCredentials: true,
    headers: {
      Authorization: `Basic ${auth.user}`,
    },
  });

  useEffect(async () => {
    const data = await instance.get(`data`);
    console.log(data);
  }, []);

  return (
    <div>
      <p>Main!</p>
    </div>
  );
};
