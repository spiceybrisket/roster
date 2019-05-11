import React, { useState } from "react";
import { navigate } from "hookrouter";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import gravatarURL from "gravatar-url";
import { useStore } from "../../store/useStore";

const TopNavigation = () => {
  const { state, dispatch } = useStore();

  const [active, setActive] = useState({ active: false });
  const handleClick = (e, { to }) => navigate(to);

  return (
    <Menu color="blue" inverted>
      <Menu.Item
        to="/authed/dashboard"
        name="Dashboard"
        color="black"
        onClick={handleClick}
      >
        Dashboard
      </Menu.Item>

      <Menu.Menu position="right">
        <Dropdown
          trigger={
            <Image
              avatar
              spaced
              verticalAlign="middle"
              src={gravatarURL(state.user.email)}
            />
          }
          icon={null}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => dispatch({ type: "logout", payload: {} })}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default TopNavigation;
