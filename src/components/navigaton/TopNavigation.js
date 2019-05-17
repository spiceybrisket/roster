import React, { useState } from "react";
import { navigate } from "hookrouter";
import { Menu, Dropdown, Image, Message } from "semantic-ui-react";
import gravatarURL from "gravatar-url";
import { useStore } from "../../store/useStore";
import api from "../../store/api";

const TopNavigation = () => {
  const { state, dispatch } = useStore();
  const [message, setMessage] = useState();

  const asyncFetch = email => {
    return new Promise((resolve, reject) => {
      api.user
        .resetPasswordRequest(email)
        .then(resposneData => {
          resolve(resposneData);
        })
        .catch(response => {
          reject("Api call failed!");
        });
    });
  };

  const [activeItem, setActiveItem] = useState("dashboard");
  const handleClick = (e, { to, name }) => {
    setActiveItem(name);
    navigate(to);
  };

  const resetPassword = () => {
    asyncFetch(state.user.email)
      .then(response => {
        dispatch({ type: "forgotPasswordRequest", payload: response });
      })
      .then(setMessage("Password change email sent"));
  };

  return (
    <React.Fragment>
      <Menu>
        <Menu.Item
          to="/authed/dashboard"
          name="dashboard"
          color="black"
          active={activeItem === "dashboard"}
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
              <Dropdown.Item onClick={resetPassword}>
                Reset Password
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      {message && (
        <Message info>
          <Message.Header>Success</Message.Header>
          <p>{message}</p>
        </Message>
      )}
    </React.Fragment>
  );
};

export default TopNavigation;
