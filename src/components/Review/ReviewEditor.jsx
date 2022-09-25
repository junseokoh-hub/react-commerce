import React from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import ReviewForm from "./ReviewForm";

const ReviewEditor = () => {
  const { id } = useParams();

  const { documents } = useCollection("reviews");

  const singleReview = documents && documents.filter((doc) => doc.id === id);

  console.log(singleReview);

  return (
    <div>
      <ReviewForm isEdit={true} singleReview={singleReview} id={id} />
    </div>
  );
};

export default ReviewEditor;
