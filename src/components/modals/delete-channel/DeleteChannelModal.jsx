import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Form } from 'react-bootstrap';

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

  const onClick = () => {
    handleShow();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    checkHandler();
    handleClose();
    socket.emit('removeChannel', { id });
  };

  return (
    <div>
      <p aria-hidden='true' onClick={onClick}>
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
              onClick={onSubmit}
            >
              {t('api.deleteChannelModal.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DeleteChannelModal;
