import styles from "./Account.module.css";
import { Link } from "react-router-dom";

export default function Account() {
    return (
        <div className={styles.account}>
            <span className="material-icons-outlined" title="Account">
                account_circle
            </span>
            <Link to="/signup">Signup</Link>
            <Link to="/login">login</Link>
            {/* <!-- <span class="material-icons-outlined" title="Logout"> logout </span> --> */}
        </div>
    );
}
