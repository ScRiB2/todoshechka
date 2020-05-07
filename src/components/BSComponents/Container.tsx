import * as React from "react";
import * as css from './Container.css'
import {CSSProperties} from "react";

export const Container: React.FunctionComponent<{style?: CSSProperties}> = props => (
    <div className={['container', css["body-container"]].join(' ')} style={props.style}>
        {props.children}
    </div>
);