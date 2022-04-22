import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Trending />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv-series" element={<TVSeries />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
