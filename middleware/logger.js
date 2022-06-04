const fs = require("fs");
/**
 * @description - логгер запросв
 * @function
 * @param request - запрос
 * @param response - ответ
 * @param next - следушая функция middleware
 */
const logger = (request,response,next)=>{
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} `;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
};
//Экспортируем данный модуль
module.exports = logger;