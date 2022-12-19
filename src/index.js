import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import ScrollToTop from "./lib/ScrollToTop";
import { theme } from "./lib/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, refetchOnWindowFocus: false },
  },
});

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <ScrollToTop />
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </RecoilRoot>,
);
