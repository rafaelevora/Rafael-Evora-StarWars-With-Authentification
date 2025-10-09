import React, { useState, useEffect } from "react";

export const Signup = () => {
  const [signinInfo, setSigninInfo] = useState({ email: "", password: "" });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const addUserFetch = async () => {
    const response = await fetch(backendUrl + "/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signinInfo),
    });

    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response text:", text);

    try {
      const data = JSON.parse(text);
      console.log("Sign up: ", data);
    } catch (err) {
      console.log("Error parsing JSON:", err);
    }
  };

  // Starfield animation
  useEffect(() => {
    const canvas = document.getElementById("starfield-signup");
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
    textAlign: "center",
  };

  const canvasStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <div style={containerStyle}>
      <canvas id="starfield-signup" style={canvasStyle}></canvas>

      <div style={formStyle}>
        <h3 className="mb-4">Sign up for FREE</h3>

        <div className="mb-3">
          <input
            type="text"
            value={signinInfo.email}
            onChange={(e) =>
              setSigninInfo({ ...signinInfo, email: e.target.value })
            }
            className="form-control mb-2"
            placeholder="Your Email"
          />
          <input
            type="password"
            value={signinInfo.password}
            onChange={(e) =>
              setSigninInfo({ ...signinInfo, password: e.target.value })
            }
            className="form-control mb-3"
            placeholder="Your Password"
          />
        </div>

        <button className="btn btn-dark btn-lg w-100" onClick={addUserFetch}>
          Sign up
        </button>
      </div>
    </div>
  );
};
