import React from "react";
import { ReactComponent as Image } from "../../logo_red.svg";

const HeaderAuthed = props => {
  const headerStyle = {
    height: "5vh",
    display: "flex",
    flexDirection: "column"
  };
  return (
    <div style={headerStyle}>
      <Image />
    </div>
  );
};

export default HeaderAuthed;
