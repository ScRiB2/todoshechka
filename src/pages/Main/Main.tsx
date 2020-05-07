import * as React from "react";
import {UserData} from "../../store/auth/types";
import * as css from './Main.css'

interface IProps {
    user: UserData
}

const Main = (props: IProps) => (
    <div className={css.main}>
        <h1>Welcome, {props.user.name}</h1>
    </div>
);

export default Main;