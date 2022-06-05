//Инициализация библиотек

//Инициализация модулей

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
     * @return {Promise<*>}
     */
    async registration(request,response,next){
        try {

        } catch (error){
            console.log("Error on registration")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод авторизации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async login(request,response,next){
        try {

        } catch (error){
            console.log("Error on login")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод выхода из сессии пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async logout(request,response,next){
        try {

        } catch (error){
            console.log("Error on logout")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод активации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async activated(request,response,next){
        try {

        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on activating user")
            console.log(error);
            return response.status(400).json({message: error.message});

        }
    }
    /**
     * @description - Метод получения refresh token пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async refresh(request,response,next){
        try {

        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on refresh token")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод получения всех пользователей для Admin
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @param next - следущая middleware функция
     * @return {Promise<*>}
     */
    async getUsers(request,response,next){
        try {
            response.json("Getting users");
        } catch (error){
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on getting users")
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
}

//Экспортируем данный модуль
module.exports = new UserController();