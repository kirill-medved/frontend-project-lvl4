import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import * as _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { setCurrentChannelName } from '../../../configs/store/slices/channelsSlice';
import style from './RenameChannelModal.module.scss';

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

  const onClick = () => {
    handleShow();
  };

  const submitHandler = (e) => {
    e.preventDefault();

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
      <p aria-hidden='true' onClick={onClick}>
        {t('api.renameChannelModal.showBtn.text')}
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('api.renameChannelModal.title')}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>
                {t('api.renameChannelModal.form.label.text')}
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter channel name'
                value={channelName}
                onChange={handleChannelName}
                data-testid='rename-channel'
              />
              <Form.Text className='text-muted'>
                {t('api.renameChannelModal.form.text.text')}
              </Form.Text>
              {error && (
                <div className={style.error_wrapper}>
                  <p>{t('api.renameChannelModal.form.error.text')}</p>
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

export default RenameChannelModal;
