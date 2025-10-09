import React, { useState } from "react";

export const HomeCards = () => {
  const [hovered, setHovered] = useState(null); // track which image is hovered

  const fadeBottom = {
    width: "100%",
    borderRadius: "15px",
    WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
    transition: "transform 0.4s ease",
  };

  const imageContainer = {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  };

  const titleStyle = (index) => ({
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "1.3rem",
    fontWeight: "bold",
    opacity: hovered === index ? 1 : 0,
    transition: "opacity 0.5s ease",
    textShadow: "0px 2px 5px rgba(0,0,0,0.6)",
  });

  const images = [
    {
      src: "https://www.xtrafondos.com/thumbs/vertical/webp/1_2307.webp",
      title: "CHARACTERS",
    },
    {
      src: "https://www.xtrafondos.com/thumbs/vertical/webp/1_11470.webp",
      title: "PLANETS",
    },
    {
      src: "https://www.xtrafondos.com/thumbs/vertical/webp/1_10369.webp",
      title: "SPECIES",
    },
  ];

  return (
    <div className="container my-5 mt-5">
      <div className="row justify-content-center text-center">
        {images.map((img, index) => (
          <div
            key={index}
            className="col-3 py-5"
            style={imageContainer}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={img.src}
              alt={img.title}
              style={{
                ...fadeBottom,
                transform: hovered === index ? "scale(1.08)" : "scale(1)",
              }}
            />
            <h4 style={titleStyle(index)}>{img.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
