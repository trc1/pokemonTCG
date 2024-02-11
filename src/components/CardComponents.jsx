import React, { useRef, useState } from "react";
import "./Card.css";

export const CardComponent = (props) => {
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

  return (
    <div
      ref={containerRef}
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
        <img src={props.pkmn} />
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
