// import  from "./";
// import  from "./";
import Answers from "./Answers";
import MiniPlayer from "./MiniPlayer";
import ProgressBar from "./ProgressBar";
import styles from "./Quiz.module.css";
// import logo from "";

export default function Quiz() {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}

            <h1>Pick three of your favorite Star Wars Flims</h1>
            <h4>Question can have multiple answers</h4>
            <Answers></Answers>
            <ProgressBar></ProgressBar>
            <MiniPlayer></MiniPlayer>
        </>
    );
}
