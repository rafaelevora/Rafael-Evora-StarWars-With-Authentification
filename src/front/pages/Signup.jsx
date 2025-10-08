import React from "react";
import { useState } from "react";



export const Signup = () => {

    const [signinInfo, setSigninInfo] = useState(
        {
            email: "",
            password: "",
        }
    )

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const addUserFetch = async () => {
        const response = await fetch(backendUrl + "api/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signinInfo)
            }
        )
        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Response text:", text);
        const data = await response.json()

        console.log("Sing up: ", data)
    }

    return (
        <>
            <div className="text-center mt-5">
                <h1>Sign up for FREE</h1>
                <input
                    type="text"
                    value={signinInfo.email}
                    onChange={(event) => setSigninInfo({ ...signinInfo, email: event.target.value })}
                    className="form-control" placeholder="Your Email" aria-label="Example text with button addon" aria-describedby="button-addon1"
                />
                <input
                    type="password"
                    value={signinInfo.password}
                    onChange={(event) => setSigninInfo({ ...signinInfo, password: event.target.value })}
                    className="form-control" placeholder="Your Password" aria-label="Example text with button addon" aria-describedby="button-addon1"
                />
                <button className="btn btn-primary" onClick={addUserFetch}>Sign up</button>
            </div>
        </>
    )
}