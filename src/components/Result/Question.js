// import  from "./";
// import  from "./";
import Answers from "../Quiz/Answers";
import styles from "./Question.module.css";
// import image1 from "";

export default function Question() {
    return (
        <>
            {/* className={ ${styles. } ${styles. }} 
            className={styles.} */}
            <div className={styles.question}>
                <div className={styles.qtitle}>
                    <span className="material-icons-outlined">
                        {" "}
                        help_outline{" "}
                    </span>
                    Here goes the question from Learn with Sumit?
                </div>
                <Answers></Answers>
            </div>
        </>
    );
}
