'use strict';

/*
Поля будущего объекта кассира (🔔 объявляются как this.имя_поля в конструкторе):

name

- строка,
- имя кассира,
- передается при вызове конструктора

customerMoney

- сумма введенная клиентом при запросе денег,
- начальное значение
  - 0

totalPrice

- хранит общую стоимость покупок заказа,
- начальное значение
  - 0

change

- значение сдачи клиента,
- начальное значение
  - 0

error

- свойство хранящее текст ошибки,
- начальное значение
  - null

METODS

greet()

- метод,
- использует значение свойства name,
- выводит в консоль сообщение
  - Добрый день, вас обслуживает ${name}

getCustomerMoney(value)

- метод,
- получает число (деньги клиента),
- и записывает его в свойство customerMoney.

countTotalPrice(allProducts, order)

- метод,
- получает:
  - объекты всех продуктов и
  - списка покупок,
- считает общую стоимость покупок и

  - записывает результат в свойство totalPrice.

- Ключи объекта order есть в объекте products,
  - который будет записан в параметр allProducts.
- Из order берем количество единиц продукта,
- а из allProducts цену за одну штуку и умножаем,

  - так получаем цену одного типа продукта в заказе.

- Чтобы посчитать цену для всех продуктов заказа используйте цикл, перебрав все
  ключи order.

countChange()

- метод,
- считает сдачу,
- разницу между общей суммой покупок и деньгами клиента,

  - записывает результат в свойство change.

- !!! Обязательно проверьте что customerMoney не меньше значения

- Если денег было передано достаточно,
  - возвращает разницу денег.
- Если в customerMoney меньше денег чем в totalPrice,
  - записывает в свойство error строку
    - Вам не хватает денег на покупки.

onSuccess()

- метод,
- использует значение свойства change и
- выводит в консоль строку
  - Спасибо за покупку, ваша сдача ${change}!

onError()

- метод,
- выводит в консоль значение свойства error

reset()

- метод,
- сбрасывает поля в исходные значения:
  - customerMoney,
  - totalPrice,
  - change,
  - error
*/
// Пример использования:

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

function Cashier(name = '') {
  this.name = name;
  this.customerMoney = 0;
  this.totalPrice = 0;
  this.change = 0;
  this.error = null;

  this.greet = function() {
    console.log(`Добрый день, вас обслуживает ${this.name}`);
  };

  this.getCustomerMoney = function(value) {
    this.customerMoney = value;
  };

  this.countTotalPrice = function(allProducts, order) {
    const orderKeys = Object.keys(order);
    let total = 0;

    for (const key of orderKeys) {
      if (allProducts[key]) {
        total += allProducts[key] * order[key];
      }
    }

    this.totalPrice = total;
  };

  this.countChange = function() {
    const isCustomerMoneyEnought = this.customerMoney >= this.totalPrice;

    if (!isCustomerMoneyEnought) {
      this.error = 'Вам не хватает денег на покупки.';
      return;
    }

    this.change = this.customerMoney - this.totalPrice;
  };

  this.onSuccess = function() {
    console.log(`Спасибо за покупку, ваша сдача ${this.change}!`);
  };

  this.onError = function() {
    console.log(this.error);
  };

  this.reset = function() {
    this.customerMoney = 0;
    this.totalPrice = 0;
    this.change = 0;
    this.error = null;
  };
}

const poly = new Cashier('Poly');
const mango = new Cashier('Mango');
const ajax = new Cashier('Ajax');

console.log(mango); // объект со свойствами и name содержит значение Mango
console.log(ajax); // объект со свойствами и name содержит значение Ajax

// // Проверяем исходные значения полей
console.log(poly.name); // Poly
console.log(poly.customerMoney); // 0
console.log(poly.totalPrice); // 0
console.log(poly.change); // 0
console.log(poly.error); // null

poly.greet(); // Добрый день, вас обслуживает Poly

// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая products - список всех продуктов
// и order - список покупок клиента
poly.countTotalPrice(products, order);

// Проверям что посчитали
console.log(poly.totalPrice); // 110

// Вызываем getCustomerMoney для запроса денег клиента
poly.getCustomerMoney(300);

// Проверяем что в поле с деньгами клиента
console.log(poly.customerMoney); // 300

// Вызываем countChange для подсчета сдачи
poly.countChange();

// Проверяем что нам вернул countChange
console.log(poly.change); // 190

// Проверяем результат подсчета денег
if (poly.error === null) {
  // При успешном обслуживании вызываем метод onSuccess
  poly.onSuccess(); // Спасибо за покупку, ваша сдача 190
} else {
  // При неудачном обслуживании вызываем метод onError
  poly.onError(); // Очень жаль, вам не хватает денег на покупки
}

// Вызываем reset при любом исходе обслуживания
poly.reset();

// Проверяем значения после reset
console.log(poly.customerMoney); // 0
console.log(poly.totalPrice); // 0
console.log(poly.change); // 0
console.log(poly.error); // null
