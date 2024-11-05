import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Landing from "../../pages/Landing";
import Movie from "../../pages/Movie";


function AppRouter () : JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/movie/:movieId" element={<Movie />} />
            </Routes>
        </Router>
    );
}


export default AppRouter;