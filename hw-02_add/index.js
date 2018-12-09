"use strict";

/**
Напишите скрипт имитирующий авторизацию пользователя.

Есть массив паролей зарегистрированных пользователей passwords.

При посещении страницы, необходимо 
  - попросить пользователя ввести свой пароль, после чего 
  - проверить содержит ли массив passwords пароль введенный пользователем.

Пароль можно ввести не верно 
  - всего n раз, кол-во хранится в переменной attempts.
  >>> Подсказка: используйте цикл do...while.

Если был введен пароль который есть в массиве passwords, 
  - вывести alert с текстом 'Добро пожаловать!' 
  - и прекратить спрашивать пароль в цикле.

Если был введен не существующий пароль, 
  - отнять от лимита попыток единицу,
  - вывести alert с текстом 'Неверный пароль, у вас осталось n попыток', где n это оставшийся лимит.

После того как пользователь закрыл alert, 
  - запросить пароль снова.
  
Продолжать запрашивать пароль до тех пор, пока 
  - пользователь не введет существующий пароль, 
  - не кончатся попытки или 
  - пока пользователь не нажмет Cancel в prompt.

Если закончились попытки, 
  - вывести alert с текстом 'У вас закончились попытки, аккаунт заблокирован!'

Если пользователь нажмет Cancel, 
  - прекратить выполнение цикла.
 */

const passwords = ["qwerty", "111qwe", "123123", "r4nd0mp4zzw0rd"];

let userInput;

let isPasswordRight;

let attempts = 3;

const welcome = "Добро пожаловать!";

const attemptsRunOut = "У вас закончились попытки, аккаунт заблокирован!";

do {
  userInput = prompt("Введите пароль");

  isPasswordRight = passwords.includes(userInput);

  if (!userInput) {
    break;
  } else if (attempts === 1) {
    alert(attemptsRunOut);
    break;
  } else if (isPasswordRight) {
    alert(welcome);
    break;
  } else {
    attempts -= 1;
    alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
  }
} while (true);

console.log("Код после цикла");