import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import useActions from "../hooks/actions.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const { getCharacters, getPlanets, getSpecies } = useActions();
	const backendUrl = import.meta.env.VITE_BACKEND_URL

	const loadMessage = async () => {
		try {
			
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}


	

	useEffect(() => {

		if (store.characters.length === 0) {
			getCharacters()
		}
		if (store.planets.length === 0) {
			getPlanets()
		}
		if (store.species.length === 0) {
			getSpecies()
		}

		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>

			<div>
				{ store.characters.map((character) => (
					<h1>{ character.name }</h1>
				))}
			</div>

			<div>
				{ store.planets.map((planet) => (
					<>
						<h2>{ planet.name }</h2>
						<h3>Population: { planet.population }</h3>
					</>
				))}
			</div>

			<div>
				{ store.species.map((species_name) => (
					<>
						<h2>{ species_name.name}</h2>
						<h3>Language: { species_name.language }</h3>
					</>
				))}
			</div>

		</div>
	);
}; 