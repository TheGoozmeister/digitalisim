import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Landing from "../../pages/Landing";
import Movie from "../../pages/Movie";
import Header from "../../pages/Header";
import Footer from "../Footer";


function AppRouter () : JSX.Element {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/movie/:movieId" element={<Movie />} />
            </Routes>
            <Footer />
        </Router>
    );
}


export default AppRouter;