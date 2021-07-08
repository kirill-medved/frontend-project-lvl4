import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind.js';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';

import style from './Channels.module.scss';
import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const DeleteChannelModal = (props) => {
  const socket = io();

  const [show, setShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const checkHandler = (e) => {
    setIsConfirm(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefaut();
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
              disabled={isConfirm}
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
          <DeleteChannelModal name={props.name} id={props.id} />
        )}
      </div>
      <p>{props.id + ' ' + props.currentChannelId}</p>
    </div>
  );
};

export default Channel;
