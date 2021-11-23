// import  from "./";
// import  from "./";
import styles from "./Button.module.css";
// import logo from "";

export default function Button({ className, children }) {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <button className={`${styles.button} ${className}`}>
                {children}
            </button>
        </>
    );
}
