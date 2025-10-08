import React from "react";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";



export const Login = () => {

    const { store, dispatch } = useGlobalReducer();

    const [ input, setInput ] = useState(
        {
            email: "",
            password: "",
        }
    );

    const [ error, setError ] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loginUserFetch = async () => {
        const response = await fetch(backendUrl + "/api/login", 
            { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }
        )

        const data = await response.json()

        if (!response.ok) {
            setError(data.msg)
            throw new Error(data.msg)
        }

        console.log("Logged in: ", data)

        localStorage.setItem("authToken", data.token)

        dispatch({ type: "set_user", payload: data.user })
    }

    return (
        <>
            <div>
                <input
                type="text"
                value={ input.email }
                onChange={(event) => setInput({...input, email: event.target.value})}
                className="form-control" placeholder="Email" aria-label="Example text with button addon" aria-describedby="button-addon1"
                />
            </div>
            <div>
                <input
                type="password"
                value={ input.password }
                onChange={(event) => setInput({...input, password: event.target.value})}
                className="form-control" placeholder="Password" aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
            { error ? <p className="text-danger">{ error }</p>: null}
            <button className="btn btn-primary" onClick={loginUserFetch}>Login</button>
            </div>
        </>
    )
}