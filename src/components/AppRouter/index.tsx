import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


function AppRouter () : JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" />
                <Route path="/" />
            </Routes>
        </Router>
    );
}


export default AppRouter;