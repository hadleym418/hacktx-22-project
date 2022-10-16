import React from "react";
import ReactDOM from "react-dom";
import {Container, Header, List} from "semantic-ui-react";

import pkg from "semantic-ui-react/package.json";
import Example from "./example";

const App = ({children}) => (
    <Container style={{margin: 20}}>{children}</Container>
);

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
    <App>
        <Example/>
    </App>,
    document.getElementById("root")
);
