import {Route, Redirect} from "react-router-dom";
import * as React from "react";
import {AccessForbidden} from "../pages/AccessForbidden/AccessForbidden";

export function PrivateRoute({component: Component, user, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => user.role === 'admin'
                ? <Component {...props} />
                : <AccessForbidden/>
            }
        />
    )
}