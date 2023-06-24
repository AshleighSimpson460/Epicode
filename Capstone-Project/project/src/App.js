// import Comments from "./Components/Fetch/comments.tsx";
// import Categories from "./ExpenseTracker/categories.tsx";
// import ColorModeSwitch from "./Components/ColorModeSwitch.tsx";
import Users from "./Components/Fetch/users.tsx";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./Components/NavBar.tsx";

function App() {
  return (
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
        <Users />
      </GridItem>
    </Grid>
  );
}

export default App;
