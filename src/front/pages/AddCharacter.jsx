import React from "react";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import useActions from "../hooks/actions";




export const AddCharacter = () => {

    const { store, dispatch } = useGlobalReducer()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { getSpecies, getPlanets } = useActions()

    const [characterInformation, setCharacterInformation] = useState(
        {
            name: "",
            hair_color: "",
            eye_color: "",
            homeworld_id: null,
            species_id: null
        }
    ); /* this stores what the user types */



    const addCharacterFetch = async () => {

        const response = await fetch(backendUrl + "/api/character",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(characterInformation)
            }
        )
        const data = await response.json()
        console.log("Added Character: ", data)
    }

    useEffect(() => {
        if (store.planets.length === 0) {
            getPlanets()
        }
        if (store.species.length === 0) {
            getSpecies()
        }
    }, [])

    return (
        <>
           <div className="fluid-container mt-5">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                     <div className="card">
                <input
                    type="text"
                    value={characterInformation.name}
                    onChange={(event) => setCharacterInformation({ ...characterInformation, name: event.target.value })}
                    className="form-control" placeholder="Character Name" aria-label="Example text with button addon" aria-describedby="button-addon1"
                />
                <input
                    type="text"
                    value={characterInformation.hair_color}
                    onChange={(event) => setCharacterInformation({ ...characterInformation, hair_color: event.target.value })}
                    className="form-control" placeholder="Hair Color" aria-label="Example text with button addon" aria-describedby="button-addon1"
                />
                <input
                    type="text"
                    value={characterInformation.eye_color}
                    onChange={(event) => setCharacterInformation({ ...characterInformation, eye_color: event.target.value })}
                    className="form-control" placeholder="Eye Color" aria-label="Example text with button addon" aria-describedby="button-addon1"
                />
                <div className="mt-1 mb-1">
                    <label for="select-homeworld">Select Homeworld</label>
                    <select id="select-homeworld"
                        value={characterInformation.homeworld_id}
                        onChange={(event) => setCharacterInformation({ ...characterInformation, homeworld_id: event.target.value })}>
                        <option value="">Choose...</option>
                        <optgroup label="Select Planet">
                            {store.planets.map((planet) => (
                                <option value={planet.id}
                                    key={planet.id}
                                >{planet.name}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <div className="mt-1 mb-1">
                    <label for="select-species">Select Species</label>
                    <select id="select-species"
                        value={characterInformation.species_id}
                        onChange={(event) => setCharacterInformation({ ...characterInformation, species_id: event.target.value })}>
                        <option value="">Choose...</option>
                        <optgroup label="Select Species">
                            {store.species.map((element) => (
                                <option value={element.id}
                                    key={element.id}
                                >{element.name}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                <button className="btn btn-primary"onClick={addCharacterFetch}>Add Character</button>
            </div>
                </div>
                <div className="col-4"></div>
            </div>
           </div>
        </>
    )
}