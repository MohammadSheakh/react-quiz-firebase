// import  from "./";
import styles from "./Analysis.module.css";
import Questions from "./Questions";
// import image1 from "";

export default function Analysis({ answers }) {
    return (
        <>
            {/* className={ `${styles. } ${styles. }`} 
            className={styles.} */}
            <div className={styles.analysis}>
                <h1>Question Analysis</h1>

                <Questions answers={answers}></Questions>
            </div>
        </>
    );
}
