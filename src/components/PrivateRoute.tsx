import {Route} from "react-router-dom";
import * as React from "react";
import {Whistle} from "./Whistle/Whistle";
import i18next from "i18next";
import {i18Keys} from "../i18n";

export function PrivateRoute({component: Component, user, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => user.role === 'admin'
                ? <Component {...props} />
                : <Whistle errorNumber={403} errorText={i18next.t(i18Keys.accessForbidden)}/>
            }
        />
    )
}