import React from "react";
import { ReactComponent as Image } from "../../logo_red.svg";

const Header = props => {
  const headerStyle = {
    height: "10vh",
    display: "flex",
    flexDirection: "column"
  };
  return (
    <div style={headerStyle}>
      <Image />
    </div>
  );
};

export default Header;
