import React, { useRef } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavDropdown, Card } from 'react-bootstrap';

import style from './Channel.module.scss';
import {
  DeleteChannelModal,
  RenameChannelModal,
} from '../../../../../../../components/modals';
import {
  setCurrentChannelId,
  setCurrentChannelName,
} from '../../../../../../../configs/store/slices/channelsSlice';

const Channel = ({
  id,
  currentChannelId,
  name,
  removable,
  channels,
  lastMessage,
}) => {
  const channelRef = useRef(null);
  const dispatch = useDispatch();

  const changeChannel = () => {
    dispatch(setCurrentChannelId(+channelRef.current.id));
    dispatch(setCurrentChannelName(name));
  };

  const onClick = () => {
    changeChannel();
  };

  return (
    <Card
      id={id}
      ref={channelRef}
      bg={id === currentChannelId ? 'primary' : 'light'}
      text={id === currentChannelId ? 'white' : 'dark'}
      onClick={onClick}
      className={classnames(style.wrapper__channel)}
      role='button'
      aria-hidden='true'
    >
      <Card.Body className='p-0'>
        <Card.Title className='d-flex justify-content-between h6'>
          {name}
          {removable && (
            <>
              <NavDropdown
                color={id === currentChannelId ? 'light' : 'primary'}
                className='p-0 light active'
                menuVariant='dark'
                active='true'
              >
                <NavDropdown.Item>
                  <DeleteChannelModal name={name} id={id} />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <RenameChannelModal id={id} channels={channels} />
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Card.Title>
        <Card.Text className={classnames(style.lastMessage__truncate)}>
          {lastMessage && lastMessage.message}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Channel;
