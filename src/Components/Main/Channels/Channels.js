import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as _ from 'lodash';

import style from './Channels.module.scss';
import Channel from './Channel.js';
import { reduce } from 'lodash';

const CreateChannelModal = (props) => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [error, setError] = useState(false);

  const handleChannelName = (e) => {
    setChannelName(e.target.value);
    // check for unique channel name
    console.log(
      'lodash' +
        !_.differenceBy([{ name: e.target.value }], props.channels, 'name')
          .length,
    );
    if (
      !_.differenceBy([{ name: e.target.value }], props.channels, 'name').length
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };

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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
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
              disabled={error !== null}
              type='submit'
              variant='primary'
              onClick={handleClose}
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
