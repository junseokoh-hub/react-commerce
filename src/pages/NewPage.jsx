import React from "react";
import { useTitle } from "../hooks/useTitle";

const NewPage = () => {
  useTitle("New");
  return <div>New</div>;
};

export default NewPage;
