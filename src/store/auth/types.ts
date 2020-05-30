export interface UserAuthData {
    login: string
    password: string
}

export interface UserData {
    name: string
    role: 'admin' | 'user'
}

export interface UserState {
    user: UserData
    error: string
}

export interface TodoReqData {
    title: string
    description: string
}

export interface TodoData extends TodoReqData{
    id: number
    createdBy: string
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS,
    payload: UserData
}

interface LogoutAction {
    type: typeof LOGOUT
}

interface LoginErrorAction {
    type: typeof LOGIN_ERROR,
    error: string
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction | LoginErrorAction