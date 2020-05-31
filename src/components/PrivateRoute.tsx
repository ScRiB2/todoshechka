import {Route} from "react-router-dom";
import * as React from "react";
import {Whistle} from "./Whistle/Whistle";

export function PrivateRoute({component: Component, user, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => user.role === 'admin'
                ? <Component {...props} />
                : <Whistle errorNumber={403} errorText='Not this time, access forbidden!'/>
            }
        />
    )
}