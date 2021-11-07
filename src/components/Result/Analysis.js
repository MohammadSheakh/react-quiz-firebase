// import  from "./";
import styles from "./Analysis.module.css";
import Question from "./Question";
// import image1 from "";

export default function Analysis() {
    return (
        <>
            {/* className={ `${styles. } ${styles. }`} 
            className={styles.} */}
            <div className={styles.analysis}>
                <h1>Question Analysis</h1>
                <h4>You answerd 5 out of 10 questions correctly</h4>
                <Question></Question>
            </div>
        </>
    );
}
