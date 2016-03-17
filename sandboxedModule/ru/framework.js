// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    path  = require('path'),
    app = require("./application.js");


keysDiffer= function(first, second) {
    var result = first.slice();
    for(var element in second){
        var index = result.indexOf(second[element]);
        if(index != -1){
            result.slice(index, 1);
        }
    }
    return result;
}


// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = {
    module: {},
    console: {
        log: function(message){
            var date = new Date();
            if(process.argv.length == 3){
                applicationName = path.basename(process.argv[2]);
            }
            else{
                applicationName = "application";
            }
            var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log(applicationName + ' ' + time + ': ' + message);

            fs.appendFile("output.txt", applicationName + ' ' + time + ': ' + message + "\n", function(err, info){
                if (err) throw err;
            });
        },
        dir: console.dir

    },


    require: function(file){
        var res = require(file);
        var date = new Date();
        var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        fs.appendFile("requireLog.txt", time + ' ' + file + "\n", function(err, info){
            if (err) throw err;
        });
        return res;
    }


};
context.global = context;
var sandbox = vm.createContext(context);

// Читаем исходный код приложения из файла
;
var fileName;
if(process.argv.length == 3){
    fileName = process.argv[2] + ".js";
}
else{
    fileName = "application.js";
}

var startKeys = Object.keys(sandbox);
fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  //TODO
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
var finishKeys = Object.keys(sandbox);
console.log("First keys " + startKeys.join(", "));
console.log("Finish keys " + finishKeys.join(", "));
console.log("Result keys " + keysDiffer(startKeys, finishKeys).join(", "));
    
});
