import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { StoreProvider } from "./store/useStore";

import App from "./App";

function Main() {
  return (
    <StoreProvider>
      <Container>
        <App />
      </Container>
    </StoreProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
