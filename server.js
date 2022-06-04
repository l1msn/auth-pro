//Инициализация библиотек
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config()

//Инициализация модулей
const logger = require("./middleware/logger");
const router = require("./routes/index");

//Инициализируем Express
const app = express();

//Константы
const PORT = process.env.PORT || 3000;
const DB_URI = ("mongodb://" + (process.env.MONGO_HOST || "mongo")
        + ":" + (process.env.MONGO_PORT || "27017") + "/" + (process.env.MONGO_NAME || "auth"))
    || ("mongodb://127.0.0.1:27017/auth");

//Инициализируем возможность работы с json
app.use(express.json());
//Инициализируем возможность работы с cookieParser
app.use(cookieParser());
//Инициализируем возможность работы с cors
app.use(cors());

//Инициализируем логгер
app.use(logger);

//Маршутизация
app.use("/auth",router);

//Запускаем сервер
(async ()=>{
    try {
        //Подключаемся к БД
        await mongoose.connect(DB_URI,
            {
                useNewUrlParser: true
            }
        ).catch((error)=>{
            console.log(error);
            throw new Error("Error on connecting to DB")

        });

        //Прослушиваем сервер
        app.listen(PORT,()=>{
            console.log("Server is working on http://localhost:" + PORT);
        });
    } catch (error) {
        console.log(error);
        console.log("Error on load server");
    }
})();