import React from 'react';
import style from './Channels.module.css';

const Channels = (props) => {
  return (
    <div className={style.wrapper}>
      {props.channels.length > 0 &&
        props.channels.map((channel) => {
          return (
            <div key={channel.id} className={style.wrapper__channel}>
              <p>{channel.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Channels;
