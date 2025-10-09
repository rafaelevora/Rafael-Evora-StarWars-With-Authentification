import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import useActions from "../hooks/actions.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { getCharacters, getPlanets, getSpecies } = useActions();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.characters.length === 0) getCharacters();
    if (store.planets.length === 0) getPlanets();
    if (store.species.length === 0) getSpecies();
  }, []);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => navigate("/HomeCards"), 1500); // wait for animation
  };

  return (
    <div className="text-center position-relative overflow-hidden py-5">
      {/* Inline CSS inside the component */}
      <style>{`
        .star-wars-logo {
          width: 400px;
          height: auto;
          cursor: pointer;
          transition: all 1.5s ease-in-out;
          filter: brightness(1);
        }
        .star-wars-logo:hover {
          transform: scale(1.15);
          filter: brightness(1.8);
          box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.7);
        }
        .star-wars-logo.zoom-out {
          transform: scale(15);
          opacity: 0;
          filter: brightness(2);
        }
      `}</style>

      <img
        src="https://images.seeklogo.com/logo-png/44/2/star-wars-millennium-falcon-logo-png_seeklogo-447501.png"
        alt="Star Wars Logo"
        className={`star-wars-logo ${animate ? "zoom-out" : ""}`}
        onClick={handleClick}
        title="Click to Start"
      />
    </div>
  );
};
