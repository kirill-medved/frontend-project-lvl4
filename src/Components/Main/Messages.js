import React from 'react';

const Messages = (props) => {
  return (
    <div>
      {props.messages.length &&
        props.messages.map((message) => {
          return (
            <div key={message.id}>
              <p>{message.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
