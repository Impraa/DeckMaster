import React from "react"

export const DisplayErrorMessage: React.FC<{error:string | null}> = ({ error }) => {
    if (error)
    {
        return <p>{error}</p>
    }
    else
    {
        return <></>;
    }
}