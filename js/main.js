'use strict';

const loginTitle = document.querySelector('.login-title'),
  loginCheckin = document.querySelector('.login-regist'),
  loginBtn = document.querySelector('.login-button'),
  userContainer = document.querySelector('.user-container'),
  loginName = document.querySelector('.login-name');

const userData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

const checkIn = () => {
  userContainer.textContent = '';
  userData.forEach((item, i) => {
    let userSpan = document.createElement('li'),
      closeBtn = document.createElement('button');
    userSpan.classList.add('user');
    closeBtn.classList.add('close');
    userSpan.textContent = `${i + 1}. Имя: ${item.user[`name`]}, фамилия: ${item.user[`surname`]}, зарегистрирован: ${item.time}`;

    userContainer.append(userSpan);
    userSpan.append(closeBtn);
    localStorage.setItem('users', JSON.stringify(userData));

    closeBtn.addEventListener('click', () => {
      userSpan.remove(userSpan);
      let index = userData.indexOf(item);
      if (index > -1) {
        userData.splice(index, 1);
      }
      localStorage.clear();
      checkIn();
    });
  });
};

const logIn = () => {
  let nickName,
    pass,
    obj;

  do {
    nickName = prompt('Введите Логин');
    if (nickName === null) {
      return 0;
    }
  } while (nickName === '');

  do {
    pass = prompt('Введите пароль');
    if (pass === null) {
      return 0;
    }
  } while (pass === '');

  let returnObj = JSON.parse(localStorage.getItem("users"));
  let access = false;

  for (let key in returnObj) {
    obj = returnObj[key];
    if (obj.nick === nickName && obj.password === pass) {
      access = true;
      loginName.textContent = `${obj.user.name}`;
    }
  }

  if (!access) {
    alert('Пользователь не найден');
  }
};

const submitData = () => {
  let user,
    nickName,
    pass;

  do {
    user = prompt('Введите Имя и Фамилию через пробел');
    if (user === null) {
      return 0;
    }
    user = user.trim().split(' ');
  } while (user === '' || (user.length !== 2 && user[1] !== ''));

  do {
    nickName = prompt('Введите Логин');
    if (nickName === null) {
      return 0;
    }
  } while (nickName === '');

  do {
    pass = prompt('Введите пароль');
    if (pass === null) {
      return 0;
    }
  } while (pass === '');

  let date = new Date(),
    options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

  const newUser = {
    user: {
      name: user[0],
      surname: user[1]
    },
    nick: nickName,
    password: pass,
    time: date.toLocaleString('ru', options)
  };

  userData.push(newUser);
  checkIn();
};

checkIn();

loginCheckin.addEventListener('click', submitData);
loginBtn.addEventListener('click', logIn);