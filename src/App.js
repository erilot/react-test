import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ProductFinderLayout from "./pages/ProductFinder/ProductFinderLayout";

const styles = theme => ({});

function App(props) {
  const [loadingState, setLoadingState] = useState({ main: 0, background: 0 });

  const loaderManager = {
    loadingState: loadingState,
    incrementMain: () => {
      // console.log("incrementing main loader to:", loadingState.main + 1);
      loadingState.main++;
      setLoadingState({ ...loadingState, main: (loadingState.main) });
    },
    decrementMain: () => {
      // console.log("decrementing main loader to:", loadingState.main - 1);
      loadingState.main--;
      setLoadingState({ ...loadingState, main: loadingState.main});
    },
    incrementBackground: () => {
      console.log(
        "incrementing background loader to:",
        loadingState.background + 1
      );
      loadingState.background++;
      setLoadingState({
        ...loadingState,
        background: loadingState.background
      });
    },
    decrementBackground: () => {
      console.log(
        "decrementing background loader to:",
        loadingState.background - 1
      );
      loadingState.background--
      setLoadingState({
        ...loadingState,
        background: loadingState.background
      });
    }
  };

  return <ProductFinderLayout loaderManager={loaderManager} />;
}

export default withStyles(styles)(App);
