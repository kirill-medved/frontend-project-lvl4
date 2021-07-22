import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as _ from 'lodash';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import style from './Channels.module.scss';
import Channel from './Channel.jsx';
import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const CreateChannelModal = (props) => {
  const socket = io();
  const dispatch = useDispatch();

  const [t] = useTranslation();

  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState(false);

  const handleChannelName = (e) => {
    setChannelName(e.target.value);
    // check for unique channel name
    if (
      !_.differenceBy([{ name: e.target.value }], props.channels, 'name').length
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleClose = () => setShow((f) => !f);
  const handleShow = () => setShow((f) => !f);

  const submitHandler = (e) => {
    e.preventDefault();
    setError(true);
    handleClose();
    const channelObj = {
      name: channelName,
      owner: props.username,
      users: [props.username],
    };
    console.log(`username: ${props.username}`);
    socket.emit('newChannel', channelObj, ({ data }) => {
      dispatch(setCurrentChannelId(data.id));
    });
    setChannelName('');
  };

  return (
    <div className='d-flex justify-content-center'>
      <Button
        variant='primary'
        onClick={handleShow}
        style={{ textAlign: 'center' }}
      >
        Создать новый канал
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('api.createChannelModal.title')}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Channel name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter channel name'
                value={channelName}
                onChange={handleChannelName}
                data-testid='add-channel'
              />
              <Form.Text className='text-muted'>
                Channel name should be unique!
              </Form.Text>
              {error && (
                <div style={{ color: 'red' }}>Должно быть уникальным</div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              {t('api.createChannelModal.cancel')}
            </Button>
            <Button
              disabled={error}
              type='submit'
              variant='primary'
              onClick={submitHandler}
            >
              {t('api.createChannelModal.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

const Channels = ({ username, channels, currentChannelId, messages }) => {
  return (
    <div className={style.wrapper}>
      <button type='button'>
        <img
          src='https://img.icons8.com/material-outlined/24/000000/settings--v1.png'
          alt='settings'
        />
      </button>
      <CreateChannelModal username={username} channels={channels} />
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
