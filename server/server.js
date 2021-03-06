//Инициализация библиотек
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config()

//Инициализация модулей
const logger = require("./middleware/requestLogger");
const router = require("./routes/index");
const errorMiddleware = require("./middleware/errorMiddleware")

//Инициализируем Express
const app = express();

//Константы
const PORT = process.env.PORT || 5000;
const DB_URI = "mongodb://" +
    ((process.env.MONGO_PORT_DOCKER || "host.docker.internal") || (process.env.MONGO_HOST || "127.0.0.1"))
        + ":" + (process.env.MONGO_PORT || "27017")
            + "/" + (process.env.MONGO_NAME || "auth");

//Инициализируем возможность работы с json
app.use(express.json());
//Инициализируем возможность работы с cookieParser
app.use(cookieParser());
//Инициализируем возможность работы с cors
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

//Инициализируем логгер
app.use(logger);

//Маршутизация
app.use("/auth",router);

app.use(errorMiddleware);

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
            throw new Error("Error on connecting to DB");
        });

        console.log("Access connecting to DB to URI: " + DB_URI);

        //Прослушиваем сервер
        app.listen(PORT,()=>{
            console.log("Server is working on http://localhost:" + PORT);
        });
    } catch (error) {
        console.log(error);
        console.log("Error on load server");
    }
})();