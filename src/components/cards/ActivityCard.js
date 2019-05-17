import React from "react";
import { Card } from "semantic-ui-react";
import { setLinkProps } from "hookrouter";

const ActivityCard = ({ name, background, activityId, cardClick }) => {
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

  const idText = `${activityId}`;

  return (
    <Card
      fluid
      style={cardStyle}
      {...setLinkProps({
        href: `/authed/activities/edit/${activityId}`,
        onClick: cardClick
      })}
      id={idText}
    >
      <Card.Content id={idText}>
        <Card.Description id={idText} style={cardTextStyle}>
          {name}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ActivityCard;
