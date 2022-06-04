//Инициализация библиотек
const mongoose = require("mongoose");

//Инициализация модулей

//Схема refresh token
/**
 * @description - Схема refresh token
 * @scheme
 * @type {Model<T & Document<any, any, any>>}
 */
const Token = mongoose.model('Token',
    new mongoose.Schema({
        user: {type: mongoose.Schema.Types.ObjectId, ref: "Token"},
        refreshToken: {type: String, require: true},
        createDate: { type: String, default:
                (new Intl.DateTimeFormat("ru", {dateStyle: "short", timeStyle: "short"}).format(new Date()))
        }
    }, {
        versionKey: false
    })
);

//Экспортируем данный модуль
module.exports = Token;