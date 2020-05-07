import {postLogin} from "./methods/postLogin";
import {UserAuthData} from "../store/auth/types";

export class  API {
    public static postLogin = (data: UserAuthData) => postLogin(data);
}