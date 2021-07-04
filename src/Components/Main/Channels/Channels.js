import React from 'react';
import classNames from 'classnames';

import style from './Channels.module.scss';

const Channels = (props) => {
  let cx = classNames.bind(style);
  return (
    <div className={style.wrapper}>
      {props.channels.length > 0 &&
        props.channels.map((channel) => {
          return (
            <div
              key={channel.id}
              className={cx({
                wrapper__channel: true,
                active: channel.id === props.currentChannelId,
              })}
            >
              <p>{channel.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Channels;
