export default {
  translation: {
    header: {
      button: {
        signout: 'Выйти',
      },
      textLogo: 'Hexlet-Chat',
    },
    login: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      error: 'Неверные имя пользователя или пароль',
      formSubmit: 'Войти',
      redirect: {
        text: 'Нет аккаунта? ',
        submit: 'Регистрация',
      },
    },
    signup: {
      title: 'Регистрация',
      username: {
        text: 'Имя пользователя',
        required: 'Обязательное поле',
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
        notuniq: 'Такой пользователь уже существует',
      },
      password: {
        text: 'Пароль',
        required: 'Обязательное поле',
        min: 'Не менее 6 символов',
      },
      confirmPassword: {
        text: 'Подтвердите пароль',
        error: 'Пароли должны совпадать',
      },
      formSubmit: 'Зарегистрироваться',
    },
    main: {
      chat: {
        emptyChat: 'Чат пока что пуст. Напишите первое сообщение!',
      },
    },
    pageNotFound: {
      title: {
        text: 'Страница не найдена!',
      },
    },
    api: {
      createChannelModal: {
        title: 'Добавить канал',
        submit: 'Отправить',
        cancel: 'Отменить',
        showBtn: {
          text: 'Создать новый канал',
        },
        form: {
          label: {
            text: 'Название канала',
          },
          text: {
            text: 'Название канала должно быть уникальным!',
          },
          error: {
            text: 'Должно быть уникальным!',
          },
        },
      },
      renameChannelModal: {
        title: 'Переименовать канал',
        submit: 'Отправить',
        cancel: 'Отменить',
      },
      deleteChannelModal: {
        title: 'Удалить канал',
        submit: 'Удалить',
        cancel: 'Отменить',
      },
    },
  },
};
