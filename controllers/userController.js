//Инициализация библиотек

//Инициализация модулей
const userService = require("../services/userService");


//Класс контроллер для аунтификации и действий пользователя
/**
 * @description - Класс контроллер для аунтификации и действий пользователя
 * @class
 */
class UserController{
    /**
     * @description - Метод регистрации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async registration(request,response,next){
        try {
            //Получаем из тела запроса данные
            console.log("Getting data from request...")
            const {email, password} = request.body;
            if(!email || !password)
                throw new Error("Not found data in request");
            console.log("Data are: " + email + " , " + password);

            //Регистрируем пользователя
            console.log("Registration new user...")
            const userData = await userService.registration(email, password);
            //Если не получаеться - выбрасываем ошибку
            if(!userData)
                throw new Error("Error on getting data after registration");
            console.log("New user is created");

            //Добавляем в cookie refreshToken
            response.cookie("refreshToken", userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});

            //Возвращаем данные
            return response.json(userData);
        } catch (error){
            console.log("Error on registration in Controller")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод авторизации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async login(request,response,next){
        try {

        } catch (error){
            console.log("Error on login in Controller")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод выхода из сессии пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async logout(request,response,next){
        try {

        } catch (error){
            console.log("Error on logout in Controller")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод активации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async activated(request,response,next){
        try {

        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on activating user in Controller")
            console.log(error);
            return response.status(400).json({message: error.message});

        }
    }
    /**
     * @description - Метод получения refresh token пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async refresh(request,response,next){
        try {

        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on refresh token in Controller")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод получения всех пользователей для Admin
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async getUsers(request,response,next){
        try {
            response.json("Getting users");
        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on getting users in Controller")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
}

//Экспортируем данный модуль
module.exports = new UserController();