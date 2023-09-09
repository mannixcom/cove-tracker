import React from "react";

const TileBox = () => {
  const style = {
    background: "#0074B7",
    height: "75px",
    width: "10px",
    borderRadius: "20px",
    marginRight: "10px",
    // border: "2px solid black"
  };

  return (
    <div
      style={{
        display: "flex",
        // border: "2px solid black"
      }}
    >
      <div style={style}></div>
        <div style={{
          justifyItems: 'flex-end'
        }}>
          <div>Portally Cove</div>
          <div>{"Today's Tide Tracking"}</div>
        </div>
    </div>
  );
};

export default TileBox;
