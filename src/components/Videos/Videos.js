// import  from "./";
// import  from "./";
import styles from "./Videos.module.css";

import Video from "./Video"; // component
import { Link } from "react-router-dom";

export default function Videos() {
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <div className={styles.videos}>
                <Link to="/quiz">
                    <Video />
                </Link>
                <Link to="/quiz">
                    <Video />
                </Link>
                <Link to="/quiz">
                    <Video />
                </Link>
                <Link to="/quiz">
                    <Video />
                </Link>
                <Link to="/quiz">
                    <Video />
                </Link>
                <Link to="/quiz">
                    <Video />
                </Link>
                <Link to="/quiz">
                    <Video />
                </Link>
                <Link to="/quiz">
                    <Video />
                </Link>
            </div>
        </>
    );
}
