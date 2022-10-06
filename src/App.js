import React from "react";
import CustomGlobe from "./CustomGlobe";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <CustomGlobe />
    </ErrorBoundary>
  );
}
