import React from "react";
import OutletLayout from "../../components/Layout/OutletLayout";
import { useTitle } from "../../hooks/useTitle";

const ReviewPage = () => {
  useTitle("Review");

  return (
    <OutletLayout>
      <article>
        <ul>Hello</ul>
      </article>
    </OutletLayout>
  );
};

export default ReviewPage;
