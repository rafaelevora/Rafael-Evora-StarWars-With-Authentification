import React from "react";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

export const AddPlanet = () => {

    const [planetInformation, setPlanetInformation] = useState(
        {
            name: "",
            population: null,
        }
    )

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const addPlanetFetch = async () => {
        const response = await fetch(backendUrl + "/api/planet",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(planetInformation)
            }
        )
        const data = await response.json()

        console.log("New planet ", data)
    }


    return (
        <>
            <input type="text"
                value={planetInformation.name}
                onChange={(event) => setPlanetInformation({ ...planetInformation, name: event.target.value })}
                className="form-control" placeholder="Planet Name" aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
            <input type="number"
                value={planetInformation.population}
                onChange={(event) => setPlanetInformation({ ...planetInformation, population: event.target.value })}
                className="form-control" placeholder="Planet Population" aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
            <button onClick={addPlanetFetch}>Add Planet</button>
        </>
    )
}

