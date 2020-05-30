import {RootState} from "./index";

export const getUser = (state: RootState) => state.auth.user;
export const getError = (state: RootState) => state.auth.error;