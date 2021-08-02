import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as _ from 'lodash';

import { setCurrentChannelId } from '../../../configs/store/slices/channelsSlice.js';
import style from 'CreateChannelModal.module.scss';

const CreateChannelModal = (props) => {
  const socket = io();
  const dispatch = useDispatch();

  const [t] = useTranslation();

  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState(false);

  const onChange = (e) => {
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

  const onClick = () => {
    handleShow();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    handleClose();
    const channelObj = {
      name: channelName,
      owner: props.username,
      users: [props.username],
    };

    socket.emit('newChannel', channelObj, ({ data }) => {
      dispatch(setCurrentChannelId(data.id));
    });
    setChannelName('');
  };

  return (
    <div className='d-flex justify-content-center'>
      <Button variant='primary' className={style.showBtn} onClick={onClick}>
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
                onChange={onChange}
                data-testid='add-channel'
              />
              <Form.Text className='text-muted'>
                Channel name should be unique!
              </Form.Text>
              {error && (
                <div className={style.error__wrapper}>
                  Должно быть уникальным
                </div>
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
              onClick={onSubmit}
            >
              {t('api.createChannelModal.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateChannelModal;
