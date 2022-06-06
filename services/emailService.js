//Инициализация библиотек
const nodeMailer = require("nodemailer");
require("dotenv").config();

//Инициализация модулей

/**
 * @description - Класс сервис для отправки сообщения для активации пользователя
 * @class
 */
class emailService{
    //Настройка стандартной конфигурации почты рассылки
    constructor() {
        this.transporter = nodeMailer.createTransport({
            //Сервис почты
            service: "gmail",
            //Хост почты
            host: (process.env.SMTP_HOST || "smtp.gmail.com"),
            port: (process.env.SMTP_PORT || 587),
            secure: false,
            auth: {
                user: (process.env.SMTP_USER || "auth4pro@gmail.com"),
                pass: (process.env.SMTP_PASSWORD || "ppmtywjqzibseeta")
            }
        })
    }

    /**
     * @description - Метод отправки сообщения
     * @method
     * @async
     * @param to - почта куда отправляеться сообщение
     * @param link - ссылка активации
     */
    async sendActivationEmail(to, link){
        console.log("Sending email...")
        await this.transporter.sendMail({
            from: (process.env.SMTP_USER || "auth4pro@gmail.com"),
            to,
            subject: "Активация аккаунта на " + (process.env.API_URL || "http://localhost:3000"),
            text: "",
            html:
            `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>>
            `
        },(error)=>{
            if(error){
                console.log("Email could not sent due to error");
                console.log(error);
            } else {
                console.log("Email has been sent successfully");
            }
        });
    }
}

//Экспортируем данный модуль
module.exports = new emailService();