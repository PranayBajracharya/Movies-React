import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header/Header";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import ErrorPage from "./pages/ErrorPage";
import Model from "./UI/Model";

function App() {
    const [model, setModel] = useState<boolean>(false);

    const showModel = () => {
        setModel(true);
    };

    const hideModel = () => {
        setModel(false);
    };

    return (
        <BrowserRouter>
            <Header />
            {model && <Model hideModel={hideModel}>asdasdasd</Model>}
            <Routes>
                <Route path="/" element={<Trending showModel={showModel}/>} />
                <Route path="/movies" element={<Movies showModel={showModel}/>} />
                <Route path="/tv-series" element={<TVSeries showModel={showModel}/>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
