import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Landing from "../../pages/Landing";
import Movie from "../../pages/Movie";
import Header from "../Header";
import Footer from "../Footer";
import Login from "../../pages/Login";


function AppRouter () : JSX.Element {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/movie/:movieId" element={<Movie />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </Router>
    );
}


export default AppRouter;