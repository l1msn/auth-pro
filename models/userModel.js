//Инициализация библиотек
const mongoose = require("mongoose");

//Инициализация модулей

//Схема пользователя
/**
 * @description - Схема пользователя
 * @scheme
 * @type {Model<T & Document<any, any, any>>}
 */
const User = mongoose.model('User',
    new mongoose.Schema({
        //Имя
        name: { type: String, required: true },
        //Почта
        email: { type: String, required: true, unique: true },
        //Пароль
        password: { type: String, required: true },
        //Роль
        role: { type: String, enum: ['Admin', 'User'], required: true },
        //Активирован ли пользователь
        isActivated: {type: Boolean, default: false},
        //Ссылка активации
        activationLink: {type: String},
        //Дата создания
        createDate: { type: String, default:
                (new Intl.DateTimeFormat("ru", {dateStyle: "short", timeStyle: "short"}).format(new Date()))
        }
    }, {
        versionKey: false
    })
);

//Экспортируем данный модуль
module.exports = User;