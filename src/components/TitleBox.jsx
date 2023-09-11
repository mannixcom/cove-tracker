import React from "react";

const TileBox = () => {
  const style = {
    background: "#0074B7",
    height: "75px",
    width: "10px",
    borderRadius: "20px",
    marginRight: "10px",
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={style}></div>
        <div style={{
          justifyItems: 'flex-end'
        }}>
          <h1>Portally Cove</h1>
          <h4 style={{
            color: '#0074b7'
          }}>{"Today's Tide Tracking"}</h4>
        </div>
    </div>
  );
};

export default TileBox;
