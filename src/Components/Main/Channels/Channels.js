import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as _ from 'lodash';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import style from './Channels.module.scss';
import Channel from './Channel.js';
import {
  addNewChannel,
  setCurrentChannelId,
} from '../../../store/channelsSlice.js';

const CreateChannelModal = (props) => {
  const socket = io();

  const dispatch = useDispatch();

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

  const submitHandler = (e) => {
    e.preventDefault();
    handleClose();

    const channelObj = {
      name: channelName,
      owner: props.username,
      users: [props.username],
    };
    socket.emit('newChannel', channelObj, ({ status }) => {
      status === 'ok' ? console.log('OK') : console.log('False');
    });
  };

  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(addNewChannel(newChannel));
      dispatch(setCurrentChannelId(newChannel.id));
    });
    return;
  }, [socket, dispatch]);

  // add submit handler with loading preloader and Этот канал еще пусть если сообщений нету

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant='primary' onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new channel!</Modal.Title>
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
              />
              <Form.Text className='text-muted'>
                Channel name should be unique!
              </Form.Text>
              {error && (
                <div style={{ color: 'red' }}>This name is already taken</div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={error}
              type='submit'
              variant='primary'
              onClick={submitHandler}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
const Channels = (props) => {
  return (
    <div className={style.wrapper}>
      <CreateChannelModal channels={props.channels} />
      <div>
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
    </div>
  );
};

export default Channels;
