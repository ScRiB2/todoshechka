import {postLogin} from "./methods/postLogin";
import {postLogout} from "./methods/postLogout";
import {getMe} from "./methods/getMe";
import {getUsers} from "./methods/getUsers";
import {getTodos} from "./methods/todos/getTodos";
import {postTodo} from "./methods/todos/postTodo";
import {deleteTodo} from "./methods/todos/deleteTodo";
import {putTodo} from "./methods/todos/putTodo";
import {getTodo} from "./methods/todos/getTodo";
import {TodoReqData, UserAuthData} from "../store/auth/types";

export class  API {
    public static postLogin = (data: UserAuthData) => postLogin(data);
    public static postLogout = () => postLogout();
    public static getMe = () => getMe();
    public static getUsers = () => getUsers();
    public static getTodos = () => getTodos();
    public static postTodo = (data: TodoReqData) => postTodo(data);
    public static deleteTodo = (id: number) => deleteTodo(id);
    public static putTodo = (id: number, data: TodoReqData) => putTodo(id, data);
    public static getTodo = (id: number) => getTodo(id);
}