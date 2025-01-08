import React from "react"

export const DisplayErrorMessage: React.FC<{error:string | null}> = ({ error }) => {
    if (error)
    {
        return (
            <div className="bg-danger p-5 my-2 rounded-lg text-white animate-appear">
                <h2 className="text-lg font-bold">Error</h2>
                <p>{error}</p>
            </div>
        )
    }
    else
    {
        return <></>;
    }
}