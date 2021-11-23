import styles from "./Account.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
// currentUser er displayName ta show kore dibo ..

export default function Account() {
    const { currentUser, logout } = useAuth();
    return (
        <div className={styles.account}>
            {currentUser ? (
                <>
                    <span className="material-icons-outlined" title="Account">
                        account_circle
                    </span>
                    <span>{currentUser.displayName}</span>
                    <span
                        class="material-icons-outlined"
                        title="Logout"
                        onClick={logout}
                    >
                        logout
                    </span>
                </>
            ) : (
                <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">login</Link>
                </>
            )}
        </div>
    );
}
