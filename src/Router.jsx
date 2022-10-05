import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import { useRecoilValue } from "recoil";
import { authUserAtom } from "./store/authAtom";
import LoadingSpinner from "./utils/LoadingSpinner";

const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ReviewPage = React.lazy(() => import("./pages/Community/ReviewPage"));
const CommunityPage = React.lazy(() =>
  import("./pages/Community/CommunityPage"),
);
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const MyCartPage = React.lazy(() => import("./pages/User/MyCartPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const LoginPage = React.lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/Auth/SignupPage"));
const NotificationPage = React.lazy(() =>
  import("./pages/Community/NotificationPage"),
);
const NoticePage = React.lazy(() => import("./pages/Community/NoticePage"));
const EventPage = React.lazy(() => import("./pages/Community/EventPage"));
const EventDetailPage = React.lazy(() =>
  import("./pages/Community/EventDetailPage"),
);
const Faq = React.lazy(() => import("./pages/Community/Faq"));
const ReviewNew = React.lazy(() => import("./components/Review/ReviewNew"));
const ReviewEditor = React.lazy(() =>
  import("./components/Review/ReviewEditor"),
);
const PartnershipInquiry = React.lazy(() =>
  import("./pages/PartnershipInquiry"),
);

const Router = () => {
  const authUser = useRecoilValue(authUserAtom);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {authUser.user && (
            <Route
              path="/partnership-inquiry"
              element={<PartnershipInquiry />}
            />
          )}
          {!authUser.user && (
            <Route
              path="/partnership-inquiry"
              element={<Navigate to="/login" />}
            />
          )}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/community/*" element={<CommunityPage />}>
            <Route path="review/*" element={<ReviewPage />}>
              <Route path="new" element={<ReviewNew />} />
              <Route path="edit/:id" element={<ReviewEditor />} />
            </Route>
            <Route path="notification/*" element={<NotificationPage />}>
              <Route path="notice" element={<NoticePage />} />
              <Route path="event" element={<EventPage />} />
              <Route path="event/:id" element={<EventDetailPage />} />
            </Route>
            <Route path="faq" element={<Faq />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          {authUser.user && <Route path="/myCart" element={<MyCartPage />} />}
          {!authUser.user && (
            <Route path="/myCart" element={<Navigate to="/login" />} />
          )}
          {!authUser.user && <Route path="/login" element={<LoginPage />} />}
          {authUser.user && (
            <Route path="/login" element={<Navigate to="/" replace={true} />} />
          )}
          {!authUser.user && <Route path="/signup" element={<SignupPage />} />}
          {authUser.user && (
            <Route
              path="/signup"
              element={<Navigate to="/" replace={true} />}
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default Router;
