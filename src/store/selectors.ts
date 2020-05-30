import {RootState} from "./index";
import {UserData} from "./auth/types";

export const getUser = (state: RootState): UserData => state.auth.user;
export const getError = (state: RootState) => state.auth.error;