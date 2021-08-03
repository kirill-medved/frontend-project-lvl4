import React from 'react';
import * as _ from 'lodash';

import { Channel } from './components';
import { CreateChannelModal } from '../../../../../components/modals';

const Channels = ({
  username,
  channels,
  currentChannelId,
  messages,
  setSendMessageMode,
}) => {
  const sendMessageModeHandler = () => {
    const mapping = {
      standart: () => 'alternative',
      alternative: () => 'standart',
    };
    setSendMessageMode((mode) => mapping[mode]());
  };

  const onClick = () => {
    sendMessageModeHandler();
  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <button type='button' className='btn btn-primary' onClick={onClick}>
          <img
            src='https://img.icons8.com/material-outlined/24/000000/settings--v1.png'
            alt='settings'
          />
        </button>

        <CreateChannelModal username={username} channels={channels} />
      </div>
      <div className='overflow-auto'>
        {channels.length > 0 &&
          channels.map((channel) => {
            const lastMessage = _.findLast(
              messages,
              (message) => message.channelId === channel.id,
            );
            return (
              <Channel
                key={channel.id}
                id={channel.id}
                name={channel.name}
                currentChannelId={currentChannelId}
                removable={channel.removable}
                channels={channels}
                lastMessage={lastMessage}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Channels;
