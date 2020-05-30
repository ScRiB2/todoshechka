import * as React from "react";

export const ErrorHandler = ({errorText}: {errorText: string}) => (
    <div className="alert alert-danger" role="alert">
        {errorText}
    </div>
);