import * as React from "react";

export const MiniErrorHandler = ({errorText}: { errorText: string }) => (
    <div className="alert alert-danger" role="alert">
        {errorText}
    </div>
);