import React from "react";
import { useState } from "react";


export const AddSpecies = () => {

    const [speciesInformation, setSpeciesInformation] = useState(
        {
            name: "",
            average_height: null,
            average_lifespan: null,
            language: ""
        }
    )

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const addSpeciesFetch = async () => {
        const response = await fetch(backendUrl + "/api/species",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(speciesInformation)
            }
        )
        const data = await response.json()

        console.log("New Species ", data)
    }




    return (

        <>
            <input
                type="text"
                value={speciesInformation.name}
                onChange={(event) => setSpeciesInformation({ ...speciesInformation, name: event.target.value })}
                className="form-control" placeholder="Species Name" aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
            <input
                type="number"
                value={speciesInformation.average_height}
                onChange={(event) => setSpeciesInformation({ ...speciesInformation, average_height: event.target.value })}
                className="form-control" placeholder="Average Height" aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
            <input
                type="number"
                value={speciesInformation.average_lifespan}
                onChange={(event) => setSpeciesInformation({ ...speciesInformation, average_lifespan: event.target.value })}
                className="form-control" placeholder="Average Lifespan" aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
            <input
                type="text"
                value={speciesInformation.language}
                onChange={(event) => setSpeciesInformation({ ...speciesInformation, language: event.target.value })}
                className="form-control" placeholder="Language" aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
            <button
                onClick={addSpeciesFetch}>Add Species</button>
        </>
    )
}