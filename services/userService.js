//Инициализация библиотек
const bcrypt = require("bcrypt");
const uuid = require("uuid");

//Инициализация модулей
const User = require("../models/userModel");
const emailService = require("./emailService");
const tokenService = require("./tokenService");
//Класс сервис для аутентификации и действий пользователя
/**
 * @description - Класс сервис для аутентификации и действий пользователя
 * @class
 */
class userService{
    /**
     * @description - Метод сервиса пользователя для регистрации
     * @method
     * @param email
     * @param password
     * @return {Promise<void>}
     */
    async registration(email,password){
        try {
            //Ищем пользователя в БД
            const candidate = await User.findOne({email: email});
            //Если такой пользователь есть - выбрасываем ошибку
            if(candidate)
                throw new Error("User already exist");

            //Шифруем пароль
            const hashPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(5));
            //Если произошла ошибка шифрования - выбрасываем ошибку
            if(!hashPassword)
                throw new Error("Hash password error");

            //Генерируем строку для ссылки активации
            const activationLink = uuid.v4();
            //Если произошла ошибка при генерации - то выбрасываем ошибку
            if(!activationLink)
                throw new Error("Error to generate link")

            //Помещаем пользователя в БД
            const user = await User.create({email: email, password: hashPassword, activationLink: activationLink});
            //Если не получаеться поместить в БД - выбрасываем ошибку
            if(!user)
                throw new Error("Error save user");

            await emailService.sendActivationEmail(email, activationLink);

            const token = tokenService.generateToken()
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on registration in User service")
            console.log(error);
        }

    }
}

//Экспортируем данный модуль
module.exports = new userService();