import React from 'react';
import classNames from 'classnames/bind.js';

import style from './Channels.module.scss';
import Channel from './Channel.js';

const Channels = (props) => {
  let cx = classNames.bind(style);

  return (
    <div className={style.wrapper}>
      {props.channels.length > 0 &&
        props.channels.map((channel) => {
          return (
            <Channel
              key={channel.id}
              id={channel.id}
              className={cx({
                wrapper__channel: true,
                active: channel.id === props.currentChannelId,
              })}
            />
          );
        })}
    </div>
  );
};

export default Channels;
