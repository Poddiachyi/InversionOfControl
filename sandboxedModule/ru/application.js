// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');

var interval = setInterval(function(){
    console.log('Hello world!');
}, 500);
setTimeout(function(){
    clearInterval(interval);
},2000);
module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};
