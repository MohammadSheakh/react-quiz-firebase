import "./App";
import Home from "../pages/Home";
import Layout from "./Layout/Layout";
import "../styles/App.css";
import Signup from "../pages/Signup";
import LoginForm from "../pages/LoginForm";

import Quiz from "./Quiz/Quiz";
import Result from "../pages/Result";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Context Provider ta AuthContext theke niye ashte hobe ..
import { AuthProvider } from "../contexts/AuthContext";
function App() {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route exact="true" path="/" element={<Home />} />
                            <Route
                                exact="true"
                                path="/signup"
                                element={<Signup />}
                            />
                            <Route
                                exact="true"
                                path="/login"
                                element={<LoginForm />}
                            />
                            <Route
                                exact="true"
                                path="/quiz"
                                element={<Quiz />}
                            />
                            <Route
                                exact="true"
                                path="/result"
                                element={<Result />}
                            />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
