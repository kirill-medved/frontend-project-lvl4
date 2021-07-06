import React, { useRef } from 'react';
import classNames from 'classnames/bind.js';
import { useDispatch } from 'react-redux';

import style from './Channels.module.scss';
import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const Channel = (props) => {
  const cx = classNames.bind(style);
  const channelRef = useRef(null);
  const dispatch = useDispatch();

  const changeChannel = (e) => {
    console.log(channelRef.current.id);
    dispatch(setCurrentChannelId(channelRef.current.id));
  };
  console.log(
    cx({
      wrapper__channel: true,
      active: props.id === props.currentChannelId,
    }),
  );
  return (
    <div
      id={props.id}
      ref={channelRef}
      onClick={changeChannel}
      className={cx({
        wrapper__channel: true,
        active: props.id === props.currentChannelId,
      })}
    >
      <p>{props.name}</p>
      <p>{props.id + ' ' + props.currentChannelId}</p>
    </div>
  );
};

export default Channel;
