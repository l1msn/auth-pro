# auth-pro
### *Продвинутый шаблон аутентификации/регистрации с помощью bcrypt/jwt/nodemailer на MongoDB/JS в связке с ReactTS/MobX*.
Содержание:
- [Цель проекта](https://github.com/l1msn/auth-pro#цель-проекта)
- [Инструменты разработки](https://github.com/l1msn/auth-pro#инструменты-разработки)
  - [Стек](https://github.com/l1msn/auth-pro#стек)
  - [Основные зависимости](https://github.com/l1msn/auth-pro#основные-зависимости)
- [Старт работы](https://github.com/l1msn/auth-pro#cтарт-работы)
  - [C docker в контейнере](https://github.com/l1msn/auth-pro#c-docker-в-контейнере)
  - [Без docker на локальной машине](https://github.com/l1msn/auth-pro#без-docker-на-локальной-машине)
- [API](https://github.com/l1msn/auth-pro#api)
- [Пример работы](https://github.com/l1msn/auth-pro#пример-работы)
- [Работы той же серии](https://github.com/l1msn/auth-pro#работы-той-же-серии)
 # Цель проекта
> ***Модифицировать*** уже текущие [web-приложение](https://github.com/l1msn/auth-simple/tree/master) и добавить новый, более продвинутый функционал.
>
> ***Аунтификация***  основывается на **jwt**.
>
> Для взаимодействием с клиентом используется **React App**.
>
> В нем можно произвести регистрации и логин.
>
> При успешной регистрации(и при успешной валидации данных) будет сформирован экземпляр сущности User в БД со всеми введенными данными.
>
> Будут сгенерированные необходимые refresh и access токены для авторизации и сессий.
>
> Так же будет отправленно электронное письмо с помощью **nodemailer** на аккаунт пользователя для его подтверждения.
>
> Данные пользователей и токенов ***хранятся в базе данные*** **MongoDB**.
>
> Пароли пользователей будут шифроваться с помощью **bcryptjs** и в базе данных они не будут находиться в явном виде.
>
> При аунтификации/логине токен будет автоматически помещен в cookie.
>
> При успешном логине будет произведен вход на страницу пользователя откуда можно - свое имя и электронную почту, подтвержден ли аккаунт, выйти из аккаунта и получить всех пользователей.
>
> Так как поддерживается возможность сессий, то даже при перезагрузке страницы Вы останетесь на аккаунте.

# Инструменты разработки
> ## Стек:
> ### Server:
> - [Node.js](https://nodejs.org/en/)
> - [Express](http://expressjs.com)
> ### Client
> - [ReactTS](https://reactjs.org)
> - [MobX](https://mobx.js.org/README.html)
> ### Database
> - [MongoDB](https://www.mongodb.com)
> ### Dev-Ops
> - [Docker](https://www.docker.com)
> ### Основные зависимости:
> - [mongoose](https://mongoosejs.com) - Для взаимодействия с БД.
> - [bcrypt](https://www.npmjs.com/package/bcrypt) - Для шифрования паролей.
> - [jwt](https://www.npmjs.com/package/jsonwebtoken) - Для формирования токенов и является основой аунтификации.
> - [winston](https://github.com/winstonjs/winston) - Для логгирования.
> - [nodemailer](https://nodemailer.com/about/) - Для отправки электронных сообщений.
> - ...
> - Более подробно Вы можете посмотреть в файлах - [package.json \ server](https://github.com/l1msn/auth-pro/blob/master/server/package.json) и [package.json \ client](https://github.com/l1msn/auth-pro/blob/master/client/package.json)

# Cтарт работы
> ## **C docker в контейнере**
>
> > 1. Клонируете репозитрий с помощью командной строки или же средствами IDE.
>```git
> git clone https://github.com/l1msn/auth-pro
>```
>
> > 2. Перейдите в файл [.env](https://github.com/l1msn/auth-pro/blob/master/server/.env) если Вам это необходимо.
> >
> > Вы также можете изменить в это конфигурационном файле все, что Вам нужно для Вашей спецификации.
>
> > 3. Создайте образ и запустите контейнер. Можете сделать через консоль, либо через DockerDesktop(Что я рекомендую).
> > 
> > Учтите, что у Вас должен быть запущен Docker и MongoDB.
> ```js
> docker-compose up --build
> ```
> 
> > 4. В логах\консоле появяться ссылки или можете вбить их вручную(но React должен и сам открыть ссылку).
>
> > 5. Для остановки нажмите Ctrl+C и подождите.

> ## **Без docker на локальной машине**
>
> Учтите, что у Вас на рабочей машине должны быть предустановлен весь необходимый стек:
> > 1. Клонируете репозитрий с помощью командной строки или же средствами IDE.
>```git
> git clone https://github.com/l1msn/auth-simple
>```
>
> > 2. Перейдите в директорию проекта и проинициализируйте все зависимости серверной части.
>```js
> npm install
>```
> > 3. Перейдите в файл [.env](https://github.com/l1msn/auth-pro/blob/master/server/.env) и измените значение MONGO_HOST на 127.0.0.1 или удобный Вам.
> >
> > Вы также можете изменить в это конфигурационном файле все, что Вам нужно для Вашей спецификации.
>
> > 4. Запустите проект.
> ```js
> npm run start
> ```
> > 5. В логах\консоле появяться ссылки или можете вбить их вручную.
>
> > 6. Для остановки нажмите Ctrl+C и подождите.
>
> > 7. Откройте новую консоль(с помощью IDE или CMD) и перейдите в директорию папки **client** (auth-pro/client).
>
> > 8. Проинициализируйте зависимости клиентской части.
>```js
> npm install
>```
> > 9. Запустите проект.
>```js
> npm run start
>```

## API Reference

#### Регистрация

```http
  POST /auth/registration
```

#### Логин

```http
  POST /auth/login
```

#### Выход с сессии

```http
  POST /auth/logout
```

#### Активация аккаунта по ссылке с электронного письма

```http
  GET /auth/activate/:link
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :-------------------------     |
| `link`    | `string` | **Required**. Ссылка активации |

#### Обновление refresh токена

```http
  GET /auth/refresh
```

#### Получение всех пользователей

```http
  GET /auth/users
```

# Пример работы 
> 0. Исходный URL: http://localhost:<Ваш порт>
 
> 1. Пользователь переходит по адресу по данному URL(React должен открыть в браузере ссылку сам) на страницу **React App**
>
> <img src="https://user-images.githubusercontent.com/64272568/186022888-a214342f-006f-4447-bbfe-4ac5e50b25f8.png" width="570" height="200">
 
> 2. Пользователь вводит свои данные и регистрируется
>
> <img src="https://user-images.githubusercontent.com/64272568/186023291-9e21daae-8cf3-431b-bf9e-6b1cc16e6bc1.png" width="570" height="200">
 
> 3. Переходим на страницу аккаунта
>
> <img src="https://user-images.githubusercontent.com/64272568/186023448-d5e45929-728d-4c28-9933-fe4f88275871.png" width="570" height="200">

> 4. Активируем аккаунт на почте
>
> <img src="https://user-images.githubusercontent.com/64272568/186023613-cc8bbf1e-24b6-408e-8db5-de04bc9fb038.png" width="570" height="200">
> <img src="https://user-images.githubusercontent.com/64272568/186023678-181af95b-3884-4c46-a0ca-4e2287529d44.png" width="570" height="200">

> 4. Получаем всех пользователей и выходим с аккаунта
>
> <img src="https://user-images.githubusercontent.com/64272568/186023731-6015aa85-5cb8-4410-8fec-c4872395236b.png" width="570" height="200">

# Работы той же серии
> 1. [auth-simple](https://github.com/l1msn/auth-simple) - Простой шаблон аутентификации/регистрации с помощью bcrypt/jwt на MongoDB/JS
 
> 2. [auth-pro](https://github.com/l1msn/auth-pro) - Продвинутый шаблон аутентификации/регистрации с помощью bcrypt/jwt/nodemailer на MongoDB/JS в связке с ReactTS/MobX

> 3. [auth-ts](https://github.com/l1msn/auth-ts) - Версия auth-pro перенесенная на TS + GraphQL/Swagger/Jest(UnitTests)/EsLint

### License

[BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)

Copyright (c) 2022 - present, l1msn - Sadykov Alexander
