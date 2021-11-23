// import  from "./";
// import image from "../../assets/images/3.jpg";
import styles from "./Loading.module.css";
// import logo from "";

export default function LoadingStateVIdeo() {
    return (
        <>
            <div className={styles.video}>
                <img
                    src="https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg"
                    alt="4343"
                />
                <p>"title"</p>
                <div className={styles.qmeta}>
                    <p>Number of questions</p>
                    <p>Total Point : ...</p>
                </div>
            </div>
        </>
    );
}
