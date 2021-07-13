import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind.js';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import * as _ from 'lodash';
import { useTranslation } from 'react-i18next';

import style from './Channels.module.scss';
import { setCurrentChannelId } from '../../../store/channelsSlice.js';

const DeleteChannelModal = (props) => {
  const socket = io();

  const [t, i18n] = useTranslation();

  const [show, setShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const checkHandler = (e) => {
    setIsConfirm((c) => !c);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    checkHandler();
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
          <Modal.Title>
            {t('api.deleteChannelModal.title')} {props.name}!
          </Modal.Title>
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
              {t('api.deleteChannelModal.cancel')}
            </Button>
            <Button
              disabled={!isConfirm}
              type='submit'
              variant='primary'
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

const RenameChannelModal = (props) => {
  const socket = io();

  const [t, i18n] = useTranslation();

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
    setError(true);
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
