//Инициализация библиотек
const Router = require("express").Router;


//Инициализация модулей
const userController = require("../controllers/userController");


//Инициализируем Роутрер
const router = Router();

//Запросы Роутера
//URL, Валидация, Контроллер управления
router.post("/registration",userController.registration);
router.post("/login", userController.login);
router.post("/logout",userController.logout);
router.get("/activate/:link",userController.activate);
router.get("/refresh",userController.refresh);
router.get("/users",userController.getUsers);


//Экспортируем данный модуль
module.exports = router;