import React from "react";
import { Grid, GridItem, Show } from "@chakra-ui/react";

const Homepage = () => {
  return (
    <div>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav"></GridItem>
        <Show above="lg">
          <GridItem area="aside">aside</GridItem>
        </Show>
        <GridItem area="main"></GridItem>
      </Grid>
    </div>
  );
};

export default Homepage;
