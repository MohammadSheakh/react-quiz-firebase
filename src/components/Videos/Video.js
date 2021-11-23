// import  from "./";
// import image from "../../assets/images/3.jpg";
import styles from "./Video.module.css";
// import logo from "";

export default function Video({ title, id, noq }) {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}

            <div className={styles.video}>
                <img
                    src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    alt={title}
                />
                <p>{title}</p>
                <div className={styles.qmeta}>
                    <p>{noq} Questions</p>
                    <p>Total Point : {noq * 5}</p>
                </div>
            </div>
        </>
    );
}
