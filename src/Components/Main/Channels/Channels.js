import React from 'react';
import classNames from 'classnames/bind.js';

import style from './Channels.module.scss';
import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const Channels = (props) => {
  let cx = classNames.bind(style);
  const changeChannel = (e) => {
    setCurrentChannelId(e.targer.id);
  };
  return (
    <div className={style.wrapper}>
      {props.channels.length > 0 &&
        props.channels.map((channel) => {
          return (
            <div
              key={channel.id}
              id={channel.id}
              className={cx({
                wrapper__channel: true,
                active: channel.id === props.currentChannelId,
              })}
              onClick={changeChannel}
            >
              <p>{channel.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Channels;
