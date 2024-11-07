import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Landing from "../../pages/Landing";
import Movie from "../../pages/Movie";
import Login from "../../pages/Login";
import Header from "../Header";
import Footer from "../Footer";
import ProtectedRoute from "../ProtectedRoute";


function AppRouter(): JSX.Element {
    
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Landing />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/movie/:movieId" 
                    element={
                        <ProtectedRoute>
                            <Movie />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
            <Footer />
        </Router>
    );
}


export default AppRouter;