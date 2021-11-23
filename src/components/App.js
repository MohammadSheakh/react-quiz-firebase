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
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

function App() {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route exact="true" path="/" element={<Home />} />
                            {/* <PublicRoute
                                exact="true"
                                path="/signup"
                                element={<Signup />}
                            /> */}
                            <Route
                                exact="true"
                                path="/signup"
                                element={
                                    <PublicRoute>
                                        <Signup />
                                    </PublicRoute>
                                }
                            >
                                {/* <Route element={<Result />}></Route> */}
                            </Route>

                            <Route
                                exact="true"
                                path="/login"
                                element={
                                    <PublicRoute>
                                        <LoginForm />
                                    </PublicRoute>
                                }
                            >
                                {/* <Route element={<Result />}></Route> */}
                            </Route>

                            {/*                             
                            Quiz route o Result Route .. egula kintu amader public route na 
                            jei jei route ke ami authentication dia ami protect korte chai .. shei route gula ke ami 
                            kivabe protect korbo ? 
                            ekhon amake route er moddhe check korte hobe somehow .. ami ashole authenticated asi kina .. 
                            jodi authenticated na thake .. tahole ami redirect kore login page e niye jabo ..  ar 
                            authenticate kora thakle .. corresponding page ei ta ke niye jabo . tahole amra jeta korbo 
                            ei jei route gula ase .. ei route gula amra ekta higher order component banabo .. jei 
                            component ta ashole .. oi checking kore .. ultimately proper route ta she ashole jeno return
                            kore .. jodi logged in thake .. tahole oi route tai return korbe .. 

                            tahole ekhon ar amra <Route> use korbo na ..  amra amader ekta component <PrivateRoute> 
                            erokom kichu ekta banabo .. sheita dia wrap kore dibo .. sheitar moddhe amra <Route> 
                            ta return korbo ..  
                            
                        */}

                            {/* <PrivateRoute
                                exact="true"
                                path="/quiz"
                                element={<Quiz />}
                            /> */}
                            {/* <PrivateRoute
                                exact="true"
                                path="/quiz"
                                element={<Quiz />}
                            />
                            <PrivateRoute
                                exact="true"
                                path="/result"
                                element={<Result />}
                            /> */}

                            <Route
                                exact="true"
                                path="/quiz/:id"
                                element={
                                    // to={`/quiz/${video.youtubeID}`} videos.js theke evabe pathano hobe
                                    <PrivateRoute>
                                        <Quiz></Quiz>
                                    </PrivateRoute>
                                }
                            >
                                {/* <Route element={<Quiz />}></Route> */}
                            </Route>
                            <Route
                                exact="true"
                                path="/result"
                                element={
                                    <PrivateRoute>
                                        <Result></Result>
                                    </PrivateRoute>
                                }
                            >
                                {/* <Route element={<Result />}></Route> */}
                            </Route>
                        </Routes>
                    </Layout>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
