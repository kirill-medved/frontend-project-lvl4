import React from 'react';

import style from './Channels.module.scss';
import Channel from './Channel.js';

const Channels = (props) => {
  return (
    <div className={style.wrapper}>
      {props.channels.length > 0 &&
        props.channels.map((channel) => {
          return (
            <Channel
              key={channel.id}
              id={channel.id}
              name={channel.name}
              currentChannelId={props.currentChannelId}
            />
          );
        })}
    </div>
  );
};

export default Channels;
