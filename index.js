"use strict";

// Напишите скрипт имитирующий авторизацию администратора в панели управления.

// При загрузке страницы у посетителя запрашивается логин через prompt:

// Если посетитель нажал Cancel — показывать alert с текстом Отменено пользователем!
// Если было введено что либо другое, что не совпадает со значением константы adminLogin, показывать alert с текстом Доступ запрещен, неверный логин!
// Если был введен логин совпадающий со значением константы adminLogin, спрашивать пароль через prompt.
// При вводе пароля:

// Если нажали Cancel, показывать alert с текстом Отменено пользователем!
// Если введен пароль который не совпадает со значением константы adminPassword, показывать alert с текстом Доступ запрещен, неверный пароль!
// Если введён пароль который совпадает со значением константы adminPassword, показывать alert с текстом Добро пожаловать!

// 🔔 Для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert

const userInput = prompt("Введите логин");

const adminLogin = "admin";
const adminPassword = "m4ng0h4ckz";

let messege;

const userPushCancel = "Отменено пользователем!";
const userInputWrongLogin = "Доступ запрещен, неверный логин!";
const userInputWrongPassword = "Доступ запрещен, неверный пароль!";
const userWelcome = "Добро пожаловать!";

// Вариант с "else...if"
// =========================================================

if (!userInput) {
  messege = userPushCancel;
} else if (userInput === adminLogin) {
  const userInput = prompt("Введите пароль");

  if (!userInput) {
    messege = userPushCancel;
  } else if (userInput === adminPassword) {
    messege = userWelcome;
  } else {
    messege = userInputWrongPassword;
  }
} else {
  messege = userInputWrongLogin;
}

alert(messege);

// Вариант с "if...else"
// ========================================================

// if (!userInput) {
//   alert(userPushCancel);
// } else {
//   if (userInput !== adminLogin) {
//     alert(userInputWrongLogin);
//   } else {
//     const userInput = prompt("Введите пароль");

//     if (!userInput) {
//       alert(userPushCancel);
//     } else {
//       if (userInput !== adminPassword) {
//         alert(userInputWrongPassword);
//       } else {
//         alert(userWelcome);
//       }
//     }
//   }
// }

// Вариант с использованием "if...else" & "тернарного оператора"
// ==========================================================

// let isAdmin = false;
// let isLoggedIn = false;

// if (!userInput) {
//   alert(userPushCancel);
// } else {
//   isAdmin = userInput === adminLogin ? true : isAdmin;

//   if (!isAdmin) {
//     alert(userInputWrongLogin);
//   } else {
//     const userInput = prompt("Введите пароль");

//     if (!userInput) {
//       alert(userPushCancel);
//     } else {
//       isLoggedIn = userInput === adminPassword ? true : isLoggedIn;

//       if (!isLoggedIn) {
//         alert(userInputWrongPassword);
//       } else {
//         alert(userWelcome);
//       }
//     }
//   }
// }