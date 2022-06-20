//Инициализация библиотек
const bcrypt = require("bcrypt");
const uuid = require("uuid");
require("dotenv").config();

//Инициализация модулей
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const emailService = require("./emailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");
//Класс сервис для аутентификации и действий пользователя
/**
 * @description - Класс сервис для аутентификации и действий пользователя
 * @class
 */
class userService{
    /**
     * @description - Метод сервиса пользователя для регистрации
     * @method
     * @async
     * @param email - email пользователя
     * @param password - пароль пользователя
     */
    async registration(email,password){
        try {
            //Ищем пользователя в БД
            console.log("Checking for already exist user...");
            const candidate = await User.findOne({email: email});
            //Если такой пользователь есть - выбрасываем ошибку
            if(candidate)
                throw new Error("User already exist");
            console.log("User not found - creating new")

            //Хэшируем пароль
            console.log("Hashing password...");
            const hashPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(3));
            //Если произошла ошибка шифрования - выбрасываем ошибку
            if(!hashPassword)
                throw new Error("Hash password error");
            console.log("Hash password is: " + hashPassword);

            //Генерируем строку для ссылки активации
            console.log("Generating new activationLink...");
            const activationLink = uuid.v4();
            //Если произошла ошибка при генерации - то выбрасываем ошибку
            if(!activationLink)
                throw new Error("Error to generate link")
            console.log("Activation link is: " + activationLink);

            //Помещаем пользователя в БД
            console.log("Adding new user to DB...");
            const user = await User.create({email: email, password: hashPassword, activationLink: activationLink});
            //Если не получается поместить в БД - выбрасываем ошибку
            if(!user)
                throw new Error("Error save user");
            console.log("New user is: " + user);

            //Отправляем на почту ссылку на активацию
            console.log("Sending message to email...")
            await emailService.sendActivationEmail(email,
                (process.env.API_URL.toString() || "auth4pro@gmail.com")
                        + "/auth/activate/" + activationLink);

            //Создаем объект для трансфера данных пользователя
            console.log("Creating Dto for user...")
            const userDto = new UserDto(user);
            //Если не удается создать - то выбрасываем ошибку
            if(!userDto)
                throw new Error("Error on creating user");
            console.log(userDto);

            //Генерируем токены
            console.log("Generating new tokens...")
            const tokens = await tokenService.generateToken({...userDto});
            //Если не удается создать - то выбрасываем ошибку
            if(!tokens)
                throw new Error("Error on generating tokens");

            //Сохраняем или обновляем токен
            console.log("Saving or update refresh token...")
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            //Возвращаем токены и информацию о пользователе
            console.log("Sending info and tokens...");
            return {
                ...tokens,
                user: userDto
            }

        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on registration in User service")
            console.log(error);
        }

    }

    /**
     * @description - Метод активации пользователя
     * @method
     * @async
     * @param activationLink - ссылка активации
     */
    async activate(activationLink){
        try {
            //Поиск пользователя по ссылке
            const user = await User.findOne({activationLink: activationLink});
            if (!user)
                throw new Error("Uncorrected link");

            //Изменение поля на активированный
            user.isActivated = true;
            await user.save();
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on activating in User service")
            console.log(error);
        }
    }

    /**
     * @description - Метод логина пользователя
     * @method
     * @param email - email пользователя
     * @param password - пароль пользователя
     */
    async login(email, password) {
        try {
            //Ищем пользователя в БД
            console.log("Checking for already exist user...");
            const user = await User.findOne({email: email});
            //Если такой пользователь есть - выбрасываем ошибку
            if (!user)
                throw new Error("User not exist");

            //Расхэшируем пароль
            console.log("Rehashing password...");
            const isEqualPassword = bcrypt.compareSync(password, user.password);
            //Если произошла ошибка шифрования - выбрасываем ошибку
            if (!isEqualPassword)
                throw new Error("Password not equal");
            console.log("Password equal: " + isEqualPassword);

            //Создаем объект для трансфера данных пользователя
            console.log("Creating Dto for user...")
            const userDto = new UserDto(user);
            //Если не удается создать - то выбрасываем ошибку
            if (!userDto)
                throw new Error("Error on creating user");
            console.log("User Dto created: " + userDto);

            //Генерируем токены
            console.log("Generating new tokens...")
            const tokens = await tokenService.generateToken({...userDto});
            //Если не удаться создать - то выбрасываем ошибку
            if (!tokens)
                throw new Error("Error on generating tokens");

            //Сохраняем или обновляем токен
            console.log("Saving or update refresh token...")
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            //Возвращаем токены и информацию о пользователе
            console.log("Sending info and tokens...");
            return {
                ...tokens,
                user: userDto
            }
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on login in User service")
            console.log(error);
        }
    }

    /**
     * @description - Метод выхода
     * @async
     * @method
     * @param refreshToken - токен для выхода
     */
    async logout(refreshToken){
        try {
            //Удаляем токен из БД
            const token = await tokenService.removeToken(refreshToken);
            //Если не получилось удалить токен, то выкидываем ошибку
            if(!token)
                throw new Error("Error on removing token")
            //Возвращаем данные о выходе пользователя и удалении токена
            console.log("Success deleting token")
            return token;
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on logout in User service")
            console.log(error);
        }
    }
}

//Экспортируем данный модуль
module.exports = new userService();