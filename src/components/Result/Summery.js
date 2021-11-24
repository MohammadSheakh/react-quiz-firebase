// import  from "./";
// import  from "./";
import styles from "./Summery.module.css";
import image1 from "../../assets/images/success.png";

export default function Summary({ score, noq }) {
    return (
        <>
            {/* className={ `${styles. } ${styles. }`} 
            className={styles.} */}
            <div className={styles.summary}>
                <div className={styles.point}>
                    {/* <!-- progress bar will be placed here --> */}
                    <p className={styles.score}>
                        Your score is <br />
                        {score} out of {noq * 5}
                    </p>
                </div>

                <div className={styles.badge}>
                    <img src={image1} alt="Success" />
                </div>
            </div>
        </>
    );
}
