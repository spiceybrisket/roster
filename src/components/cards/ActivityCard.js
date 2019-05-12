import React from "react";
import { Card } from "semantic-ui-react";

const ActivityCard = ({ name, background }) => {
  const determineActivityTextColour = bgColour => {
    const r = parseInt(bgColour.substr(0, 2), 16);
    const g = parseInt(bgColour.substr(2, 2), 16);
    const b = parseInt(bgColour.substr(4, 2), 16);
    const textColour = (r * 299 + g * 587 + b * 114) / 1000;
    return textColour >= 128 ? "#000000" : "#FFFFFF";
  };

  const cardStyle = {
    backgroundColor: `#${background}`,
    color: determineActivityTextColour(background),
    fontSize: "10px",

    textAlign: "center"
  };

  const cardTextStyle = {
    color: determineActivityTextColour(background)
  };

  return (
    <Card fluid style={cardStyle}>
      <Card.Content>
        <Card.Description style={cardTextStyle}>{name}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ActivityCard;
