import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
  const { store, dispatch } = useGlobalReducer();

  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loginUserFetch = async () => {
    const response = await fetch(backendUrl + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.msg);
      throw new Error(data.msg);
    }

    console.log("Logged in: ", data);
    localStorage.setItem("authToken", data.token);
    dispatch({ type: "set_user", payload: data.user });
  };

  // Starfield animation
  useEffect(() => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    const stars = [];
    const numStars = 250;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        speed: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Styles
  const containerStyle = {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    color: "white",
  };

  const formStyle = {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 0 15px rgba(255,255,255,0.2)",
  };

  const canvasStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <div style={containerStyle}>
      <canvas id="starfield" style={canvasStyle}></canvas>

      <div style={formStyle}>
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <input
            type="text"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            className="form-control"
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            value={input.password}
            onChange={(e) =>
              setInput({ ...input, password: e.target.value })
            }
            className="form-control"
            placeholder="Password"
          />
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <button
          className="btn btn-dark btn-lg w-100"
          onClick={loginUserFetch}
        >
          Login
        </button>
      </div>
    </div>
  );
};
