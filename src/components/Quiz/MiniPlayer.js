// import  from "./";
// import  from "./";
import styles from "./MiniPlayer.module.css";
import image from "../../assets/images/3.jpg";

export default function MiniPlayer() {
    return (
        <>
            {/* className={ `${styles. } ${styles. }`} /}
            {/ className={styles.} */}
            <div className={`${styles.miniPlayer} ${styles.floatingBtn}`}>
                <span className={`${styles.open} material-icons-outlined`}>
                    {" "}
                    play_circle_filled{" "}
                </span>
                <span className={`${styles.close} material-icons-outlined`}>
                    {" "}
                    close{" "}
                </span>
                <img src={image} alt="" />
                <p>#23 React Hooks Bangla - React useReducer hook Bangla</p>
            </div>
        </>
    );
}
