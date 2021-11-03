// import  from "./";
// import  from "./";
import Checkbox from "../Form/Checkbox";
import styles from "./Answers.module.css";
// import logo from "";

export default function Answers() {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <div className={styles.answers}>
                <Checkbox
                    className={styles.answer}
                    text="text answer from Component > Quiz >  Answer.js > Checkbox "
                ></Checkbox>
            </div>
        </>
    );
}
