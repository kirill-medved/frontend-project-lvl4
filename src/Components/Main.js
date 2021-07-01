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
      <p>Main!</p>
    </div>
  );
};
