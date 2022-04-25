import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header/Header";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import ErrorPage from "./pages/ErrorPage";
import Model from "./UI/Model";
import AboutContent from "./components/AboutContent/AboutContent";

function App() {
    const [model, setModel] = useState<boolean>(false);
    const [detailModel, setDetailModel] = useState<{id: number, media_type: string } | null>(null);

    const showModel = (id: number, media_type: string) => {
        setDetailModel({id, media_type});
        setModel(true);
    };

    const hideModel = () => {
        setModel(false);
    };

    return (
        <BrowserRouter>
            <Header showModel={showModel}/>
            {model && detailModel && <Model hideModel={hideModel}><AboutContent details={detailModel} /></Model>}
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
