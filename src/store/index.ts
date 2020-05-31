import {Action, combineReducers} from "redux";
import authReducer from "./auth/reducers";
import {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>

export default rootReducer;