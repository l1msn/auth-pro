import IUser from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import AuthResponse from "../models/responses/AuthResponse";
import {API_URL} from "../http";


class Store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(email: string, password: string) {
        try {
            console.log("Login process...");

            const response = await AuthService.login(email, password);
            if(!response)
                throw new Error("No response");
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

            console.log("Login success");
        } catch (error: any) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on login in Store")
            console.log(error.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            console.log("Registration process...");

            const response = await AuthService.registration(email, password);
            if(!response)
                throw new Error("No response");
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

            console.log("Registration success");
        } catch (error: any) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on registration in Store")
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            console.log("Logout process...");

            await AuthService.logout();

            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);

            console.log("Logout success");
        } catch (error: any) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on logout in Store")
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            console.log("Checking auth...")
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`
            ,{ withCredentials: true });
            if(!response)
                throw new Error("No response");
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

            console.log("Auth success")

        } catch (error: any) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error on checkAuth in Store")
            console.log(error.response?.data?.message);
        }
    }
}

export default Store;