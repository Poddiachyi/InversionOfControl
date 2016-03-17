// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

require("util");
var fs = require('fs');

// Вывод из глобального контекста модуля
console.log('From application global context');

module.exports = {};
module.exports.func = function(paramet) {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};

module.exports.f = function(param){
  console.log("From wrapped console.log()");
};

module.exports.int = 10;
module.exports.var = "lal";
