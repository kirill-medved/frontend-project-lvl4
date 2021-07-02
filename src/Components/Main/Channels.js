import React from 'react';
import style from './Channels.module.sass';

const Channels = (props) => {
  return (
    <div>
      {props.channels.length &&
        props.channels.map((channel) => {
          console.log(channel);
          return (
            <div key={channel.id} className={style.wrapper}>
              <p>{channel.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Channels;
