import React from "react";
import NavBar from "../shared/NavBar";
import Meta from "../shared/Meta";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Meta />
      <NavBar />
      {children}
    </>
  );
};

export default BaseLayout;
