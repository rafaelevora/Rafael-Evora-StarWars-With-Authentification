import useGlobalReducer from "./useGlobalReducer";

const useActions = () => {
  const { store, dispatch } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getCharacters = async () => {
    const response = await fetch(backendUrl + "/api/characters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("characters", data);

    if (response.ok) {
      dispatch({ type: "set_characters", payload: data });
    }
  };

  const getPlanets = async () => {
    const response = await fetch(backendUrl + "/api/planets");
    const data = await response.json();
    console.log("planets", data);

    if (response.ok) {
      dispatch({ type: "set_planets", payload: data });
    }
  };

  const getSpecies = async () => {
    const response = await fetch(backendUrl + "/api/species");
    const data = await response.json();
    console.log("species", data);

    if (response.ok) {
      dispatch({ type: "set_species", payload: data });
    }
  };

  return {
    getCharacters,
    getPlanets,
    getSpecies,
  };
};

export default useActions;
