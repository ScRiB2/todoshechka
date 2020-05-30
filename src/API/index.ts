import {postLogin} from "./methods/postLogin";
import {postLogout} from "./methods/postLogout";
import {getMe} from "./methods/getMe";
import {getUsers} from "./methods/getUsers";
import {getTodos} from "./methods/todos/getTodos";
import {UserAuthData} from "../store/auth/types";

export class  API {
    public static postLogin = (data: UserAuthData) => postLogin(data);
    public static postLogout = () => postLogout();
    public static getMe = () => getMe();
    public static getUsers = () => getUsers();
    public static getTodos = () => getTodos();
}