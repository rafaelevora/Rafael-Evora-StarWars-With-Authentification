import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store, dispatch } = useGlobalReducer();

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const userAuthentication = async() => {


        const response = await fetch(backendUrl + '/api/private', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            }
        })

        const data = await response.json()

        if (!response.ok) {
            console.log("Token did not work")

            return          /* return alone like this is only to stop the function */
        }

        dispatch({ type: "set_user", payload: data });
    }

    useEffect(() => {
        if (!store.user && localStorage.getItem("authToken")) {
           
            userAuthentication()    // if token exists in the local storage and user is not signed in, we run the function //

        }
    }, 
    [])
    
    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}