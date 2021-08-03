import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const EmojiMedia = ({ onSelect }) => {
  return (
    <OverlayTrigger
      key='top'
      trigger='click'
      placement='top'
      overlay={
        <Popover id='popover-emoji'>
          <Picker set='apple' onSelect={onSelect} />
        </Popover>
      }
    >
      <button type='button' className='btn btn-outline-secondary'>
        <img
          src='https://img.icons8.com/ios-glyphs/30/000000/happy--v2.png'
          alt='Смайлики'
        />
      </button>
    </OverlayTrigger>
  );
};

export default EmojiMedia;
