import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind.js';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, NavDropdown, Card } from 'react-bootstrap';
import { io } from 'socket.io-client';
import * as _ from 'lodash';
import { useTranslation } from 'react-i18next';

import style from './Channels.module.scss';
import {
  setCurrentChannelId,
  setCurrentChannelName,
} from '../../../store/channelsSlice.js';

const DeleteChannelModal = ({ name, id }) => {
  const socket = io();

  const [t] = useTranslation();

  const [show, setShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const checkHandler = () => {
    setIsConfirm((c) => !c);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (e) => {
    e.preventDefault();
    checkHandler();
    handleClose();
    socket.emit('removeChannel', { id });
  };

  return (
    <div>
      <p aria-hidden='true' onClick={handleShow}>
        Удалить
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t('api.deleteChannelModal.title')} {name}!
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check
                type='checkbox'
                checked={isConfirm && 'checked'}
                label='Check me out'
                onClick={checkHandler}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleClose}>
              {t('api.deleteChannelModal.cancel')}
            </Button>
            <Button
              disabled={!isConfirm}
              type='submit'
              variant='danger'
              onClick={submitHandler}
            >
              {t('api.deleteChannelModal.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

const RenameChannelModal = ({ channels, id }) => {
  const socket = io();

  const dispatch = useDispatch();

  const [t] = useTranslation();

  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState(false);

  const handleChannelName = (e) => {
    setChannelName(e.target.value);
    // check for unique channel name
    if (!_.differenceBy([{ name: e.target.value }], channels, 'name').length) {
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
      id,
      name: channelName,
    };
    dispatch(setCurrentChannelName(channelName));
    socket.emit('renameChannel', channelObj);
  };

  return (
    <div>
      <p aria-hidden='true' onClick={handleShow}>
        Изменить название
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('api.renameChannelModal.title')}</Modal.Title>
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
                data-testid='rename-channel'
              />
              <Form.Text className='text-muted'>
                Channel name should be unique!
              </Form.Text>
              {error && (
                <div style={{ color: 'red' }}>
                  <p>Должно быть уникальным</p>
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              {t('api.renameChannelModal.cancel')}
            </Button>
            <Button
              disabled={error}
              type='submit'
              variant='primary'
              onClick={submitHandler}
            >
              {t('api.renameChannelModal.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

const Channel = ({
  id,
  currentChannelId,
  name,
  removable,
  channels,
  lastMessage,
}) => {
  const cx = classNames.bind(style);
  const channelRef = useRef(null);
  const dispatch = useDispatch();

  const changeChannel = () => {
    dispatch(setCurrentChannelId(+channelRef.current.id));
    dispatch(setCurrentChannelName(name));
  };

  return (
    <Card
      id={id}
      ref={channelRef}
      bg={id === currentChannelId ? 'primary' : 'light'}
      text={id === currentChannelId ? 'white' : 'dark'}
      onClick={changeChannel}
      className={cx({
        wrapper__channel: true,
      })}
      role='search'
      aria-hidden='true'
    >
      <Card.Body>
        <Card.Title className='d-flex justify-content-between'>
          {name}
          {removable && (
            <>
              <NavDropdown>
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
        <Card.Text
          className={cx({
            lastMessage__truncate: true,
          })}
        >
          {lastMessage && lastMessage.message}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Channel;
