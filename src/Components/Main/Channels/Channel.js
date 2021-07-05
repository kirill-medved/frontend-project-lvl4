import React, { useRef } from 'react';
import classNames from 'classnames/bind.js';

import style from './Channels.module.scss';
import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const Channel = (props) => {
  let cx = classNames.bind(style);
  const channelRef = useRef(null);

  const changeChannel = (e) => {
    console.log(channelRef.current.id);
    setCurrentChannelId(channelRef.current.id);
  };
  return (
    <div
      ref={channelRef}
      onClick={changeChannel}
      className={cx({
        wrapper__channel: true,
        active: channel.id === props.currentChannelId,
      })}
    >
      <p>{props.name}</p>
    </div>
  );
};

export default Channel;
