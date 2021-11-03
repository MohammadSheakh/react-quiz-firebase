// import  from "./";
import Button from "../Form/Button";
import styles from "./ProgressBar.module.css";
// import logo from "";

export default function ProgressBar() {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <div className={styles.progressBar}>
                <div className={styles.backButton}>
                    <span className="material-icons-outlined">
                        {" "}
                        arrow_back{" "}
                    </span>
                </div>
                <div className={styles.rangeArea}>
                    <div className={styles.tooltip}>24% Cimplete!</div>
                    <div className={styles.rangeBody}>
                        <div
                            className={styles.progress}
                            style={{ width: "20%" }}
                        ></div>
                    </div>
                </div>
                <a href="result.html">
                    <Button className={styles.next}>
                        <span>Next Question</span>
                        <span class="material-icons-outlined">
                            {" "}
                            arrow_forward{" "}
                        </span>
                    </Button>
                </a>
            </div>
        </>
    );
}
