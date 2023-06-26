import React from "react";
import Users from "./Components/Fetch/users.tsx";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./Components/NavBar.tsx";

import ColorModeSwitch from "./Components/ColorModeSwitch.jsx";
import LoginPage from "./Components/UserPage/LoginPage.tsx";
import RegisterPage from "./Components/UserPage/RegisterPage.tsx";

function App() {
  return (
    <div>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">aside</GridItem>
        </Show>
        <GridItem area="main"></GridItem>
      </Grid>
    </div>
  );
}

export default App;
