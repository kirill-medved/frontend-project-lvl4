import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import style from './Messages.module.scss';
import { Message } from './components';

const Messages = ({ messages, username, containerRef }) => {
  const [t] = useTranslation();
  return (
    <div className={classnames('w-100', 'overflow-auto')} ref={containerRef}>
      {messages.length > 0 ? (
        messages.map((message) => (
          <Message message={message} key={message.id} username={username} />
        ))
      ) : (
        <p className={style.emptyChat}>{t('main.chat.emptyChat')}</p>
      )}
    </div>
  );
};

export default Messages;
