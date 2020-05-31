import {Loader} from "../Loader/Loader";
import BigErrorHandler from "../BigErrorHandler/BigErrorHandler";
import * as React from "react";

interface IProps {
    showLoader: boolean
    error: string
}

const LoaderWithError: React.FC<IProps> = props => (
    <>
        {
            props.showLoader
                ? <Loader/>
                : props.error
                    ? <BigErrorHandler errorText={this.state.error}/>
                    : props.children
        }
    </>
);

export default LoaderWithError