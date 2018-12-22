'use strict';

/**
Создайте скрипт кассира, который получает список продуктов и деньги, подсчитывает общую стоимость продуктов, и в зависимости от того хватает денег или нет, уведомляет покупателя о результате.

Есть объект products - база данных товаров в формате имя-товара:цена-за-единицу.

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};

Заказ клиента хранится в виде объекта следующего формата. имя-товара:количество-единиц.

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

Создайте объект cashier со следующими свойствами и методами:

СВОЙСТВА

  - name - имя кассира, пусть будет Mango
  - customerMoney - сумма введенная клиентом при запросе денег, 
      начальное значение 
        - 0

  - totalPrice - хранит общую стоимость покупок заказа, 
      начальное значение 
        - 0

  - change - значение сдачи клиента, 
      начальное значение 
        - 0
        
  - error - свойство хранящее текст ошибки, 
      начальное значение 
        - null

МЕТОДЫ

greet() - метод, использует значение свойства name, 
  - выводит в консоль сообщение   
    - Добрый день, вас обслуживает ${name}

getCustomerMoney(value) - метод, 
  - получает число (деньги клиента), и 
  - записывает его в свойство customerMoney.

countTotalPrice(allProducts, order) - метод, 
  получает объекты 
    - всех продуктов и 
    - списка покупок,
  - считает общую стоимость покупок и 
  - записывает результат в свойство totalPrice. 

  - Ключи объекта order есть в объекте products, который будет записан в параметр allProducts. 

  - Из order берем количество единиц продукта, а из allProducts цену за одну штуку и умножаем, так получаем цену одного типа продукта в заказе. Чтобы посчитать цену для всех продуктов заказа используйте цикл, перебрав все ключи order.

countChange() - метод, 
  считает:
  - сдачу, 
  - разницу между общей суммой покупок и деньгами клиента, 
  - записывает результат в свойство change.

  !!!Обязательно проверьте что 
    - customerMoney не меньше значения totalPrice

  - Если денег было передано достаточно, 
    - возвращает разницу денег.

  - Если в customerMoney меньше денег чем в totalPrice, 
    - записывает в свойство error строку Вам не хватает денег на покупки

onSuccess() - метод, 
  - использует значение свойства change и 
    - выводит в консоль строку Спасибо за покупку, ваша сдача ${change}!.

onError() - метод, 
  - выводит в консоль значение свойства error

reset() - метод, 
  - сбрасывает поля: 
    - customerMoney, 
    - totalPrice, 
    - change и 
    - error в исходные значения
    
Вызовы свойств и методов объект для проверки работоспособности.

 */

// Есть объект - база данных товаров.

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};

// Заказ клиента

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

// Объект кассир

const cashier = {
  name: 'Mango',
  customerMoney: 0,
  totalPrice: 0,
  change: 0,
  error: null,

  greet() {
    console.log(`Добрый день, вас обслуживает ${this.name}`);
  },

  getCustomerMoney(value) {
    this.customerMoney = value;
  },

  countTotalPrice(allProducts, order) {
    const orderProducts = Object.keys(order);
    let total = 0;

    for (const product of orderProducts) {
      if (allProducts[product]) {
        total += order[product] * allProducts[product];
      }
    }
    this.totalPrice = total;
  },

  countChange() {
    if (this.customerMoney < this.totalPrice) {
      this.error = 'Очень жаль, вам не хватает денег на покупки.';

      return;
    }

    this.change = this.customerMoney - this.totalPrice;
  },

  onSuccess() {
    console.log(`Спасибо за покупку, ваша сдача ${this.change}!`);
  },

  onError() {
    console.log(this.error);
  },

  reset() {
    this.customerMoney = 0;
    this.totalPrice = 0;
    this.change = 0;
    this.error = null;
  },
};

// Проверяем исходные значения полей
console.log(cashier.name); // Mango
console.log(cashier.customerMoney); // 0
console.log(cashier.totalPrice); // 0
console.log(cashier.change); // 0
console.log(cashier.error); // null

cashier.greet(); // Добрый день, вас обслуживает Mango

// // Вызываем метод countTotalPrice для подсчета общей суммы
// // передавая products - список всех продуктов и order - список покупок клиента
cashier.countTotalPrice(products, order);

// // Проверям что посчитали
console.log(cashier.totalPrice); // 110

// // Вызываем getCustomerMoney для запроса денег клиента
cashier.getCustomerMoney(300);

// // Проверяем что в поле с деньгами клиента
console.log(cashier.customerMoney); // 300

// // Вызываем countChange для подсчета сдачи
cashier.countChange();

// // Проверяем что нам вернул countChange
console.log(cashier.change); // 190

// Проверяем результат подсчета денег
if (cashier.error === null) {
  // При успешном обслуживании вызываем метод onSuccess
  cashier.onSuccess(); // Спасибо за покупку, ваша сдача 190
} else {
  // При неудачном обслуживании вызываем метод onError
  cashier.onError(); // Очень жаль, вам не хватает денег на покупки
}

// // Вызываем reset при любом исходе обслуживания
cashier.reset();

// // Проверяем значения после reset
console.log(cashier.customerMoney); // 0
console.log(cashier.totalPrice); // 0
console.log(cashier.change); // 0
console.log(cashier.error); // null
