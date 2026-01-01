import React from "react";
import "./Map.css";

const levels = [
  { name: "Level 1: Red Signal / Dead Signal", description: "Drag puzzle pieces ONLY when allowed." },
  { name: "Level 2: Time Glitch Corridor", description: "Find the single real clock among glitching ones." },
  { name: "Level 3: Christmas Light Paradox", description: "Decode hidden message using correct blinking pattern." },
  { name: "FINAL LEVEL: System Paradox", description: "Escape by understanding paradox logic — no instructions shown." },
];

export default function Map() {
  return (
    <div className="map-page">
      <h2 className="map-title">Upside Down Level Map</h2>
      <div className="level-list">
        {levels.map((level, idx) => (
          <div className="level-card" key={level.name}>
            <div className="level-number">{idx + 1}</div>
            <div className="level-info">
              <div className="level-name">{level.name}</div>
              <div className="level-desc">{level.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
