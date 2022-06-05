//Инициализация библиотек
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Инициализация модулей
const Token = require("../models/tokenModel");

/**
 * @description - Класс сервис для генерации токенов и их обновления
 * @class
 */
class tokenService{
    /**
     * @description - генерация токена
     * @method
     * @param payload - информация о пользователе
     */
    async generateToken(payload){
        try {
            //Генерация access Token
            console.log("Generating access Token...")
            const accessToken = jwt.sign(payload,
                (process.env.SECRED_CODE_ACCESS || "secret-code-access")
                , {expiresIn: "30m"}
            );
            //Если произошла ошибка - выбрасываем ее
            if(!accessToken)
                throw new Error("Error on generating access Token");
            console.log("Access Token is: " + accessToken)

            //Генерация refresh Token
            console.log("Generating refresh Token...")
            const refreshToken = jwt.sign(payload,
                (process.env.SECRED_CODE_REFRESH || "secret-code-refresh")
                , {expiresIn: "30d"}
            );
            //Если произошла ошибка - выбрасываем ее
            if(!refreshToken)
                throw new Error("Error on generating refresh Token");
            console.log("Refresh Token is: " + refreshToken)

            //Возвращаем Token'ы
            return {
                accessToken,
                refreshToken
            }
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on generateToken in Token service")
            console.log(error);
        }
    }

    /**
     * @description - сохранение нового или обновление старого refresh Token
     * @method
     * @param userId - id пользователя
     * @param refreshToken - refresh Token пользователя
     */
    async saveToken(userId,refreshToken){
        try {
            //Поиск существующего token
            console.log("Searching already exist refreshToken")
            const tokenData = await Token.findOne({user: userId});
            //Если такой token есть, то обновляем его
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }

            //Создание нового token
            console.log("Generating new refresh Token...")
            const token = await Token.create({user: userId, refreshToken: refreshToken});
            //Если при генерации произошла ошибка - то выбрасываем ее
            if (!token)
                throw new Error("Error on creating token on Token service");

            //Возвращаем новый refresh Token
            return token;
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on saveToken in Token service")
            console.log(error);
        }
    }
}

module.exports = new tokenService();