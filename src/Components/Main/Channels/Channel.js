import React, { useRef } from 'react';

import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const Channel = (props) => {
  const channelRef = useRef(null);

  const changeChannel = (e) => {
    setCurrentChannelId(channelRef.current.id);
  };
  return (
    <div ref={channelRef} onClick={changeChannel}>
      <p>{props.name}</p>
    </div>
  );
};

export default Channel;
