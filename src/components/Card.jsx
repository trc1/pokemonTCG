import React, { useRef, useState } from "react";
import "./Card.css";
import store from "../store/store";
import { Navigate } from "react-router-dom";

export const Card = ({ pkmn, pok }) => {
  const [cardRotate, setCardRotate] = useState([]);
  const [blob, setBlob] = useState([-200, -200]);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const cardRect = containerRef.current.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    let XAxis = (x - cardCenterX) / 15;
    let YAxis = (y - cardCenterY) / 15;

    setCardRotate([XAxis, YAxis]);
    setBlob([XAxis, YAxis]);
  };

  const handleMouseLeave = () => {
    setBlob([-200, -200]);
    setCardRotate([0, 0]);
  };

  const handleClick = () => {
    store.setSelectedPokemon(pok.id);
  };
  if (store.selectedPokemon) {
    return <Navigate to={`/pokemon/${pok.id}`} replace />;
  }
  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${Math.ceil(
          cardRotate[0]
        )}deg) rotateX(${Math.ceil(cardRotate[1])}deg)`,
      }}
    >
      <div className="card">
        <img src={pkmn} />
      </div>
      <div
        className="blob"
        style={{
          top: `${blob[1] * 10}px`,
          left: `${blob[0] * 10}px`,
        }}
      ></div>
      <div
        className="fakeblob"
        style={{
          top: `${blob[0] * 10}px`,
          left: `${blob[1] * 10}px`,
        }}
      ></div>
    </div>
  );
};
