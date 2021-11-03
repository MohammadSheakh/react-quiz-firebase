import "./App";
import Home from "../pages/Home";
import Layout from "./Layout/Layout";
import "../styles/App.css";
import Signup from "../pages/Signup";
import LoginForm from "../pages/LoginForm";
import MiniPlayer from "./Quiz/MiniPlayer";
import Quiz from "./Quiz/Quiz";
function App() {
    return (
        <div>
            <Layout>
                {/* <Home></Home> */}
                {/* <Signup></Signup> */}
                {/* <LoginForm></LoginForm> */}
                <Quiz></Quiz>
                <MiniPlayer></MiniPlayer>
            </Layout>
        </div>
    );
}

export default App;
