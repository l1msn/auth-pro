//Инициализация модулей
const authError = require("../exceptions/authError")
const winstonLogger = require("../middleware/winstonLogger");
/**
 * @description - Функция обработчик ошибок
 * @function
 * @param error - сама ошибка
 * @param request - запрос к серверу
 * @param response - ответ от сервера
 * @param next - следущая middleware
 */
function errorHandler(error, request, response, next) {
    //Выводим ошибку в логи
    console.log(error);
    //Если это известная нам ошибка (описана в exceptions), то возвращаем уже готовую форму ошибки
    if(error instanceof authError) {
        winstonLogger.log("info", error);
        return response.status(error.status).json({message: error.message, errors: error.errors});
    }
    //... могут быть еще другие ошибки

    //Если же это неизвестная ошибка, возвращаем готовую схему
    return response.status(500).json({message: "Unexpected error from server"})
}

//Экспортируем данный модуль
module.exports = errorHandler;