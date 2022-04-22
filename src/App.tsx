import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Trending from "./pages/Trending";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Trending />} />
                <Route path="/movies" element={<Trending />} />
                <Route path="/series" element={<Trending />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
