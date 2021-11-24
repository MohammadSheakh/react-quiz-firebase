// import  from "./";
import Button from "../Form/Button";
import styles from "./ProgressBar.module.css";
// import logo from "";
import { Link } from "react-router-dom";

export default function ProgressBar({ next, prev, progress, submit }) {
    return (
        <>
            {/* jokhon e ami next question e click korbo .. tokhon jeno current question 0 theke 1 hoy  /}
            {/ tar mane porer question e chole jay ..  taile amake ekta quiz.js er moddhe next function
                likhte hobe .. and sheta call kore dite hobe .. 
            */}
            <div className={styles.progressBar}>
                <div className={styles.backButton} onClick={prev}>
                    <span className="material-icons-outlined">
                        {" "}
                        arrow_back{" "}
                    </span>
                </div>
                <div className={styles.rangeArea}>
                    <div className={styles.tooltip}>{progress}% Cimplete!</div>
                    <div className={styles.rangeBody}>
                        <div
                            className={styles.progress}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <Button
                    className={styles.next}
                    onClick={progress === 100 ? submit : next}
                >
                    {progress === 100 ? (
                        <span>Submit</span>
                    ) : (
                        <span>Next Question</span>
                    )}

                    <span class="material-icons-outlined"> arrow_forward </span>
                </Button>
            </div>
        </>
    );
}
