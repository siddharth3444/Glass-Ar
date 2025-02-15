import React from "react";
import { useEffect, useState } from "react";
import "../style/TryOn.style.css";

import { IntializeEngine, IntializeThreejs } from "./render.js";

export const TryOn = () => {
  useEffect(() => {
    async function init() {
      var video = document.getElementById("tryon-video");

      await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          video.srcObject = stream;
        });

      video.oncanplay = (e) => {
        video.play();
        IntializeThreejs("purple1");
        IntializeEngine();
      };
    }

    init();

    return () => {};
  }, []);
  const products = [
    { name: "Glasses Try-ON", status: "active" },
    { name: "Watch Try-ON", status: "under-development" },
    { name: "Bag Try-ON", status: "under-development" },
    { name: "Jewelry Try-ON", status: "under-development" },
    { name: "Apparel Try-ON", status: "under-development" },
  ];

  const [selected, setSelected] = useState("Glasses Try-ON");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4A90E2, #8B5CF6)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          fontWeight: "800",
          color: "#fff",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
          letterSpacing: "2px",
          marginBottom: "20px",
        }}
      >
        🕶 TouchTry
      </h1>

      <div
        id="threejsContainer"
        style={{
          width: "80%",
          maxWidth: "750px",
          height: "450px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "3px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.2)",
          overflow: "hidden",
          position: "relative",
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          id="tryon-video"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
          autoPlay
          loop
          muted
        ></video>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "15px",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          overflowX: "auto",
          whiteSpace: "nowrap",
          maxWidth: "90%",
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => setSelected(product.name)}
            style={{
              padding: "12px 20px",
              fontSize: "18px",
              fontWeight: "bold",
              color:
                product.status === "active" ? "rgba(12, 67, 131, 0.8)" : "#fff",
              background:
                product.status === "active"
                  ? "rgba(74, 144, 226, 0.3)"
                  : "transparent",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s ease-in-out",
              position: "relative",
              border: selected === product.name ? "2px solid #4A90E2" : "none",
              boxShadow:
                selected === product.name
                  ? "0px 0px 15px rgba(12, 67, 131, 0.8)"
                  : "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}

            {product.status === "under-development" && (
              <span
                style={{
                  fontSize: "12px",
                  background: "linear-gradient(90deg, #ff4d4d, #ff6a00)",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  boxShadow: "0px 0px 10px rgba(255, 77, 77, 0.8)",
                }}
              >
                Coming Soon 🚀
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};