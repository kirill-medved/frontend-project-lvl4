import React from 'react';
import Messages from './Messages.js';
import Form from './Form.js';

export default (props) => {
  return (
    <div>
      <Messages messages={props.messages} />
      <Form />
    </div>
  );
};
