// import  from "./";
// import  from "./";
import Answers from "../Quiz/Answers";
import styles from "./Question.module.css";
// import image1 from "";

export default function Questions({ answers = [] }) {
    // jehetu array expected .. tai ekta default value diye dilam .. []
    return answers.map((answer, index) => (
        <>
            {/* className={ ${styles. } ${styles. }} 
            className={styles.} */}
            <div className={styles.question} key={index}>
                <div className={styles.qtitle}>
                    <span className="material-icons-outlined">
                        {" "}
                        help_outline{" "}
                    </span>
                    {answer.title}
                    {/* question ta title property er moddhe ase */}
                </div>
                <Answers input={false} options={answer.options}></Answers>
            </div>
        </>
    ));
}
