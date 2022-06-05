const jwt = require("jsonwebtoken");
require("dotenv").config();

const Token = require("../models/tokenModel");

class tokenService{
    async generateToken(payload){
        try {
            const accessToken = jwt.sign(payload,
                (process.env.SECRED_CODE_ACCESS || "secret-code-access")
                , {expiresIn: "30m"}
            );

            const refreshToken = jwt.sign(payload,
                (process.env.SECRED_CODE_REFRESH || "secret-code-refresh")
                , {expiresIn: "30d"}
            );

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

    async saveToken(userId,refreshToken){
        try {
            const tokenData = await Token.findOne({user: userId});
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }

            const token = await Token.create({user: userId, refreshToken: refreshToken});
            if (!token)
                throw new Error("Error on creating token on Token service");

            return token;
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on saveToken in Token service")
            console.log(error);
        }
    }
}

module.exports = new tokenService();