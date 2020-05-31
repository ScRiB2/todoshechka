import * as React from "react";
import {UserData} from "../../store/auth/types";
import * as css from './Main.css'
import i18next from "i18next";
import {i18Keys} from "../../i18n";

interface IProps {
    user: UserData
}

const Main = (props: IProps) => (
    <h1 className={css.h1}>{i18next.t(i18Keys.welcome)}, {props.user.name}</h1>
);

export default Main;