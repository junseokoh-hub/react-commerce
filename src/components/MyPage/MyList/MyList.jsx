import React from "react";
import { useRecoilValue } from "recoil";
import { useCollection } from "../../../hooks/useCollection";
import { authUserAtom } from "../../../store/authAtom";
import MyReviewList from "./MyReviewList";

const MyList = () => {
  const authUser = useRecoilValue(authUserAtom);
  const { documents: reviews, error } = useCollection("reviews");

  const myReviews =
    !error &&
    reviews &&
    reviews.filter((review) => review.uid === authUser.user.uid);

  console.log(myReviews);

  return (
    <section>
      <article style={{ marginBottom: "30px" }}>
        <h3>나의 리뷰</h3>
        <hr />
        <ul>
          {myReviews?.length > 0 &&
            myReviews.map((myReview) => (
              <MyReviewList key={myReview.createdTime} data={myReview} />
            ))}
        </ul>
      </article>
      <article>
        <h3>나의 신청</h3>
        <hr />
      </article>
    </section>
  );
};

export default MyList;
