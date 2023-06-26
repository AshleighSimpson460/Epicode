// import Comments from "./Components/Fetch/comments.tsx";
// import Categories from "./ExpenseTracker/categories.tsx";
// import ColorModeSwitch from "./Components/ColorModeSwitch.tsx";
import Users from "./Components/Fetch/users.tsx";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./Components/NavBar.tsx";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ColorModeSwitch from "./Components/ColorModeSwitch.jsx";
import LoginPage from "./Components/UserPage/LoginPage.js";
import RegisterPage from "./Components/UserPage/RegisterPage.js";

function App() {
  return (
    <BrowserRouter>
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
        <GridItem area="main">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </GridItem>
      </Grid>
      <ColorModeSwitch />
    </BrowserRouter>
  );
}

export default App;
