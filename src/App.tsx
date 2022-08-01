import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, useState } from "react";

import Header from "./components/Header/Header";
import Model from "./UI/Model";
import AboutContent from "./components/AboutContent/AboutContent";
import { Spinner } from "@chakra-ui/react";

const Trending = React.lazy(() => import("./pages/Trending"));
const Movies = React.lazy(() => import("./pages/Movies"));
const TVSeries = React.lazy(() => import("./pages/TVSeries"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function App() {
  const [model, setModel] = useState<boolean>(false);
  const [detailModel, setDetailModel] = useState<{
    id: number;
    media_type: string;
  } | null>(null);

  const showModel = (id: number, media_type: string) => {
    setDetailModel({ id, media_type });
    setModel(true);
  };

  const hideModel = () => {
    setModel(false);
  };

  return (
    <BrowserRouter>
      <Header showModel={showModel} />
      {model && detailModel && (
        <Model hideModel={hideModel}>
          <AboutContent details={detailModel} />
        </Model>
      )}
      <Suspense fallback={<Spinner size="xl" color="primary.default" />}>
        <Routes>
          <Route path="/" element={<Trending showModel={showModel} />} />
          <Route path="/movies" element={<Movies showModel={showModel} />} />
          <Route
            path="/tv-series"
            element={<TVSeries showModel={showModel} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
