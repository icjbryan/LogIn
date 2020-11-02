'use strict';

const loginTitle = document.querySelector('.login-title'),
  loginCheckin = document.querySelector('.login-regist'),
  loginBtn = document.querySelector('.login-button'),
  userContainer = document.querySelector('.user-container');
let user,
  nickName,
  pass;

const userData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

const checkIn = () => {
  userContainer.textContent = '';
  userData.forEach((item, i) => {
    let userSpan = document.createElement('span');
    userSpan.classList.add('user');
    userSpan.textContent = `${i + 1}. Имя: ${item.user[`name`]}, фамилия: ${item.user[`surname`]}, зарегистрирован: ${item.time}`;

    userContainer.append(userSpan);
    localStorage.setItem('users', JSON.stringify(userData));

  });
};

// const logIn = () => {
//   const nickName = prompt('Введите Логин'),
//     pass = prompt('Введите пароль');
// };

function submitData() {
  do {
    user = prompt('Введите Имя и Фамилию через пробел', '');
    while (user === '') {
      user = prompt('Введите Имя и Фамилию через пробел', '');
    }
    user = user.split(' ');
  } while (user.length !== 2 && user[1] !== '');

  nickName = prompt('Введите Логин');
  pass = prompt('Введите пароль');
  let date = new Date();
  const newUser = {
    user: {
      name: user[0],
      surname: user[1]
    },
    nick: nickName,
    password: pass,
    time: date
  };
  console.log(newUser);
  userData.push(newUser);
  checkIn();
}

checkIn();

// НАСТРОИТЬ ДАТУ В ФОРМАТЕ localStorage!!!!!!
// Добавить личный кабинет!!!!!
loginCheckin.addEventListener('click', submitData);
// loginBtn.addEventListener('click', logIn);