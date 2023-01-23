import React from "react";
import CustomGlobe from "./CustomGlobe";
import CustomGlobeMobile from "./CustomGlobeMobile";
import { ErrorBoundary } from "./components/ErrorBoundary";
import MediaQuery from "react-responsive";

export default function App() {
  return (
    <ErrorBoundary>
      <MediaQuery maxWidth={600}>
        <CustomGlobeMobile />
      </MediaQuery>

      <MediaQuery minWidth={650}>
        <CustomGlobe />
      </MediaQuery>
    </ErrorBoundary>
  );
}
