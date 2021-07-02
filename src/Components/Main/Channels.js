import React from 'react';

const Channels = (props) => {
  return (
    <div>
      {props.channels.length &&
        props.channels.map((channel) => {
          console.log(channel);
          return (
            <div key={channel.id}>
              <p>{channel.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Channels;
