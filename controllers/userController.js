//Инициализация библиотек
require("dotenv").config()

//Инициализация модулей
const userService = require("../services/userService");
const authError = require("../exceptions/authError");
const validator = require("express-validator");

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
     */
    async registration(request,response,next){
        try {
            //Получим ошибки валидации
            console.log("Checking for validation errors...");
            const errorValid = validator.validationResult(request);
            if(!errorValid.isEmpty())
                return authError.badRequest("Validation error", errorValid.array());

            //Получаем из тела запроса данные
            console.log("Getting data from request...")
            const {email, password} = request.body;
            if(!email || !password)
                throw authError.badRequest("Not found data in request");
            console.log("Data are: " + email + " , " + password);

            //Регистрируем пользователя
            console.log("Registration new user...")
            const userData = await userService.registration(email, password);
            //Если не получаеться - выбрасываем ошибку
            if(!userData)
                throw authError.badRequest("Error on registration");
            console.log("New user is created");

            //Добавляем в cookie refreshToken
            response.cookie("refreshToken", userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});

            //Возвращаем данные
            return response.json(userData);
        } catch (error){
            console.log("Error on registration in Controller")
            next(error);
        }
    }
    /**
     * @description - Метод авторизации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     */
    async login(request,response,next){
        try {
            //Получим ошибки валидации
            console.log("Checking for validation errors...");
            const errorValid = validator.validationResult(request);
            if(!errorValid.isEmpty())
                throw authError.badRequest("Validation error", errorValid.array());

            //Получаем из тела запроса данные
            console.log("Getting data from request...");
            const {email, password} = request.body;
            if(!email || !password)
                throw authError.badRequest("Not found data in request");
            console.log("Data are: " + email + " , " + password);

            //Логин пользователя
            console.log("Login user...")
            const userData = await userService.login(email, password);
            if(!userData)
                throw authError.badRequest("Error on login");
            console.log("Success auth login")
            //Добавляем в cookie refreshToken
            response.cookie("refreshToken", userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});

            //Возвращаем данные
            return response.json(userData);
        } catch (error){
            console.log("Error on login in Controller")
            next(error);
        }
    }
    /**
     * @description - Метод выхода из сессии пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     */
    async logout(request,response,next){
        try {

        } catch (error){
            console.log("Error on logout in Controller")
            next(error);
        }
    }
    /**
     * @description - Метод активации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     */
    async activate(request,response,next){
        try {
            console.log("Activation user by email...")
            //Получаем ссылку активации
            const activationLink = request.params.link;
            //Если ее нет - выбрасываем ошибку
            if(!activationLink)
                throw authError.badRequest("Cannot get activation Link");

            //Активируем пользователя
            await userService.activate(activationLink);
            console.log("Activation user success");

            //Производим перенаправление на клиентскую часть фронта
            return response.redirect((process.env.CLIENT_URL || "https://www.google.com"));
        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on activating user in Controller")
            next(error);

        }
    }
    /**
     * @description - Метод получения refresh token пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     */
    async refresh(request,response,next){
        try {

        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on refresh token in Controller")
            next(error);
        }
    }
    /**
     * @description - Метод получения всех пользователей для Admin
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     */
    async getUsers(request,response,next){
        try {
            response.json("Getting users");
        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on getting users in Controller")
            next(error);
        }
    }
}

//Экспортируем данный модуль
module.exports = new UserController();