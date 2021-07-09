import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind.js';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import * as _ from 'lodash';

import style from './Channels.module.scss';
import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const DeleteChannelModal = (props) => {
  const socket = io();

  const [show, setShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const checkHandler = (e) => {
    setIsConfirm((c) => !c);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleClose();

    socket.emit('removeChannel', { id: props.id }, ({ status }) => {
      status === 'ok' ? console.log('REmove OK') : console.log('Remove False');
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant='primary' onClick={handleShow}>
        Удалить
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel {props.name}!</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check
                checked={isConfirm}
                type='checkbox'
                label='Check me out'
                onClick={checkHandler}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              disabled={!isConfirm}
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

const RenameChannelModal = (props) => {
  const socket = io();

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
      id: props.id,
      name: channelName,
    };

    socket.emit('renameChannel', channelObj, ({ status }) => {
      status === 'ok' ? console.log('Raneme OK') : console.log('Rename False');
    });
  };

  const handleClose = () => setShow((f) => !f);
  const handleShow = () => setShow((f) => !f);
  return (
    <div>
      <Button variant='primary' onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Название канала</Form.Label>
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
                <div style={{ color: 'red' }}>
                  <p>This name is already taken</p>
                </div>
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

const Channel = (props) => {
  const cx = classNames.bind(style);
  const channelRef = useRef(null);
  const dispatch = useDispatch();

  const changeChannel = (e) => {
    dispatch(setCurrentChannelId(+channelRef.current.id));
  };
  console.log('Channek rerender');

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
      <div>
        <p>{props.name}</p>
        {props.removable && (
          <>
            <DeleteChannelModal name={props.name} id={props.id} />
            <RenameChannelModal id={props.id} channels={props.channels} />
          </>
        )}
      </div>
    </div>
  );
};

export default Channel;
