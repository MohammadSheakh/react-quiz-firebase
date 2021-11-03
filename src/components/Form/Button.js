// import  from "./";
// import  from "./";
import styles from "./Button.module.css";
// import logo from "";

export default function Button({ className, children }) {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <div className={`${styles.button} ${className}`}>{children}</div>
        </>
    );
}
