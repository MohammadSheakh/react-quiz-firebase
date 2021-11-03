// import  from "./";
// import  from "./";
// import styles from "./.module.css";
// import logo from "";

export default function Checkbox({ className, text, ...rest }) {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <label className={className}>
                <input type="checkbox" {...rest} />
                <span> {text}</span>
            </label>
        </>
    );
}
