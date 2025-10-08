import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";



export const ProfilePage = () => {

    const { store, dispatch } = useGlobalReducer()



    return (
        <>
            { store.user? <h1>Welcome { store.user.email } </h1> : <h1>Log-in to see this content</h1> }
        </>
    )
}